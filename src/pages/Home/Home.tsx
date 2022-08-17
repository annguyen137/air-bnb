import React from "react";
import FilterTabs from "./FilterTabs/FilterTabs";
import RoomList from "./RoomList/RoomList";

const Home = () => {
  return (
    <section>
      <FilterTabs />
      <RoomList />
    </section>
  );
};

export default Home;
