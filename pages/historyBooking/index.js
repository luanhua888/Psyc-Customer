import { Button, Table, Pagination, Tabs } from "flowbite-react";
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
    getAppointmentBooking();
    setisOpen(false);
  };
  //
  const router = useRouter();

  const onSubmit = async () => {};

  const onCancel = async () => {
    router.push("/");
  };

  const [selectedBooking, setSelectedBooking] = useState({});
  const [roomCall, setRoomCall] = useState([]);
  const [roomCall1, setRoomCall1] = useState([]);

  const [chanelNameRoom, setchanelName] = useState([]);
  const [tokenRoom, settoken] = useState([]);

  const [SlotId, setSlotId] = useState([]);

  const pageCount = 5;
  const formRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);

  const [historyBooking, setHistoryBooking] = useState([]);
  const [appointmentBooking, setAppointmentBooking] = useState([]);

  const getAppointmentBooking = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await historyService.getAppointmentBookingDefault(
        localStorage.getItem("idcustomer"),
        currentPage,
        5
      );

      if (data.statusCode == 200) {
        setAppointmentBooking(data.data);
      }
    }
  }

  useEffect(() => {
    (async () => {
      getAppointmentBooking();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const data = await historyService.getHistoryBookingDefault(
          localStorage.getItem("idcustomer"),
          currentPage,
          5
        );

        if (data.statusCode == 200) {
          setHistoryBooking(data.data);
        }
      }
    })();
  }, []);

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
      <section className="bg-slate-400  items-center">
        <div className="md:container mx-auto py-5">
          <main className="px-7 py-3 rounded-3xl bg-white">
            <div >
              <Tabs.Group
                class="flex flex-col sm:flex-row items-center justify-center underline-offset-1"
                aria-label="Tabs with icons"
               style="underline"
              >
                {/* Appointment */}
                <Tabs.Item
                  title="CUỘC HẸN SẮP DIỄN RA"
                  // icon={}
                >
                  <div className="upcoming">
                    <Table hoverable={true}>
                      <Table.Head class="bg-gray-200">
                        {/* <tr class='border border-gray-400'> */}
                        <Table.HeadCell>STT</Table.HeadCell>
                        <Table.HeadCell>Tên Tư vấn viên</Table.HeadCell>
                        <Table.HeadCell>Chủ đề</Table.HeadCell>
                        <Table.HeadCell>Thời gian</Table.HeadCell>
                        <Table.HeadCell>Thời gian bắt đầu</Table.HeadCell>
                        <Table.HeadCell>Thời gian két thúc</Table.HeadCell>
                        <Table.HeadCell>Trạng thái</Table.HeadCell>
                        <Table.HeadCell></Table.HeadCell>
                        {/* </tr> */}
                      </Table.Head>
                      {appointmentBooking.map((row, index) => (
                        <Table.Body key={(index = 0)} class="divide-y">
                          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{row.consultantName}</Table.Cell>
                            <Table.Cell>Gia đình</Table.Cell>
                            <Table.Cell>{`${dayjs(row.dateSlot).format(
                              "DD/MM/YYYY"
                            )} `}</Table.Cell>
                            <Table.Cell>{row.timeStart}</Table.Cell>
                            <Table.Cell>{row.timeEnd}</Table.Cell>
                            <Table.Cell>{row.id}</Table.Cell>

                            <Table.Cell>Sắp diễn ra</Table.Cell>
                            <Table.Cell>
                              <div className="flex gap-2">
                                <Button onClick={handleOpen}>Hủy</Button>
                                <ModalCancelBooking
                                  id={row.id}
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
                  <div className=" items-center justify-center text-center">
                    <Pagination
                      currentPage={currentPage}
                      layout="pagination"
                      onPageChange={async (page) => {
                        setCurrentPage(page);
                        if (localStorage.getItem("jwttoken")) {
                          const { data } =
                            await historyService.getAppointmentBooking(
                              localStorage.getItem("idcustomer"),
                              5,
                              page
                            );
                          if (data) {
                            setAppointmentBooking(data);
                          }
                        }
                      }}
                      showIcons={true}
                      totalPages={pageCount}
                    />
                  </div>
                </Tabs.Item>
                {/* History Booking */}
                <Tabs.Item
                  title="CUỘC HẸN ĐÃ KẾT THÚC"
                  // icon={}
                >
                  <div className="history">
                    <Table hoverable={true}>
                      <Table.Head class="bg-gray-200">
                        {/* <tr class='border border-gray-400'> */}
                        <Table.HeadCell>STT</Table.HeadCell>
                        <Table.HeadCell>Tên Tư vấn viên</Table.HeadCell>
                        <Table.HeadCell>Chủ đề</Table.HeadCell>
                        <Table.HeadCell>Thời gian</Table.HeadCell>
                        <Table.HeadCell>Thời gian bắt đầu</Table.HeadCell>
                        <Table.HeadCell>Thời gian kết thúc</Table.HeadCell>
                        <Table.HeadCell>Trạng thái</Table.HeadCell>
                        <Table.HeadCell></Table.HeadCell>
                        {/* </tr> */}
                      </Table.Head>
                      {historyBooking.map((row, index) => (
                        <Table.Body key={index} class="divide-y">
                          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell
                              onClick={() =>
                                setSelectedBooking(row) &&
                                setSlotId(selectedBooking.id)
                              }
                            >
                              {index + 1}
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
                    <div className="flex items-center justify-center text-center">
                      <Pagination
                        currentPage={currentPage}
                        layout="pagination"
                        onPageChange={async (page) => {
                          setCurrentPage(page);
                          if (localStorage.getItem("jwttoken")) {
                            const { data } =
                              await historyService.getHistoryBooking(
                                localStorage.getItem("idcustomer"),
                                5,
                                page
                              );
                            if (data) {
                              setHistoryBooking(data);
                            }
                          }
                        }}
                        showIcons={true}
                        totalPages={pageCount}
                      />
                    </div>
                  </div>
                </Tabs.Item>
              </Tabs.Group>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
