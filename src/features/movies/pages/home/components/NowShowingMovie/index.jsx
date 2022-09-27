import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { fetchMovieListAction } from "../../utils/homeAction";
import { movieListSelector } from "../../utils/homeSelector";
import SampleNextArrow from "../SliderArrow/SampleNextArrow";
import SamplePrevArrow from "../SliderArrow/SamplePrevArrow";
import ShowingMovieItem from "./components/ShowingMovieItem";

function NowShowingMovie() {
  const dispatch = useDispatch();

  const movieList = useSelector(movieListSelector);

  const fetchNowShowingMovie = () => {
    dispatch(fetchMovieListAction());
  };

  useEffect(() => {
    fetchNowShowingMovie();
  }, []);

  if (!movieList) return <Spin size="large" />;

  const showingMovie = movieList.filter((item) => {
    return item.dangChieu === true;
  });

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: false,
    autoplaySpeed: 2000,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          backgroundColor: "#ddd",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          lineHeight: "30px",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          color: "black",
          border: "1px black solid",
        }}
      >
        {i + 1}
      </div>
    ),

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="NowShowingMovie">
      <div className="container">
        <h1 className="title">Phim đang chiếu</h1>

        <Slider {...settings}>
          {showingMovie?.map((item) => {
            return (
              <ShowingMovieItem
                key={item.maPhim}
                className="showingMovieItem"
                item={item}
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default NowShowingMovie;
