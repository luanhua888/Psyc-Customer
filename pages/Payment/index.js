import { Button, Table, Pagination, Tabs } from "flowbite-react";
import { useRef, useEffect, useState, Component } from "react";
import ModalPayment from "../../components/modal/ModalPayment.js";
import ModalBankPayment from "../../components/modal/ModalBankPayment.js";
import { payMentService } from "../../services/PayMentService";
import Image from "next/image.js";
import bankIcon from "../../public/photos/icon/bank.png";
import momoIcon from "../../public/photos/icon/MoMo_Logo.png";
import vnPayIcon from "../../public/photos/vnpay.png";
import { Formik } from "formik";
import { isEmpty, set } from "lodash";
import { number } from "yup";

export default function Payment() {
  const modalPaymentRef = useRef();
  const modalBankPaymentRef = useRef();
  const formRef = useRef();

  const [errorMessages, setErrorMessages] = useState({
    isError: false,
    message: "",
  });

  const [amount, setAmount] = useState(null);
  // console.log("amount", amount);

  const changeAmount = (e) => {
    if (Number(amount) >= 0) {
      setAmount(Number(amount) + Number(e.target.value));

      console.log("amountafter", amount);
    }
    // } else {
    //   setValueAmount(Number(e.target.value));
    //   dataForm.amount = Number(e.target.value);
    //   console.log("amount", dataForm.amount);
    // }

    if (amount > 19950) {
      setErrorMessages({
        isError: true,
        message: "số tiền không được vượt quá 20000",
      });
    }
  };

  const handleOpen = () => {
    if (amount == undefined) {
      setErrorMessages({
        isError: true,
        message: "Vui lòng nhập số tiền",
      });
    }
    if (amount < 50) {
      setErrorMessages({
        isError: true,
        message: "Số tiền nạp tối thiểu là từ 50 - 20000 ",
      });
    }
    if (amount < 0) {
      setErrorMessages({
        isError: true,
        message: "Số tiền nạp phải lớn hơn 0 và nằm trong khoảng 50 - 20000",
      });
    }
    if (amount > 20000) {
      setErrorMessages({
        isError: true,
        message: "Số tiền bạn muốn nạp không được vượt quá 20000",
      });
    }

    if (amount >= 50 && amount <= 20000) {
      modalPaymentRef.current.open();
    }
  };

  const handleOpenModalBankPayment = () => {
    if (amount == undefined) {
      setErrorMessages({
        isError: true,
        message: "Vui lòng nhập số tiền",
      });
    }
    if (amount < 50) {
      setErrorMessages({
        isError: true,
        message: "Số tiền nạp tối thiểu là từ 50 - 20000 ",
      });
    }
    if (amount < 0) {
      setErrorMessages({
        isError: true,
        message: "Số tiền nạp phải lớn hơn 0 và nằm trong khoảng 50 - 20000",
      });
    }
    if (amount > 20000) {
      setErrorMessages({
        isError: true,
        message: "Số tiền bạn muốn nạp không được vượt quá 20000",
      });
    }

    if (amount >= 50 && amount <= 20000) {
      modalBankPaymentRef.current.open();
    }
  };

  const handleClose = () => {
    setisOpen(false);
  };

  const [dataForm, setDataForm] = useState({
    amount: isEmpty,
  });

  const [qrCode, setQrCode] = useState({});

  useEffect(() => {
    return () => {
      setErrorMessages({
        isError: false,
        message: "",
      });
    };
  }, []);

  const handlePaymentVnpay = () => {
    (async () => {
      const res = await payMentService.getQrCode(
        localStorage.getItem("idcustomer"),
        amount,
      );
      if (res) {
        setQrCode(res);
      }
    })();
  }

  return (
    <div className="w-auto flex justify-center items-center">
      <section className=" w-full  bg-[#031d2e] " >
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
          
          <div class="flex flex-col justify-center items-center bg-[#17384e] mr-70 ml-70 mt-2 mb-20 m-60 pb-10 rounded-xl shadow-2xl">
            <button class="flex flex-row justify-center items-center bg-[#17384e] w-full  rounded-xl shadow-lg m-2 p-2">
              <div class=" text-[#ff7010] font-bold text-2xl pb-5 border-b-4 border-b-[#ff7010]">
                CỔNG THANH TOÁN
              </div>
            </button>
            <div
              class="flex flex-row justify-center bg-white w-auto m-4 rounded-xl shadow-lg mx-5
            "
            >
              <Tabs.Group
                id="groupTab"
                aria-label="Default tabs"
                style="underline"
              >
                <Tabs.Item active={true} title="MOMO" text="black">
                  <div class="flex flex-col relative">
                    <div class="flex flex-row justify-start">
                      <div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                        <a
                          href="#"
                          class="w-full sm:w-auto bg-white-80 rounded-lg inline-flex items-center justify-center px-4 py-2.5"
                        >
                          {/* logo momo */}
                          <Image
                            // loader={() => user.imageUrl}
                            src={momoIcon}
                            alt=""
                            width={50}
                            height={50}
                          />
                          <div class="text-left p-6">
                            <div class="mb-1 text-xs"></div>
                            <div class="-mt-1 font-sans text-xl text-black font-semibold">
                              Hạn mức nạp 50 - 20000
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="justify-center ">
                        <div class="flex flex-row justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 "></div>
                      </div>
                      <div class="p-4 flex flex-col justify-center items-center">
                        <h3 class="text-black justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                          Phí xử lý
                        </h3>
                        <h3 class="text-black justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                          0%
                        </h3>
                      </div>
                    </div>
                    <div class="flex flex-row justify-between">
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
                            value={amount}
                            onChange={(e) =>
                              setDataForm(
                                {
                                  handleChange,
                                  ...dataForm,
                                  amount: e.currentTarget.value,
                                } && setAmount(e.currentTarget.value)
                              )
                            }
                          />
                        </div>
                      </div>
                      {/* <div class="m-10"></div> */}
                      <div className=" text-black justify-center items-center flex flex-rowVND(k)
                      
                      ">VND(k)</div>
                    </div>

                    <div class="grid gap-x-8 gap-y-4 grid-cols-3">
                      <button
                        onClick={changeAmount}
                        value={50}
                        className="bg-transparent hover:bg-[#2e4b5f] text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-[#143246] hover:border-transparent rounded"
                      >
                        50
                      </button>
                      <button
                        onClick={changeAmount}
                        value={100}
                        className="bg-transparent hover:bg-[#2e4b5f] text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-[#143246] hover:border-transparent rounded"
                      >
                        100
                      </button>
                      <button
                        onClick={changeAmount}
                        value={200}
                        className="bg-transparent hover:bg-[#2e4b5f] text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-[#143246] hover:border-transparent rounded"
                      >
                        200
                      </button>
                      <button
                        onClick={changeAmount}
                        value={500}
                        className="bg-transparent hover:bg-[#2e4b5f] text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-[#143246] hover:border-transparent rounded"
                      >
                        500
                      </button>
                      <button
                        onClick={changeAmount}
                        value={600}
                        className="bg-transparent hover:bg-[#2e4b5f] text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-[#143246] hover:border-transparent rounded"
                      >
                        600
                      </button>
                      <button
                        onClick={changeAmount}
                        value={700}
                        className="bg-transparent hover:bg-[#2e4b5f] text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-[#143246] hover:border-transparent rounded"
                      >
                        700
                      </button>
                      <button
                        onClick={changeAmount}
                        value={1000}
                        className="bg-transparent hover:bg-[#2e4b5f] text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-[#143246] hover:border-transparent rounded"
                      >
                        1000
                      </button>
                      <button
                        onClick={changeAmount}
                        value={2000}
                        className="bg-transparent hover:bg-[#2e4b5f] text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-[#143246] hover:border-transparent rounded"
                      >
                        2000
                      </button>
                      <button
                        onClick={changeAmount}
                        value={5000}
                        className="bg-transparent hover:bg-[#2e4b5f] text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-[#143246] hover:border-transparent rounded"
                      >
                        5000
                      </button>
                    </div>

                    <button
                      type="submit"
                      className=" bg-[#17384e] text-[#ff7010] flex flex-col justify-between items-center w-full  text-xl  mt-5 rounded-xl"
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
                            <div class="-mt-1 font-sans text-xl text-black font-semibold">
                              Hạn mức nạp 50 - 20000
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="justify-center  ">
                        <div class="flex flex-row justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 "></div>
                      </div>
                      <div class="flex flex-col justify-center items-center">
                        <h3 class="text-black justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                          Phí xử lý
                        </h3>
                        <h3 class=" text-black justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                          0%
                        </h3>
                      </div>
                    </div>
                    <div class="flex flex-row justify-between">
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
                            value={amount}
                            onChange={(e) =>
                              setDataForm(
                                {
                                  handleChange,
                                  ...dataForm,
                                  amount: e.currentTarget.value,
                                } && setAmount(e.currentTarget.value)
                              )
                            }
                          />
                        </div>
                      </div>
                      {/* <div class="m-10"></div> */}
                      <div className="text-black flex flex-row justify-center items-center ">VND(k)</div>
                    </div>

                    <div class="grid gap-x-8 gap-y-4 grid-cols-3">
                      <button
                        onClick={changeAmount}
                        value={50}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        50
                      </button>
                      <button
                        onClick={changeAmount}
                        value={100}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        100
                      </button>
                      <button
                        onClick={changeAmount}
                        value={200}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        200
                      </button>
                      <button
                        onClick={changeAmount}
                        value={500}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        500
                      </button>
                      <button
                        onClick={changeAmount}
                        value={600}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        600
                      </button>
                      <button
                        onClick={changeAmount}
                        value={700}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        700
                      </button>
                      <button
                        onClick={changeAmount}
                        value={1000}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        1000
                      </button>
                      <button
                        onClick={changeAmount}
                        value={2000}
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        2000
                      </button>
                      <button
                        onClick={changeAmount}
                        value={5000}
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        5000
                      </button>
                    </div>

                    <button
                      class="bg-[#17384e] text-[#ff7010] flex flex-col justify-between items-center w-full  text-xl mt-5 rounded-xl"
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

                <Tabs.Item title="VNPAY">
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
                            src={vnPayIcon}
                            alt=""
                            width={50}
                            height={50}
                          />

                          <div class="text-left p-6">
                            <div class="mb-1 text-xs"></div>
                            <div class="-mt-1 font-sans text-xl text-black font-semibold">
                              Hạn mức nạp 50 - 20000
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="justify-center  ">
                        <div class="flex flex-row justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 "></div>
                      </div>
                      <div class="flex flex-col justify-center items-center">
                        <h3 class="text-black justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                          Phí xử lý
                        </h3>
                        <h3 class=" text-black justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                          0%
                        </h3>
                      </div>
                    </div>
                    <div class="flex flex-row justify-between">
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
                            value={amount}
                            onChange={(e) =>
                              setDataForm(
                                {
                                  handleChange,
                                  ...dataForm,
                                  amount: e.currentTarget.value,
                                } && setAmount(e.currentTarget.value)
                              )
                            }
                          />
                        </div>
                      </div>
                      {/* <div class="m-10"></div> */}
                      <div className="text-black flex flex-row justify-center items-center ">VND(k)</div>
                    </div>

                    <div class="grid gap-x-8 gap-y-4 grid-cols-3">
                      <button
                        onClick={changeAmount}
                        value={50}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        50
                      </button>
                      <button
                        onClick={changeAmount}
                        value={100}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        100
                      </button>
                      <button
                        onClick={changeAmount}
                        value={200}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        200
                      </button>
                      <button
                        onClick={changeAmount}
                        value={500}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        500
                      </button>
                      <button
                        onClick={changeAmount}
                        value={600}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        600
                      </button>
                      <button
                        onClick={changeAmount}
                        value={700}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        700
                      </button>
                      <button
                        onClick={changeAmount}
                        value={1000}
                        class="bg-transparent hover:bg-blue-500 text-[#ff7010] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        1000
                      </button>
                      <button
                        onClick={changeAmount}
                        value={2000}
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        2000
                      </button>
                      <button
                        onClick={changeAmount}
                        value={5000}
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        5000
                      </button>
                    </div>

                    <button
                      class="bg-[#17384e] text-[#ff7010] flex flex-col justify-between items-center w-full  text-xl mt-5 rounded-xl"
                      onClick={handlePaymentVnpay}
                    >
                     THANH TOÁN
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
      <ModalPayment qrCode={qrCode} amount={amount} ref={modalPaymentRef} />
   

      <ModalBankPayment
        qrCode={qrCode}
        amount={amount}
        ref={modalBankPaymentRef}
      />
    </section>
    </div>
    
  );
}
