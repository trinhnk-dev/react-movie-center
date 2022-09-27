import React from "react";
import Banner from "./components/Banner";
import FilterMovies from "./components/filterMovies/FilterMovies";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NowShowingMovie from "./components/NowShowingMovie";
import UpcomingMovie from "./components/UpcomingMovie";
import Footer from "common/components/Footer";
import CinemasGroup from "./components/CinemasGroup";

const Home = () => {
  return (
    <div>
      <Banner />
      <NowShowingMovie />
      <UpcomingMovie />
      <FilterMovies />
      <CinemasGroup />
      <Footer />
    </div>
  );
};

export default Home;
