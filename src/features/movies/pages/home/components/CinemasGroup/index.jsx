import {
  DesktopOutlined,
  EnvironmentOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Card, Col, Input, Rate, Row, Spin, Table } from "antd";
import instance from "api/instance";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesTheater, fetchTheater } from "../../utils/homeAction";

function CinemasGroup() {
  const dispatch = useDispatch();

  const [theaterGroup, setTheaterGroup] = useState(null);

  const [listDetail, setListDetail] = useState([]);
  const mergeArr = () => {
    const arr = [];
    listDetail.map((item) => {
      return item.map((item2) => {
        return arr.push(item2);
      });
    });
    return arr;
  };

  const newListTheater = mergeArr();

  const [theaterContent, setTheaterContent] = useState(newListTheater[0]);

  const [query, setQuery] = useState("");

  const [activeId, setActiveId] = useState();

  const toggleActive = (index) => {
    if (index === activeId) {
      return "active";
    } else {
      return "inactive";
    }
  };

  const fetchTheaterInfo = async (id) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinCumRapTheoHeThong",
        method: "GET",
        params: {
          maHeThongRap: id,
        },
      });
      return res.data.content;
    } catch (err) {}
  };

  const fetchTheaterList = async () => {
    const data = await dispatch(fetchTheater());
    setTheaterGroup(data.payload);

    let arrId = data.payload?.map((item) => item.maHeThongRap);
    const arrTheater = [];
    arrId.map((id) => {
      arrTheater.push(fetchTheaterInfo(id));
    });

    Promise.all(arrTheater).then((res) => setListDetail(res));
  };

  useEffect(() => {
    fetchTheaterList();
  }, [theaterContent]);

  const handleChangeTheater = (theater) => {
    setTheaterContent(theater);
  };

  if (!newListTheater) return <Spin size="large" />;
  if (!theaterGroup) return <Spin size="large" />;

  console.log(theaterContent);

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "M?? r???p",
      dataIndex: "maRap",
      key: "maRap",
    },

    {
      title: "T??n r???p",
      dataIndex: "tenRap",
      key: "tenRap",
    },
  ];

  const data = theaterContent?.danhSachRap;

  return (
    <div className="CinemasGroup">
      <div className="container">
        <h1>H??? th???ng r???p chi???u phim</h1>
        <h3>Danh s??ch c??c r???p chi???u phim l???n nh???t c??? n?????c</h3>
        <div className="theater-group">
          {theaterGroup?.map((item) => {
            return (
              <div className="theater-item" key={item.maHeThongRap}>
                <img src={item.logo} width={40} alt="" />
              </div>
            );
          })}
        </div>
        <Row
          gutter={[0, 20]}
          style={{ border: "1px solid #d1d1d1", background: "white" }}
        >
          <Col xs={24} sm={24} md={12} lg={12} xl={8}>
            <div className="find-content">
              <Input
                onChange={(e) => setQuery(e.target.value)}
                placeholder="T??m r???p theo t??n..."
                style={{
                  padding: "10px 10px",
                  borderRadius: 5,
                }}
                prefix={<SearchOutlined />}
              />
              <div className="theater-list">
                {newListTheater
                  ?.filter((item) =>
                    item.tenCumRap.toLowerCase().includes(query)
                  )
                  .map((item, index) => {
                    return (
                      <div
                        key={item.maCumRap}
                        className={"theater" + " " + toggleActive(index)}
                        onClick={() => {
                          handleChangeTheater(item);
                          setActiveId(index);
                        }}
                      >
                        {item.tenCumRap}
                      </div>
                    );
                  })}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={16}>
            <div className="detail-content">
              <h2>Th??ng tin chi ti???t c???m r???p </h2>
              {theaterContent ? (
                <div className="detail">
                  <div className="theater-name">
                    <div className="left">T??n c???m r???p: </div>
                    <div className="right">{theaterContent.tenCumRap}</div>
                  </div>
                  <div className="theater-id">
                    <div className="left">M?? c???m r???p: </div>
                    <div className="right">{theaterContent.maCumRap}</div>
                  </div>
                  <div className="address">
                    <div className="left">?????a ch???: </div>
                    <div className="right">{theaterContent.diaChi}</div>
                  </div>
                  <div className="list">
                    <Table
                      className="table"
                      columns={columns}
                      dataSource={data}
                      pagination={false}
                    />
                  </div>
                </div>
              ) : (
                "H??y ch???n m???t c???m r???p ????? xem th??ng tin !"
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CinemasGroup;
