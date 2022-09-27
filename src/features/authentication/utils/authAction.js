import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

export const signUpAction = createAsyncThunk("auth/signUp", async (user) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyNguoiDung/DangKy",
      method: "POST",
      data: user,
    });
    return res.data.content;
  } catch (err) {
    console.log(err);
  }
});

export const signInAction = createAsyncThunk("auth/signIn", async (user) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyNguoiDung/DangNhap",
      method: "POST",
      data: user,
    });

    const profile = { ...res.data.content };

    delete profile.accessToken;

    localStorage.setItem("token", res.data.content.accessToken);
    localStorage.setItem("login", true);

    return profile;
  } catch (err) {}
});

export const fetchProfileAction = createAsyncThunk(
  "auth/fetchProfile",
  async () => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        method: "POST",
      });

      return res.data.content;
    } catch (err) {}
  }
);

export const fetchUpdateProfileAction = createAsyncThunk(
  "auth/updateProfile",
  async (user) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "PUT",
        data: user,
      });

      return res.data.content;
    } catch (err) {
      console.log("khong thanh cong");
    }
  }
);
