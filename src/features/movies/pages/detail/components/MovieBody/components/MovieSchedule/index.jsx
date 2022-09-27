import { PlayCircleOutlined } from "@ant-design/icons";
import { Col, Row, Menu, Layout } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import notFoundImg from "../../../../../../../../assets/img/icon/notFound.png";
import TheaterInfo from "./TheaterInfo";

function MovieSchedule(props) {
  const selectedMovie = props.selectedMovie;

  const theaterList = props.theaterList;

  const schedule = props.schedule;

  const [theaterGroupId, setTheaterGroupId] = useState("BHDStar");

  const currentTheater = schedule.heThongRapChieu.find(
    (item) => item.maHeThongRap === theaterGroupId
  );

  const [index, setIndex] = useState("0");

  const handleChangeTheaterGroup = (id) => {
    setTheaterGroupId(id);
  };

  useEffect(() => {}, [theaterGroupId]);

  const { Header, Content, Sider } = Layout;
  const items1 = theaterList.map((theaterGroup) => ({
    key: theaterGroup.maHeThongRap,
    label: (
      <div className="btn-header">
        <img className="logo-theater" src={theaterGroup.logo} alt="" />
      </div>
    ),
  }));

  const renderLogo = () => {
    let logoDefault;
    if (!currentTheater) {
      logoDefault = null;
    } else {
      logoDefault = currentTheater.logo;
    }
    return logoDefault;
  };

  const items2 = currentTheater?.cumRapChieu.map((theater, index) => ({
    key: index,
    label: (
      <div className="btn-header">
        <img
          className="logo-theater"
          width={30}
          style={{ marginRight: 10 }}
          src={renderLogo()}
          alt=""
        />
        {theater.tenCumRap}
      </div>
    ),
  }));

  const theaterInfo = currentTheater?.cumRapChieu[index];

  const notFound = (
    <div className="not-found">
      <img src={notFoundImg} alt="" />
    </div>
  );

  return (
    <div className="MovieSchedule">
      <div className="schedule-title">Lịch chiếu: {selectedMovie.tenPhim}</div>
      <Layout className="layout-custom">
        <Header className="header">
          <Menu
            className="menu-header"
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["BHDStar"]}
            items={items1}
            onClick={(e) => {
              handleChangeTheaterGroup(e.key);
              setIndex("0");
            }}
          />
        </Header>
        <Layout className="body">
          <Sider theme="" width={280} className="sider">
            <Menu
              mode="inline"
              selectedKeys={index}
              onClick={(e) => {
                setIndex(e.key);
              }}
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={items2}
            />
          </Sider>
          <Layout
            className="box-layout"
            style={{
              padding: "0 24px 24px",
              background: "#f1f2f6",
            }}
          >
            <Content
              className="layout-content"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {currentTheater?.cumRapChieu[0] ? (
                <TheaterInfo
                  selectedMovie={selectedMovie}
                  theaterInfo={theaterInfo}
                />
              ) : (
                notFound
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default MovieSchedule;
