import React, { useEffect, useState } from "react";
import { Spin, Row, Col } from "antd";
import { useRouteMatch } from "react-router-dom";
import instance from "api/instance";
import SeatBooking from "./components/SeatBooking/SeatBooking";
import InfoBooking from "./components/InfoBooking/InfoBooking";
import "./booking.scss";
import el from "date-fns/esm/locale/el/index.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Booking = () => {
  const matchIdTheater = useRouteMatch();
  const [loading, setLoadding] = useState(false);
  const [data, setData] = useState(null);
  const [seatSelected, setSeatSelected] = useState([]);

  const history = useHistory();
  const goToHome = () => {
    history.push("/");
  };
  const ticket = {
    maLichChieu: matchIdTheater.params.id,
    danhSachVe: [...seatSelected],
  };

  const fetchSeatBooking = async (idTheater) => {
    try {
      setLoadding(true);
      const res = await instance.request({
        url: "/api/QuanLyDatVe/LayDanhSachPhongVe",
        method: "GET",
        params: {
          MaLichChieu: idTheater,
        },
      });

      setLoadding(false);
      setData(await res.data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadding(false);
    }
  };

  const postBookedTicked = async (ticket) => {
    try {
      setLoadding(true);
      const res = await instance.request({
        url: "/api/QuanLyDatVe/DatVe",
        method: "POST",
        data: ticket,
      });
      setLoadding(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchSeatBooking(matchIdTheater.params.id);
  }, []);
  if (loading) return <Spin className="spin" size="large"></Spin>;

  const selectSeat = (idSeat) => {
    const found = data?.danhSachGhe.find((seat) => seat.maGhe == idSeat);
    if (found !== -1) {
      const clone = [...seatSelected];
      const index = clone.findIndex((seat) => seat.maGhe == found.maGhe);
      if (index !== -1) clone.splice(index, 1);
      if (index === -1) clone.push(found);
      setSeatSelected(clone);
    }
  };

  const handleBooked = () => {
    if (seatSelected.length > 0) {
      postBookedTicked(ticket);
      setSeatSelected([]);
    }
  };

  return (
    <div className="booking">
      <div className="container">
        <Row>
          <Col
            style={{ marginBottom: "200px" }}
            span={18}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            lg={{ span: 18 }}
          >
            <div className="container__seat">
              {data ? (
                <SeatBooking
                  handleBooked={handleBooked}
                  seatSelected={seatSelected}
                  infoMovie={data.thongTinPhim}
                  selectSeat={selectSeat}
                  seatList={data.danhSachGhe}
                />
              ) : (
                true
              )}
            </div>
          </Col>
          <Col span={6} sm={{ span: 24 }} xs={{ span: 24 }} md={{ span: 6 }}>
            <div style={{ padding: "0 10px" }} className="container__info">
              {data ? (
                <InfoBooking
                  handleBooked={handleBooked}
                  seatSelected={seatSelected}
                  selectSeat={selectSeat}
                  infoMovie={data.thongTinPhim}
                />
              ) : (
                true
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Booking;
