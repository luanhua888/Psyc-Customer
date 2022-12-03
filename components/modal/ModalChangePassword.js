import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import Router from "next/router";

import Modal from "../modal";

import { userService } from "../../services/UserService";
import { Formik } from "formik";
import ModalForgotPassword from "./ModalForgotPassword";
import { Link } from "@mui/material";

// eslint-disable-next-line react/display-name
const ModalChangePassword = forwardRef((props, ref) => {
  const formRef = useRef();
  const modalForgotPasswordRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const [errorMessages, setErrorMessages] = useState({
    isError: false,
    message: "",
  });

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  useEffect(() => {
    return () => {
      setErrorMessages({
        isError: false,
        message: "",
      });
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const data = await userService.profile(localStorage.getItem("iddb"));

        if (data.statusCode == 200) {
          setUser(data.data[0]);
        }
      }
    })();
  }, []);


 

  const onSubmit = async (values) => {
    const { userName, oldPassword, newPassword, currentPass } = values;

    try {
      const data = await userService.changePasswordAlLogin(
        user.userName,
        oldPassword,
        newPassword,
      );

    } catch (err) {
    
      return;
    }
  };

  return (
    <div className="absolute left-1 top-0">
      <Modal
        classes="  px-2 py-2 h-50 rounded bg-white bg-[#17384e]"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={() => formRef.current.submitForm()}
        onDiscard={() => console.log("Button discard")}
        buttons={[
          {
            role: "confirm",
            toClose: false,
            classes:
              "bg-[#ff7010] px-6 py-2 rounded-lg hover:bg-[#ff7010] transition-all duration-200 mr-[35%] mb-5 text-white",
            label: "Đổi mật khẩu",
          },
        ]}
        {...props}
      >
        <div className="flex flex-row justify-center">
          <span className=" text-[white] w-2/3 text-2xl flex flex-row justify-center border-b-2 border-[#ff7010] ">
            Đổi Mật Khẩu
          </span>
        </div>
        {errorMessages.message && (
          <div
            className={`flex justify-center items-center mb-3 font-medium ${
              errorMessages.isError ? "text-[#ff7010]" : "text-blue-500"
            }`}
          >
            {errorMessages.message}
          </div>
        )}
        <Formik
          innerRef={formRef}
          initialValues={{
            userName: "",
            oldPassword: "",
            newPassword: "",
            currentPass: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.oldPassword) {
              errors.oldPassword = "Vui lòng nhập mật khẩu cũ";
            }

            if (!values.newPassword) {
              errors.newPassword = "Vui lòng nhập mật khẩu mới";
            }

            if (!values.currentPass) {
              errors.currentPass = "Vui lòng nhập lại mật khẩu mới";
            }

            if (
              values.currentPass != "" &&
              values.newPassword !== values.currentPass
            ) {
              errors.newPassword = "Mật khẩu không trùng khớp";
            }

            if (
              values.currentPass != "" &&
              values.newPassword !== values.currentPass
            ) {
              errors.currentPass = "Mật khẩu không trùng khớp";
            }

            return errors;
          }}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <div className="flex flex-col gap-5 mt-5">
              <div className="flex flex-col gap-1">
                <div className="text-[#ff7010] flex flex-row">
                  <div className="flex flex-row justify-center mx-auto">
                    {errors.userName && touched.userName && errors.userName}
                  </div>
                </div>
                <div className=" rounded ">
                  <input
                    className="p-3 rounded w-full  outline outline-[#455f71]  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="Tài khoản"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={user.userName}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[#ff7010] flex flex-row">
                  *{" "}
                  <div className="flex flex-row justify-center mx-auto">
                    {errors.oldPassword && touched.oldPassword && errors.oldPassword}
                  </div>
                </div>
                <div className="rounded">
                  <input
                    className="p-3 rounded w-full  outline outline-[#455f71]  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                    name="oldPassword"
                    type="password"
                    placeholder="Mật khẩu Cũ"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.oldPassword}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-[#ff7010] flex flex-row">
                  *{" "}
                  <div className="flex flex-row justify-center mx-auto">
                    {errors.newPassword && touched.newPassword && errors.newPassword}
                  </div>
                </div>
                <div className="rounded">
                  <input
                    className="p-3 rounded w-full  outline outline-[#455f71]  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                    name="newPassword"
                    type="password"
                    placeholder="Mật khẩu Mới"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPassword}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-[#ff7010] flex flex-row">
                  *{" "}
                  <div className="flex flex-row justify-center mx-auto">
                    {errors.currentPass &&
                      touched.currentPass &&
                      errors.currentPass}
                  </div>
                </div>
                <div className="rounded">
                  <input
                    className="p-3 rounded w-full  outline outline-[#455f71]  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                    name="currentPass"
                    type="password"
                    placeholder="Nhập lại mật khẩu Mới"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.currentPass}
                  />
                </div>
              </div>
            </div>
          )}
        </Formik>
      </Modal>
      <ModalForgotPassword ref={modalForgotPasswordRef} />
    </div>
  );
});

export default ModalChangePassword;
