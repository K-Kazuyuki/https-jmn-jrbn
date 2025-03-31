import React from "react";
import axios from "axios";
import GameEntry from "./GameEntry";
import { useState } from "react";

const Game: React.FC = () => {
  const [sessionId, setSessionId] = React.useState("");
  const [GameName, setGameName] = React.useState("");
  const [EntryWord, setEntryWord] = React.useState("");
  const [phase, setPhase] = React.useState(0);
  const [text, setText] = useState("");

  const handleClick = async () => {
    const res = await fetch("/api/gameStream");
    if (!res.body) {
      console.error("Response body is null or undefined");
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      console.log("done", done, value);
      if (done) break;
      if (!value) continue;

      const lines = decoder.decode(value);
      console.log("lines", lines);
      const [type, raw] = lines.trim().split(": ");

      if (type === "data" && raw) {
        setText((prevText) =>
          prevText ? prevText + " " + raw : prevText + raw
        );
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
      <button onClick={handleClick}>Run</button>
      <pre>{text}</pre>
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
