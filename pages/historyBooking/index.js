import { Button, Table, Pagination, Tabs, Toast } from "flowbite-react";
import { Formik } from "formik";
import dayjs from "dayjs";
import Image from "next/image";
import heroBanner from "../../public/photos/zodiac.png";
import profileAvatar from "../../public/photos/profile-avatar.png";
import googleMapReact from "google-map-react";
import { useRouter } from "next/router";
import joinIcon from "../../public/photos/icon/join.png";
import voteIcon from "../../public/photos/icon/cross-circle.png";
import rateIcon from "../../public/photos/icon/rating.png";
import searchIcon from "../../public/photos/icon/search.png";
import successIcon from "../../public/photos/icon/checked.png";


import { useRef, useEffect, useState, Component } from "react";
import { historyService } from "../../services/HistoryService";
import { videoCallService } from "../../services/VideoCallService";

import ModalCancelBooking from "../../components/modal/ModalCancelBooking.js";
import ModalVoteRate from "../../components/modal/ModalVoteRate";

export default function HistoryBooking() {
  const [isOpen, setisOpen] = useState(false);

  const modalVoteRateRef = useRef();

  const handleOpen = () => {
    setisOpen(true);
  };

  const handleVoteRate = () => {
    modalVoteRateRef.current?.open();
  };

  const handleClose = () => {
    getAppointmentBooking();
    setisOpen(false);
  };

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
  const [pageTotal, setPageTotal] = useState([]);
  const [pageTotalHistoryBooking, setPageTotalHistoryBooking] = useState([]);
  const [date, setDate] = useState();
  const [bookingId, setBookingId] = useState(0);
  const [btnDisplayToast, setBtnDisplayToast] = useState(true);


  console.log("bookingId", bookingId);
  const getAppointmentBooking = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await historyService.getAppointmentBookingDefault(
        date,
        localStorage.getItem("idcustomer"),
        currentPage,
        5
      );

      if (data.statusCode == 200) {
        setAppointmentBooking(data.data);
        setPageTotal(data.totalpage);
        // console.log("asd", data.totalpage);
      }
    }
  };

  const getHistoryBooking = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await historyService.getHistoryBookingDefault(
        date,
        localStorage.getItem("idcustomer"),
        currentPage,
        5
      );

      if (data.statusCode == 200) {
        setHistoryBooking(data.data);
        setPageTotalHistoryBooking(data.totalpage);
      }
    }
  };

  useEffect(() => {
    (async () => {
      getAppointmentBooking();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      getHistoryBooking();
    })();
  }, []);

  return (
    <>
      <section className="bg-[#031d2e]">
        <div className="md:container mx-auto px-24 py-6  ">
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
              <p className=" text-[#ff7010] font-bold text-5xl pb-5 border-b-4 border-b-[#ff7010]">
                Lịch sử cuộc hẹn
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* toast */}


      <div className="absolute right-10 flex flex-row"
        // không hiển thị
        style={{ display: btnDisplayToast ? "block" : "none" }}
        >
          <Toast
            title="Success"
            autohide
            delay={5000}
          >
            <div className="  h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 ">
              <Image src={successIcon} width={30} height={30}  alt=""
                className="justify-center items-center"
              />

            </div>
            <div className="ml-3 text-sm font-normal">Thành công</div>
            <Toast.Toggle />
          </Toast>
        </div>
      {/* Table */}
      <section className="bg-[#031d2e]  items-center">
        <div className="md:container mx-auto px-[10%] py-5">
          <main className="px-7 py-3 rounded-3xl bg-[#17384e]">
            <div>
              <Tabs.Group
                id="groupTab"
                aria-label="Default tabs"
                style="underline"
                color="white"
              >
                {/* Appointment */}
                <Tabs.Item
                  title="CUỘC HẸN SẮP DIỄN RA"
                  // icon={}
                  className="bg-[#143246] text-[#ff7010] "
                >
                  <div className="flex flex-col">
                    <div className=" w-full">
                      <div class=" w-1/4 mb-2 flex flex-row gap-2 float-right  ">
                        <div class="flex absolute inset-y-0 right-0 items-center  pointer-events-none"></div>
                        <input
                          datepicker
                          datepicker-autohide
                          type="date"
                          class="p-3 rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                          placeholder="Select date"
                          onChange={(e) => {
                            setDate(e.target.value);
                            // && getAppointmentBooking();
                          }}
                        />
                        {/* <input
                  datepicker
                  datepicker-autohide
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
                */}

                        <div className="flex flex-row justify-center items-center">
                          <Image
                            className="cursor-pointer"
                            src={searchIcon}
                            width={30}
                            height={30}
                            alt=""
                            onClick={() => {
                              getAppointmentBooking();
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="upcoming">
                      <Table hoverable={true}>
                        <Table.Head className="bg-[#143246] text-[#ff7010]">
                          {/* <tr class='border border-gray-400'> */}
                          <Table.HeadCell>STT</Table.HeadCell>
                          <Table.HeadCell>Tên Tư vấn viên</Table.HeadCell>
                          <Table.HeadCell>Thời gian</Table.HeadCell>
                          <Table.HeadCell>Thời gian bắt đầu</Table.HeadCell>
                          <Table.HeadCell>Thời gian két thúc</Table.HeadCell>
                          <Table.HeadCell>Trạng thái</Table.HeadCell>
                          <Table.HeadCell></Table.HeadCell>
                          {/* </tr> */}
                        </Table.Head>
                        {appointmentBooking.map((row, index) => (
                          <Table.Body key={(index = 0)} class="divide-y">
                            <Table.Row className="bg-[#2e4b5f] text-white dark:border-gray-700 dark:bg-gray-800 hover:bg-[#455f71]">
                              <Table.Cell className="text-[#ff7010]">
                                {index + 1}
                              </Table.Cell>
                              <Table.Cell>{row.consultantName}</Table.Cell>
                              <Table.Cell>{`${dayjs(row.dateSlot).format(
                                "DD/MM/YYYY"
                              )} `}</Table.Cell>
                              <Table.Cell>{row.timeStart}</Table.Cell>
                              <Table.Cell>{row.timeEnd}</Table.Cell>

                              <Table.Cell>Sắp diễn ra</Table.Cell>
                              <Table.Cell>
                                <div className="flex gap-2">
                                  {/* <Button onClick={handleOpen}>Hủy</Button> */}
                                  <div>
                                    <Image
                                      className="cursor-pointer"
                                      src={voteIcon}
                                      width={40}
                                      height={40}
                                      alt=""
                                      onClick={handleOpen}
                                    />
                                  </div>

                                  <ModalCancelBooking
                                    id={row.id}
                                    className=" w-full sm:w-auto bg-white-80 rounded-lg inline-flex items-center justify-center px-4 py-2.5"
                                    isOpen={isOpen}
                                    handleClose={handleClose}
                                  />

                                  <div>
                                    <Image
                                      className="cursor-pointer"
                                      src={joinIcon}
                                      width={40}
                                      height={40}
                                      alt=""
                                      onClick={() =>
                                        router.push({
                                          pathname: "/videoCall",
                                          query: { roomCall: row.id },
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        ))}
                      </Table>
                    </div>
                    <div className=" items-center justify-center text-center">
                      <Pagination
                        previousLabel="Trước"
                        nextLabel="Sau"
                        currentPage={currentPage}
                        layout="pagination"
                        onPageChange={async (page) => {
                          setCurrentPage(page);
                          if (localStorage.getItem("jwttoken")) {
                            const { data } =
                              await historyService.getAppointmentBooking(
                                date,
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
                        totalPages={pageTotal}
                      />
                    </div>
                  </div>
                </Tabs.Item>

                {/* History Booking */}

                <Tabs.Item
                  title="CUỘC HẸN ĐÃ KẾT THÚC"
                  id="tabItem2"
                  // icon={}
                >
                  <div className="flex flex-col">
                    <div className=" w-full">
                      <div class=" w-1/4 mb-2 flex flex-row gap-2 float-right  ">
                        <div class="flex absolute inset-y-0 right-0 items-center  pointer-events-none"></div>
                        <input
                          datepicker
                          datepicker-autohide
                          type="date"
                          class="p-3 rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                          placeholder="Select date"
                          onChange={(e) => {
                            setDate(e.target.value);
                            // && getAppointmentBooking();
                          }}
                        />
                        {/* <input
                  datepicker
                  datepicker-autohide
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
                */}

                        <div className="flex flex-row justify-center items-center">
                          <Image
                            className="cursor-pointer"
                            src={searchIcon}
                            width={30}
                            height={30}
                            alt=""
                            onClick={() => {
                              getHistoryBooking();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="historyBooking">
                      <Table hoverable={true}>
                        <Table.Head className="bg-[#143246] text-[#ff7010]">
                          {/* <tr class='border border-gray-400'> */}
                          <Table.HeadCell>STT</Table.HeadCell>
                          <Table.HeadCell>Tên Tư vấn viên</Table.HeadCell>
                          <Table.HeadCell>Thời gian</Table.HeadCell>
                          <Table.HeadCell>Thời gian bắt đầu</Table.HeadCell>
                          <Table.HeadCell>Thời gian kết thúc</Table.HeadCell>
                          <Table.HeadCell>Trạng thái</Table.HeadCell>
                          <Table.HeadCell></Table.HeadCell>
                          {/* </tr> */}
                        </Table.Head>
                        {historyBooking.map((row, index) => (
                          <Table.Body key={index} class="divide-y">
                            <Table.Row className="bg-[#2e4b5f] text-white dark:border-gray-700 dark:bg-gray-800 hover:bg-[#455f71]">
                              <Table.Cell
                                onClick={() =>
                                  setSelectedBooking(row) &&
                                  setSlotId(selectedBooking.id)
                                }
                                className="text-[#ff7010]"
                              >
                                {index + 1}
                              </Table.Cell>
                              <Table.Cell>{row.consultantName}</Table.Cell>
                              <Table.Cell>{`${dayjs(row.dateSlot).format(
                                "DD/MM/YYYY"
                              )} `}</Table.Cell>
                              <Table.Cell>{row.timeStart}</Table.Cell>
                              <Table.Cell>{row.timeEnd}</Table.Cell>
                              <Table.Cell>{row.bookingId}</Table.Cell>

                              <Table.Cell>Đã kết thúc</Table.Cell>
                              {/* <Table.Cell>{row.bookingId}</Table.Cell> */}
                              <Table.Cell>
                                <div>
                                  <Image
                                    className="cursor-pointer"
                                    src={rateIcon}
                                    width={40}
                                    height={40}
                                    alt=""
                                    onClick={() =>
                                      handleVoteRate(
                                        setBookingId(row.bookingId)
                                      )
                                    }
                                  />
                                </div>
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        ))}
                      </Table>
                      <div className="flex items-center justify-center text-center">
                        <Pagination
                          previousLabel="Trước"
                          nextLabel="Sau"
                          currentPage={currentPage}
                          layout="pagination"
                          onPageChange={async (page) => {
                            setCurrentPage(page);
                            if (localStorage.getItem("jwttoken")) {
                              const { data } =
                                await historyService.getHistoryBooking(
                                  date,
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
                          totalPages={pageTotalHistoryBooking}
                        />
                      </div>
                    </div>
                  </div>
                </Tabs.Item>
              </Tabs.Group>
            </div>
          </main>
        </div>
      </section>
      <ModalVoteRate id={bookingId} ref={modalVoteRateRef} />
    </>
  );
}
