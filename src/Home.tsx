import { useEffect, useState } from "react";
import PageCard from "./components/PageCard";

const Home = () => {
  const [columns, setColumns] = useState("1fr");

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width > 500) {
        const n = Math.floor((width - 100) / 200);
        if (n > 3) {
          setColumns("repeat(3, 1fr)");
        } else {
          setColumns(`repeat(${n}, 1fr)`);
        }
      } else {
        setColumns("1fr");
      }
    };

    updateColumns(); // 初期化
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: columns,
          gap: "20px",
          marginTop: "40px",
          margin: "0 auto",
        }}
      >
        <div style={{ padding: "10px", maxWidth: 345, minWidth: 200 }}>
          <PageCard
            href="/start-game"
            imgSrc="/images/flag_001.png"
            alt="ゲームを始める"
            text="ゲームを始める"
          />
        </div>
        <div style={{ padding: "10px", maxWidth: 345, minWidth: 200 }}>
          <PageCard
            imgSrc="/images/writing_002.png"
            alt="ゲームに参加"
            text="ゲームに参加"
            href="/join-game"
          />
        </div>
        <div style={{ padding: "10px", maxWidth: 345, minWidth: 200 }}>
          <PageCard
            imgSrc="/images/books_002.png"
            alt="いままでの記録"
            text="いままでの記録"
            href="https://jarebon.com/"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
