import { Button, Table, Pagination, Tabs } from "flowbite-react";
import { useRef, useEffect, useState, Component } from "react";
import ModalPayment from "../../components/modal/ModalPayment.js";
import ModalBankPayment from "../../components/modal/ModalBankPayment.js";
import { payMentService } from "../../services/PayMentService";
import Image from "next/image.js";
import bankIcon from "../../public/photos/icon/bank.png";
import { Formik } from "formik";
import { isEmpty } from "lodash";

export default function Payment() {
  const modalPaymentRef = useRef();
  const modalBankPaymentRef = useRef();
  const formRef = useRef();

  const [errorMessages, setErrorMessages] = useState({
    isError: false,
    message: "",
  });

  const getQrCode = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await payMentService.getQrCode(
        localStorage.getItem("idcustomer"),
        dataForm.amount
      );
      if (data.statusCode == 200) {

        setQrCode(data);
      }
    }
  };

  const handleOpen = () => {
    if (dataForm.amount == isEmpty) {
      setErrorMessages({
        isError: true,
        message: "Vui lòng nhập số tiền",
      });
    }
    if (dataForm.amount < 0) {
      setErrorMessages({
        isError: true,
        message: "Số tiền nạp phải lớn hơn 0 và nằm trong khoảng 50 - 2000",
      });
    }
    if (dataForm.amount > 20000) {
      setErrorMessages({
        isError: true,
        message: "Số tiền bạn muốn nạp không được vượt quá 20000",
      });
    }
    if (dataForm.amount >= 50 && dataForm.amount <= 2000) {
      modalPaymentRef.current.open();
      getQrCode();
    }
    if (dataForm.amount < 49) {
      setErrorMessages({
        isError: true,
        message: "Số tiền nạp tối thiểu là từ 50 - 2000 ",
      });
    }
  };

  const handleOpenModalBankPayment = () => {
    if (dataForm.amount == isEmpty) {
      setErrorMessages({
        isError: true,
        message: "Vui lòng nhập số tiền",
      });
    }
    if (dataForm.amount < 0) {
      setErrorMessages({
        isError: true,
        message: "Số tiền nạp phải lớn hơn 0 và nằm trong khoảng 50 - 2000",
      });
    }
    if (dataForm.amount > 20000) {
      setErrorMessages({
        isError: true,
        message: "Số tiền bạn muốn nạp không được vượt quá 2000",
      });
    }
    if (dataForm.amount >= 50 && dataForm.amount <= 2000) {
      modalBankPaymentRef.current.open();
      getQrCode();
    }
    if (dataForm.amount < 49) {
      setErrorMessages({
        isError: true,
        message: "Số tiền nạp tối thiểu là từ 50 - 2000 ",
      });
    }
  };

  const handleClose = () => {
    setisOpen(false);
  };

  const [dataForm, setDataForm] = useState({
    amount: isEmpty,
  });

  console.log("dataForm", dataForm.amount);
  const [qrCode, setQrCode] = useState({});

  useEffect(() => {
    return () => {
      setErrorMessages({
        isError: false,
        message: "",
      });
    };
  }, []);

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={{ amount: null }}
        validate={(values) => {
          const errors = {};
          if (!values.amount) {
            errors.amount = "Vui lòng nhập số tiền";
          }
          return errors;
        }}
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
          <div class="flex flex-col justify-center items-center bg-gray-100 mr-70 ml-70 mt-2 mb-20 m-60 pb-10 rounded-xl shadow-2xl">
            <button class="flex flex-row justify-center items-center bg-white w-1/2 rounded-xl shadow-lg m-2 p-2">
              <div class="justify-center items-center w-full">
                CỔNG THANH TOÁN
              </div>
            </button>
            <div
              class="flex flex-row justify-center bg-white w-1/2 rounded-xl shadow-lg m-2 p-2 
            "
            >
              <Tabs.Group
                id="groupTab"
                aria-label="Default tabs"
                style="underline"
              >
                <Tabs.Item active={true} title="MOMO">
                  <div class="flex flex-col relative">
                    <div class="flex flex-row justify-start">
                      <div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                        <a
                          href="#"
                          class="w-full sm:w-auto bg-white-80 rounded-lg inline-flex items-center justify-center px-4 py-2.5"
                        >
                          {/* logo momo */}
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/Desposit%2Flogo-momo-png-2.png?alt=media&token=53a3ea95-c76b-4943-a0ae-34403acc617f"
                            alt="logo momo"
                            class="w-10 h-10"
                          />
                          <div class="text-left p-6">
                            <div class="mb-1 text-xs"></div>
                            <div class="-mt-1 font-sans text-sm font-semibold">
                              Hạn mức nạp 50 - 20000
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="justify-center ml-38 mr-40">
                        <div class="flex flex-row justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 "></div>
                      </div>
                      <div class="ml-10 mt-5">
                        <h3 class=" justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                          Phí xử lý
                        </h3>
                        <h3 class=" justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                          0%
                        </h3>
                      </div>
                    </div>
                    <div class="flex flex-nowrap">
                      <div class=" mb-3 xl:w-96">
                        <div className="flex flex-row">
                          <div className="text-red-500 mr-4"> * </div>
                          <div>
                            {errorMessages.message && (
                              <div
                                className={`flex justify-center items-center  font-medium ${
                                  errorMessages.isError
                                    ? "text-red-500"
                                    : "text-blue-500"
                                }`}
                              >
                                {errorMessages.message}
                              </div>
                            )}
                          </div>
                        </div>

                        <div class="flex flex-row justify-start">
                          <input
                            type="number"
                            class="form-control block w-full px-3 py-1.5 text-base
                      font-normal text-gray-700 bg-white bg-clip-padding
                      border border-solid border-gray-300 rounded transition
                      ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                      "
                            id="amount"
                            name="amount"
                            placeholder="50-20000"
                            onBlur={handleBlur}
                            onChange={(e) =>
                              setDataForm({
                                handleChange,
                                ...dataForm,
                                amount: e.currentTarget.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div class="m-10"></div>
                      <div>VND(k)</div>
                    </div>

                    <div class="grid gap-x-8 gap-y-4 grid-cols-3">
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        50
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        100
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        200
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        500
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        600
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        700
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        1000
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        2000
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        5000
                      </button>
                    </div>

                    <button
                      type="submit"
                      class=" flex flex-col justify-between items-center w-full  text-xl bg-blue-500 text-white mt-5 rounded-xl"
                      onClick={handleOpen}
                    >
                      MÃ QR MOMO
                    </button>
                    <ModalPayment
                      className=" w-full sm:w-auto absolute bg-white-80 rounded-lg inline-flex items-center justify-center px-4 py-2.5"
                      handleClose={handleClose}
                    />
                  </div>
                </Tabs.Item>

                {/* ===================================================================================================================================================================================================== */}

                <Tabs.Item title="BANKING">
                  <div class="flex flex-col relative">
                    <div class="flex flex-row justify-start">
                      <div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                        <a
                          href="#"
                          class="w-full sm:w-auto bg-white-80 rounded-lg inline-flex items-center justify-center px-4 py-2.5"
                        >
                          {/* logo  */}
                          {/* <img
                        src="https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/Desposit%2Flogo-momo-png-2.png?alt=media&token=53a3ea95-c76b-4943-a0ae-34403acc617f"
                        alt="logo momo"
                        class="w-10 h-10"
                      /> */}
                          <Image
                            // loader={() => user.imageUrl}
                            src={bankIcon}
                            alt=""
                            width={50}
                            height={50}
                          />

                          <div class="text-left p-6">
                            <div class="mb-1 text-xs"></div>
                            <div class="-mt-1 font-sans text-sm font-semibold">
                              Hạn mức nạp 50 - 20000
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="justify-center ml-38 mr-40">
                        <div class="flex flex-row justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 "></div>
                      </div>
                      <div class="ml-10 mt-5">
                        <h3 class=" justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                          Phí xử lý
                        </h3>
                        <h3 class=" justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                          0%
                        </h3>
                      </div>
                    </div>
                    <div class="flex flex-nowrap">
                      <div class="mb-3 xl:w-96">
                        <div className="flex flex-row">
                          <div className="text-red-500"> * </div>
                          <div>
                            {errorMessages.message && (
                              <div
                                className={`flex justify-center items-center  font-medium ${
                                  errorMessages.isError
                                    ? "text-red-500"
                                    : "text-blue-500"
                                }`}
                              >
                                {errorMessages.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div class="flex flex-row justify-start">
                        <input
                            type="number"
                            class="form-control block w-full px-3 py-1.5 text-base
                      font-normal text-gray-700 bg-white bg-clip-padding
                      border border-solid border-gray-300 rounded transition
                      ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                      "
                            id="amount"
                            name="amount"
                            placeholder="50-20000"
                            onBlur={handleBlur}
                            onChange={(e) =>
                              setDataForm({
                                handleChange,
                                ...dataForm,
                                amount: e.currentTarget.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div class="m-10"></div>
                      <div>VND(k)</div>
                    </div>

                    <div class="grid gap-x-8 gap-y-4 grid-cols-3">
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        50
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        100
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        200
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        500
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        600
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        700
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        1000
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        2000
                      </button>
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        5000
                      </button>
                    </div>

                    <button
                      class=" flex flex-col justify-between items-center w-full  text-xl bg-blue-500 text-white mt-5 rounded-xl"
                      onClick={handleOpenModalBankPayment}
                    >
                      MÃ QR NGÂN HÀNG
                    </button>
                    <ModalPayment
                      class=" flex flex-col justify-between items-center w-full  text-xl bg-blue-500 text-white mt-5 rounded-xl"
                      handleClose={handleClose}
                    />
                  </div>
                </Tabs.Item>
              </Tabs.Group>
            </div>
          </div>
        )}
      </Formik>
      <ModalPayment qrCode={qrCode} amount={dataForm} ref={modalPaymentRef} />
      <ModalBankPayment qrCode={qrCode} amount={dataForm} ref={modalBankPaymentRef} />
    </>
  );
}
