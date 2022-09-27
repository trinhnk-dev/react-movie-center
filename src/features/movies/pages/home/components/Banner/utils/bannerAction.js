import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

export const fetchBannerAction = createAsyncThunk(
  "home/fetchBanner",
  async () => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayDanhSachBanner",
        method: "GET",
      });
      return res.data.content;
    } catch (err) {
      console.log(err);
    }
  }
);
