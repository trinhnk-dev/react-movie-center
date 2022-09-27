import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as yup from "yup";
import { signInAction } from "../utils/authAction";
import Swal from "sweetalert2";

const schema = yup.object({
  taiKhoan: yup.string().required("*Trường này bắt buộc nhập ! "),
  matKhau: yup.string().required("*Trường này bắt buộc nhập ! "),
});

function SignIn() {
  const history = useHistory();
  const goToSignUp = () => {
    history.push("/signup");
  };

  const goBackPage = () => {
    history.goBack();
  };

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      signIn(values);
    },
    validationSchema: schema,
  });

  const signIn = async (user) => {
    const data = await dispatch(signInAction(user));
    if (!data.payload) {
      Swal.fire({
        title: "Error!",
        text: "Sai tài khoản hoặc mật khẩu, vui lòng nhập lại !",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else {
      // alert("Đăng nhập thành công !");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Đăng nhập thành công !",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(goBackPage, 2000);
    }
  };

  return (
    <div
      className="SignIn"
      style={{
        backgroundImage: "url(/bg/bgSignin.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        objectFit: "cover",
      }}
    >
      <div className="content-signin">
        <h1 className="title">Đăng nhập</h1>
        <UserOutlined className="icon-user" />

        <form onSubmit={formik.handleSubmit} className="form">
          <Input
            name="taiKhoan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input"
            type="text"
            placeholder="Tài khoản"
            prefix={<UserOutlined style={{ marginRight: 8 }} />}
          />

          {formik.touched.taiKhoan && formik.errors.taiKhoan && (
            <p className="errorText">{formik.errors.taiKhoan}</p>
          )}

          <Input
            name="matKhau"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input"
            type="password"
            placeholder="Mật khẩu"
            prefix={<LockOutlined style={{ marginRight: 8 }} />}
          />
          {formik.touched.matKhau && formik.errors.matKhau && (
            <p className="errorText">{formik.errors.matKhau}</p>
          )}

          <div className="remember">
            <Checkbox>Lưu thông tin</Checkbox>
            <span className="forgot-password">Quên mật khẩu ?</span>
          </div>

          <Button
            className="btn-signin"
            htmlType="submit"
            loading={isLoading}
            style={{ backgroundColor: "#59cd90" }}
          >
            Đăng nhập
          </Button>
        </form>

        <div className="signup-tips">
          <p>Chưa có tài khoản ?</p>
          <div
            className="btn-signup"
            onClick={goToSignUp}
            style={{ width: "80%", fontWeight: "600" }}
          >
            Tạo mới tài khoản ngay
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
