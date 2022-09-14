import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import RoomDetail from "pages/RoomDetail/RoomDetail";
import React from "react";

const DetailTemplate = () => {
  return (
    <>
      <Header />
      <section>
        <RoomDetail />
      </section>
      <Footer variant="detail" />
    </>
  );
};

export default DetailTemplate;
