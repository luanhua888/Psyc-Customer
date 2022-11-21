import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import Router from "next/router";
import avatarImg from "../../public/photos/avatar.jpeg";
import momoIcon from "../../public/photos/icon/MoMo_Logo.png";

import Modal from "../modal";
import Image from "next/image";
import { payMentService } from "../../services/PayMentService";
import { Tabs, Toast } from "flowbite-react";
import { set, times } from "lodash";

import ModalCancelBooking from "../../components/modal/ModalCancelBooking.js";
import ModalFailure from "../../components/modal/ModalFailure.js";
import { Dialog } from "@headlessui/react";

// eslint-disable-next-line react/display-name
const ModalPayment = forwardRef((amount, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [qrCodeDisplay, setQrDisplay] = useState({});
  const [mountrecieve, setAmount] = useState([]);

  const modalVoteRateRef = useRef();
  const modalFailureRef = useRef();
  // console.log("amount", amount.amount);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
      setAmount(amount.amount);
      getQrCode();
      getCountDown();
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  const getQrCode = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await payMentService.getQrCode(
        localStorage.getItem("idcustomer"),
        amount.amount
      );
      if (data.statusCode == 200) {
        setQrDisplay(data);
      }
    }
  };

  const [time, setTime] = useState(30);

  const getCountDown = async () => {
    //điếm ngược thời gian 5 phút

    const interval = setInterval(() => {
      if (time > 0) {
        setTimeout(() => {
          setTime((time) => time - 1);
        }, 1000);

      }
      if (time == 0) {
        clearInterval(interval);

      }
    }, 1000);
  };

  useEffect(() => {
    if (time === 0) {
      setIsOpen(false);
      //reset lại thời gian về 5 phút
      setTime(30);
      //ngừng đếm ngược
      modalFailureRef.current.open();
    }
  }, [time]);

  const modalOpen = async () => {
    modalVoteRateRef.current.open();
  };

  return (
    <div className=" absolute top-0">
      <Modal
        classes="overflow-hidden absolute px-2 py-2 h-50 max-w-[600px] rounded bg-white"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={""}
        onDiscard={() => console.log("Button discard")}
      >
        {qrCodeDisplay && (
          <div class="modal-body">
            <div class="container-fluid">
              <div class="flex flex-row ...">
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
                      <span class="ml-2">Momo</span>
                    </a>
                  </div>
                  <div class="justify-center ml-38 mr-40">
                    <div class="flex flex-row justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 " />
                  </div>
                  <div class="ml-10 mt-5">
                    <h3 class=" justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
                      Đơn hàng hết hạn sau 10 phút
                    </h3>
                    <h3
                      class=" justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 bg-pink-700 text-white border-r-2"
                      //nếu hết thời gian 0 thì sẽ open modal cancel booking
                    >
                      {Math.floor(time / 60)}:{time % 60}
                    </h3>
                  </div>
                </div>
              </div>
              <div class="flex flex-col mt-10">
                <div
                  class="flex flex-col justify-between items-center text-pink-600 text-4xl
            "
                >
                  Quét mã để thanh toán
                </div>
              </div>
              <div class="row">
                <div
                  class="flex flex-col justify-between items-center text-pink-600 2xl:text-4xl mt-2
             "
                >
                  {
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                     }).format(qrCodeDisplay.amount * 1000)
                  }


                </div>
                {/* <div class='flex flex-col justify-between items-center text-pink-600'>
              <h3 className='first-line:text-black'>Tài khoản nhận:</h3>
              <h3 className='second-line:text-black'>0394705508</h3>
            </div>
            <div class='flex flex-col justify-between items-center text-pink-600'>
              <h3 className='first-line:text-black'>Tên người nhận:</h3>
              <h3 className='second-line:text-black'>Vũ Anh Tuấn</h3>
              
            </div> */}
              </div>
              <div className="flex flex-row justify-center items-center">
                Tài khoản nhận:{"  "}
                <span className="text-pink-600 text-2xl ml-2">
                  {qrCodeDisplay.phonenumber}
                </span>
                <br />
              </div>
              <div className="flex flex-row justify-center items-center">
                Tên người nhận:{" "}
                <span className=" text-pink-600 text-2xl ml-2">
                  {qrCodeDisplay.name}
                </span>
                <br />
              </div>
              <div className="flex flex-row justify-center items-center">
                Nội dung:{" "}
                <span className=" text-pink-600 text-2xl ml-2">
                  {qrCodeDisplay.code}
                </span>
                <br />
              </div>

              <div>
                <div class="flex flex-col justify-between items-center text-pink-600 text-2xl">
                  <div className="border-solid border-2 border-indigo-500 p-2 ">
                    <Image
                      loader={() => qrCodeDisplay.qrcodemomo}
                      className=""
                      src={avatarImg}
                      alt=""
                      width={200}
                      height={200}
                    />
                  </div>
                  <h4>Quét mã Qr để thanh toán </h4>
                </div>
              </div>
              <div className="flex underline flex-col justify-between items-center text-pink-600 text-2xl">
                GHI CHÚ
              </div>
              <div>
                <l class="list-decimal">
                  <p>
                    1. Để tiền được cập nhật nhanh chóng, quý khách vui lòng
                    điền chính xác mã hiển thị có 6 ký tự ở phía trên.
                  </p>
                  <p>
                    2.Không được điền thêm bất kỳ chữ cái hoặc kú tự nào ngoài 6
                    ký tự có sẵn.
                  </p>
                  <p>3.Không được sửa đổi số tiền.</p>
                </l>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <ModalFailure  ref={modalFailureRef} />
    </div>
  );
});

export default ModalPayment;
