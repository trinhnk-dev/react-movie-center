import { Col, Layout, Row, Spin } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerAction } from "./utils/bannerAction";

import Slider from "react-slick";
import "antd/dist/antd.css";

import { CheckCircleOutlined } from "@ant-design/icons";
import SampleNextArrow from "../SliderArrow/SampleNextArrow";
import SamplePrevArrow from "../SliderArrow/SamplePrevArrow";

import { banners } from "./utils/bannerSelector";

function Banner() {
  const dispatch = useDispatch();
  const banner = useSelector(banners);

  const fetchBanner = () => {
    dispatch(fetchBannerAction());
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  if (!banner) {
    return <Spin size="large" />;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="Banner">
      <div className="container-fluid"></div>
      <Slider className="slider container" {...settings}>
        {banner?.map((item) => {
          return (
            <div key={item.maBanner} className=" card">
              <div className="card-content">
                <div className="card-img">
                  <img src={item.hinhAnh} />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Banner;
