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
const ModalSuccess = forwardRef((id, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [supProfile, setSupProfile] = useState(false);

  const postBookingSlot = async () => {
    slotBookingService.postBooking(
      id.id,
      localStorage.getItem("idcustomer"),
      id.consultantId
    );
  };
  console.log("id", id);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
      postBookingSlot();
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
            <Image src={successIcon} alt="" width={50} height={50} />
            <p className="text-2xl font-bold text-center mt-4">
              Đặt lịch thành công
            </p>
            <p className="text-base text-center mt-2">
              Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
            </p>
          </div>

          <div className="flex flex-row items-center justify-center mt-4 gap-2">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {
                setIsOpen(false);
                Router.push("/historyBooking");
              }}
            >
              Xem lịch sử
            </button>
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

export default ModalSuccess;
