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

    router.push({
      pathname: "/LiveStream",
      query: { roomLive: consultant },
    })
  };

  return (
    <>
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
                        onJoin(row.id)
                        
                        
                      
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
