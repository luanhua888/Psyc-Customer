import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import _ from "lodash";

import avatarImg from "../../public/photos/avatar.jpeg";
import { consultantService } from "../../services/ConsultantService";
import ModalLogin from "../../components/modal/ModalLogin";
import { userService } from "../../services/UserService";
import ModalBooking from "../../components/modal/ModalBooking";
import { liveStreamService } from "../../services/LiveStreamService";
import { useRouter } from "next/router";

export default function RoomLive(props) {
  const { consultants } = props;
  const router = useRouter();
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

  const onJoin = (consultant) => {
    if (_.isEmpty(user)) {
      modalLoginRef.current.open();
      return;
    }
    console.log(user);
  };

  return (
    <>
      {/* <section>
        <div className="md:container mx-auto pt-12">
          <div className="flex flex-wrap justify-between grid gap-x-8 gap-y-4 grid-cols-3">
            {!_.isUndefined(consultants) &&
              !_.isEmpty(consultants) &&
              consultants.map((row, index) => (
                <div
                  key={index}
                  className="flex px-7 bg-white p-4 rounded-xl shadow-lg"
                >
                  <div className="flex ">
                    <div className="flex flex-col gap-2 justify-center items-center pr-3">
                      <div className="w-[75px] h-[75px]  vertical-align rounded-full bg-gradient-to-bl from-blue-300 to-blue-800">
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
                      <div class="flex items-center">
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
                    <div className="flex flex-col gap-2">
                      <div className="text-lg font-medium cursor-pointer hover:text-blue-500">
                        {row.consultantName}
                      </div>
                      <div className="text-[#807f7f] text-sm">
                      </div>
                      <div className="text-[#807f7f] text-sm">
                         {row.description}
                      </div>
                      <div className="text-[#807f7f] text-sm">
                      </div>
                    </div>
                  </div>
                  <div className=" mb-4 ml-4 self-end">
                    <button
                      className="h-10 w-20 text-xs text-center rounded-3xl text-blue-500 border-2 border-blue-500 hover:ring hover:ring-blue-300"
                      onClick={() => onChat(row)}
                    >
                     Tham gia
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </section> */}

      <div className="px-[10%] mt-2">
        {consultants != null ? (
          <div className="consultant__live__orther grid grid-cols-4 gap-4 mt-4   ">
            {consultants.map((row, index) => (
              <div
                key={index}
                class=" consultantBox   "
              >
                <div className="w-full flex flex-col sm:flex-row items-center justify-center ">
                  <Image
                    loader={() => row.imageUrl}
                    className="rounded-full"
                    src={avatarImg}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
                <div class="p-5 ">
                  <a
                    href="#"
                    className="w-full flex flex-col sm:flex-row items-center justify-center "
                  >
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-white dark:text-white">
                      {row.consultantName}
                    </h5>
                  </a>
                  <p class="mb-3 font-normal text-white dark:text-gray-400 w-full flex flex-col sm:flex-row items-center justify-center ">
                    {row.description}
                  </p>
                  <div className="w-full flex flex-col sm:flex-row items-center justify-center ">
                    <a
                      href="#"
                      class="joinBox  inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-[#ff7010] rounded-lg hover:bg-[#17384e] focus:ring-4 focus:outline-none"
                      onClick={() =>
                        router.push({
                          pathname: "/LiveStream",
                          query: { roomLive: row.id },
                        })
                      }
                    >
                      Tham gia  
                      <svg
                        aria-hidden="true"
                        class="ml-2 -mr-1 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="  text-[#ff7010] bg-[#17384e] p-4 rounded-xl shadow-lg flex flex-row justify-center items-center px-[10%] text-3xl">
            <span>Hiện Tại Không Có Phòng Live Trực Tiếp Nào</span>
          </div>
        )}
      </div>

      <ModalLogin ref={modalLoginRef} />
      <ModalBooking ref={modalBookingRef} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { data: consultants } = await liveStreamService.getAll();
  return {
    props: {
      consultants,
    },
  };
}
