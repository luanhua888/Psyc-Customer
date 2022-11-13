import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import ModalRegister from "./modal/ModalRegister";
import ModalLogin from "./modal/ModalLogin";
import logo from "../public/logo.png";
import iconProfile from "../public/icon_profile.png";
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
    <nav className="shadow-2xl">
      <div className="md:container mx-auto py-3">
        <div className="flex justify-between items-center ">
          <div className="flex gap-3 justify-center items-center">
            <Image src={logo} alt="" />
            <div className="flex flex-col font-bold ">
              <span>PSYC</span>
              <span>Psychological Counselling</span>
            </div>
          </div>
          <ul className="flex gap-5">
            <li>
              <a
                onClick={() => router.push("/")}
                className="pb-2 hover:border-b-2
                                hover:border-indigo-700 cursor-pointer"
              >
                {" "}
                Trang chủ
              </a>
            </li>
            <li>
              <a
                className="pb-2 hover:border-b-2 hover:border-indigo-700 cursor-pointer"
                onClick={() => router.push("/RoomLive")}
              >
                Trực tiếp
              </a>
            </li>
            <li>
              <a
                href="#"
                className="pb-2 hover:border-b-2 hover:border-indigo- cursor-pointer"
                onClick={() => router.push("/chat")}
                
              >
                Đặt Lịch
              </a>
            </li>
            <li>
              <a
                href="#"
                className="pb-2 hover:border-b-2 hover:border-indigo- cursor-pointer"
              >
                Tương thích cặp đôi
              </a>
            </li>
            <li>
            <Dropdown
                label={"Dịch vụ"
                }
                inline={true}
              >
              <Dropdown.Item onClick={() => router.push("/Survey")}>
                Bài khảo sát
                </Dropdown.Item>
              </Dropdown>
            </li>
          </ul>
          {Object.keys(user).length >= 1 ? (
            <div className="flex justify-center items-center gap-5">
              {crab.map((item) => {
                return (
                  <div
                    key={item}
                    className="flex justify-center items-center gap-2"
                  >
                    <span>Số dư tài khoản: {item.crab} Gem</span>
                  </div>
                );
              })}

              <Dropdown
                label={
                  <Image src={iconProfile} alt="" width={35} height={35} />
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
                <Dropdown.Item onClick={() => router.push("/historyBooking")}>
                  Lịch sử cuộc hẹn
                </Dropdown.Item>
                <Dropdown.Item onClick={() => router.push("/historyDeposit")}>
                Lịch sử nạp tiền
                </Dropdown.Item>
                <Dropdown.Item onClick={() => router.push("/Payment")}>
                Nạp tiền
                </Dropdown.Item>
                <Dropdown.Item onClick={onLogout}>Đăng xuất</Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-3 font-semibold  ">
              <a
                className="bg-indigo-300 rounded px-3 py-2 cursor-pointer hover:bg-indigo-500 hover:ring"
                onClick={() => modalLoginRef.current?.open()}
              >
                Đăng nhập
              </a>
              <a
                className="bg-indigo-300 rounded px-3 py-2 cursor-pointer hover:bg-indigo-500 hover:ring"
                onClick={() => modalRegisterRef.current?.open()}
              >
                Đăng ký
              </a>
            </div>
          )}
        </div>
      </div>

      <ModalRegister ref={modalRegisterRef} />
      <ModalLogin ref={modalLoginRef} />
    </nav>
  );
}
