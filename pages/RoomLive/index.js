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

import nolive from "../../public/no_live.png";
import { Skeleton } from "antd";

export default function RoomLive(props) {
  const { consultants } = props;
  const router = useRouter();
  const modalLoginRef = useRef();
  const modalBookingRef = useRef();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

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
    });
  };

  return (
    <>
      <section id="services" className="bg-[#031d2e]">
        <div>
          <div className="justify-center items-center flex flex-col bg-[#17384e]  mx-[8%] p-[10%] mt-[1%] rounded-md shadow-md">
            <p className=" text-[#ff7010] font-bold md:text-5xl mb-[5%] border-b-4 border-b-[#ff7010]">
              Các Phòng Live Stream
            </p>
            <div className=" grid grid-cols-3  gap-[2%] ">
              {consultants.map((row, key) => (
                <div key={key}>
                  <div className="flex flex-row justify-center items-center px-[10%] 
                  "
                 
                  >
                    <div
                      className="rounded-lg shadow-lg bg-white max-w-[300px] sm:w-[300px] min-w-[80px]  "
                      onClick={() => onJoin(row.id)}
                    >
                      <a href="#!" className="flex flex-row justify-center">
                        <Image
                          loader={() => row.imageUrl}
                          src={row.imageUrl}
                          alt=""
                          height={150}
                          width={150}
                        />
                      </a>
                      <div className="p-[4%] ">
                        <h5
                          className="text-gray-900 sm:text-xl font-medium mb-2 flex justify-center "
                          style={{
                            fontSize: "clamp(10px, 1.5vw, 20px)",
                          }}
                        >
                          {row.consultantName}
                        </h5>
                        <span
                          className="flex flex-row justify-center items-center text-xs"
                          style={{
                            fontSize: "clamp(10px, 1.5vw, 20px)",
                          }}
                        >
                          {row.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
