import {
  CommentOutlined,
  DislikeOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useLocalStorage from "common/hooks/useLocalStorage";
import { formatDate, getCurrentDay, getDayMonthYear } from "common/utils/date";
import { formatName, upperCaseFirst } from "common/utils/formatName";
import { getRandomColor } from "common/utils/randomColor";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function UserComment() {
  const [comment, setComment] = useLocalStorage("commentList");
  const user = useSelector((state) => state.auth.profile);
  const commentContent = useRef(null);
  const history = useHistory();

  useEffect(() => {
    setComment(commentList);
  }, []);

  const onButtonClick = () => {
    if (user) {
      const newCommentList = [...comment];
      const newId = newCommentList.length + 1;
      const currentTime = getCurrentDay();
      const newComment = {
        id: newId,
        name: user.hoTen,
        comment: commentContent.current.value,
        time: currentTime,
        movieId: `m${newId}`,
      };
      newCommentList.unshift(newComment);
      setComment(newCommentList);
    } else {
      warningBox();
    }
  };

  const commentList = [
    {
      id: 1,
      name: "Trần Hưng",
      comment:
        "Phim tạm được , thời lượng dài nên cảm thấy hơi bị lan man, trong khi câu chuyện cũng đơn giản dễ hiểuu và k có cao trào nhiềuu, dc cái nhạc, bối cảnh , diễn viên ok ",
      time: "20/9/2022",
      movieId: "m1",
    },
    {
      id: 2,
      name: "Huy Phong",
      comment:
        "Một bộ phim hài - lãng mạn kết hợp với yếu tố lịch sử và ẩn giấu trong đó là phẩm cách con người (người tốt, kẻ xấu). Nhạc phim hay, mê mẩn luôn ròii Mỗi nhân vật",
      time: "19/9/2022",
      movieId: "m2",
    },
    {
      id: 3,
      name: "Nguyễn Văn Tài",
      comment:
        "Phim nhiều nút thắt, cách giải quyết hợp lý, chi tiết gây cười và lãng mạn hoà lẫn nên ko tạo cảm giác chán nản dù phim dài ",
      time: "18/9/2022",
      movieId: "m3",
    },
  ];

  const warningBox = () => {
    Swal.fire({
      title: "Bạn chưa đăng nhập?",
      text: "Không thể bình luận khi chưa đăng nhập!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f45b69",
      cancelButtonColor: "#84d2f6",
      cancelButtonText: "Hủy",
      confirmButtonText: "Đăng nhập!",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/signin");
      }
    });
  };

  const renderUserInfo = () => {
    if (!user) {
      return <span>Bạn chưa đăng nhập !</span>;
    } else {
      return (
        <div className="user-render">
          <UserOutlined className="user-icon" />
          <span className="user-name">{user.taiKhoan}</span>
        </div>
      );
    }
  };

  return (
    <div className="Comment">
      <div className="form-body">
        <div className="title-content">
          <span>
            <CommentOutlined style={{ fontSize: 25 }} />
          </span>
          <span>BÌNH LUẬN</span>
        </div>

        <textarea
          ref={commentContent}
          type="textarea"
          className="text-box"
          rows="3"
          placeholder="Ý kiến của bạn..."
        />
      </div>

      <div className="form-bottom">
        <div className="user-info">{renderUserInfo()}</div>
        <button onClick={onButtonClick} type="button" className="btn-post">
          Gửi bình luận{" "}
        </button>
      </div>

      <h2>Tất cả bình luận</h2>

      {comment?.map((item) => {
        return (
          <div key={item.id} className={`comment-item item-${item.id}`}>
            <div className="left">
              <div
                className="icon"
                style={{ backgroundColor: getRandomColor() }}
              >
                {upperCaseFirst(formatName(item.name))}
              </div>
            </div>
            <div className="right">
              <div className="top">{item.name}</div>
              <div className="body">{item.comment}</div>
              <div className="bottom">
                <div className="time">{item.time}</div>
                <div className="box-reply">
                  <span className="icon">
                    <LikeOutlined />
                    28
                  </span>
                  <span className="icon">
                    <DislikeOutlined />
                    14
                  </span>
                  <span className="icon">
                    <CommentOutlined />
                    10
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserComment;
