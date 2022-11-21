import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import ModalRegister from "./modal/ModalRegister";
import ModalLogin from "./modal/ModalLogin";
import logo from "../public/logo1.png";
import iconProfile from "../public/icon_profile.png";
import iconHeadPhone from "../public/photos/icon/headphone.svg";
import iconMail1 from "../public/photos/icon/mail1.svg";
import { userService } from "../services/UserService";
import { Dropdown } from "flowbite-react";
import { walletService } from "../services/WalletService";
import { collectFromHash } from "@fullcalendar/react";

export default function Navbar() {
  const router = useRouter();

  const modalRegisterRef = useRef();
  const modalLoginRef = useRef();

  const [user, setUser] = useState({});
  const [crab, setCrab] = useState([]);

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

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const dataWallet = await walletService.getWallet(
          localStorage.getItem("idcustomer")
        );

        if (dataWallet.statusCode == 200) {
          setCrab(dataWallet.data);
          // console.log(dataWallet.data);
        }
      }
    })();
  }, []);

  const onLogout = () => {
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("iddb");
    localStorage.removeItem("idcustomer");
    router.push("/");
    setUser({});
  };

  return (
    <div>
      <nav className="shadow-2xl bg-[#17384e]">
        <div className="md:container mx-auto px-[4%] py-3">
          <div className="flex justify-between items-center ">
            <div className="flex gap-3 justify-center items-center float-left pr-1 border-r-2 border-x-[#2e4b5f]">
              <Image src={logo} alt="" width={100} height={100} />
              <div className="flex flex-col font-bold text-white">
                <span>PSYC</span>
                <span>Psychological Counselling</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-white">
              <div className="flex flex-row gap-8 ">
                <div className=" flex flex-row  justify-center items-center gap-4 ">
                  <div className="  ">
                    <span className=" bg-slate-600 py-2 px-2 rounded-full mr-1">
                      <Image
                        src={iconHeadPhone}
                        alt=""
                        width={18}
                        height={15}
                      />
                    </span>
                    <span className="text-amber-600">
                      Mọi thắc mắc liên hệ -{" "}
                    </span>
                    +84 961449388
                  </div>

                  <div className="">
                    <span className=" bg-slate-600 py-2 px-2 rounded-full mr-1">
                      <Image src={iconMail1} alt="" width={18} height={15} />
                    </span>
                    <span className="text-amber-600">Liên hệ qua email - </span>
                    PsychologicalCounselling@gmail.com
                  </div>
                </div>
                {Object.keys(user).length >= 1 ? (
                  <div className="flex justify-center items-center gap-5 ">
                    {crab.map((item) => {
                      return (
                        <div
                          key={item}
                          className="flex justify-center items-center "
                        >
                          <span className="text-amber-600">
                            {" "}
                            Số dư tài khoản:{" "}
                            <span className="text-white">{item.crab} Gem</span>
                          </span>
                        </div>
                      );
                    })}

                    <Dropdown
                      label={
                        <Image
                          src={iconProfile}
                          alt=""
                          width={35}
                          height={35}
                        />
                      }
                      arrowIcon={false}
                      inline={true}
                    >
                      <Dropdown.Header>
                        <span className="block text-md font-bold">
                          {user.userName}
                        </span>
                        <span className="block text-md font-medium truncate">
                          {user.email}
                        </span>
                      </Dropdown.Header>
                      <Dropdown.Item onClick={() => router.push("/profile")}>
                        Thông tin
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => router.push("/historyBooking")}
                      >
                        Lịch sử cuộc hẹn
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => router.push("/historyDeposit")}
                      >
                        Lịch sử nạp tiền
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => router.push("/Payment")}>
                        Nạp tiền
                      </Dropdown.Item>
                      <Dropdown.Item onClick={onLogout}>
                        Đăng xuất
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-3 font-semibold  ">
                    <a
                      className="hover:border-b-2
                                hover:border-amber-600 cursor-pointer
                                hover:text-amber-600"
                      onClick={() => modalLoginRef.current?.open()}
                    >
                      Đăng nhập 
                    </a>
                    /
                    <a
                      className="hover:border-b-2
                                hover:border-amber-600 cursor-pointer
                                hover:text-amber-600"
                      onClick={() => modalRegisterRef.current?.open()}
                    >
                      Đăng ký
                    </a>
                  </div>
                )}
              </div>

              <div className="flex flex-row justify-end border-t-2 pt-2 border-y-[#2e4b5f]">
                <ul className="flex flex-row gap-5 ">
                  <li>
                    <a
                      onClick={() => router.push("/")}
                      className="pb-2 hover:border-b-2
                                hover:border-amber-600 cursor-pointer
                                hover:text-amber-600
                                "
                    >
                      Trang chủ
                    </a>
                  </li>
                  <li>
                    <a
                      className="pb-2 hover:border-b-2 hover:border-amber-600 cursor-pointer hover:text-amber-600"
                      onClick={() => router.push("/RoomLive")}
                    >
                      Trực tiếp
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="pb-2 hover:border-b-2 hover:border-amber-600 cursor-pointer hover:text-amber-600"
                      onClick={() => router.push("/chat")}
                    >
                      Đặt Lịch
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="pb-2 hover:border-b-2 hover:border-amber-600 cursor-pointer
                      hover:text-amber-600
                      
                      "
                    >
                      Tương thích cặp đôi
                    </a>
                  </li>
                  <li className="hover:text-amber-600">
                    {/* hover vào sẽ tự động hiện ra các chức năng */}
                    <Dropdown
                      label={"Dịch vụ"}
                      inline={true}
                      //nếu hover vào thì hiện ra các dịch vụ
                      hover={true}
                      //hover đổi màu chữ
                    >
                      <Dropdown.Item
                        onClick={() => router.push("/Survey")}
                        //màu nền màu xanh
                      >
                        Bài khảo sát
                      </Dropdown.Item>
                    </Dropdown>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <ModalRegister ref={modalRegisterRef} />
        <ModalLogin ref={modalLoginRef} />
      </nav>
    </div>
  );
}
