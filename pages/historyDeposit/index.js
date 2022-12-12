import { Button, Table, Pagination, Tabs } from "flowbite-react";
import { Formik } from "formik";
import dayjs from "dayjs";
import Image from "next/image";
import heroBanner from "../../public/photos/zodiac.png";
import searchIcon from "../../public/photos/icon/search.png";
import { useRouter } from "next/router";

import { useRef, useEffect, useState, Component } from "react";

import { depositService } from "../../services/DepositService";
// import Datepicker from 'flowbite-datepicker/Datepicker';

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
  const [historyDeposit, setHistoryDeposit] = useState([]);
  const [pageTotal, setPageTotal] = useState([]);
  const [date, setDate] = useState();
  const [search, setSearch] = useState();

  const getHistoryDeposit = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await depositService.getAllDepositDefault(
        localStorage.getItem("idcustomer"),
        currentPage,
        5
      );

      if (data.statusCode == 200) {
        setHistoryDeposit(data.data);
        setPageTotal(data.totalpage);
      }
    }
  };

  const getDepositByDate = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await depositService.getDepositByDate(
        search,
        date,
        localStorage.getItem("idcustomer"),
        5,
        currentPage
      );

      if (data.statusCode == 200) {
        setHistoryDeposit(data.data);
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
      <section className="bg-[#031d2e]">
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
              <p className=" text-[#ff7010] font-bold text-5xl pb-5 border-b-4 border-b-[#ff7010]">
                Lịch Sử Nạp Tiền
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Table */}
      <section className="bg-[#031d2e]  items-center">
        <div className="md:container mx-auto px-[10%] py-5">
          <main className="px-7 py-3 rounded-3xl bg-[#17384e]">
            <h1 className="text-center mb-6 text-[#ff7010] font-bold text-3xl pb-5 border-b-4 border-b-slate-700">
              LỊCH SỬ NẠP TIỀN
            </h1>

            <div className="">
              <div className="flex flex-col">
                <div className=" w-full">
                  <div class=" w-2/4 mb-2 flex flex-row gap-2 float-right  ">
                    <div class="flex absolute inset-y-0 right-0 items-center  pointer-events-none"></div>
                    <input
                      datepicker
                      datepicker-autohide
                      format="dd/MM/yyyy"
                      type="date"
                      class="p-3 rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
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
                      class="p-3 rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                      placeholder="Select date"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <div className="flex flex-row justify-center items-center">
                      <Image
                        className="cursor-pointer"
                        src={searchIcon}
                        width={50}
                        height={50}
                        alt=""
                        onClick={() => {
                          getDepositByDate();
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="historyDeposit">
                  <Table hoverable={true}>
                    <Table.Head className="bg-[#143246] text-[#ff7010]">
                      {/* <tr class='border border-gray-400'> */}
                      <Table.HeadCell>STT</Table.HeadCell>
                      <Table.HeadCell>Code </Table.HeadCell>
                      <Table.HeadCell>Số Tiền</Table.HeadCell>
                      <Table.HeadCell>Số Gem</Table.HeadCell>
                      <Table.HeadCell>Thời gian</Table.HeadCell>
                      <Table.HeadCell>Trạng thái</Table.HeadCell>
                      {/* </tr> */}
                    </Table.Head>
                    {/* nếu historyDeposit.length > 0 thì  */}
                    {historyDeposit.length > 0 ? (
                      <Table.Body class="divide-y">
                        {historyDeposit.map((row, index) => (
                          <Table.Row
                            key={(index = 0)}
                            className="bg-[#2e4b5f] text-white dark:border-gray-700 dark:bg-gray-800 hover:bg-[#455f71]"
                          >
                            <Table.Cell className="text-[#ff7010]">
                              {index + 1}
                            </Table.Cell>
                            <Table.Cell>{row.code}</Table.Cell>
                            <Table.Cell>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(row.amount * 1000)}
                            </Table.Cell>
                            <Table.Cell>{row.amount}</Table.Cell>
                            <Table.Cell>{`${dayjs(row.dateCreate).format(
                              "MM/DD/YYYY"
                            )} `}</Table.Cell>
                            <Table.Cell>
                              {/* nếu status = success thì là thành công 
                          nếu status = waiting thì là đang chờ
                          nếu status = fail thì là thất bại */}
                              {row.status == "success" ? (
                                <span className="text-green-500">
                                  Thành Công
                                </span>
                              ) : row.status == "waiting" ? (
                                <span className="text-yellow-500">
                                  Đang Chờ
                                </span>
                              ) : (
                                <span className="text-red-500">Thất Bại</span>
                              )}
                            </Table.Cell>

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
                        ))}
                      </Table.Body>
                    ) : (
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell
                            colSpan={6}
                            className="text-center  hover:text-white hover:bg-[#455f71]  text-2xl"
                          >
                            Không có dữ liệu
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    )}
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
                          setHistoryDeposit(data);
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
