import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import Router from "next/router";
import avatarImg from "../../public/photos/avatar.jpeg";

import Modal from "../modal";
import Image from "next/image";
import { payMentService } from "../../services/PayMentService";
import bankIcon from "../../public/photos/icon/bank.png";
import ModalFailure from "../../components/modal/ModalFailure.js";
import loaderIcon from "../../public/photos/icon/loader.png";


// eslint-disable-next-line react/display-name
const ModalBankPayment = forwardRef((amount, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [qrCodeDisplay, setQrDisplay] = useState({});
  const [mountrecieve, setAmount] = useState([]);
  const [loading, setLoading] = useState(true);


  const modalFailureRef = useRef();


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
        setLoading(false);
      }
    }
  };

  const [time, setTime] = useState(600);

  const getCountDown = async () => {
    //điếm ngược thời gian 5 phút

    const interval = setInterval(() => {
      if (time > 0) {
        setTimeout(() => {
          setTime((time) => time - 1);
        }, 1000);

      }
      if (time == 0) {
        setIsOpen(false);

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

  return (
    <div className=" absolute top-0 z-50">
      <Modal
        classes="overflow-hidden absolute px-2 py-2 h-50 max-w-[600px] rounded bg-white"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={""}
        onDiscard={() => console.log("Button discard")}
      >

      {loading ? (
        <div className=" flex justify-center">
          <Image src={loaderIcon} alt="" className="animate-spin" />
          </div>
      ) : (
       <div>
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
                     
                      <Image
                            // loader={() => user.imageUrl}
                            src={bankIcon}
                            alt=""
                            width={50}
                            height={50}
                          />
                      <span class="ml-2 font-bold">Banking</span>
                    </a>
                  </div>
                  <div class="justify-center ml-38 mr-40">
                    <div class="flex flex-row justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 " />
                  </div>
                  <div class="mx-4 mt-5">
                    <h3 class=" justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 text-black ">
                      Đơn hàng sẽ hết hạn sau 10 phút
                    </h3>
                    <h3
                      id="ten-countdown"
                      class=" justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 bg-pink-700 text-white border-r-2"
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
                  class="flex flex-col justify-between items-center text-pink-600  text-4xl mt-2
             "
                >
                {
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                     }).format(qrCodeDisplay.amount * 1000)
                  }
                </div>
            
              </div>
              <div className="flex flex-row justify-center items-center text-black">
                Tài khoản nhận:{"  "}
                <span className="text-pink-600 text-2xl ml-2">
                  {qrCodeDisplay.banknumber}
                </span>
                <br />
              </div>
              <div className="flex flex-row justify-center items-center text-black">
                Tên người nhận:{" "}
                <span className=" text-pink-600 text-2xl ml-2">
                  {qrCodeDisplay.name}
                </span>
                <br />
              </div>
              <div className="flex flex-row justify-center items-center text-black">
                Nội dung:{" "}
                <span className=" text-pink-600 text-2xl ml-2">
                  {qrCodeDisplay.code}
                </span>
                <br />
              </div>

              <div>
                <div class="flex flex-col justify-between items-center text-pink-600 text-2xl ">
                  <div className="border-solid border-2 border-indigo-500 p-2  ">
                     <Image
                    loader={() => qrCodeDisplay.qrcodebank}
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
                <l class="list-decimal text-black">
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
       </div>
      )}
      </Modal>
      <ModalFailure  ref={modalFailureRef} />

    </div>
  );
});

export default ModalBankPayment;
