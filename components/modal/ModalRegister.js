import { Formik } from "formik";
import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { userService } from "../../services/UserService";

import Modal from "../modal";
import ModalLogin from "./ModalLogin";
import ModalMap from "../../components/modal/ModalMap";
import { Link } from "@mui/material";
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
    fullname: "",
    email: "",
    username: "",
    password: "",
    code: "",
    dob: "",
    birthPlace: "",
    longitude: "",
    latitude: "",
    imageUrl: "",
    gender: "",
  });
  console.log("dataForm", dataForm);

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
  const [errorMessagesGender, setErrorMessagesGender] = useState({
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

  const handleOnConfirm = async () => {
    if (data == undefined) {
      setMessage("Mã xác nhận chưa chính xác");
    }
    const data = await userService.registerConfirm(
      dataForm.email,
      dataForm.code
    );

    if (data.statusCode === 200) {
      setMessage("Đăng ký thành công");
      setIsOpen(false);
      setBtnSubmitTitle("Đăng ký");
      window.location.reload();
    }
  };

  const handleRegister = async () => {
    if (isVerifyCode == true) {
      try {
        handleOnConfirm();
        setMessage(data.message);
        setTimeout(() => {
          setDataForm({});
          setMessage("");
          setBtnSubmitTitle("Đăng ký");
          setIsVerifyCode(false);
          setIsOpen(false);
          modalLoginRef.current.open();
        }, 1500);
      } catch (err) {
        setMessage(err.response.data.message);
        return;
      }
    } else {
      try {
        const responseCheckByEmail = await userService.registerCheckByEmail(
          dataForm.email
        );

        if (responseCheckByEmail.status == "null") {
          const data = await userService.register(
            dataForm.username,
            dataForm.email,
            dataForm.password
          );

          const responseInfor = await userService.registerInfor(
            dataForm.fullname,
            dataForm.email,
            dataForm.birthPlace,
            dataForm.dob,
            dataForm.longitude.toString(),
            dataForm.latitude.toString(),
            (dataForm.imageUrl =
              "https://i.pinimg.com/564x/99/5f/b5/995fb5b70cd86c194bc9eb48c394eb6c.jpg"),
            dataForm.gender
          );
        }

        const responseResendCode = await userService.registerResendCode(
          dataForm.email
        );

        setMessage("Mã xác nhận đã được gửi đến email của bạn");

        setTimeout(() => {
          setBtnSubmitTitle("Xác nhận");
          setIsVerifyCode(true);
        }, 1500);
      } catch (err) {
        setMessage(err.response.data.message);

        setTimeout(() => {
          setBtnSubmitTitle("Xác nhận");
          setIsVerifyCode(true);
        }, 1500);
      }
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

      if (
        // không bắt đầu bằng số

        // không chứa ký tự đặc biệt
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/.test(
          dataForm.fullname
        ) ||
        // không chứa các ký tự ! @ # $ % ^ & * ( ) _ + = { } [ ] : ; " ' < > , . ? / \ | ~ ` - 0-9
        /[\!@#$%\^&\*\(\)_\+\=\{\}\[\]\:\;\"\'\<\>\,\.\?\/\\\|\~\`\-\d]/.test(
          dataForm.fullname
        )

        // không chứa khoảng trắng liên tiếp

        // độ dài từ 6 đến 30 ký tự
      ) {
        setErrorMessagesFullName({
          isError: true,
          message: "Họ tên không hợp lệ",
        });
      }

      if (/\s\s/.test(dataForm.fullname)) {
        setErrorMessagesFullName({
          isError: true,
          message: "Không chứa khoảng trắng liên tiếp",
        });
      }

      if (dataForm.fullname.charAt(0) === " ") {
        setErrorMessagesFullName({
          isError: true,
          message: "Không bắt đầu bằng khoảng trắng",
        });
      }

      if (dataForm.fullname.length < 6 || dataForm.fullname.length > 30) {
        setErrorMessagesFullName({
          isError: true,
          message: "Độ dài họ tên từ 6 đến 30 ký tự",
        });
      }

      if (
        // chỉ chứa chữ cái và số
        !/^[a-zA-Z0-9]+$/.test(dataForm.username)
      ) {
        setErrorMessagesUsername({
          isError: true,
          message: "Tên đăng nhập không hợp lệ",
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
          message: "Vui lòng nhập email hoặc email không hợp lệ",
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
            "Mật khẩu phải có ít nhất 6 ký tự và ít nhất 1 chữ hoa, chữ thường, số, không chứa kí tự đặc biệt",
        });
      }

      if (dataForm.confirmPassword === "") {
        setErrorMessagesConfirmPassword({
          isError: true,
          message: "Vui lòng nhập lại mật khẩu",
        });
      }

      if (
        dataForm.password !== dataForm.confirmPassword &&
        dataForm.confirmPassword !== ""
      ) {
        setErrorMessagesConfirmPassword({
          isError: true,
          message: "Mật khẩu không khớp",
        });
      }

      if (dataForm.dob === "" || dataForm.gender === "") {
        setErrorMessagesBirthday({
          isError: true,
          message: "Vui lòng chọn ngày sinh và giới tính",
        });
      }

      if (dataForm.birthPlace === "") {
        setErrorMessagesBirthPlace({
          isError: true,
          message: "Vui lòng chọn nơi sinh",
        });
      }

      if (dataForm.longitude === "") {
        setErrorMessagesLongitude({
          isError: true,
          message: "Vui lòng nhập kinh độ",
        });
      }

      if (dataForm.latitude === "") {
        setErrorMessagesLatitude({
          isError: true,
          message: "Vui lòng nhập vĩ độ",
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

      //giới tính phải được chọn
      if (
        dataForm.gender === "" 
      ) {
        setErrorMessagesGender({
          isError: true,
          message: "Vui lòng chọn giới tính",
        });
      }




      if (
        dataForm.fullname &&
        dataForm.username &&
        dataForm.email.indexOf("@") !== -1 &&
        dataForm.password &&
        //mật khẩu phải có ít nhất 6 ký tự và ít nhất 1 chữ hoa, 1 chữ thường, 1 số
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(
          dataForm.password
        ) &&
        //confirmPassword phải trùng với password
        dataForm.password === dataForm.confirmPassword &&
        dataForm.confirmPassword &&
        dataForm.dob &&
        dataForm.birthPlace &&
        dataForm.longitude &&
        dataForm.latitude &&
        //nếu tuôi nhỏ hơn 18 tuổi thì không được đăng ký
        age >= 18
        //giới tính phải được chọn
        &&
        dataForm.gender
      ) {
        setIsVerifyCode(true);
        handleRegister();
      }
    }
  };

  return (
    <div className="absolute left-1 mt-[5%]">
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
              "bg-[#ff7010] px-4 py-2 rounded-lg hover:bg-[#031d2e] transition-all duration-200 text-white",
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
            fullname: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
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
              {isVerifyCode ? (
                <div className="flex flex-col ">
                  {message && (
                    <div className="text-[#ff7010]  mb-2 justify-center flex flex-row text-xl">
                      {message}
                    </div>
                  )}

                  <div className=" rounded">
                    <input
                      id="code"
                      name="code"
                      className="p-3 rounded w-full outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                      type="number"
                      placeholder="Code"
                      value={dataForm.code}
                      onChange={(e) =>
                        setDataForm({
                          ...dataForm,
                          code: e.currentTarget.value,
                        })
                      }
                    />
                  </div>
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
                    <div className=" flex flex-row gap-5">
                      <label className="mb-1 font-medium text-[#ff7010] w-1/3">
                        Tên đăng nhập
                      </label>
                      <div className="w-full flex flex-row items-center justify-center">
                        {errorMessagesUsername.message && (
                          <div
                            className={`flex justify-center items-center  font-medium ${
                              errorMessagesUsername.isError
                                ? "text-[#ff7010]"
                                : "text-blue-500"
                            }`}
                          >
                            {errorMessagesUsername.message}
                          </div>
                        )}
                        {errors.username && touched.username && (
                          <div className="text-[#ff7010] font-medium float-right">
                            {errors.username &&
                              touched.username &&
                              errors.username}
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="text"
                      name="username"
                      className="p-3 rounded w-full outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                      onChange={(e) =>
                        setDataForm({
                          ...dataForm,
                          username: e.currentTarget.value,
                        })
                      }
                      onBlur={() =>
                        dataForm.username === ""
                          ? setErrorMessagesUsername({
                              isError: true,
                              message: "Vui lòng nhập tên đăng nhập",
                            })
                          : setErrorMessagesUsername({
                              isError: false,
                              message: "",
                            })
                      }
                      placeholder="Nhập tên đăng nhập"
                      onKeyPress={(e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>

                  <div className="flex flex-col mb-3">
                    <div className="flex flex-row gap-5">
                      <label className="mb-1 font-medium text-[#ff7010] w-1/3">
                        Email
                      </label>
                      <div className="w-full flex flex-row items-center justify-center">
                        {errorMessagesEmail.message && (
                          <div
                            className={`flex justify-center items-center font-medium ${
                              errorMessagesEmail.isError
                                ? "text-[#ff7010]"
                                : "text-blue-500"
                            }`}
                          >
                            {errorMessagesEmail.message}
                          </div>
                        )}
                        {errors.email && touched.email && (
                          <div className="text-[#ff7010] font-medium mb-3">
                            {errors.email && touched.email && errors.email}
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="email"
                      name="email"
                      className="p-3 rounded w-full outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                      onChange={(e) =>
                        setDataForm({
                          ...dataForm,
                          email: e.currentTarget.value,
                        })
                      }
                      onBlur={() =>
                        dataForm.email === ""
                          ? setErrorMessagesEmail({
                              isError: true,
                              message: "Vui lòng nhập email",
                            })
                          : setErrorMessagesEmail({
                              isError: false,
                              message: "",
                            })
                      }
                      placeholder="Nhập email"
                      onKeyPress={(e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>

                  <div className="flex flex-col mb-3">
                    <div className="flex flex-row gap-5">
                      <label className="mb-1 font-medium text-[#ff7010] w-1/6">
                        Mật khẩu
                      </label>
                      <div className="w-full flex flex-row items-center justify-center">
                        {errorMessagesPassword.message && (
                          <div
                            className={`flex justify-center items-center  font-medium ${
                              errorMessagesPassword.isError
                                ? "text-[#ff7010]"
                                : "text-blue-500"
                            }`}
                          >
                            {errorMessagesPassword.message}
                          </div>
                        )}
                        {errors.password && touched.password && (
                          <div className="text-[#ff7010] font-medium ">
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="password"
                      name=""
                      className="p-3 rounded w-full outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                      onChange={(e) =>
                        setDataForm({
                          ...dataForm,
                          password: e.currentTarget.value,
                        })
                      }
                      onBlur={() =>
                        dataForm.password === ""
                          ? setErrorMessagesPassword({
                              isError: true,
                              message: "Vui lòng nhập mât khẩu",
                            })
                          : setErrorMessagesPassword({
                              isError: false,
                              message: "",
                            })
                      }
                      placeholder="Nhập mật khẩu"
                      // không cho nhập khoảng trắng
                      onKeyPress={(e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>

                  <div className="flex flex-col mb-3">
                    <div className="flex flex-row gap-5">
                      <label className="mb-1 font-medium text-[#ff7010] w-[50%]">
                        Xác nhận mật khẩu
                      </label>
                      <div className="w-full flex flex-row items-center justify-center">
                        {errorMessagesConfirmPassword.message && (
                          <div
                            className={`flex justify-center items-center  font-medium ${
                              errorMessagesConfirmPassword.isError
                                ? "text-[#ff7010]"
                                : "text-[#ff7010]"
                            }`}
                          >
                            {errorMessagesConfirmPassword.message}
                          </div>
                        )}
                        {errors.confirmPassword && touched.confirmPassword && (
                          <div className="text-[#ff7010] font-medium ">
                            {errors.confirmPassword &&
                              touched.confirmPassword &&
                              errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="p-3 rounded w-full outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                      onChange={(e) =>
                        setDataForm({
                          ...dataForm,
                          confirmPassword: e.currentTarget.value,
                        })
                      }
                      onBlur={() =>
                        dataForm.confirmPassword === ""
                          ? setErrorMessagesConfirmPassword({
                              isError: true,
                              message: "Vui lòng nhập mât khẩu",
                            })
                          : setErrorMessagesConfirmPassword({
                              isError: false,
                              message: "",
                            })
                      }
                      placeholder="Nhập lại mật khẩu"
                      // không cho nhập khoảng trắng
                      onKeyPress={(e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>

                  <div className="flex flex-col mb-3">
                    <div>
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
                        name="dob"
                        className="p-3 mx-2 rounded  outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
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
                                message: "Vui lòng chọn ngày sinh và giới tính",
                              })
                            : setErrorMessagesBirthday({
                                isError: false,
                                message: "",
                              })
                        }
                      />

                      {/* select giới tính */}
                      <select
                        onChange={(e) =>
                          setDataForm({
                            ...dataForm,
                            gender: e.currentTarget.value,
                          })
                        }
                        className="p-3 rounded  outline-none focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                      </select>
                    </div>
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
                              message: "",
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

                  <label className="text-2xl mt-5 text-white">
                    Bạn đã có tài khoản?{" "}
                    <span
                      className="text-[#ff7010] border-b-2 border-[#ff7010] hover:text-[#455f71] hover:border-[#455f71] "
                      onClick={handleOpenModalLogin}
                    >
                      Đăng nhập
                    </span>
                  </label>

                  <div className=" grid-cols-2 gap-2 hidden">
                    <div className="flex flex-col mb-3">
                      <div className="flex flex-row gap-5">
                        <label className="mb-1 font-medium text-[#ff7010] w-1/3">
                          Kinh độ
                        </label>
                        {/* <div className="w-full flex flex-row items-center justify-center">
                          {errorMessagesLongitude.message && (
                            <div
                              className={`flex justify-center items-center mb-3 font-medium ${
                                errorMessagesLongitude.isError
                                  ? "text-red-500"
                                  : "text-blue-500"
                              }`}
                            >
                              {errorMessagesLongitude.message}
                            </div>
                          )}
                          {errors.longitude && touched.longitude && (
                            <div className="text-red-500 font-medium mb-3">
                              {errors.longitude &&
                                touched.longitude &&
                                errors.longitude}
                            </div>
                          )}
                        </div> */}
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
    </div>
  );
});

export default ModalRegister;
