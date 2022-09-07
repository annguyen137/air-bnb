import { Container } from "@mui/material";
import React from "react";
import FilterTabs from "./FilterTabs/FilterTabs";
import RoomList from "./RoomList/RoomList";

const Home = () => {
  return (
    <section style={{ marginBottom: "48px" }}>
      <Container>
        <FilterTabs />
        <RoomList />
      </Container>
    </section>
  );
};

export default Home;
