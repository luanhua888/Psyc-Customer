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
  const ModalLoginSuccess = forwardRef((id, ref) => {
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
          classes="overflow-hidden max-w-full max-h-full w-auto h-auto p-4 bg-white rounded-lg  items-center justify-center bg-[#17384e]"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onDiscard={() => console.log("Button discard")}
        >
          <div>
            <div className="flex flex-col items-center justify-center">
              <Image src={successIcon} alt="" width={50} height={50} />
              <p className="text-2xl font-bold text-center mt-4">
                Đăng nhập thành công
              </p>
            </div>
          </div>
        </Modal>
      </div>
    );
  });
  
  export default ModalLoginSuccess;
  