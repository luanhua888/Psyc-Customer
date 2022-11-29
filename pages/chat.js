import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import _, { values } from "lodash";

import searchIcon from "../public/photos/icon/search.png";
import { consultantService } from "../services/ConsultantService";
import ModalLogin from "../components/modal/ModalLogin";
import { userService } from "../services/UserService";
import ModalBooking from "../components/modal/ModalBooking";
import ModalConsultantDetail from "../components/modal/ModalConsultantDetail";
import { Dropdown } from "flowbite-react";
import iconProfile from "../public/icon_profile.png";


import Skeleton from '@mui/material/Skeleton';

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
        setLoading(true)
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
          setConsultants(data2.data);
        }
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
      {loading ? (
               <div>
               <div className="px-[20%] flex flex-row justify-end items-end mt-2">
                  <Skeleton width={200} height={50} />
               </div>
         
                 <div className="md:container mx-auto px-[10%] pt-4 flex flex-col">
                  
                     <div className=" flex-wrap justify-between grid gap-x-2 gap-y-4 grid-cols-3">
                     <Skeleton width={300} height={400} />
                     <Skeleton width={300} height={400} />
                     <Skeleton width={300} height={400} />
                     </div>
                   
                   
                 </div>
                 </div>
      
      ):(
        <div>
        <div className="px-[20%] flex flex-row justify-end items-end mt-2">
            <div className="max-w-[250px] flex flex-row justify-center m-2 items-end">
              <label
                for="gender"
                class="block mb-2 text-sm font-medium text-[#ff7010] dark:text-gray-400"
              >
                {}
              </label>
  
              <select
                id="gender"
                name="gender"
                class=" rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                value={valueType}
                onChange={(e) => getConsultant(e.target.value)}
              >
                {typeConSultant.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              {/* <div className="pl-4">
              <Image
                className="
                     
                          "
                src={searchIcon}
                alt=""
                width={50}
                height={50}
                onClick={() => getConsultant()}
              />
              </div> */}
            </div>
          </div>
  
          <div className="md:container mx-auto px-[10%] pt-12 flex flex-col">
            {consultants != null ? (
              <div className=" flex-wrap justify-between grid gap-x-2 gap-y-4 grid-cols-3">
                {consultants.map((row, index) => (
                  <div
                    key={index}
                    className="bookingBox flex flex-col   bg-white rounded-xl shadow-lg p-2"
                  >
                    <div className="flex flex-col">
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
  
                      <div className="flex flex-col gap-2 justify-center items-center text-black">
                        <div className="text-lg font-medium cursor-pointer hover:text-amber-500 text-black">
                          {row.fullName}
                        </div>
                        <div className="text-[#807f7f] text-sm text-black">
                          Giới tính: {row.gender == "Male" ? "Nam" : "Nữ"}
                        </div>
                        {/* <div className="text-[#807f7f] text-sm text-black">
                          Địa chỉ: {row.address}
                        </div> */}
                        <div className="text-[#807f7f] text-sm text-black">
                          Cấp độ: {row.experience}
                        </div>
                        <div className="text-[#807f7f] text-sm text-black">
                          Chuyên môn: {row.specialName}
                        </div>
                      </div>
                    </div>
  
                    <div className=" flex flex-row justify-center items-center gap-[2%] ">
                      <button
                        className=" bg-[#ff7010] h-10 w-20 rounded-xl text-white font-medium hover:bg-[#031d2e]" 
                        onClick={() => onChat(row)}
                      >
                        Đặt lịch
                      </button>
  
                
                      <button
                        className=" bg-[#ff7010] h-10 w-20 rounded-xl text-white font-medium hover:bg-[#031d2e]"
                        onClick={() => onViewDetail(row.consultantId)}
                      >
                        Chi Tiết       
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
          </div>
      )
      }
      <ModalLogin ref={modalLoginRef} />
      <ModalBooking ref={modalBookingRef} />
      <ModalConsultantDetail id={consultantDetail} consultant={consultantDetail1} ref={modalConsultantDetail} />
    </>
  );
}
