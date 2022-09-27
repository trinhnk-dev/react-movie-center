import { Card, Rate } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
const { Meta } = Card;

function UpcomingMovieItem(props) {
	const { maPhim, biDanh, tenPhim, moTa, hinhAnh, danhGia } = props.item;
	const history = useHistory();

	const goToDetail = () => {
		history.push("/detail/" + maPhim + "/" + biDanh);
	};

	return (
		<div className="UpcomingMovieItem">
			<div className="card" onClick={goToDetail}>
				<div className="card-top">
					<img src={hinhAnh} alt="" />
				</div>

				<div className="card-body">
					<h3 className="movie-title">{tenPhim}</h3>
					<p className="movie-desc">{moTa.substr(0, 50) + "..."}</p>
				</div>
			</div>
		</div>
	);
}

export default UpcomingMovieItem;
