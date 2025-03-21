import PageCard from "./PageCard";

const Home = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <div style={{ width: "200px", padding: "10px" }}>
          <PageCard
            href="/page1"
            imgSrc="/images/writing_002.png"
            alt="みんなで書く"
            text="みんなで書く"
            link="https://jarebon.com/"
          />
        </div>
        <div style={{ width: "200px", padding: "10px" }}>
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
