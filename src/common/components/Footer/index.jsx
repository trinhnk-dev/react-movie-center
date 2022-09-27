import {
  AppleFilled,
  CaretRightFilled,
  GitlabOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";

function Footer() {
  const movieType = [
    {
      key: "mt1",
      name: "Phim đang chiếu",
    },
    {
      key: "mt2",
      name: "Phim sắp chiếu",
    },
  ];

  const blog = [
    {
      key: "b1",
      name: "Review phim",
    },
    {
      key: "b2",
      name: "Top phim hay",
    },
    {
      key: "b3",
      name: "Phim Nexflix",
    },
    {
      key: "b4",
      name: "Phim bom tấn",
    },
    {
      key: "b5",
      name: "Câu chuyện diễn viên",
    },
  ];

  const cinemas = [
    {
      key: "c1",
      name: "BHD Star",
    },
    {
      key: "c2",
      name: "Lotte Cinema",
    },
    {
      key: "b3",
      name: "Galaxy Cinema",
    },
    {
      key: "b4",
      name: "CGV",
    },
    {
      key: "b5",
      name: "Beta Cinemas",
    },
    {
      key: "b6",
      name: "Cine Star",
    },
    {
      key: "b7",
      name: "MegaGS",
    },
  ];

  return (
    <div className="Footer">
      <div className="container">
        <Row gutter={[0, 16]} justify="space-between">
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className="schedule">
              <div className="title">Lịch chiếu phim</div>
              {movieType?.map((item) => {
                return (
                  <div key={item.key} className="schedule-item">
                    {item.name}
                  </div>
                );
              })}
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className="blog">
              <div className="title">Blog điện ảnh</div>
              {blog?.map((item) => {
                return (
                  <div key={item.key} className="blog-item">
                    {item.name}
                  </div>
                );
              })}
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className="cinemas">
              <div className="title">Rạp chiếu phim</div>
              {cinemas?.map((item) => {
                return (
                  <div key={item.key} className="cinemas-item">
                    {item.name}
                  </div>
                );
              })}
            </div>
          </Col>
          {/* <Col xs={12} sm={12} md={6} lg={4} xl={4}></Col> */}
          <Col xs={12} sm={12} md={6} lg={8} xl={12}>
            <div className="customer-care">
              <div className="title">CHĂM SÓC KHÁCH HÀNG</div>
              <div style={{ display: "inline-block" }} className="address">
                Địa chỉ: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, <br /> Thành
                Phố Thủ Đức, Thành phố Hồ Chí Minh 700000, Việt Nam
              </div>
              <div className="hotline">
                Hotline: <strong>1900 0000 99</strong> (1000đ/phút)
              </div>
              <div className="email">
                Email: <strong>example@gmail.com</strong>
              </div>

              <div className="switchboard">
                Tổng đài gọi ra: <strong>0123.456.789</strong>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
