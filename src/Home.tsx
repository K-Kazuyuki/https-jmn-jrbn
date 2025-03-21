import PageCard from "./PageCard";

const Home = () => {
  return (
    <>
      <div>Home</div>
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
            imgSrc="/images/writing_001.png"
            alt="Page 1"
            text="みんなで書く"
          />
        </div>
        <div style={{ width: "200px", padding: "10px" }}>
          <PageCard
            href="/page2"
            imgSrc="/images/books_001.png"
            alt="Page 2"
            text="Page 2"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
