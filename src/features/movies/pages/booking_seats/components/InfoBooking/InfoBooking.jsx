import React, { useState } from "react";
import { Card, Image, Button, Modal } from "antd";
import sortBy from "lodash.sortby";
import "./InfoBooking.scss";

const InfoBooking = ({ infoMovie, seatSelected, handleBooked }) => {
  const { hinhAnh, gioChieu, diaChi, ngayChieu, tenPhim } = infoMovie;

  return (
    <Card
      className="infoMoviesCard"
      headStyle={{ backgroundColor: "#b9fbc0" }}
      bodyStyle={{ border: "4px solid #b9fbc0" }}
      style={{ backgroundColor: "#b9fbc0" }}
      title={tenPhim}
    >
      <div>
        <div className="imgage">
          <Image src={hinhAnh} />
        </div>
        <div className="title">
          <h3>Địa Chỉ:{diaChi}</h3>
          <h3>
            Thời Gian:{ngayChieu}| {gioChieu}
          </h3>
        </div>
        <div className="seat__selected">
          <div>
            <h3> Ghế Chọn:</h3>
            {sortBy(seatSelected, ["stt"]).map((seat) => {
              return (
                <h3 key={seat.maGhe} style={{ display: "inline-block" }}>
                  {seat.tenGhe},
                </h3>
              );
            })}
          </div>
          <div>
            <h3>Tổng Tiền:</h3>
            <h1>
              {seatSelected
                .reduce((total, seat, index) => {
                  return (total += seat.giaVe);
                }, 0)
                .toLocaleString()}
            </h1>
          </div>
        </div>
        <div className="button">
          <button onClick={handleBooked} style={{ border: "none" }}>
            <a>Đặt Vé</a>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default InfoBooking;
