import { movieTheaterGroup } from "features/movies/pages/home/utils/homeSelector";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spin, Layout, Menu, Row, Col, Card, Button } from "antd";
import "./TheaterGroup.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DateTheater from "../date-custom/DateTheater";
import Test from "./test";
const TheaterGroup = (props) => {
  const { Meta } = Card;
  const { movieTheaterMovie, theaterList, theaterGroupFetch } = props;
  const history = useHistory();

  const [index, setIndex] = useState("0");

  if (!movieTheaterMovie) return <Spin></Spin>;

  const goToDetail = (idMovies) => {
    history.push("/detail/" + idMovies + "/" + null);
  };

  const goToBooking = (idPremiere) => {
    const login = localStorage.getItem("login");

    if (login === "true") history.push("/booking/" + idPremiere);

    if (login !== "true") history.push("/signin");
  };

  const items1 = theaterList.map((theater) => ({
    label: (
      <button className="btn--header">
        <img className="img--header" src={theater.logo} />
      </button>
    ),
    key: theater.maHeThongRap,
  }));

  const items2 = movieTheaterMovie[0].lstCumRap.map((theaterGroup, index) => ({
    label: (
      <div className="sider--items">
        <div className="sider--img">
          {" "}
          <img width={60} src={theaterGroup.logo} />
        </div>
        <div className="theater--name">
          <p style={{ display: "inline" }}>{theaterGroup.tenCumRap}</p>
        </div>
      </div>
    ),

    key: index,
  }));

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <Layout.Header className="header__filter">
        <Menu
          className="menu--header"
          style={{ border: "none" }}
          onClick={(e) => {
            theaterGroupFetch(e.key);
            setIndex("0");
          }}
          theme="light  "
          mode="horizontal"
          defaultSelectedKeys={["BHDStar"]}
          items={items1}
        />
      </Layout.Header>

      <Layout
        className="content__cover"
        style={{
          padding: "24px 0",
        }}
      >
        <Layout.Sider
          onBreakpoint={(borken) => {}}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          width={300}
          collapsedWidth="0"
          breakpoint="lg"
          className=" ant-layout-sider ant-layout-sider-light sider"
        >
          <Menu
            className="sider--menu"
            onClick={(e) => {
              setIndex(e.key);
            }}
            mode="inline"
            selectedKeys={index}
            items={items2}
          />
        </Layout.Sider>
        <Layout className="content">
          <Layout.Content
            className="site-layout-background content"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div className="site-card-wrapper">
              {movieTheaterMovie[0]?.lstCumRap[index].danhSachPhim.map(
                (movies) => {
                  if (movies.dangChieu) {
                    return (
                      <Row key={movies.maPhim} className="card">
                        <Col
                          span={8}
                          md={{ span: 6 }}
                          lg={{ span: 6 }}
                          xl={{ span: 8 }}
                          className="col--img"
                        >
                          <img
                            onClick={() => {
                              goToDetail(movies.maPhim);
                            }}
                            width={95}
                            src={movies.hinhAnh}
                          />
                        </Col>
                        <Col
                          span={16}
                          md={{ span: 18 }}
                          lg={{ span: 18 }}
                          xl={{ span: 16 }}
                          className="col--title"
                        >
                          <div>
                            <h2
                              style={{
                                fontWeight: "700",
                                fontSize: "24px",
                                textAlign: "center",
                                backgroundColor: "#91e5f6",
                                borderRadius: "10px",
                              }}
                            >
                              {movies.tenPhim}
                            </h2>
                            <h3>Xuất Chiếu</h3>
                            <Row>
                              {movies.lstLichChieuTheoPhim.map((time) => {
                                return (
                                  <Col
                                    key={time.maLichChieu}
                                    span={6}
                                    lg={{
                                      span: 6,
                                    }}
                                    md={{
                                      span: 8,
                                    }}
                                    xs={{
                                      span: 12,
                                    }}
                                    sm={{
                                      span: 12,
                                    }}
                                    style={{
                                      width: "20%",
                                    }}
                                  >
                                    <DateTheater
                                      time={time}
                                      goToBooking={goToBooking}
                                    />
                                  </Col>
                                );
                              })}
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    );
                  }
                }
              )}
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TheaterGroup;
