import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  HomeOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import instance from "api/instance";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAction } from "features/authentication/utils/authAction";
import logoHeader from "../../../assets/img/icon/logo-header.jpg";
import Swal from "sweetalert2";

const Header = () => {
  const [current, setCurrent] = useState("");
  const dispatch = useDispatch();

  const history = useHistory();
  const goToSignIn = () => {
    history.push("/signin");
  };
  const goToProfile = () => {
    history.push("/profile");
  };
  const goToHome = () => {
    history.push("/");
  };

  const logout = () => {
    Swal.fire({
      title: "Bạn có chắc sẽ đăng xuất không ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f45b69",
      cancelButtonColor: "#84d2f6",
      cancelButtonText: "Hủy",
      confirmButtonText: "Đăng xuất!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đăng xuất thành công !",
          showConfirmButton: false,
          timer: 1500,
        });

        localStorage.removeItem("token");
        localStorage.removeItem("login");

        dispatch(fetchProfileAction({ payload: null }));
        goToHome();
      }
    });
  };

  const onClick = (e) => {
    setCurrent(e.key);
    if (e.key === "sub-1") {
      goToHome();
    }
    if (e.key === "5") {
      goToSignIn();
    }
    if (e.key === "profile-1") {
      goToProfile();
    }
    if (e.key === "6") {
      logout();
    }
  };

  const items = [
    {
      label: "Trang chủ",
      key: "sub-1",
      icon: <HomeOutlined />,
    },
    {
      label: "Tin tức",
      key: "sub-2",
      icon: <NotificationOutlined />,
    },
    {
      label: "Đăng Nhập",
      key: "sub-3",
      icon: <UserOutlined />,
      children: [
        {
          label: "Đăng Nhập",
          key: "5",
        },
      ],
    },
  ];

  const formatName = (name) => {
    let newName = name.trim();
    for (let i = newName.length; i > 0; i--) {
      if (newName[i] === " ") {
        return newName.slice(i + 1, newName.length);
      }
    }
    return newName;
  };

  function upperCaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const userProfile = useSelector((state) => state.auth.profile);
  const renderUserInfo = () => {
    if (userProfile) {
      items[2].label = `Hi,  ${upperCaseFirst(formatName(userProfile.hoTen))}`;
      items[2].children[0] = {
        label: "Thông tin cá nhân",
        key: "profile-1",
      };

      items[2].children[1] = {
        label: "Đăng Xuất",
        key: "6",
      };
    }
  };

  return (
    <Layout
      className="Header"
      style={{ display: "block", backgroundColor: "#fff" }}
    >
      <div className="container">
        <Layout.Header className="navbar">
          <div className="left">
            <div className="logo" onClick={goToHome}>
              <img src={logoHeader} alt=""></img>
              <h1>Movies Center</h1>
            </div>
          </div>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            className="right"
            items={items}
          />
          {renderUserInfo()}
        </Layout.Header>
      </div>
    </Layout>
  );
};

export default Header;
