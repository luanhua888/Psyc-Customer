import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import ModalRegister from "./modal/ModalRegister";
import ModalChangePassword from "../components/modal/ModalChangePassword.js";
import ModalLogin from "./modal/ModalLogin";
import logo from "../public/logo1.png";
import iconProfile from "../public/icon_profile.png";
import iconGem from "../public/photos/icon/gem.png";
import iconHeadPhone from "../public/photos/icon/headphone.svg";
import iconOutline from "../public/photos/icon/menu-burger.png";
import iconMail1 from "../public/photos/icon/mail1.svg";
import iconReload from "../public/photos/reload.png";
import { userService } from "../services/UserService";
import { Dropdown } from "flowbite-react";
import { walletService } from "../services/WalletService";
import { collectFromHash } from "@fullcalendar/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import DropdownButton from "antd/lib/dropdown/dropdown-button";

export default function Navbar() {
  const router = useRouter();

  const modalRegisterRef = useRef();
  const modalChangePasswordRef = useRef();
  const modalLoginRef = useRef();

  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState({});
  const [crab, setCrab] = useState([]);

  const handleOpenModalChangePassword = () => {
    modalChangePasswordRef.current.open();
  };

  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  const handleNav = () => {
    setNav(!nav);
  };

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

  // console.log(localStorage.getItem("iddb"));

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const data = await userService.getUser(
          localStorage.getItem("idcustomer")
        );

        if (data.statusCode == 200) {
          setAvatar(data.data[0]);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      reloadGem();
    })();
  }, []);

  const onLogout = () => {
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("iddb");
    localStorage.removeItem("idcustomer");
    router.push("/");
    setUser({});
  };

  const handleLogout = () => {
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("iddb");
    localStorage.removeItem("idcustomer");
    router.push("/");
    setUser({});

    handleNav();
  };

  const handleOpenModalRegister = () => {
    modalRegisterRef.current.open();
    handleNav();
  };

  const handleOpenModalLogin = () => {
    modalLoginRef.current?.open();
    handleNav();
  };

  const handleHomePage = () => {
    router.push("/");
    handleNav();
  };

  const handleLivePage = () => {
    router.push("/RoomLive");
    handleNav();
  };

  const handleBookingPage = () => {
    router.push("/chat");
    handleNav();
  };

  const handleProfilePage = () => {
    router.push("/profile");
    handleNav();
  };

  const handleHisBookingPage = () => {
    router.push("/historyBooking");
    handleNav();
  };

  const handleHisDepositPage = () => {
    router.push("/historyDeposit")
    handleNav();
  };

  const handlePayment = () => {
    router.push("/Payment")
    handleNav();
  };

  const reloadGem = async () => {
    if (localStorage.getItem("jwttoken")) {
      const dataWallet = await walletService.getWallet(
        localStorage.getItem("idcustomer")
      );

      if (dataWallet.statusCode == 200) {
        setCrab(dataWallet.data);
        // console.log(dataWallet.data);
      }
    }
  }


  return (
    <div className="">
      <div className="flex justify-between px-[10%] p-[1%] shadow-md bg-[#17384e] ">
        <div className="flex px-[1%]  items-center ">
          {/* logo */}
          <div>
            {" "}
            <Image
              src={logo}
              alt=""
              className="sm:w-[100px] sm:h-[100px] object-contain min-h[20px] min-w-[20px] cursor-pointer"
            />
          </div>
          {/* title */}
          <div className="flex flex-col text-white md:text-2xl">
            <span>PSYC</span>
            <span>Psychological Counselling</span>
          </div>
        </div>

        <div className=" flex-col justify-center gap-[14%] hidden xl:flex">
          {/* 1 */}
          <div className="flex justify-center items-center">
            <Image src={iconMail1} alt="" width={25} height={25} className="" />
            <span className="text-amber-600  ml-1 justify-center items-center inline-flex ">
              Liên hệ qua email:{" "}
            </span>
            <span className="text-white flex  ml-1 justify-center items-center hover:border-b-2 hover:border-amber-600 cursor-pointer">
              PsychologicalCounselling@gmail.com
            </span>
          </div>
          {/* 2 */}
          <div className="flex  items-center">
            <Image
              src={iconHeadPhone}
              alt=""
              width={25}
              height={25}
              className=""
            />
            <span className="text-amber-600   ml-1 justify-center items-center inline-flex ">
              Liên hệ sô điện thoại:{" "}
            </span>
            <span className="text-white flex  ml-1 justify-center items-center hover:border-b-2 hover:border-amber-600 cursor-pointer">
              + 84 961449383
            </span>
          </div>
        </div>

        <div
          className=" flex-col justify-center gap-[10%]  hidden xl:flex"
          style={{ backgroundColor: `${color}` }}
        >
          {/* login */}
          {Object.keys(user).length >= 1 ? (
            <div className="flex flex-row justify-end items-center mx-[1%] gap-[5%] ">
              {crab.map((item) => {
                return (
                  <div key={item} className="flex flex-row justify-end">



                    <span className="text-amber-600">
                        <Image src={iconReload} alt="" width={15} height={15} className="cursor-pointer "  onClick={reloadGem}/>
                      {" "}
                      Số dư tài khoản:{" "}
                      <span className="text-white ">
                        {item.gem}
                        <Image src={iconGem} alt="" width={15} height={15} />
                      </span>
                    </span>
                  </div>
                );
              })}

              <div className="">
                <Dropdown
                  label={
                    <Image
                      loader={() => avatar.imageUrl}
                      src={iconProfile}
                      alt=""
                      width={35}
                      height={35}
                      className="rounded-full my-[1%]"
                    />
                  }
                  arrowIcon={false}
                  inline={true}
                  className="flex justify-center items-center  "
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
                  <Dropdown.Item onClick={() => router.push("/historyBooking")}>
                    Lịch sử cuộc hẹn
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => router.push("/historyDeposit")}>
                    Lịch sử nạp tiền
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => router.push("/Payment")}>
                    Nạp tiền
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleOpenModalChangePassword}>
                    Đổi mật khẩu
                  </Dropdown.Item>
                  <Dropdown.Item onClick={onLogout}>Đăng xuất</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          ) : (
            <div className="flex justify-end items-end  font-semibold ml-[4%]  mb-[2%]">
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

          {/* menu */}
          <div className=" flex text-white justify-end">
            <ul className="flex flex-row gap-2  ">
              <li>
                <a
                  onClick={() => router.push("/")}
                  className="p-2 hover:border-b-2 hover:border-amber-600 cursor-pointer hover:text-amber-600"
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  className="p-2 hover:border-b-2 hover:border-amber-600 cursor-pointer hover:text-amber-600"
                  onClick={() => router.push("/RoomLive")}
                >
                  Trực tiếp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="p-2 hover:border-b-2 hover:border-amber-600 cursor-pointer hover:text-amber-600"
                  onClick={() => router.push("/chat")}
                >
                  Đặt Lịch
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="p-2 hover:border-b-2 hover:border-amber-600 cursor-pointer hover:text-amber-600"
                  onClick={() => router.push("/Survey")}
                >
                  Bài Khảo sát
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ModalRegister ref={modalRegisterRef} />
        <ModalLogin ref={modalLoginRef} />
        <ModalChangePassword ref={modalChangePasswordRef} />
      </div>

      <div
        className="absolute xl:hidden   right-3 top-5 ease-in"
        onClick={handleNav}
      >
        {nav ? (
          <></>
        ) : (
          <div className="flex">
            <Image
              src={iconOutline}
              alt=""
              width={30}
              height={30}
              className=" my-[1%] "
              style={{ color: `${textColor}` }}
            />
          </div>
        )}
      </div>

      <div
        className={
          nav
            ? "xl:hidden absolute  top-0 left-0 right-0 bottom-0 flex justify-center items-center text-center ease-in duration-300 w-full h-full bg-[#031d2e] bg-opacity-500 z-50 "
            : "xl:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center text-center ease-in duration-300 w-full h-full bg-[#031d2e] bg-opacity-50 z-50 text-[#ff7010]"
        }
      >
        {
          <div
            className="absolute xl:hidden   right-3 top-5 ease-in"
            onClick={handleNav}
          >
            {nav ? (
              <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
            ) : (
              <Image
                src={iconOutline}
                alt=""
                width={30}
                height={30}
                className=" my-[1%] "
                style={{ color: `${textColor}` }}
              />
            )}
          </div>
        }

        <div className="absolute top-2 left-2 flex">
          {crab.map((item) => {
            return (
              <div key={item} className="flex flex-row justify-end  ">
                <span className="text-[#ff7010]  ">
                  {" "}
                  Số dư tài khoản:{" "}
                  <span className="text-white ">
                    {item.gem}
                    <Image src={iconGem} alt="" width={15} height={15} />
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        <ul className="flex flex-col gap-2 font-bold text-white ">
          <li>
            {Object.keys(user).length >= 1 ? (
              <a className="block text-md font-medium truncate  text-[#ff7010]  text-2xl">
                <Dropdown
                  label={user.email + "▼"}
                  arrowIcon={false}
                  inline={true}
                  className="flex justify-center items-center "
                >
                  <Dropdown.Item onClick={() => handleProfilePage()}>
                    Thông tin
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      router.push("/historyBooking") && handleNav()
                    }
                  >
                    Lịch sử cuộc hẹn
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => router.push("/historyDeposit")}>
                    Lịch sử nạp tiền
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => router.push("/Payment")}>
                    Nạp tiền
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleOpenModalChangePassword}>
                    Đổi mật khẩu
                  </Dropdown.Item>
                </Dropdown>
              </a>
            ) : (
              <div className="flex flex-row gap-5 justify-end ">
                <a
                  className="hover:border-b-2
                                hover:border-amber-600 cursor-pointer
                                hover:text-amber-600
                                text-[#ff7010] text-2xl
                                "
                  onClick={() => handleOpenModalLogin()}
                >
                  Đăng nhập
                </a>

                <a
                  className="hover:border-b-2
                                hover:border-amber-600 cursor-pointer
                                hover:text-amber-600
                                text-[#ff7010]
                                text-2xl
                                "
                  onClick={() => handleOpenModalRegister()}
                >
                  Đăng ký
                </a>
              </div>
            )}
          </li>
          <li className="py-[5%]">
            <a
              onClick={() => handleHomePage()}
              className="p-2 hover:border-b-2
                                hover:border-amber-600 cursor-pointer
                                hover:text-amber-600
                                text-[#ff7010] text-2xl
                                "
            >
              Trang chủ
            </a>
          </li>
          <li className="py-[5%]">
            <a
              onClick={() => handleProfilePage()}
              className="p-2 hover:border-b-2
                                hover:border-amber-600 cursor-pointer
                                hover:text-amber-600
                                text-[#ff7010] text-2xl
                                "
            >
              Thông Tin
            </a>
          </li>
          <li className="py-[5%]">
            <a
              onClick={() => handleHisBookingPage()}
              className="p-2 hover:border-b-2
                                hover:border-amber-600 cursor-pointer
                                hover:text-amber-600
                                text-[#ff7010] text-2xl
                                "
            >
              Lịch sử cuộc hẹn
            </a>
          </li>
          <li className="py-[5%]">
            <a
              onClick={() => handleHisDepositPage()}
              className="p-2 hover:border-b-2
                                hover:border-amber-600 cursor-pointer
                                hover:text-amber-600
                                text-[#ff7010] text-2xl
                                "
            >
              Lịch sử nạp tiền
            </a>
          </li>
          <li className="py-[5%]">
            <a
              onClick={() => handlePayment()}
              className="p-2 hover:border-b-2
                                hover:border-amber-600 cursor-pointer
                                hover:text-amber-600
                                text-[#ff7010] text-2xl
                                "
            >
              Nạp tiền
            </a>
          </li>
          <li className="py-[5%]">
            <a
              className="p-2 hover:border-b-2 hover:border-amber-600 cursor-pointer hover:text-amber-600  text-[#ff7010] text-2xl"
              onClick={() => handleLivePage()}
            >
              Trực tiếp
            </a>
          </li>
          <li className="py-[5%]">
            <a
              href="#"
              className="p-2 hover:border-b-2 hover:border-amber-600 cursor-pointer hover:text-amber-600  text-[#ff7010] text-2xl"
              onClick={() => handleBookingPage()}
            >
              Đặt Lịch
            </a>
          </li>
          <li className="py-[5%]">
            <a
              href="#"
              className="p-2 hover:border-b-2 hover:border-amber-600 cursor-pointer
                      hover:text-amber-600
                      text-[#ff7010] text-2xl
                      
                      "
              onClick={() => router.push("/Survey")}
            >
              Bài Khảo sát
            </a>
          </li>
          <li>
            <a
              onClick={handleLogout}
              className=" text-[#ff7010] text-2xl"
              // tắt nav khi logout
            >
              Đăng xuất
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
