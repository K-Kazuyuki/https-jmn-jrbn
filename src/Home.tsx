import { useEffect, useState } from "react";
import PageCard from "./components/PageCard";

const Home = () => {
  const [columns, setColumns] = useState("1fr");

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width > 500) {
        const n = Math.floor((width - 100) / 200);
        setColumns(`repeat(${n}, 1fr)`);
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
        }}
      >
        <div style={{ padding: "10px" }}>
          <PageCard
            href="https://jarebon.com/"
            imgSrc="/images/flag_001.png"
            alt="ゲームを始める"
            text="ゲームを始める"
          />
        </div>
        <div style={{ padding: "10px" }}>
          <PageCard
            imgSrc="/images/writing_002.png"
            alt="ゲームに参加"
            text="ゲームに参加"
            href="https://jarebon.com/"
          />
        </div>
        <div style={{ padding: "10px" }}>
          <PageCard
            href="/page2"
            imgSrc="/images/books_002.png"
            alt="いままでの記録"
            text="いままでの記録"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
