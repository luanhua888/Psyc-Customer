import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import Router from "next/router";

import MapPicker from "../map/MapPicker";
import Modal from "../modal";
import Image from "next/image";
import profileAvatar from "../../public/photos/profile-avatar.png";
import { userService } from "../../services/UserService";
import successIcon from "../../public/photos/icon/Success.png";
import { slotBookingService } from "../../services/SlotBookingService";

// eslint-disable-next-line react/display-name
const ModalVoteRate = forwardRef((id, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  // chọn sao đánh giá cho cuộc hẹn đã hoàn thành
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    console.log("rating", rating);
    console.log("comment", comment);
  };

  return (
    <div className="absolute top-0">
      <Modal
        classes="overflow-hidden max-w-full max-h-full w-auto h-auto p-4 bg-white rounded-lg  items-center justify-center"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDiscard={() => console.log("Button discard")}
      >
        {/* vote rate modal icon star*/}
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row items-center justify-center">
              <input
                type="radio"
                name="rating"
                value="1"
                onClick={handleRating}
              />
              <label>1</label>
            </div>

            <div className="flex flex-row items-center justify-center">
              <input
                type="radio"
                name="rating"
                value="2"
                onClick={handleRating}
              />
              <label>2</label>
            </div>

            <div className="flex flex-row items-center justify-center">
              <input
                type="radio"
                name="rating"
                value="3"
                onClick={handleRating}
              />
              <label>3</label>
            </div>

            <div className="flex flex-row items-center justify-center">
             {/* hiển thị icon ngôi sao */}
             
             
              <input
                type="radio"
                name="rating"
                value="4"
                onClick={handleRating}
                

              />
              <label>4</label>
            </div>

            <div className="flex flex-row items-center justify-center">
              <input
                type="radio"
                name="rating"
                value="5"
                onClick={handleRating}
              />
              <label>5</label>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <textarea
              className="w-80 h-20 border-2 border-gray-300 rounded-lg"
              placeholder="Nhập bình luận của bạn"
              onChange={handleComment}
            />
          </div>
          <div className="flex flex-row items-center justify-center">
            <button
              className="w-80 h-10 bg-blue-500 rounded-lg text-white"
              onClick={handleSubmit}
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default ModalVoteRate;
