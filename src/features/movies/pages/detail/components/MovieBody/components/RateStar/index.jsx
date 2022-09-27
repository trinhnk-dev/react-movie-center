import { Button, Modal, Rate } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function RateStar(props) {
  const selectedMovie = props.selectedMovie;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="RateStar">
      <div className="movie-rate">
        <div className="title">Xếp loại</div>
        <Rate allowHalf defaultValue={selectedMovie.danhGia / 2} />
        <div className="btn-rate">
          <Button danger onClick={showModal}>
            Xem đánh giá
          </Button>
          <Modal
            title="Tất cả bình luận"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Comment 1...</p>
            <p>Comment 1...</p>
            <p>Comment 1...</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default RateStar;
