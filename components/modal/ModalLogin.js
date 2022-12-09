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
import Password from "antd/lib/input/Password";
import ModalLoginSuccess from "./ModalLoginSuccess";
import { data } from "autoprefixer";





// eslint-disable-next-line react/display-name
const ModalLogin = forwardRef((props, ref) => {
  const formRef = useRef();
  const modalForgotPasswordRef = useRef();
  
  const modalLoginSuccessRef = useRef();


  const [isOpen, setIsOpen] = useState(false);
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

  const loginSuccess = () => toast("Xóa hồ sơ thành công!");


  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await userService.login(username, password);

      if (data.statusCode === 200) {
        setIsOpen(false);
       
        setTimeout(() => {
          modalLoginSuccessRef.current.open();
        }, 100);
    
      }
  
    
      setErrorMessages({
        isError: false,
        message: data.messsage,
        
      });

      localStorage.setItem("jwttoken", data.jwttoken);
      localStorage.setItem("iddb", data.iddb);
      localStorage.setItem("idcustomer", data.idcustomer);
     
    

      setTimeout(() => {
        setErrorMessages({});
        setIsOpen(false);
        Router.reload(window.location.pathname);

  

      }, 500);
    } catch (err) {
      setErrorMessages({
        isError: true,
        message: "Tài khoản hoặc mật khẩu không chính xác!",
      });
      return;
    }
  };

  //hiện mật khẩu ô input
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="absolute left-1  top-0">
      <Modal
        classes="  px-2 py-2 h-50 rounded bg-white bg-[#17384e] "
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={() => formRef.current.submitForm()}
        onDiscard={() => console.log("Button discard")}
        buttons={[
          {
            role: "confirm",
            toClose: false,
            classes:
              "bg-[#ff7010] px-6 py-2 rounded-lg hover:bg-[#031d2e] transition-all duration-200 mr-[35%] mb-5 text-white",
            label: "Đăng nhập",
          },
        ]}
        {...props}
      >
        <div className="flex flex-row justify-center">
          <span className=" text-white w-1/3 text-2xl flex flex-row justify-center border-b-2 border-[#ff7010] ">
            Đăng Nhập
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
          initialValues={{ username: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Vui lòng nhập tên đăng nhập";
            }

            if (!values.password) {
              errors.password = "Vui lòng nhập mật khẩu";
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
                  *{" "}
                  <div className="flex flex-row justify-center mx-auto">
                    {errors.username && touched.username && errors.username}
                  </div>
                </div>
                <div className=" rounded ">
                  <input
                    className="p-3 rounded w-full outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Tài khoản"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[#ff7010] flex flex-row">
                  *{" "}
                  <div className="flex flex-row justify-center mx-auto">
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>
                <div className="rounded">
                  <input
                    class="p-3 rounded w-full outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                    name="password"
                    //cho hiện mật khẩu
                    type={"password"}
                    placeholder="Mật khẩu"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <a
                  className="cursor-pointer text-white hover:underline hover:text-[#ff7010]"
                  onClick={() => {
                    setIsOpen(false);
                    modalForgotPasswordRef.current.open();
                  }}
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>
          )}
        </Formik>
      </Modal>
      <ModalForgotPassword ref={modalForgotPasswordRef} />
      <ModalLoginSuccess ref={modalLoginSuccessRef} />
    </div>
  );
});

export default ModalLogin;
