import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Button,
  DialogActions,
} from "@mui/material";
import Image from "next/image";
import avatarImg from "../public/photos/avatar.jpeg";
import { useEffect, useRef, useState } from "react";
import { payMentService } from "../services/PayMentService";

const ModalQrCode = ({ title, subtitle, children, isOpen, handleClose,}) => {
  const handleConfirm = () => {
    alert("You Agreed!");
    handleClose();
  };



  // function countdown( elementName, minutes, seconds )
  // {
  //   var element= document.getElementById(elementName);

  //     var  endTime, hours, mins, msLeft, time;
  //     function twoDigits( n )
  //     {
  //         return (n <= 9 ? "0" + n : n);
  //     }

  //     function updateTimer()
  //     {
  //         msLeft = endTime - (+new Date);
  //         if ( msLeft < 1000 ) {
  //             element.innerHTML = "Time is up!";
  //         } else {
  //             time = new Date( msLeft );
  //             hours = time.getUTCHours();
  //             mins = time.getUTCMinutes();
  //             element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
  //             setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
  //         }
  //     }

  //     element = document.getElementById( elementName );
  //     endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
  //     updateTimer();
  // }

  // countdown( "ten-countdown", 10, 0 );

  //payment
  const sdt = "5545";
  const name = "s";
  const amount = "1100";
  const [qrCode, setQrCode] = useState();

  useEffect(() => {
    (async () => {
      const data = await payMentService.getQrCode(sdt, name, amount);
      if (data.statusCode == 200) {
        setQrCode(data.data[0]);
      }
    })();
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="justify-center items-center w-full m-100"
    >
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
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/Desposit%2Flogo-momo-png-2.png?alt=media&token=53a3ea95-c76b-4943-a0ae-34403acc617f"
                    alt="logo momo"
                    class="w-10 h-10"
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
                  id="ten-countdown"
                  class=" justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 bg-pink-700 text-white border-r-2"
                >
                  10:00
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
              200.000
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
          {qrCode && (
            <div key={index} class="row">
              <div   class="mt-10 mr-10 ml-10 justify-between items-center text-pink-600 text-2xl">
                <Image
                  loader={() => item.link}
                  className="rounded-full"
                  src={avatarImg}
                  alt=""
                  width={75}
                  height={75}
                />
              </div>
            </div>
         )}
        </div>
      </div>
    </Dialog>
  );
};

export default ModalQrCode;
