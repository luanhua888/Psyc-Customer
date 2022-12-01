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
import dayjs from "dayjs";

// eslint-disable-next-line react/display-name
const ModalDailyHorocop = forwardRef((id, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dayLy, setDaily] = useState([]);
  const [zodiacId, setZodiacId] = useState(0);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  return (
    <div className="absolute left-1 top-0 overflow-auto  ">
      <Modal
        classes="overflow-auto    max-h-[600px] max-w-[1024px]  rounded-lg  items-center justify-center bg-[#17384e] mb-[6%]"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDiscard={() => console.log("Button discard")}
        //màu discard 
        discardClasses="bg-white text-white hover:bg-[#ff7010] hover:text-[#07273c] "
      >
        <div className="flex flex-1 justify-center items-center">
          <p className=" text-[#ff7010] font-bold md:text-5xl pb-5 border-b-4 border-b-[#ff7010]">
            Lá Phiếu Tử Vi
          </p>
        </div>
        <div className="flex flex-col justify-center items-center text-[#ff7010] gap-4">
          <Image
            loader={() => id.id.imageUrl}
            src={profileAvatar}
            alt=""
            height={200}
            width={200}
          />

          <h1 className="text-xl">{`${dayjs(id.id.date).format(
            "DD/MM/YYYY"
          )}`}</h1>
          <p
            className="text-[] md:w-2/3"
            style={{
              // căn đều chữ
              textAlign: "justify",
              // cách 2 bên 10px
              textJustify: "inter-word",
            }}
          >
            {id.id.context}
          </p>
          <p
            className="md:w-2/3"
            style={{
              // căn đều chữ
              textAlign: "justify",
            }}
          >
            <span className="text-white">Công Việc: </span> {id.id.job}
          </p>
          <p className="md:w-2/3">
            <span className="text-white">Con số may mắn của bạn: </span>{" "}
            {id.id.luckyNumber}
          </p>
          <p className="md:w-2/3">
            <span className="text-white">Thời gian tốt trong ngày: </span>{" "}
            {id.id.goodTime}
          </p>
          <p className="md:w-2/3">
            <span className="text-white">Màu may mắn: </span> {id.id.color}
          </p>
          <p className="md:w-2/3">
            <span className="text-white">Những điều nên làm: </span>{" "}
            {id.id.shouldThing}
          </p>
          <p className="md:w-2/3">
            <span className="text-white">Những điều không nên làm: </span>{" "}
            {id.id.shouldNotThing}
          </p>
        </div>
      </Modal>
    </div>
  );
});

export default ModalDailyHorocop;
