import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import Modal from "../modal";
import { userService } from "../../services/UserService";
import { Button } from "flowbite-react";
import Router from "next/router";

// eslint-disable-next-line react/display-name
const ModalRating = forwardRef((id, ref, handleClose) => {
  const modalMapRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [dataForm, setDataForm] = useState({});

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  const onSubmit = async (data) => {
    try {
      let dataPost = {
        ...data,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
      };

      await userService.profileUpdate(dataPost, id.id.id);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleConfirm = () => {
    (async () => {
      const data = await userService.postVnPay(
        localStorage.getItem("idcustomer"),

      );

      if (data.statusCode == 200) {
          Router.push("/");
      }
    })();
  };

  return (
    <div className="absolute top-0">
      <Modal
        classes="overflow-hidden max-w-full max-h-full w-2/3 h-auto p-4 bg-white rounded-lg "
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={handleClose}
        onDiscard={() => console.log("Button discard")}
      >
        <div className="flex justify-center">
          <p className="font-bold text-xl">Nạp tiền thành công</p>
       
        </div>

        <Button onClick={handleConfirm}>Xác Nhận</Button>
      </Modal>
    </div>
  );
});

export default ModalRating;
