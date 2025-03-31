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
  );

  const startStream = async () => {
    isStreaming.current = true;
    try {
      const res = await fetch(`/api/gameStream?sessionId=${sessionId}`);
      if (!res.body) {
        console.error("Response body is null or undefined.");
        return;
      }
      const reader = res.body.getReader();
      readerRef.current = reader;
      const decoder = new TextDecoder();

      while (isStreaming.current) {
        const { value, done } = await reader.read();
        if (done) break;
        if (!value) continue;

        const lines = decoder.decode(value);
        const [type, raw] = lines.trim().split(": ");

        if (type === "data" && raw) {
          setText((prevText) => {
            try {
              const parsedData = JSON.parse(raw);
              setPhase(parsedData.phase);
              setUsernames(parsedData.InGameUserName || []);
              return raw;
            } catch (e) {
              console.error("Error parsing JSON:", e);
              console.log("Raw data:", raw);
              return prevText + "\nError parsing JSON";
            }
          });
        }
      }
    } catch (error) {
      console.error("Error streaming data:", error);
    } finally {
      isStreaming.current = false;
      readerRef.current?.cancel();
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
      isStreaming.current = false;
      readerRef.current?.cancel();
    };
  }, []);

  useEffect(() => {
    if (sessionId) {
      startStream();
    }
  }, [sessionId]); // sessionId を依存配列に追加

  return (
    <div>
      <pre>{text}</pre>
      {(() => {
        switch (phase) {
          case 0:
            return (
              <GameEntry
                name={GameName}
                entryWord={EntryWord}
                usernames={usernames}
              />
            );
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
