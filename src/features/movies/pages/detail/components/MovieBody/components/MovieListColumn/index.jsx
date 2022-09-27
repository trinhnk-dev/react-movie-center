import { Rate } from "antd";
import { formatDateString } from "common/utils/dateString";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Slider from "react-slick";
import "./_movieListColumn.scss";

function MovieListColumn(props) {
	const movieList = props.movieList;
	const history = useHistory();
	const goToDetail = (movieId, slug) => {
		history.push("/detail/" + movieId + "/" + slug);
	};
	//Setting Slick
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 5,
		vertical: true,
		verticalSwiping: true,
	};

	const formatHotLabel = (val) => {
		if (val) {
			return <div className="label">HOT</div>;
		}
		return;
	};

	const showingMovie = movieList.filter((item) => {
		return item.dangChieu === true;
	});

	return (
		<div className="MovieListColumn">
			<h2>Phim đang chiếu</h2>
			<Slider {...settings}>
				{showingMovie?.map((item) => {
					return (
						<div key={item.maPhim} className="movie-slider">
							<div className="content">
								<div
									className="left"
									onClick={() =>
										goToDetail(item.maPhim, item.biDanh)
									}
								>
									<img src={item.hinhAnh} alt="" />
								</div>
								<div className="right">
									<div className="hot-label">
										{formatHotLabel(item.hot)}
									</div>
									<div className="title">{item.tenPhim}</div>
									<div className="show-time">
										{formatDateString(item.ngayKhoiChieu)}
									</div>
									<div className="rate">
										<Rate
											className="rate-icon"
											style={{ fontSize: 12 }}
											allowHalf
											defaultValue={item.danhGia / 2}
										/>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</Slider>
		</div>
	);
}

export default MovieListColumn;
