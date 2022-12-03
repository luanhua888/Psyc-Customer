import { Formik } from "formik";
import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { userService } from "../../services/UserService";

import Modal from "../modal";
import ModalLogin from "./ModalLogin";
import ModalMap from "../../components/modal/ModalMap";
import { Link, Skeleton } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import Loading from "react-loading";
import LoadIcon from "../../public/photos/icon/loader.png";

import Image from "next/image";
// eslint-disable-next-line react/display-name
const ModalRegister = forwardRef((props, ref) => {
  const modalMapRef = useRef();
  const handleOpenModalPickerChild = () => {
    modalMapRef.current?.open();
  };

  const handleOpenModalLogin = () => {
    setIsOpen(false);
    modalLoginRef.current.open();
  };
  const modalLoginRef = useRef();
  const formRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [dataForm, setDataForm] = useState({
    birthPlace: "",
    fullname: "",
    dob: "",
    email: "",
    longitude: "",
    latitude: "",
    gender: "",
   

  });

  console.log("data nè", dataForm);

  const [message, setMessage] = useState("");
  const [btnSubmitTitle, setBtnSubmitTitle] = useState("Đăng ký");
  const [isVerifyCode, setIsVerifyCode] = useState(false);

  const [errorMessagesFullName, setErrorMessagesFullName] = useState({
    isError: false,
    message: "",
  });

  const [errorMessagesUsername, setErrorMessagesUsername] = useState({
    isError: false,
    message: "",
  });

  const [errorMessagesEmail, setErrorMessagesEmail] = useState({
    isError: false,
    message: "",
  });

  const [errorMessagesPassword, setErrorMessagesPassword] = useState({
    isError: false,
    message: "",
  });

  const [errorMessagesConfirmPassword, setErrorMessagesConfirmPassword] =
    useState({
      isError: false,
      message: "",
    });

  const [errorMessagesBirthday, setErrorMessagesBirthday] = useState({
    isError: false,
    message: "",
  });

  const [errorMessagesBirthPlace, setErrorMessagesBirthPlace] = useState({
    isError: false,
    message: "",
  });

  const [errorMessagesLongitude, setErrorMessagesLongitude] = useState({
    isError: false,
    message: "",
  });

  const [errorMessagesLatitude, setErrorMessagesLatitude] = useState({
    isError: false,
    message: "",
  });

  const [messageVerify, setMessageVerify] = useState({
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

  const [loading, setloading] = useState(false);
  const createSuccess = () => toast("Tạo hồ sơ thành công!");

  const handleCreate = async () => {
    setloading(true);
    const data = await userService.PostSupProfile(
      dataForm.birthPlace,
      dataForm.fullname,
      dataForm.dob,
      dataForm.longitude.toString(),
      dataForm.latitude.toString(),
      dataForm.gender,
      localStorage.getItem("idcustomer")
    );
    if (data.statusCode == 201) {
      // createSuccess();
      // setIsOpen(false);
      setloading(false);
    } else {
      setMessage("Tạo thất bại");
    }

  };

  const onSubmit = async () => {
    if (isVerifyCode === false) {
      if (!dataForm.fullname) {
        setErrorMessagesFullName({
          isError: true,
          message: "Vui lòng nhập họ tên",
        });
      }
      if (!dataForm.username) {
        setErrorMessagesUsername({
          isError: true,
          message: "Vui lòng nhập tên đăng nhập",
        });
      }
      if (dataForm.email.indexOf("@") === -1) {
        setErrorMessagesEmail({
          isError: true,
          message: "Email không hợp lệ",
        });
      }

      if (dataForm.password === "") {
        setErrorMessagesPassword({
          isError: true,
          message: "Vui lòng nhập mật khẩu",
        });
      }
      //mật khẩu phải có ít nhất 6 ký tự và ít nhất 1 chữ hoa, 1 chữ thường, 1 số
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(
          dataForm.password
        ) &&
        dataForm.password !== ""
      ) {
        setErrorMessagesPassword({
          isError: true,
          message:
            "Mật khẩu phải có ít nhất 6 ký tự và ít nhất 1 chữ hoa, 1 chữ thường, 1 số",
        });
      }

      if (dataForm.dob === "") {
        setErrorMessagesBirthday({
          isError: true,
          message: "Vui lòng chọn ngày sinh",
        });
      }

      if (dataForm.birthPlace === "") {
        setErrorMessagesBirthPlace({
          isError: true,
          message: "Vui lòng nhập nơi sinh",
        });
      }

      //nếu tuôi nhỏ hơn 18 tuổi thì không được đăng ký
      if (dataForm.dob !== "") {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let age = year - dataForm.dob.split("-")[0];
        if (month < dataForm.dob.split("-")[1]) {
          age--;
        } else if (month == dataForm.dob.split("-")[1]) {
          if (day < dataForm.dob.split("-")[2]) {
            age--;
          }
        }
        if (age < 18) {
          setErrorMessagesBirthday({
            isError: true,
            message: "Bạn phải trên 18 tuổi để đăng ký",
          });
        }
      }
      //nếu thỏa mãn điều kiện  mới thực hiện isVerifyCode = true

      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let age = year - dataForm.dob.split("-")[0];
      if (month < dataForm.dob.split("-")[1]) {
        age--;
      } else if (month == dataForm.dob.split("-")[1]) {
        if (day < dataForm.dob.split("-")[2]) {
          age--;
        }
      }

      if (dataForm.dob && dataForm.birthPlace && age >= 18) {
        handleCreate();
      }
    }
  };

  return (
 
    <div className="absolute left-1 top-0 mt-[5%]">

      <Modal
        classes="overflow-hidden max-w-full max-h-full w-2/3 pb-5 mb-[15%] h-auto p-4 bg-white rounded-lg bg-[#17384e] "
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // title={"Đăng ký tài khoản"}
        onConfirm={
          isVerifyCode === false
            ? () => {
                onSubmit();
              }
            : () => {
                handleOnConfirm();
              }
        }
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
              "bg-[#ff7010] px-4 py-2 rounded-lg hover:bg-[#031d2e] transition-all duration-200",
            label: btnSubmitTitle,
          },
        ]}
        {...props}
      >
        <div className="flex flex-row items-center justify-center text-4xl pb-5">
          Đăng Kí Tài Khoản
        </div>
        <Formik
          innerRef={formRef}
          initialValues={{
            name: "",
            username: "",
            birthPlace: "",
            email: "",
            password: "",
            confirmPassword: "",
            gender: "",
            dob: "",
            longtidue: "",
            latitude: "",
          }}
          validate={(values) => {
            const errors = {};
            // if (!values.fullname) {
            //   errors.fullname = "Vui lòng nhập họ tên";
            // }
            // if (!values.username) {
            //   errors.username = "Vui lòng nhập tên đăng nhập";
            // }
            // // if (!values.email) {
            // //   errors.email = "Vui lòng nhập email";
            // // }
            // if (!values.password) {
            //   errors.password = "Vui lòng nhập mật khẩu";
            // }

            // if (values.password !== values.confirmPassword) {
            //   errors.confirmPassword = "Mật khẩu không khớp";
            // }

            // if (values.password.length < 6) {
            //   errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
            // }
            // //mật khẩu phải có ít nhất 1 ký tự đặc biệt, 1 chữ hoa, 1 chữ thường, 1 số
            // if (
            //   !/(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(
            //     values.password
            //   )
            // ) {
            //   errors.password =
            //     "Mật khẩu phải có ít nhất 1 ký tự đặc biệt, 1 chữ hoa, 1 chữ thường, 1 số";
            // }

            return errors;
          }}
          // onSubmit={(values, { handleOnConfirm }) => {

          //   setDataForm({
          //     fullname: values.fullname,
          //     email: values.email,
          //     username: values.username,
          //     password: values.password,
          //     confirmPassword: values.confirmPassword,
          //     dob: values.dob,
          //     birthPlace: values.birthPlace,
          //     longitude: values.longitude,
          //     latitude: values.latitude,
          //   });
          //   onSubmit();

          // }}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            
            <form onSubmit={handleSubmit}>
            {loading ? (
      <div className=" flex justify-center   ">
        <Image
         src={LoadIcon}
         alt = "loading"
          className="animate-spin"

        />
      </div>
  ) : (
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div className="flex flex-col mb-3">
                    <div className="flex flex-row gap-5">
                      <label className="mb-1 font-medium text-[#ff7010] w-1/3">
                        Họ và tên
                      </label>
                      <div className="w-full flex flex-row items-center justify-center">
                        {errorMessagesFullName.message && (
                          <div
                            className={`flex justify-center items-center  font-medium ${
                              errorMessagesFullName.isError
                                ? "text-[#ff7010]"
                                : "text-blue-500"
                            }`}
                          >
                            {errorMessagesFullName.message}
                          </div>
                        )}
                        {errors.fullname && touched.fullname && (
                          <div className="text-[#ff7010] font-medium ">
                            {errors.fullname &&
                              touched.fullname &&
                              errors.fullname}
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="text"
                      name="fullname"
                      className="p-3 rounded w-full outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                      onChange={(e) =>
                        setDataForm({
                          ...dataForm,
                          fullname: e.currentTarget.value,
                        })
                      }
                      onBlur={() =>
                        dataForm.fullname === ""
                          ? setErrorMessagesFullName({
                              isError: true,
                              message: "Vui lòng nhập họ tên",
                            })
                          : setErrorMessagesFullName({
                              isError: false,
                              message: "",
                            })
                      }
                      placeholder="Nhập họ tên"
                    />
                  </div>

                  <div className="flex flex-col mb-3">
                    <div className="flex flex-row gap-5">
                      <label className="mb-1 font-medium text-[#ff7010] w-1/3">
                        Ngày sinh
                      </label>
                      <div className="w-full flex flex-row items-center justify-center">
                        {errorMessagesBirthday.message && (
                          <div
                            className={`flex justify-center items-center  font-medium ${
                              errorMessagesBirthday.isError
                                ? "text-[#ff7010]"
                                : "text-[#ff7010]"
                            }`}
                          >
                            {errorMessagesBirthday.message}
                          </div>
                        )}

                        {errors.dob && touched.dob && (
                          <div className="text-[#ff7010] font-medium">
                            {errors.dob && touched.dob && errors.dob}
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="date"
                      name="confirmPassword"
                      className="p-3 rounded w-full outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                      onChange={(e) =>
                        setDataForm({
                          ...dataForm,
                          dob: e.currentTarget.value,
                        })
                      }
                      onBlur={() =>
                        dataForm.dob === ""
                          ? setErrorMessagesBirthday({
                              isError: true,
                              message: "Vui lòng chọn ngày sinh",
                            })
                          : setErrorMessagesBirthday({
                              isError: false,
                              message: "",
                            })
                      }
                    />
                  </div>

                  <div className="flex flex-col mb-3">
                    <div className="flex flex-row gap-5">
                      <label className="mb-1 font-medium text-[#ff7010] w-1/3">
                        Nơi sinh
                      </label>
                      <div className="w-full flex flex-row items-center justify-center">
                        {errorMessagesBirthPlace.message && (
                          <div
                            className={`flex justify-center items-center font-medium ${
                              errorMessagesBirthPlace.isError
                                ? "text-[#ff7010]"
                                : "text-[#286289]"
                            }`}
                          >
                            {errorMessagesBirthPlace.message}
                          </div>
                        )}
                        {errors.birthPlace && touched.birthPlace && (
                          <div className="text-[#ff7010] font-medium ">
                            {errors.birthPlace &&
                              touched.birthPlace &&
                              errors.birthPlace}
                          </div>
                        )}
                      </div>
                    </div>

                    <input
                      type="text"
                      readOnly
                      name="birthPlace"
                      className="p-3 rounded w-full outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                      onChange={(e) =>
                        setDataForm({
                          ...dataForm,
                          birthPlace: e.currentTarget.value,
                        })
                      }
                      onClick={handleOpenModalPickerChild}
                      onBlur={() =>
                        dataForm.birthPlace === ""
                          ? setErrorMessagesBirthPlace({
                              isError: true,
                              message: "Vui lòng nhập nơi sinh",
                            })
                          : setErrorMessagesBirthPlace({
                              isError: false,
                              message: "",
                            })
                      }
                      placeholder="Nhập nơi sinh"
                      value={dataForm.birthPlace}
                    />
                  </div>

                  <div>
                    <label
                      for="gender"
                      class="block mb-2 text-sm font-medium text-[#ff7010] dark:text-gray-400"
                    >
                      {}
                      Giới tính
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      class="p-3 rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                      onBlur={handleBlur}
                      // value={values.gender}
                      onChange={(e) => {
                        setDataForm({
                          ...dataForm,
                          gender: e.currentTarget.value,
                        });
                      }}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                    </select>
                  </div>

                  <div className=" grid-cols-2 gap-2 hidden">
                    <div className="flex flex-col mb-3">
                      <div className="flex flex-row gap-5">
                        <label className="mb-1 font-medium text-[#ff7010] w-1/3">
                          Kinh độ
                        </label>
                      </div>
                      <input
                        type="number"
                        name="longitude"
                        readOnly
                        className="p-3 rounded w-full outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                        onChange={(e) =>
                          setDataForm({
                            ...dataForm,
                            longitude: e.currentTarget.value,
                          })
                        }
                        onBlur={() =>
                          dataForm.longitude === ""
                            ? setErrorMessagesLongitude({
                                isError: true,
                                message: "Vui lòng nhập kinh độ",
                              })
                            : setErrorMessagesLongitude({
                                isError: false,
                                message: "",
                              })
                        }
                        placeholder="Nhập kinh độ"
                        value={dataForm.longitude}
                      />
                    </div>

                    <div className="flex flex-col mb-3">
                      <div className="flex flex-row gap-5">
                        <label className="mb-1 font-medium text-gray-600 w-1/3">
                          Vĩ độ
                        </label>
                        {/* <div className="w-full flex flex-row items-center justify-center">
                          {errorMessagesLatitude.message && (
                            <div
                              className={`flex justify-center items-center mb-3 font-medium ${
                                errorMessagesLatitude.isError
                                  ? "text-red-500"
                                  : "text-blue-500"
                              }`}
                            >
                              {errorMessagesLatitude.message}
                            </div>
                          )}
                          {errors.latitude && touched.latitude && (
                            <div className="text-red-500 font-medium mb-3">
                              {errors.latitude &&
                                touched.latitude &&
                                errors.latitude}
                            </div>
                          )}
                        </div> */}
                      </div>
                      <input
                        type="number"
                        readOnly
                        name="latitude"
                        className="p-3 rounded w-full outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010] hidden"
                        onChange={(e) =>
                          setDataForm({
                            ...dataForm,
                            latitude: e.currentTarget.value,
                          })
                        }
                        onBlur={() =>
                          dataForm.latitude === ""
                            ? setErrorMessagesLatitude({
                                isError: true,
                                message: "Vui lòng nhập vĩ độ",
                              })
                            : setErrorMessagesLatitude({
                                isError: false,
                                message: "",
                              })
                        }
                        placeholder="Nhập vĩ độ"
                        value={dataForm.latitude}
                      />
                    </div>
                  </div>
                </div>
                )}  
            </form>
           
          )}
        </Formik>
      </Modal>
 

      <ModalMap
        ref={modalMapRef}
        onChangeLocation={(latitude, longitude, address) =>
          setDataForm({
            ...dataForm,
            latitude: latitude,
            longitude: longitude,
            birthPlace: address,
          })
        }
      />
      <ModalLogin ref={modalLoginRef} />
      <ToastContainer />
    </div>
   
  );
});

export default ModalRegister;
