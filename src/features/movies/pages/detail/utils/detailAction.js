import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

// get Movie Info
export const fetchSelectedMovieAction = createAsyncThunk(
	"home/fetchSelectedMovie",
	async (movieId) => {
		try {
			const res = await instance.request({
				url: "/api/QuanLyPhim/LayThongTinPhim",
				method: "GET",
				params: {
					maPhim: movieId,
				},
			});
			// console.log(res.data.content);
			return res.data.content;
		} catch (err) {
			console.log(err);
		}
	}
);

// get Theater - LayThongTinHeThongRap
export const fetchTheaterAction = createAsyncThunk(
	"detail/fetchTheater",
	async () => {
		try {
			const res = await instance.request({
				url: "/api/QuanLyRap/LayThongTinHeThongRap",
				method: "GET",
			});

			return res.data.content;
		} catch (err) {
			console.log(err);
		}
	}
);

// get schedule - LayThongTinLichChieuPhim
export const fetchScheduleAction = createAsyncThunk(
	"detail/fetchSchedule",
	async (movieId) => {
		try {
			const res = await instance.request({
				url: "/api/QuanLyRap/LayThongTinLichChieuPhim",
				method: "GET",
				params: {
					maPhim: movieId,
				},
			});
			// console.log(res.data.content);
			return res.data.content;
		} catch (err) {
			console.log(err);
		}
	}
);

// Get movie list for component MovieListColumn
export const fetchMovieListColumnAction = createAsyncThunk(
	"detail/fetchMovieListColumn",
	async () => {
		try {
			const res = await instance.request({
				url: "/api/QuanLyPhim/LayDanhSachPhim",
				method: "GET",
				params: {
					maNhom: "GP03",
				},
			});
			return res.data.content;
		} catch (err) {
			console.log(err);
		}
	}
);
