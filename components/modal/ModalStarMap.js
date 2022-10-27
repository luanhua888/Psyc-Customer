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

// eslint-disable-next-line react/display-name
const ModalStarMap = forwardRef((id, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [supProfile, setSupProfile] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  return (
    <div className="absolute top-0">
      <Modal
        classes="overflow-hidden max-w-full max-h-full w-auto h-auto p-4 bg-white rounded-lg  items-center justify-center"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"BẢN ĐỒ SAO"}
        onDiscard={() => console.log("Button discard")}
      >
       
          <div  className="w-auto h-auto relative  top-1/2 mt-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              loader={() => id.id}
              src={profileAvatar}
              alt=""
            />
           
          </div>
    
      </Modal>
    </div>
  );
});

export default ModalStarMap;
