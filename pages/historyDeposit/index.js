import { Button, Table, Pagination, Tabs } from "flowbite-react";
import { Formik } from "formik";
import dayjs from "dayjs";
import Image from "next/image";
import heroBanner from "../../public/photos/hero-banner-profile.png";
import { useRouter } from "next/router";

import { useRef, useEffect, useState, Component } from "react";

import { depositService } from "../../services/DepositService";
// import Datepicker from 'flowbite-datepicker/Datepicker';

export default function HistoryDeposit() {
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

  const pageCount = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const [historyBooking, setHistoryBooking] = useState([]);
  const [appointmentBooking, setAppointmentBooking] = useState([]);
  const [pageTotal, setPageTotal] = useState([]);
  const [date, setDate] = useState();

  const getHistoryDeposit = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await depositService.getAllDepositDefault(
        localStorage.getItem("idcustomer"),
        currentPage,
        5
      );

      if (data.statusCode == 200) {
        setAppointmentBooking(data.data);
        setPageTotal(data.totalpage);
      }
    }
  };

  const getHistory = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await depositService.getAllDepositWithdrawal(
        localStorage.getItem("idcustomer"),
        currentPage,
        5
      );

      if (data.statusCode == 200) {
        setHistoryBooking(data.data);
      }
    }
  };

  console.log("pageTotal", pageTotal);
  console.log("date", date);

  //Withdraw

  //Deposit
  useEffect(() => {
    (async () => {
      getHistoryDeposit();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const data = await depositService.getAllDeposit(
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
                Lịch Sử Giao Dịch
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Table */}
      <section className="bg-slate-400  items-center">
        <div className="md:container mx-auto py-5">
          <main className="px-7 py-3 rounded-3xl bg-white">
            <h1 className="text-center mb-6 text-slate-700 font-bold text-3xl pb-5 border-b-4 border-b-slate-700">
              LỊCH SỬ NẠP TIỀN
            </h1>

            <div className="">
              <div className="flex flex-col">
                <div className=" w-full">
                  <div class=" w-1/4 mb-2 flex flex-row gap-2 float-right  ">
                    <div class="flex absolute inset-y-0 right-0 items-center  pointer-events-none"></div>
                    <input
                      datepicker
                      datepicker-autohide
                      type="date"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg cursor-pointer focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                      onChange={(e) => {
                        setDate(e.target.value);
                        // && getAppointmentBooking();
                      }}
                    />
                    <input
                      datepicker
                      datepicker-autohide
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />

                    <button
                      type="button"
                      class="inline-flex items-center px-5  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => {
                        getAppointmentBooking();
                      }}
                    >
                      Tìm Kiếm
                    </button>
                  </div>
                </div>

                <div className="historyDeposit">
                  <Table hoverable={true}>
                    <Table.Head class="bg-gray-200">
                      {/* <tr class='border border-gray-400'> */}
                      <Table.HeadCell>STT</Table.HeadCell>
                      <Table.HeadCell>Tên Tư vấn viên</Table.HeadCell>
                      <Table.HeadCell>Số Gem</Table.HeadCell>
                      <Table.HeadCell>Thời gian</Table.HeadCell>
                      <Table.HeadCell>Trạng thái</Table.HeadCell>
                      <Table.HeadCell></Table.HeadCell>
                      {/* </tr> */}
                    </Table.Head>
                    {appointmentBooking.map((row, index) => (
                      <Table.Body key={(index = 0)} class="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell>{index + 1}</Table.Cell>
                          <Table.Cell>{row.customerName}</Table.Cell>
                          <Table.Cell>{row.amount}</Table.Cell>
                          <Table.Cell>{`${dayjs(row.dateCreate).format(
                            "DD/MM/YYYY"
                          )} `}</Table.Cell>
                          <Table.Cell>
                            {row.status == "success"
                              ? "Thành công"
                              : "Không thành công"}
                          </Table.Cell>
                          <Table.Cell>{row.hashcode}</Table.Cell>

                          {/* <Table.Cell>
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
                            </Table.Cell> */}
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
                        const { data } = await depositService.getAllDeposit(
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
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
