import { useState, forwardRef, useImperativeHandle } from "react";

import Modal from "../modal";

const ModalRegister = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataForm, setDataForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={"Đăng ký tài khoản"}
      onConfirm={() => console.log("Button confirm")}
      onDiscard={() => console.log("Button discard")}
      buttons={[
        {
          role: "discard",
          toClose: true,
          classes:
            "bg-zinc-500/20 px-4 py-2 rounded-lg hover:bg-zinc-500/30 transition-all duration-200",
          label: "Hủy",
        },
        {
          role: "confirm",
          toClose: false,
          classes:
            "bg-indigo-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200",
          label: "Đăng ký",
        },
      ]}
      {...props}
    >
      <div className="flex flex-col gap-3">
        <div className="outline outline-blue-300 rounded">
          <input
            className="p-3 rounded w-full"
            type="text"
            placeholder="Tài khoản"
            onChange={(e) =>
              setDataForm({
                ...dataForm,
                username: e.currentTarget.value,
              })
            }
          />
        </div>
        <div className="outline outline-blue-300 rounded">
          <input
            className="p-3 rounded w-full"
            type="text"
            placeholder="Mật khẩu"
            onChange={(e) =>
              setDataForm({
                ...dataForm,
                password: e.currentTarget.value,
              })
            }
          />
        </div>
        <div className="outline outline-blue-300 rounded ">
          <input
            className="p-3 rounded w-full"
            type="text"
            placeholder="Địa chỉ email"
            onChange={(e) =>
              setDataForm({
                ...dataForm,
                email: e.currentTarget.value,
              })
            }
          />
        </div>
      </div>
    </Modal>
  );
});

export default ModalRegister;
