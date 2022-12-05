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
const ModalVoteRate = forwardRef((bookingId, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  console.log("id", bookingId.id);

  // chọn sao đánh giá cho cuộc hẹn đã hoàn thành
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const [errorMessages, setErrorMessages] = useState({
    isError: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsSubmit(true);

      if (localStorage.getItem("jwttoken")) {
        const data = await slotBookingService.postVoteStar(
          bookingId.id,
          comment.toString(),
          rating
        );

        if (data.statusCode == 200) {
          setIsOpen(false);
        }
      }
    } catch (error) {
      setErrorMessages({
        isError: true,
        message: "Cuộc hẹn này đã được đánh giá",
      });
    }
  };

  // khi chọn sao đánh giá ở input radio thì set giá trị cho rating
  const handleRatingClick = (e) => {
    setRating(e.target.value);
  };

  return (
    <div className="absolute top-0">
      <Modal
        title="Đánh giá cuộc hẹn"
        classes="overflow-hidden max-w-full max-h-full w-auto h-auto p-4 bg-white rounded-lg  items-center justify-center"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDiscard={() => console.log("Button discard")}
      >
        {/* vote rate modal icon star*/}
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="rating">
            <input
              type="radio"
              name="rating-2"
              value={1}
              className="mask mask-star-2 bg-orange-400"
              onClick={handleRatingClick}
            />
            <input
              type="radio"
              name="rating-2"
              value={2}
              className="mask mask-star-2 bg-orange-400"
              onClick={handleRatingClick}
            />
            <input
              type="radio"
              name="rating-2"
              value={3}
              className="mask mask-star-2 bg-orange-400"
              onClick={handleRatingClick}
            />
            <input
              type="radio"
              name="rating-2"
              value={4}
              className="mask mask-star-2 bg-orange-400"
              onClick={handleRatingClick}
            />
            <input
              type="radio"
              name="rating-2"
              value={5}
              className="mask mask-star-2 bg-orange-400"
              onClick={handleRatingClick}
            />
          </div>
          {errorMessages.isError && (
            <div className="text-red-500 text-sm">{errorMessages.message}</div>
          )}

          <div>
            <textarea
              className="w-80 h-20 border-2 border-gray-300 rounded-lg"
              placeholder="Nhập bình luận của bạn"
              onChange={handleComment}
            />
          </div>
          <div className="flex flex-row items-center justify-center">
            <button
              className="w-80 h-10 bg-[#17384e] rounded-lg text-white"
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
