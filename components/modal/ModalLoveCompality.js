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
import Paragraph from "antd/lib/typography/Paragraph";

// eslint-disable-next-line react/display-name
const ModalLoveCompality = forwardRef((love, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [supProfile, setSupProfile] = useState(false);

  console.log("love", love);
  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  return (
    <div className="absolute top-10 z-50">
      <Modal
        classes="overflow-auto max-w-full max-h-full w-[90%]  h-[80%]  bg-white rounded-lg  items-center justify-center bg-[#17384e]"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDiscard={() => console.log("Button discard")}
        // màu của nút đóng modal ở góc trên bên phải chuyển thành màu trắng
        iconClose="bg-white"

      >
        <div className="flex flex-row justify-center">
          <span className=" text-white  text-3xl flex flex-row justify-center mb-2 border-b-2 border-[#ff7010] ">
            Tương Thích Với Hộ Sơ Phụ
          </span>
        </div>
        <div className="flex flex-col justify-between items-center text-xl px-[10%]">
          <div className="text-[#ff7010]">Tỉ lệ hợp giữa {love.name} và {love.supName} là {love.love.compatibility}</div>
          <Paragraph>
            <div
              dangerouslySetInnerHTML={{ __html: love.love.zodiaccustomer }}
              // căn đều 2 bên
              style={{ textAlign: "justify" }}
             
             
            />
          </Paragraph>
        </div>
      </Modal>
    </div>
  );
});

export default ModalLoveCompality;
