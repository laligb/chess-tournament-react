import ChartBar from "../components/ChartBar";

function HomePage() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Welcome to the Chess Tournament App!
      </h1>
      <p style={{ fontSize: "1.25rem", lineHeight: "1.6" }}>
        Discover a world of chess tournaments and events. Explore detailed
        statistics, view upcoming competitions on our interactive calendar, and
        navigate through events on our map. Dive in and let every move lead you
        to new challenges and victories!
      </p>

      <ChartBar />
    </div>
  );
}

export default HomePage;
