import React, { useState } from "react";
import {
  HomeOutlined,
  PlayCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Spin, Col, Divider, Row, Modal, Button } from "antd";
import { NavLink } from "react-router-dom";
import YouTube from "react-youtube";
import { formatHour } from "common/utils/date";
import { formatDateString } from "common/utils/dateString";

function MovieInfo(props) {
  const {
    maPhim,
    tenPhim,
    moTa,
    hinhAnh,
    trailer,
    dangChieu,
    sapChieu,
    ngayKhoiChieu,
    danhGia,
    hot,
  } = props.selectedMovie;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const opts = {
    height: "350",
    width: "600",

    playerVars: {
      autoplay: 1,
    },
  };
  const onReady = (event) => {
    event.target.pauseVideo();
  };

  const getId = (str) => {
    let count = str.length;
    let index = str.indexOf("=") + 1;
    if (str.indexOf(".be/") !== -1) {
      index = str.indexOf(".be/") + 4;
    }
    let id = str.slice(index, count);
    return id;
  };

  const formatDivider = (isShowing, isComing) => {
    if (isShowing) {
      return "Phim đang chiếu";
    } else if (isComing) {
      return "Phim sắp chiếu";
    }
  };

  return (
    <div className="MovieInfo">
      <div className="breadcrumb">
        <div className="container">
          <Row>
            <Col className="gutter-row" span={24}>
              <div className="breadcrumb-child">
                <NavLink to="/">
                  <HomeOutlined className="home-icon" />
                </NavLink>
                <RightOutlined />
                <NavLink to="/">
                  <span className="movie-link">
                    {formatDivider(dangChieu, sapChieu)}
                  </span>
                </NavLink>
                <RightOutlined />
                <span>{tenPhim}</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div
        className="detail-content"
        style={{ backgroundImage: `url(${hinhAnh})` }}
      >
        <div className="container">
          <Row>
            <Col xs={24} sm={8} md={8} lg={6} xl={6}>
              <div className="content-left">
                <div className="movie-img">
                  <img src={hinhAnh} alt="" />
                </div>
              </div>

              <Button onClick={showModal} className="btn-trailer">
                Trailer
              </Button>

              <Modal
                bodyStyle={{
                  height: 500,
                  padding: 0,
                  background: "#171717",
                }}
                width={600}
                style={{
                  position: "relative",
                }}
                closable={true}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
              >
                <YouTube
                  videoId={getId(trailer)}
                  opts={opts}
                  onReady={onReady}
                />
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "20%",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={hinhAnh}
                      style={{
                        width: "100%",
                        height: "80%",
                        objectFit: "cover",
                        padding: "5px",
                      }}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      width: "80%",
                      margin: "5px 10px",
                    }}
                  >
                    <h3
                      style={{
                        color: "white",
                        fontSize: 20,
                      }}
                    >
                      {tenPhim}
                    </h3>
                    <p
                      style={{
                        color: "gray",
                        fontSize: 14,
                      }}
                    >
                      {moTa.substr(0, 280) + "..."}
                    </p>
                  </div>
                </div>
              </Modal>
            </Col>

            <Col xs={24} sm={16} md={16} lg={18} xl={18}>
              <div className="content-right">
                {hot ? <span className="hot-label">HOT</span> : <></>}
                <h1 className="title">{tenPhim}</h1>

                <div className="rate">
                  <span className="rate-label">Đánh giá</span>
                  <div className="rate-value">
                    {danhGia}
                    <span>/10</span>
                  </div>
                </div>
                <div className="movie-content">
                  <h2>Nội dung</h2>
                  <p>{moTa}</p>
                </div>

                <div className="show-date">
                  <h3>Ngày chiếu</h3>
                  <h4>{formatDateString(ngayKhoiChieu)}</h4>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
