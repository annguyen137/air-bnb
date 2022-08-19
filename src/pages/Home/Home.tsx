import React from "react";
import FilterTabs from "./FilterTabs/FilterTabs";
import RoomList from "./RoomList/RoomList";

const Home = () => {
  return (
    <section style={{ marginTop: "80px", marginBottom: "49px" }}>
      <FilterTabs />
      <RoomList />
    </section>
  );
};

export default Home;
