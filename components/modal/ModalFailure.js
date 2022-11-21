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
import failureIcon from "../../public/photos/icon/timeout.png";
import { slotBookingService } from "../../services/SlotBookingService";

// eslint-disable-next-line react/display-name
const ModalFailure = forwardRef((id, ref) => {
  const [isOpen, setIsOpen] = useState(false);

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
        onDiscard={() => console.log("Button discard")}
      >
        <div>
          <div className="flex flex-col items-center justify-center">
            <Image src={failureIcon} alt="" width={50} height={50} />
            <p className="text-2xl font-bold text-center mt-4">
              Thời gian thanh toán đã hết hạn
            </p>
          </div>

          <div className="flex flex-row items-center justify-center mt-4 gap-2">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full "
              onClick={() => {
                setIsOpen(false);
                Router.reload();
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default ModalFailure;
