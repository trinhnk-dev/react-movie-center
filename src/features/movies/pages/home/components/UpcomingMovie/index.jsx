import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { fetchMovieListAction } from "../../utils/homeAction";
import { movieListSelector } from "../../utils/homeSelector";
import UpcomingMovieItem from "./components/UpcomingMovieItem";

function UpcomingMovie() {
  const dispatch = useDispatch();

  const movieList = useSelector(movieListSelector);

  const slider = useRef(null);

  const fetchUpcomingMovie = () => {
    dispatch(fetchMovieListAction());
  };

  useEffect(() => {
    fetchUpcomingMovie();
  }, []);

  if (!movieList) return <Spin size="large" />;

  const upcomingMovie = movieList.filter((item) => {
    return item.sapChieu === true;
  });

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: false,
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
    <div className="UpcomingMovie">
      <div className="container">
        <h1 className="title">Phim sắp chiếu</h1>

        <div className="next-arrow" onClick={() => slider?.current.slickNext()}>
          <RightOutlined style={{ color: "black" }} />
        </div>
        <div className="prev-arrow" onClick={() => slider?.current.slickPrev()}>
          <LeftOutlined style={{ color: "black" }} />
        </div>

        <Slider className="slider" ref={slider} {...settings}>
          {upcomingMovie?.map((item) => {
            return <UpcomingMovieItem key={item.maPhim} item={item} />;
          })}
        </Slider>
      </div>
    </div>
  );
}

export default UpcomingMovie;
