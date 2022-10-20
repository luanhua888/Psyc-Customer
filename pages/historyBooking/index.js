import { Button, Table } from "flowbite-react";
import { Formik } from "formik";
import dayjs from "dayjs";
import Image from "next/image";
import heroBanner from "../../public/photos/hero-banner-profile.png";
import profileAvatar from "../../public/photos/profile-avatar.png";
import googleMapReact from "google-map-react";
import { useRouter } from "next/router";

import { useRef, useEffect, useState, Component } from "react";
import { historyService } from "../../services/HistoryService";
import { videoCallService } from "../../services/VideoCallService";

import ModalCancelBooking from "../../components/modal/ModalCancelBooking.js";

export default function Profile() {
  const [isOpen, setisOpen] = useState(false);

  const handleOpen = () => {
    setisOpen(true);
  };

  const handleClose = () => {
    setisOpen(false);
  };
  //
  const router = useRouter();

  const onSubmit = async () => {};

  const onCancel = async () => {
    router.push("/");
  };

  const [historyBooking, setHistoryBooking] = useState([]);
  const [appointmentBooking, setAppointmentBooking] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState({});
  const [roomCall, setRoomCall] = useState([]);
  const [roomCall1, setRoomCall1] = useState([]);

  const [chanelNameRoom, setchanelName] = useState([]);
  const [tokenRoom, settoken] = useState([]);

  const [SlotId, setSlotId] = useState([]);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const data = await historyService.getAppointmentBooking(
          localStorage.getItem("idcustomer")
        );

        if (data.statusCode == 200) {
          setAppointmentBooking(data.data);
        }
      }
    })();
  }, []);

  // const onEnjoy = async () => {

  //   router.push({
  //     pathname: "/videoCall",
  //     query: { roomCall },
  //   });
  // };

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const data = await historyService.getHistoryBooking(
          localStorage.getItem("idcustomer")
        );

        if (data.statusCode == 200) {
          setHistoryBooking(data.data);
        }
      }
    })();
  }, []);

  // console.log(selectedBooking);

  // useEffect(() => {
  //   (async () => {
  //     if (localStorage.getItem("jwttoken")) {
  //       const data = await videoCallService.getRoomAgrora(selectedBooking);

  //       if (data.statusCode == 200) {
  //         setRoomCall(data.data);
  //       }
  //     }
  //   })();
  // }, []);

  return (
    <>
      <section className="bg-blue-300">
        <div className="md:container mx-auto px-24 py-6 ">
          <div className="flex justify-center items-center">
            <div className="flex-1">
              <Image
                className="animate-spin"
                src={heroBanner}
                alt=""
                width={200}
                height={200}
              />
            </div>
            <div className="flex flex-1 justify-center items-center">
              <p className=" text-slate-700 font-bold text-5xl pb-5 border-b-4 border-b-slate-700">
                Lịch sử cuộc hẹn
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Table */}
      <section className="bg-slate-400">
        <div className="md:container mx-auto py-5">
          <main className=" history flex flex-row px-7 py-3 rounded-3xl bg-white">
            <div className="history__body basis-3/4 grow container mx-auto">
              <div className="upcoming ">
                <h3 className="text-center mb-6 text-slate-700 font-bold text-xl pb-5 border-b-4 border-b-slate-700">
                  CUỘC HẸN SẮP DIỄN RA
                </h3>

                <Table hoverable={true}>
                  <Table.Head class="bg-gray-200">
                    {/* <tr class='border border-gray-400'> */}
                    <Table.HeadCell>Stt</Table.HeadCell>
                    <Table.HeadCell>Tên Tư vấn viên</Table.HeadCell>
                    <Table.HeadCell>Chủ đề</Table.HeadCell>
                    <Table.HeadCell>Thời gian</Table.HeadCell>
                    <Table.HeadCell>Thời gian bắt đầu</Table.HeadCell>
                    <Table.HeadCell>Thời gian két thúc</Table.HeadCell>
                    <Table.HeadCell>Trạng thái</Table.HeadCell>
                    <Table.HeadCell>Thao tác</Table.HeadCell>
                    {/* </tr> */}
                  </Table.Head>
                  {appointmentBooking.map((row, index) => (
                    <Table.Body key={index} class="divide-y">
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>{row.id}</Table.Cell>
                        <Table.Cell>{row.consultantName}</Table.Cell>
                        <Table.Cell>Gia đình</Table.Cell>
                        <Table.Cell>{`${dayjs(row.dateSlot).format(
                          "DD/MM/YYYY"
                        )} `}</Table.Cell>
                        <Table.Cell>{row.timeStart}</Table.Cell>
                        <Table.Cell>{row.timeEnd}</Table.Cell>
                       
                        <Table.Cell>Sắp diễn ra</Table.Cell>
                        <Table.Cell>
                          <div className="flex gap-2">
                            <Button
                              onClick={
                                handleOpen 
                              }
                            >
                              Hủy
                            </Button>
                            <ModalCancelBooking
                              className=" w-full sm:w-auto bg-white-80 rounded-lg inline-flex items-center justify-center px-4 py-2.5"
                              isOpen={isOpen}
                              handleClose={handleClose}
                            />

                            <Button
                              onClick={() =>
                                // onEnjoy(row.id) &&
                                router.push({
                                  pathname: "/videoCall",
                                  query: { roomCall: row.id },
                                })
                              }
                            >
                              Tham gia
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))}
                </Table>
              </div>

              <div className="history">
                <h3 className="text-center p-5 mb-6 text-slate-700 font-bold text-xl pb-5 border-b-4 border-b-slate-700">
                  CUỘC HẸN ĐÃ KẾT THÚC
                </h3>
                <Table hoverable={true}>
                  <Table.Head class="bg-gray-200">
                    {/* <tr class='border border-gray-400'> */}
                    <Table.HeadCell>Stt</Table.HeadCell>
                    <Table.HeadCell>Tên Tư vấn viên</Table.HeadCell>
                    <Table.HeadCell>Chủ đề</Table.HeadCell>
                    <Table.HeadCell>Thời gian</Table.HeadCell>
                    <Table.HeadCell>Thời gian bắt đầu</Table.HeadCell>
                    <Table.HeadCell>Thời gian kết thúc</Table.HeadCell>
                    <Table.HeadCell>Trạng thái</Table.HeadCell>
                    <Table.HeadCell>Thao tác</Table.HeadCell>
                    {/* </tr> */}
                  </Table.Head>
                  {historyBooking.map((row, index) => (
                    <Table.Body key={index} class="divide-y">
                      <Table.Row cclassName="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell
                          onClick={() =>
                            setSelectedBooking(row) &&
                            setSlotId(selectedBooking.id)
                          }
                        >
                          {row.id}
                        </Table.Cell>
                        <Table.Cell>{row.consultantName}</Table.Cell>
                        <Table.Cell>Sự nghiệp</Table.Cell>
                        <Table.Cell>{`${dayjs(row.dateSlot).format(
                          "DD/MM/YYYY"
                        )} `}</Table.Cell>
                        <Table.Cell>{row.timeStart}</Table.Cell>
                        <Table.Cell>{row.timeEnd}</Table.Cell>
                        <Table.Cell>Đã kết thúc</Table.Cell>
                        <Table.Cell>
                          <div className="flex gap-2">
                            <Button>Chi tiết</Button>
                            <Button>Tham gia</Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))}
                </Table>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
