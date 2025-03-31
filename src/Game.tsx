import React from "react";
import axios from "axios";
import GameEntry from "./GameEntry";
import { useState } from "react";

// type Status = {
//   phase: number;
//   userIds: string[];
// };

const Game: React.FC = () => {
  const [sessionId, setSessionId] = React.useState("");
  const [GameName, setGameName] = React.useState("");
  const [EntryWord, setEntryWord] = React.useState("");
  const [phase, setPhase] = React.useState(0);
  const [text, setText] = useState("");
  const [userIds, setUserIds] = React.useState<string[]>([]);

  const handleStream = async () => {
    const res = await fetch("/api/gameStream");
    if (!res.body) {
      console.error("Response body is null or undefined.");
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value } = await reader.read();
      if (!value) continue;

      const lines = decoder.decode(value);
      const [type, raw] = lines.trim().split(": ");

      if (type === "data" && raw) {
        setText(() => {
          try {
            const parsedData = JSON.parse(raw);
            setPhase(parsedData.phase);
            setUserIds(parsedData.userIds);
            return raw;
          } catch (e) {
            console.error("Error parsing JSON:", e);
            return "Error parsing JSON";
          }
        });
      }
    }
  };

  React.useEffect(() => {
    const fetchSessionData = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionIdFromParams = params.get("sessionId") || "";
      setSessionId(sessionIdFromParams);
      try {
        await axios
          .post("/api/getSessionDatas", {
            sessionId: sessionIdFromParams,
          })
          .then((response) => {
            setGameName(response.data[0].GameName);
            setEntryWord(response.data[0].EntryWord);
            setPhase(response.data[0].GamePhase);
          });
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSessionData();
  }, []);

  return (
    <div>
      <button onClick={handleStream}>Run</button>
      <pre>{text}</pre>
      <h2>Users</h2>
      <ul>
        {userIds.map((userId, index) => (
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
