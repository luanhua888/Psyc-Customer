import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import Router from "next/router";

import MapPicker from "../map/MapPicker";
import Modal from "../modal";
import Image from "next/image";
import profileAvatar from "../../public/photos/profile-avatar.png";
import { userService } from "../../services/UserService";

// eslint-disable-next-line react/display-name
const ModalConsultantDetail = forwardRef((id, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log("id in modal", id);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  return (
    <div className="absolute top-0">
      <Modal
        classes="overflow-hidden max-w-full max-h-full w-[60%] h-auto p-4 bg-white rounded-lg  items-center justify-center bg-[#17384e]"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDiscard={() => console.log("Button discard")}
      >
        <div className="flex flex-row justify-center">
          <span className=" text-white w-2/3 text-2xl flex flex-row justify-center border-b-2 border-[#ff7010] ">
            CHI TIẾT TƯ VẤN VIÊN
          </span>
        </div>
        <div>
          {" "}
          <span className=" text-[#ff7010]">Họ:</span>{" "}
          <span className="text-white"> {id.consultant.fullName}</span>
        </div>
        <div>
          {" "}
          <span className=" text-[#ff7010]">Chuyên môn:</span>{" "}
          <span className="text-white">{id.consultant.specialization}</span>
        </div>
        <div>
          {" "}
          <span className=" text-[#ff7010]">Email:</span>{" "}
          <span className="text-white">{id.consultant.email}</span>
        </div>
        <div>
          <span className=" text-[#ff7010]">Giới tính:</span>{" "}
          <sapn className="text-white">
            {id.consultant.gender == "Male" ? "Nam" : "Nữ"}
          </sapn>
        </div>


        <span className="flex flex-row justify-center items-center text-xl text-[#ff7010]">NHỮNG ĐÁNH GIÁ TỪ KHÁCH HÀNG</span>
        {id.id != "" ? (
        <div className="w-auto max-h-[200px] overflow-auto  mt-[2%] ">
          {id.id.map((row, item) => (
            <div
              key={item}
              className=" bg-[#286289] mt-[1%] mx-[30%] rounded-xl p-[1%] "
            >
              <div className="flex flex-col ">
                {/* name */}
                <div className="text-xl text-[#ff7010]">{row.customerName}</div>
                <div className=" text-[#ff7010]">
                  {row.dateCreate.slice(0, 10)}
                </div>
                {/* rate */}
                <div class="flex flex-row justify-center items-center ">
                  {Array.apply(null, {
                    length: 5,
                  })
                    .map(Number.call, Number)
                    .map((num, index) => {
                      let stateStar = "text-yellow-400";

                      if (num >= row.rate) {
                        stateStar = "text-gray-300 dark:text-gray-500";
                      }

                      return (
                        <svg
                          key={num}
                          aria-hidden="true"
                          class={`w-5 h-5 ${stateStar}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>First star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      );
                    })}
                </div>
                {/* feedback */}
                <div className="flex flex-row justify-center items-center text-white">
                  {row.feedback}
                </div>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="flex flex-row justify-center items-center bg-[#286289] text-white rounded-xl">
            Không có đánh giá nào
          </div>
        )
      }
      </Modal>
    </div>
  );
});

export default ModalConsultantDetail;
