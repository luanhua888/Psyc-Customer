import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import _, { values } from "lodash";

import avatarImg from "../public/photos/avatar.jpeg";
import { consultantService } from "../services/ConsultantService";
import ModalLogin from "../components/modal/ModalLogin";
import { userService } from "../services/UserService";
import ModalBooking from "../components/modal/ModalBooking";

export default function Chat(props) {
  const { consultants } = props;
  console.log("consultants", consultants);

  const modalLoginRef = useRef();
  const modalBookingRef = useRef();

  const [user, setUser] = useState({});

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

  const onChat = (consultant) => {
    if (_.isEmpty(user)) {
      modalLoginRef.current.open();
      return;
    }
    console.log(user);

    modalBookingRef.current.open(consultant);
  };

  return (
    <>
      <section>
        <div className="md:container mx-auto px-[10%] pt-12">
          {consultants != null ? (




            <div className=" flex-wrap justify-between grid gap-x-2 gap-y-4 grid-cols-3">
              {consultants.map((row, index) => (
                <div
                  key={index}
                  className="bookingBox flex flex-col  bg-white rounded-xl shadow-lg p-2"
                >
                  <div className="grid grid-cols-2 gap-1 ">
                    <div className="flex flex-col gap-2  justify-center items-center ">
                      <div className="w-[75px] h-[75px]  vertical-align rounded-full bg-gradient-to-bl from-amber-300 to-amber-800">
                        <Image
                          loader={() => row.imageUrl}
                          className="
                        rounded-full
                        "
                          src={avatarImg}
                          alt=""
                          width={75}
                          height={75}
                        />
                      </div>
                      <div class="flex items-center ">
                        {Array.apply(null, {
                          length: 5,
                        })
                          .map(Number.call, Number)
                          .map((num, index) => {
                            let stateStar = "text-yellow-400";

                            if (num >= row.rating) {
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
                    </div>

                    <div className="flex flex-col gap-2 text-black">
                      <div className="text-lg font-medium cursor-pointer hover:text-amber-500 text-black">
                        {row.fullName}
                      </div>
                      <div className="text-[#807f7f] text-sm text-black">
                        Giới tính: {row.gender == "Male" ? "Nam" : "Nữ"}
                      </div>
                      <div className="text-[#807f7f] text-sm text-black">
                        Địa chỉ: {row.address}
                      </div>
                      <div className="text-[#807f7f] text-sm text-black">
                        Kinh nghiệm: {row.experience} năm
                      </div>
                    </div>
                  </div>
                  
                  <div className=" flex flex-row justify-center items-center ">
                    <button
                      className=" bg-[#ff7010] h-10 w-20 rounded-xl text-white font-medium"
                      onClick={() => onChat(row)}
                    >
                      Đặt lịch
                    </button>

                  </div>
                </div>
              ))}
            </div>





          ) : (
            <div className=" px-7 text-[#ff7010] bg-[#17384e] p-4 rounded-xl shadow-lg flex flex-row justify-center items-center text-3xl">
              <span>Hiện Tại Không Có Tư Vấn Viên Nào</span>
            </div>
          )}
        </div>
      </section>
      <ModalLogin ref={modalLoginRef} />
      <ModalBooking ref={modalBookingRef} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { data: consultants } = await consultantService.getAll();

  return {
    props: {
      consultants,
    },
  };
}
