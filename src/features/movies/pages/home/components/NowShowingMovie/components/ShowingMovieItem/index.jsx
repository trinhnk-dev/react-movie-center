import { Card, Rate } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
const { Meta } = Card;

function ShowingMovieItem(props) {
	const { maPhim, biDanh, tenPhim, moTa, hinhAnh, danhGia } = props.item;

	const history = useHistory();

	const goToDetail = () => {
		history.push("/detail/" + maPhim + "/" + biDanh);
	};

	return (
		<div className="ShowingMovieItem" onClick={goToDetail}>
			<div className="card">
				<div className="card-top">
					<img src={hinhAnh} alt="" />
				</div>

				<div className="card-body">
					<h3 className="movie-title">{tenPhim}</h3>
					<p className="movie-desc">{moTa.substr(0, 50) + "..."}</p>
				</div>

				<div className="card-bottom">
					<Rate
						style={{ fontSize: "16px" }}
						allowHalf
						defaultValue={danhGia / 2}
					/>
				</div>
			</div>
		</div>
	);
}

export default ShowingMovieItem;
