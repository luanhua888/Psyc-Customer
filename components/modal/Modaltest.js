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
  const Modaltest = forwardRef((bookingId, ref) => {
    const [isOpen, setIsOpen] = useState(false);
  
    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
    }));
  
    console.log("id",bookingId.id);
  
  
    return (
      <div className="absolute top-0">
        <Modal
            title="Đánh giá cuộc hẹn"
          classes="overflow-hidden max-w-full max-h-full w-auto h-auto p-4 bg-white rounded-lg  items-center justify-center"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onDiscard={() => console.log("Button discard")}
        >
         
        </Modal>
      </div>
    );
  });
  
  export default Modaltest;
  