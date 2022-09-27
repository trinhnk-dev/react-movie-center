import React from "react";
import { Button } from "antd";
import { vi } from "date-fns/locale";
import { format, getDate } from "date-fns";
import "./DateTheater.scss";
const DateTheater = (props) => {
	const { time, goToBooking } = props;
	const { ngayChieuGioChieu, maLichChieu } = time;
	const date = format(new Date(ngayChieuGioChieu), "eeee", { locale: vi });
	const month = format(new Date(ngayChieuGioChieu), "dd/MM");
	const timeMovies = format(new Date(ngayChieuGioChieu), "hh:mm");

	return (
		<Button
			onClick={() => {
				goToBooking(maLichChieu);
			}}
			type="primary"
			ghost
			className="time__movies"
		>
			<div className="month">{month}</div>
			<div className="date">{date}</div>
			<div className="time">{timeMovies}</div>
		</Button>
	);
};

export default DateTheater;
