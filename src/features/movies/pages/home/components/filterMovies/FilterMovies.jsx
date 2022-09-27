import React, { useEffect } from "react";
import { Card, Row, Col, Spin } from "antd";
import { fetchMoviesTheater, fetchTheater } from "../../utils/homeAction";
import { useDispatch, useSelector } from "react-redux";
import { theater, movieTheaterGroup } from "../../utils/homeSelector";
import TheaterGroup from "./components/theater-group/TheaterGroup";
const FilterMovies = () => {
  const dispatch = useDispatch();
  const theaterList = useSelector(theater);
  const movieTheaterMovie = useSelector(movieTheaterGroup);

  const theaterFetch = async () => {
    const data = await dispatch(fetchTheater());
    theaterGroupFetch(data.payload[0].maHeThongRap);
  };

  const theaterGroupFetch = (idTheater) => {
    dispatch(fetchMoviesTheater(idTheater));
  };

  useEffect(() => {
    theaterFetch();
    theaterGroupFetch();
  }, []);
  if (!theaterList) {
    return <Spin className="spin" size="large"></Spin>;
  }
  return (
    <div className="filter">
      <div className="container">
        <h1
          style={{ textAlign: "center", color: "#000000", fontWeight: "600" }}
        >
          Lịch Chiếu Phim
        </h1>
        <TheaterGroup
          movieTheaterMovie={movieTheaterMovie}
          theaterGroupFetch={theaterGroupFetch}
          theaterList={theaterList}
        />
      </div>
    </div>
  );
};

export default FilterMovies;
