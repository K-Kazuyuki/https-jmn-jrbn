import React from "react";
import axios from "axios";
import GameEntry from "./GameEntry";

const Game: React.FC = () => {
  const [sessionId, setSessionId] = React.useState("");
  const [GameName, setGameName] = React.useState("");
  const [EntryWord, setEntryWord] = React.useState("");
  const [phase, setPhase] = React.useState(0);

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
