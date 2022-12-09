import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { useRef, useEffect, useState, Component } from "react";
import { zodiacService } from "../../services/ZodiacService";

import service5 from "../../public/photos/icon/service5.svg";
import service6 from "../../public/photos/icon/service6.svg";
import service7 from "../../public/photos/icon/service7.svg";
import astroRoundedImg from "../../public/photos/astro-rounded.png";
import { Select } from "flowbite-react";
import { values } from "lodash";
import ModalDailyHorocop from "../../components/modal/ModalDailyHorocop";
import { userService } from "../../services/UserService";

export default function DailyHoroscop() {
  const router = useRouter();

  const modalDailyHorocopRef = useRef();

  const [zodiac, setZodiac] = useState([]);
  const [zodiacId, setZodiacId] = useState(1);
  const [day, setDay] = useState("");
  const [dayLy, setDaily] = useState("");

  const handleOpenModalDailyHoroscop = async (a) => {
    modalDailyHorocopRef.current?.open();
    // getDaily();
    // console.log("a", a);

    const data = await userService.getDailyHorocop(zodiacId, a);
    if (data.statusCode == 200) {
      setDaily(data.data[0]);
    }
  };


  useEffect(() => {
    (async () => {
      const data = await userService.getZodiacId(
        localStorage.getItem("idcustomer")
      );

      if (data.statusCode == 200) {
        setZodiacId(data.data[0].zodiacId);
      }
    })();
  }, []);

  return (
    <div className="justify-center items-center flex bg-[#17384e]  mx-[8%] p-[10%] mt-[1%] rounded-md shadow-md gap-[2%]">
     
     <div className="sm:w-[300px]   ">
            <div
              className="as_service_box text-center  cursor-pointer  bg-[#07273c] rounded-md pt-[10%] hover:text-[#ff7010]"
              onClick={() =>
                handleOpenModalDailyHoroscop(
                  dayjs().subtract(1, "day").format("YYYY-MM-DD")
                )
              }
              style={{
                // cỡ chữ nhỏ nhất là 12px
                fontSize: "clamp(10px, 1.5vw, 24px)",
              }}
            >
              <span className="as_icon">
                <Image src={service5} height={40} width={40} alt="" />
              </span>
              <h4 className="as_subheading">Hôm Qua</h4>
              <h5>{dayjs().subtract(1, "day").format("DD/MM/YYYY")}</h5>
              <button
                className="text-white btnViewDaily font-bold px-10 mt-2 py-2  mb-[2%] hover:bg-[#031d2e]
                  "
                onClick={() =>
                  handleOpenModalDailyHoroscop(
                    dayjs().subtract(1, "day").format("YYYY-MM-DD")
                  )
                }
              >
                Xem
              </button> 
            </div>
          </div>

          <div className="sm:w-[300px]  ">
            <div
              className="as_service_box text-center  cursor-pointer  bg-[#07273c] rounded-md pt-[10%] hover:text-[#ff7010]"
              onClick={() =>
                handleOpenModalDailyHoroscop(dayjs().format("YYYY-MM-DD"))
              }
              style={{
                fontSize: "clamp(10px, 1.5vw, 24px)",
              }}
            >
              <span className="as_icon">
                <Image src={service6} height={40} width={40} alt="" />
              </span>
              <h4 className="as_subheading ">Hôm Nay</h4>
              <h5>{dayjs().format("DD/MM/YYYY")}</h5>
              <button
                className="text-white btnViewDaily font-bold px-10 mt-2 py-2  mb-[2%]
                  "
                onClick={() =>
                  handleOpenModalDailyHoroscop(dayjs().format("YYYY-MM-DD"))
                }
              >
                Xem
              </button>
            </div>
          </div>


          <div className="sm:w-[300px]  ">
            <div
              className="as_service_box text-center  cursor-pointer  bg-[#07273c] rounded-md pt-[10%] hover:text-[#ff7010]"
           onClick={() =>
                handleOpenModalDailyHoroscop(
                  dayjs().add(1, "day").format("YYYY-MM-DD")
                )
              }
              style={{
                // cỡ chữ nhỏ nhất là 12px
                fontSize: "clamp(10px, 1.5vw, 24px)",
              }}
            >
              <span className="as_icon">
                <Image src={service7} height={40} width={40} alt="" />
              </span>
              <h4 className="as_subheading">Ngày Mai</h4>
              <h5>{dayjs().add(1, "day").format("DD-MM-YYYY")}</h5>
              <button
                className="text-white btnViewDaily font-bold px-10 mt-2 py-2 mb-[2%]
                  "
                  onClick={() =>
                handleOpenModalDailyHoroscop(
                  dayjs().add(1, "day").format("YYYY-MM-DD")
                )
              }
              >
                Xem
              </button>
            </div>
          </div>

     

      <ModalDailyHorocop id={dayLy} ref={modalDailyHorocopRef} />
    </div>
  );
}
