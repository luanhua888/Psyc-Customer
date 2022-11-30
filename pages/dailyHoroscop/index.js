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

  console.log("dayLy", dayLy);

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
    <div className="">
      <section id="services" className="">
      
        <div className="mx-[10%]  justify-center items-center flex flex-row  mt-[5%] py-6 rounded-2xl bg-[#17384e]  ">
          <div className="flex flex-col justify-between gap-4 ">
            <div className="col-lg-12 jus text-center">
              <h1 className=" w-[40%] justify-center flex flex-row items-center text-white mx-auto text-3xl border-b-2 border-[#ff7010]">
                LÁ PHIẾU TỬ VI
              </h1>
              <p className="as_font14 as_padderBottom5"></p>
            </div>

            <div className="flex flex-row justify-center gap-4 mx-auto  ">
              <div className=" ">
                <div
                  className="as_service_box text-center cursor-pointer py-[10%]  "
                  onClick={() =>
                    handleOpenModalDailyHoroscop(
                      dayjs().subtract(1, "day").format("YYYY-MM-DD")
                    )
                  }

                  //   onClick={() => router.push("/")}
                >
                  <span className="as_icon">
                    <Image src={service5} alt="" />
                  </span>
                  <h4 className="as_subheading">Hôm Qua</h4>
                  <h5>{dayjs().subtract(1, "day").format("DD/MM/YYYY")}</h5>
                  <button
                    className="text-white btnViewDaily font-bold px-10 mt-2 py-2 
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
              <div className="">
                <div
                  className="as_service_box text-center cursor-pointer  py-[10%]"
                  onClick={() =>
                    handleOpenModalDailyHoroscop(dayjs().format("YYYY-MM-DD"))
                  }
                >
                  <span className="as_icon">
                    <Image src={service6} alt="" height={45} width={45} />
                  </span>
                  <h4 className="as_subheading ">Hôm Nay</h4>
                  <h5>
                    {/* lấy ngày hôm nay */}
                    {dayjs().format("DD/MM/YYYY")}
                  </h5>
                  <div>
                    <button className="text-white btnViewDaily font-bold px-10 mt-2 py-2">
                      Xem
                    </button>
                  </div>
                </div>
              </div>
              <div className="">
                <div
                  className="as_service_box text-center cursor-pointer  py-[10%]"
                  onClick={() =>
                    handleOpenModalDailyHoroscop(
                      dayjs().add(1, "day").format("YYYY-MM-DD")
                    )
                  }
                >
                  <span className="as_icon">
                    <Image src={service7} alt="" height={45} width={45} />
                  </span>
                  <h4 className="as_subheading">Ngày Mai</h4>
                  <h5>
                    {/* lấy ngày mai */}
                    {dayjs().add(1, "day").format("DD-MM-YYYY")}
                  </h5>
                  <div>
                    <button className="text-white btnViewDaily font-bold px-10 mt-2 py-2">
                      Xem
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ModalDailyHorocop id={dayLy} ref={modalDailyHorocopRef} />
    </div>
  );
}
