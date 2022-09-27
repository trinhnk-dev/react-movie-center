import React, { useState, useRef } from "react";
import { Card, Spin, Row, Col, Button } from "antd";
import sortBy from "lodash.sortby";
import "./SeatBooking.scss";
console.log();
const SeatBooking = ({
  seatList,
  infoMovie,
  selectSeat,
  handleBooked,
  seatSelected,
}) => {
  const checked = useRef([]);
  const handleEvent = (value, index) => {
    console.log({ value }, { index });
    selectSeat(value);

    const span = checked.current;
    span[index].classList.toggle("seat--selected");
  };
  console.log(checked);
  return (
    <Card
      className="card__movies"
      title={`Rạp: ${infoMovie.tenCumRap} <> Phim: ${infoMovie.tenPhim}`}
      headStyle={{ backgroundColor: "#8eecf5" }}
      bodyStyle={{ border: "4px solid #8eecf5", height: "100%" }}
    >
      <div className="screen">
        Screen
        <br />
        Màn hình ở đây
      </div>
      <div className="reponsive">
        <div className="seat">
          <h3 style={{ display: "inline-block" }}> Ghế Chọn:</h3>
          {sortBy(seatSelected, ["stt"]).map((seat) => {
            return (
              <h3
                key={seat.maGhe}
                style={{
                  display: "inline-block",
                  fontSize: "20px",
                }}
              >
                {seat.tenGhe},
              </h3>
            );
          })}
        </div>
        <div className="title">
          <h3 style={{ display: "inline-block" }}>Tổng Tiền:</h3>
          <h2
            style={{
              display: "inline-block",
              fontSize: "25px",
              color: "rgb(141, 226, 43)",
            }}
          >
            {seatSelected
              .reduce((total, seat, index) => {
                return (total += seat.giaVe);
              }, 0)
              .toLocaleString()}
          </h2>
        </div>
        <div className="button">
          <button onClick={handleBooked} style={{ border: "none" }}>
            <a>Đặt vé</a>
          </button>
        </div>
      </div>
      <div className="seat__group">
        <Row gutter={[8, 8]}>
          {seatList.map((seat, index) => {
            const { tenGhe, maGhe, loaiGhe, daDat } = seat;
            let booked = "";
            let vip = "";

            if (daDat) booked = "seat--booked";
            if (loaiGhe === "Vip") vip = "seat--vip";

            return (
              <Col key={maGhe} span={2.4}>
                <button
                  ref={(e) => (checked.current[index] = e)}
                  value={maGhe}
                  onClick={(e) => {
                    handleEvent(e.target.value, index);
                  }}
                  className={`${booked} ${vip}  btn--seat`}
                  disabled={daDat}
                >
                  {tenGhe}
                </button>
              </Col>
            );
          })}
        </Row>
        <div className="note__seat">
          <Row>
            <Col span={6}>
              <button className="btn--seat"></button>
              <h4>Ghế Trống</h4>
            </Col>
            <Col span={6}>
              <button className="btn--seat seat--vip"></button>
              <h4>Ghế Vip</h4>
            </Col>
            <Col span={6}>
              <button className="btn--seat seat--selected"></button>
              <h4>Ghế Chọn</h4>
            </Col>
            <Col span={6}>
              <button className="btn--seat seat--booked"></button>
              <h4>Ghế Đã Đặt</h4>
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  );
};

export default SeatBooking;
