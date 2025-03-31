import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import StartGamePage from "./StartGame";
import Game from "./Game";
import Login from "./Login";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import JoinGame from "./JoinGame";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const response = await fetch("/api/getUserName", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: user.uid }),
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(errorDetails.message || response.statusText);
        }

        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        console.error("Error getting user name:", error);
      }
    };

    fetchUserName();
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Header name="" />
        <Login />
        <Footer />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Header name={userName || ""} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/start-game"
          element={<StartGamePage userName={userName} />}
        />
        <Route path="/game" element={<Game />} />
        <Route path="/join-game" element={<JoinGame />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
