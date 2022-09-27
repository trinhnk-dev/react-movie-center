import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

export const fetchMovieListAction = createAsyncThunk(
  "home/fetchMovieList",
  async () => {
    try {
      const res = instance.request({
        url: "/api/QuanLyPhim/LayDanhSachPhim",
        method: "GET",
        params: {
          maNhom: "GP07",
        },
      });
      // console.log((await res).data.content);
      return (await res).data.content;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchTheater = createAsyncThunk("home/fetchThearter", async () => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    });
    return res.data.content;
  } catch (error) {}
});

export const fetchMoviesTheater = createAsyncThunk(
  "home/fetchMoviesTheater",
  async (idTheater) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinLichChieuHeThongRap",
        method: "GET",
        params: {
          maHeThongRap: idTheater,
          maNhom: "GP07",
        },
      });
      return res.data.content;
    } catch (error) {}
  }
);

export const fetchTheaterGroupAction = createAsyncThunk(
  "home/fetchTheaterGroup",
  async (idTheater) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinCumRapTheoHeThong",
        method: "GET",
        params: {
          maHeThongRap: idTheater,
        },
      });
      return res.data.content;
    } catch (error) {}
  }
);
