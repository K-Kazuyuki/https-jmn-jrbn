import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import GameEntry from "./GameEntry";

const Game: React.FC = () => {
  const [sessionId, setSessionId] = useState("");
  const [GameName, setGameName] = useState("");
  const [EntryWord, setEntryWord] = useState("");
  const [phase, setPhase] = useState(0);
  const [text, setText] = useState("");
  const [usernames, setUsernames] = useState<string[]>([]);
  const isStreaming = useRef(false);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(
    null
  ); // reader を useRef で管理

  const handleStream = async () => {
    isStreaming.current = true;
    try {
      const res = await fetch(`/api/gameStream?sessionId=${sessionId}`);
      if (!res.body) {
        console.error("Response body is null or undefined.");
        return;
      }
      const reader = res.body.getReader();
      readerRef.current = reader; // reader を useRef に保存
      const decoder = new TextDecoder();

      while (isStreaming.current) {
        const { value, done } = await reader.read();
        if (done) break; // ストリームが終了したらループを抜ける
        if (!value) continue;

        const lines = decoder.decode(value);
        const [type, raw] = lines.trim().split(": ");

        if (type === "data" && raw) {
          setText((prevText) => {
            try {
              const parsedData = JSON.parse(raw);
              setPhase(parsedData.phase);
              setUsernames(parsedData.InGameUserName);
              return raw;
            } catch (e) {
              console.error("Error parsing JSON:", e);
              return prevText + "\nError parsing JSON"; // エラーメッセージを追加
            }
          });
        }
      }
    } catch (error) {
      console.error("Error streaming data:", error);
    } finally {
      isStreaming.current = false;
      readerRef.current?.cancel(); // ストリームをクローズ
      readerRef.current = null;
    }
  };

  useEffect(() => {
    const fetchSessionData = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionIdFromParams = params.get("sessionId") || "";
      setSessionId(sessionIdFromParams);
      try {
        const response = await axios.post("/api/getSessionDatas", {
          sessionId: sessionIdFromParams,
        });
        setGameName(response.data[0].GameName);
        setEntryWord(response.data[0].EntryWord);
        setPhase(response.data[0].GamePhase);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSessionData();

    return () => {
      isStreaming.current = false; // アンマウント時にストリームを停止
      readerRef.current?.cancel(); // ストリームをクローズ
    };
  }, []);

  return (
    <div>
      <button onClick={handleStream}>Run</button>
      <pre>{text}</pre>
      <h2>Users</h2>
      <ul>
        {usernames.map((userId, index) => (
          <li key={index}>{userId}</li>
        ))}
      </ul>
      {(() => {
        switch (phase) {
          case 0:
            return <GameEntry name={GameName} entryWord={EntryWord} />;
          default:
            return <div>Unknown phase</div>;
        }
      })()}
      <h1>Game</h1>
      <p>Session ID: {sessionId}</p>
      <p>Data: {GameName}</p>
      <p>EntryWord: {EntryWord}</p>
    </div>
  );
};

export default Game;
