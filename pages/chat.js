import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import _, { values } from "lodash";

import searchIcon from "../public/photos/icon/search.png";
import { consultantService } from "../services/ConsultantService";
import ModalLogin from "../components/modal/ModalLogin";
import { userService } from "../services/UserService";
import ModalBooking from "../components/modal/ModalBooking";
import ModalConsultantDetail from "../components/modal/ModalConsultantDetail";
import { Dropdown, Select } from "flowbite-react";
import iconProfile from "../public/icon_profile.png";

import Skeleton from "@mui/material/Skeleton";
import { Rating } from "@mui/material";

export async function getServerSideProps(context) {
  const { req, res } = context;
  const { token } = req.cookies;
  if (!token) {
    res.writeHead(302, { Location: "/" });
    res.end();
  }
  return {
    props: {},
  };
}


export default function Chat(props) {
  const modalLoginRef = useRef();
  const modalBookingRef = useRef();
  const modalConsultantDetail = useRef();
  const [user, setUser] = useState({});
  const [typeConSultant, setTypeConSultant] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [consultantDetail, setConsultantDetail] = useState([]);
  const [consultantDetail1, setConsultantDetail1] = useState([]);
  const [idConsultant, setIdConsultant] = useState(0);
  const [valueType, setValueType] = useState("");
  const [loading, setLoading] = useState(true);

  console.log("consultantDetail", consultantDetail);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const data = await userService.profile(localStorage.getItem("iddb"));
        const data1 = await consultantService.getTypeConsultant();
        const data2 = await consultantService.getAll();

        if (data.statusCode == 200) {
          setUser(data.data[0]);
        }

        if (data1.statusCode == 200) {
          setTypeConSultant(data1.data);
        }

        if (data2.statusCode == 200) {
          console.log("alloalao", data2.data);
          setConsultants(data2.data);
          setLoading(false);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data1 = await consultantService.getTypeConsultant();
      const data2 = await consultantService.getAll();

      if (data1.statusCode == 200) {
        setTypeConSultant(data1.data);
      }

      if (data2.statusCode == 200) {
        console.log("alloalao", data2.data);
        setConsultants(data2.data);
        setLoading(false);
      }
    })();
  }, []);

  const getConsultant = async (type) => {
    const data = await consultantService.getAll(type);

    if (data.statusCode == 200) {
      setConsultants(data.data);
    }
  };

  const onChat = (consultant) => {
    if (_.isEmpty(user)) {
      modalLoginRef.current.open();
      return;
    }
    console.log(user);

    modalBookingRef.current.open(consultant);
  };

  const onViewDetail = async (id) => {
    modalConsultantDetail.current.open(id);
    const data = await consultantService.getConsultantDetail(id);
    const data1 = await consultantService.getConsultantDetail1(id);

    if (data.statusCode == 200) {
      setConsultantDetail(data.data);
    }
    if (data1.statusCode == 200) {
      setConsultantDetail1(data1.data);
    }
  };

  return (
    <>
      <div></div>
      {loading ? (
        //skeleton
        <div>
          <div className="px-[20%] flex flex-row justify-end items-end mt-2">
            <Skeleton width={200} height={50} />
          </div>
          <div className="md:container mx-auto  flex flex-col justify-center items-center ">
            <div className=" justify-between grid gap-x-2 gap-y-4 grid-cols-3 mt-[5%] ">
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height="200px"
                className="mb-4 rounded-2xl"
              />
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height="200px"
                className="mb-4 rounded-2xl"
              />
              <Skeleton
                variant="rect"
                width="300px"
                height="200px"
                className="mb-4 rounded-2xl"
              />
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height="200px"
                className="mb-4 rounded-2xl"
              />
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height="200px"
                className="mb-4 rounded-2xl"
              />
              <Skeleton
                variant="rect"
                width="300px"
                height="200px"
                className="mb-4 rounded-2xl"
              />
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height="200px"
                className="mb-4 rounded-2xl"
              />
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height="200px"
                className="mb-4 rounded-2xl"
              />
              <Skeleton
                variant="rect"
                width="300px"
                height="200px"
                className="mb-4 rounded-2xl"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-row justify-center mt-[2%]">
            <span
              className=" text-white w-auto md:text-4xl flex flex-row justify-center mb-2 border-b-2 border-[#ff7010] "
              style={{
                fontSize: "clamp(25px, 1.5vw, 26px)",
                //c??n gi???a
              }}
            >
              DANH S??CH C??C T?? V???N VI??N
            </span>
          </div>
          <div className="sm:px-[20%] flex flex-row justify-end items-end mt-2">
            <div className="max-w-[250px] flex flex-row justify-center m-2 items-end">
              <label
                for="gender"
                class="block mb-2 text-sm font-medium text-[#ff7010] dark:text-gray-400"
              >
                {}
              </label>

              <div className="flex gap-5">
                <div>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    class=" rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                    placeholder="T??m ki???m"
                    onChange={(e) => {
                      getConsultant(e.target.value);
                    }}
                  />
                </div>

                <Select
                  id="gender"
                  name="gender"
                  class=" rounded border-collapse outline-[#5c7383] w-1 outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                  value={valueType}
                  onChange={(e) => getConsultant(e.target.value)}
                >
                  {typeConSultant.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          {consultants.length > 0 ? (
            <div className="md:container mx-auto px-[10%] pt-12 flex flex-col">
              {consultants != null ? (
                <div className=" flex-wrap justify-between grid gap-x-2 gap-y-4 grid-cols-3">
                  {consultants.map((row, index) => (
                    <div
                      key={index}
                      className="bookingBox flex flex-col min-w-[100px]  bg-white rounded-xl shadow-lg p-2"
                    >
                      <div className="flex flex-col min-w-[80px]">
                        <div className="flex flex-col gap-2  justify-center items-center ">
                          <div className="w-[75px] h-[75px]  vertical-align rounded-full bg-gradient-to-bl from-amber-300 to-amber-800 shadow-sm">
                            <Image
                              loader={() => row.imageUrl}
                              className="
                          rounded-full shadow-sm
                          "
                              src={searchIcon}
                              alt=""
                              width={75}
                              height={75}
                            />
                          </div>

                          <div class="flex items-center ">
                            <Rating
                              name="simple-controlled"
                              value={row.rating}
                              precision={0.5}
                              readOnly
                              style={{
                                fontSize: "clamp(10px, 1.5vw, 20px)",
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 justify-center items-center text-black">
                          <div
                            className="text-lg font-medium cursor-pointer hover:text-amber-500 text-black"
                            style={{
                              fontSize: "clamp(10px, 1.5vw, 20px)",
                            }}
                          >
                            {row.fullName}
                          </div>
                          <div
                            className="text-[#807f7f] text-sm text-black"
                            style={{
                              fontSize: "clamp(10px, 1.5vw, 20px)",
                            }}
                          >
                            Gi???i t??nh: {row.gender == "Male" ? "Nam" : "N???"}
                          </div>
                          {/* <div className="text-[#807f7f] text-sm text-black">
                          ?????a ch???: {row.address}
                        </div> */}
                          <div
                            className="text-[#807f7f] text-sm text-black"
                            style={{
                              fontSize: "clamp(10px, 1.5vw, 20px)",
                            }}
                          >
                            C???p ?????: {row.experience}
                          </div>
                          <div
                            className="text-[#807f7f] text-sm text-black"
                            style={{
                              fontSize: "clamp(10px, 1.5vw, 20px)",
                            }}
                          >
                            Chuy??n m??n:{" "}
                            {/* ch??? hi???n 2 chuy??n m??n ?????u ti??n, n???u c?? nhi???u h??n 2 th?? hi???n th??m 1 d???u ..., n???u r???ng th?? hi???n ch??? "Ch??a c?? chuy??n m??n" */}
                            {row.specialization.length > 0
                              ? row.specialization.length > 2
                                ? row.specialization[0] +
                                  ", " +
                                  row.specialization[1] +
                                  "..."
                                : row.specialization[0] +
                                  ", " +
                                  row.specialization[1]
                              : "Ch??a c?? chuy??n m??n"}
                          </div>
                        </div>
                      </div>

                      <div className=" flex flex-row justify-center items-center gap-[2%] ">
                        <button
                          className=" bg-[#ff7010] h-10 w-20 rounded-xl text-white font-medium hover:bg-[#031d2e]"
                          onClick={() => onChat(row)}
                          style={{
                            fontSize: "clamp(10px, 1.5vw, 20px)",
                          }}
                        >
                          ?????t l???ch
                        </button>

                        <button
                          className=" bg-[#ff7010] h-10 w-20 rounded-xl text-white font-medium hover:bg-[#031d2e]"
                          onClick={() => onViewDetail(row.id)}
                          style={{
                            fontSize: "clamp(10px, 1.5vw, 20px)",
                          }}
                        >
                          Chi Ti???t
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className=" px-7 text-[#ff7010] bg-[#17384e] p-4 rounded-xl shadow-lg flex flex-row justify-center items-center md:text-3xl">
                  <span>Hi???n T???i Kh??ng C?? T?? V???n Vi??n N??o</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center md:text-4xl mt-[10%] text-[#ff7010]">Kh??ng T??m Th???y K???t Qu??? T??m Ki???m</div>
          )}
        </div>
      )}
      <ModalLogin ref={modalLoginRef} />
      <ModalBooking ref={modalBookingRef} />
      <ModalConsultantDetail
        id={consultantDetail}
        consultant={consultantDetail1}
        ref={modalConsultantDetail}
      />
    </>
  );
}
