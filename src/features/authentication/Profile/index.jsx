import React, { useEffect } from "react";
import {
  FileTextOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import instance from "api/instance";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import {
  fetchProfileAction,
  fetchUpdateProfileAction,
  signUpAction,
} from "../utils/authAction";
import Swal from "sweetalert2";

const schema = yup.object({
  matKhau: yup
    .string()
    .required("*Bạn chưa sửa trường này !")
    .min(6, "*Mật khẩu phải từ 6 đến 14 kí tự"),
  hoTen: yup
    .string()
    .required("*Bạn chưa sửa trường này !")
    .matches(/^[A-Za-z ]+$/g, "*Họ tên không đúng"),
  soDt: yup
    .string()
    .typeError("*Số điện thoại không đúng !")
    .min(6, "*Số điện thoại phải lớn hơn 8 kí tự !")
    .required("*Trường này bắt buộc nhập !"),
});

function Profile() {
  const dispatch = useDispatch();

  const history = useHistory();
  const goBack = () => {
    history.push("/");
  };

  const selectedUser = useSelector((state) => state.auth.profile);
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
  });

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
    },
    onSubmit: (user) => {
      updateAlert();
      const newUser = {
        ...user,
        taiKhoan: selectedUser.taiKhoan,
        email: selectedUser.email,
        maNhom: "GP03",
        maLoaiNguoiDung: "KhachHang",
      };

      updateUser(newUser);
    },

    validationSchema: schema,
  });

  const updateUser = (user) => {
    dispatch(fetchUpdateProfileAction(user));
  };

  useEffect(() => {
    if (!selectedUser) return;

    setUser(selectedUser);
  }, [selectedUser, user]);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const updateAlert = () => {
    Swal.fire({
      title: "Bạn có muốn cập nhật không ?",
      text: "Nếu cập nhật, thông tin cũ sẽ thay đổi !",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy",
      confirmButtonText: "Cập nhật!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cập nhật thành công !",
          text: "Hãy xem lại thông tin cá nhân của bạn!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="Profile">
      <div className="container">
        <div className="content-info" style={{ backgroundColor: "#84d2f6" }}>
          <h3 style={{ backgroundColor: "#41e2ba" }}>Thông tin cá nhân</h3>
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="">Tài khoản:</label>
              <Input
                name="taiKhoan"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleChange(e);
                }}
                onBlur={formik.handleBlur}
                className="input"
                type="text"
                placeholder="Username"
                prefix={<UserOutlined style={{ marginRight: 8 }} />}
                value={user.taiKhoan}
                disabled
              />
              {formik.touched.taiKhoan && formik.errors.taiKhoan && (
                <p className="errorText">{formik.errors.taiKhoan}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="">Mật khẩu:</label>
              <Input
                name="matKhau"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleChange(e);
                }}
                onBlur={formik.handleBlur}
                className="input"
                type="text"
                placeholder="Password"
                prefix={<LockOutlined style={{ marginRight: 8 }} />}
                value={user.matKhau}
              />
              {formik.touched.matKhau && formik.errors.matKhau && (
                <p className="errorText">{formik.errors.matKhau}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="">Họ tên:</label>
              <Input
                name="hoTen"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleChange(e);
                }}
                onBlur={formik.handleBlur}
                className="input"
                type="text"
                placeholder="FullName"
                prefix={<FileTextOutlined style={{ marginRight: 8 }} />}
                value={user.hoTen}
              />
              {formik.touched.hoTen && formik.errors.hoTen && (
                <p className="errorText">{formik.errors.hoTen}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="">Email:</label>
              <Input
                name="email"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleChange(e);
                }}
                onBlur={formik.handleBlur}
                className="input"
                type="text"
                placeholder="Email"
                prefix={<MailOutlined style={{ marginRight: 8 }} />}
                value={user.email}
                disabled
              />
              {formik.touched.email && formik.errors.email && (
                <p className="errorText">{formik.errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="">Số điện thoại:</label>
              <Input
                name="soDt"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleChange(e);
                }}
                onBlur={formik.handleBlur}
                className="input"
                type="text"
                placeholder="Phone"
                prefix={<UserOutlined style={{ marginRight: 8 }} />}
                value={user.soDt}
              />
              {formik.touched.soDt && formik.errors.soDt && (
                <p className="errorText">{formik.errors.soDt}</p>
              )}
            </div>

            <div className="btn-handle">
              <Button htmlType="submit" type="primary" className="btn-submit">
                Cập nhật
              </Button>

              <Button onClick={goBack} type="default" className="btn-back">
                Trở về
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
