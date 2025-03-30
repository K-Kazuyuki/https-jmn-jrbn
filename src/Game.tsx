import React from "react";
import d1Access from "./d1Access";

const Game: React.FC = () => {
  const [sessionId, setSessionId] = React.useState("");
  const [GameName, setGameName] = React.useState("");

  React.useEffect(() => {
    const fetchSessionData = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionIdFromParams = params.get("sessionId") || "";
      setSessionId(sessionIdFromParams);

      try {
        const response = await d1Access({
          url: "/api/getSessionDatas",
          body: JSON.stringify({ sessionId: sessionIdFromParams }),
        });
        console.log("Session data:", response);
        if (response && response.value.GameName) {
          setGameName(response.value.GameName);
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSessionData();
  }, []);

  return (
    <div>
      <h1>Game</h1>
      <p>Session ID: {sessionId}</p>
      <p>Data: {GameName}</p>
    </div>
  );
};

export default Game;
