import { Col, Row } from "antd";
import useLocalStorage from "common/hooks/useLocalStorage";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MovieListColumn from "./components/MovieListColumn";
import MovieSchedule from "./components/MovieSchedule";
import RateStar from "./components/RateStar";
import UserComment from "./components/UserComment";

function MovieBody(props) {
  const selectedMovie = props.selectedMovie;

  const theaterList = props.theater;

  const schedule = props.schedule;

  const movieList = props.movieList;

  return (
    <div style={{ overflow: "hidden" }} className="MovieBody">
      <div className="container">
        <Row>
          <Col xs={24} sm={24} md={24} lg={18} xl={18}>
            <MovieSchedule
              selectedMovie={selectedMovie}
              theaterList={theaterList}
              schedule={schedule}
            />
            <UserComment />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <RateStar selectedMovie={selectedMovie} />
            <MovieListColumn movieList={movieList} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MovieBody;
