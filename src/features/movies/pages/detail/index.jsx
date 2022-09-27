import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import { Spin, Col, Divider, Row, Menu } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import MovieBody from "./components/MovieBody";
import MovieInfo from "./components/MovieInfo";

import {
  fetchTheaterAction,
  fetchSelectedMovieAction,
  fetchScheduleAction,
  fetchMovieListColumnAction,
} from "./utils/detailAction";
import {
  movieListColumnSelector,
  scheduleSelector,
  selectedMovieSelector,
  theaterSelector,
} from "./utils/detailSelector";

const Detail = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const movieId = match.params.id;

  const selectedMovie = useSelector(selectedMovieSelector);
  const theater = useSelector(theaterSelector);
  const schedule = useSelector(scheduleSelector);
  const movieList = useSelector(movieListColumnSelector); //for MovieListColumn

  const [theaterGroup, setTheaterGroup] = useState({
    theaterGroupId: "BHDStar",
  });

  const fetchSelectedMovie = () => {
    dispatch(fetchSelectedMovieAction(movieId));
  };

  const fetchTheater = () => {
    dispatch(fetchTheaterAction());
  };

  const fetchSchedule = () => {
    dispatch(fetchScheduleAction(movieId));
  };
  const fetchMovieListColumn = () => {
    dispatch(fetchMovieListColumnAction());
  };

  useEffect(() => {
    fetchSelectedMovie();
    fetchTheater();
    fetchSchedule();
    fetchMovieListColumn();
  }, [theaterGroup, movieId]);

  if (!selectedMovie) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!theater) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!schedule) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!movieList) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="Detail">
      <MovieInfo selectedMovie={selectedMovie} />
      <MovieBody
        selectedMovie={selectedMovie}
        theater={theater}
        schedule={schedule}
        movieList={movieList}
      />
    </div>
  );
};

export default Detail;
