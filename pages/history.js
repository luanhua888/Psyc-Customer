import { Button, Table } from "flowbite-react";
import { Formik } from "formik";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { historyService } from "../services/HistoryService";






export default function history() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [historyBooking, setHistoryBooking] = useState({});

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const data = await historyService.getHistoryBooking(
          localStorage.getItem("idcustomer")
        );

        if (data.statusCode == 200) {
          setHistoryBooking(data.data[0]);
        }
      }
    })();
  }, []);

  return (
    <>
    {/* <section className="bg-blue-300">
        <div className="md:container mx-auto px-24 py-12 ">
          <div className="flex justify-center items-center">
            <div className="flex-1">
              <Image
                className="animate-spin"
                src={herobanner}
                alt=""
                width={250}
                height={250}
              />
            </div>
            <div className="flex flex-1 justify-center items-center">
              <p className=" text-slate-700 font-bold text-5xl pb-5 border-b-4 border-b-slate-700">
                Thông tin cá nhân
              </p>
            </div>
          </div>
        </div>
      </section> */}
      <main className=" history flex flex-row">
        <div className="history__body basis-3/4 grow container mx-auto">
        
         
         
      






          <div className="upcoming ">
          <h3 className="text-center mb-6 text-slate-700 font-bold text-xl pb-5 border-b-4 border-b-slate-700">
              Sắp diễn ra
            </h3>
            {historyBooking && historyBooking.length > 0 ? (
            <Table hoverable={true}>
              <Table.Head class="bg-gray-200">
                {/* <tr class='border border-gray-400'> */}
                <Table.HeadCell>Stt</Table.HeadCell>
                <Table.HeadCell>Tên Tư vấn viên</Table.HeadCell>
                <Table.HeadCell>Chủ đề</Table.HeadCell>
                <Table.HeadCell>Thời gian</Table.HeadCell>
                <Table.HeadCell>Trạng thái</Table.HeadCell>
                <Table.HeadCell>Thao tác</Table.HeadCell>
                {/* </tr> */}
              </Table.Head>
              <Table.Body class="divide-y">
                <Table.Row class="border border-gray-400">
                  <Table.Cell>{historyBooking.id}</Table.Cell>
                  <Table.Cell>{historyBooking.dateSlot}</Table.Cell>
                  <Table.Cell>Mối quan hệ - gia đình</Table.Cell>
                  <Table.Cell>12/12/2022 09:00 - 10:00</Table.Cell>
                  <Table.Cell>Sắp diễn ra</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Chi tiết
                      </Button>
                      <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Tham gia
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
              <Table.Body className="divide-y">
                <Table.Row class="border border-gray-400">
                  <Table.Cell>2</Table.Cell>
                  <Table.Cell>Nguyễn Văn A</Table.Cell>
                  <Table.Cell>Mối quan hệ - gia đình</Table.Cell>
                  <Table.Cell>12/12/2022 09:00 - 10:00</Table.Cell>
                  <Table.Cell>Sắp diễn ra</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded focus:outline-none focus:shadow-outline">
                        Chi tiết
                      </Button>
                      <Button class="bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Chờ
                      </Button>
                      <Button class="bg-red-500 text-white font-bold py-2 px-4 rounded">
                        Hủy
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>3</Table.Cell>
                  <Table.Cell>Nguyễn Văn A</Table.Cell>
                  <Table.Cell>Mối quan hệ - gia đình</Table.Cell>
                  <Table.Cell>12/12/2022 09:00 - 10:00</Table.Cell>
                  <Table.Cell>Sắp diễn ra</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button>Chi tiết</Button>
                      <Button>Chờ</Button>
                      <Button>Hủy</Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          ) : ( <div className="text-center">Bạn chưa có lịch hẹn nào</div> )}
          </div>






          <div className="history ">
            <h3 className="text-center mb-6 text-slate-700 font-bold text-xl pb-5 border-b-4 border-b-slate-700">
              Lịch sử cuộc hẹn
            </h3>
            <Table hoverable={true}>
              <Table.Head class="bg-gray-200">
                {/* <tr class='border border-gray-400'> */}
                <Table.HeadCell>Stt</Table.HeadCell>
                <Table.HeadCell>Tên Tư vấn viên</Table.HeadCell>
                <Table.HeadCell>Chủ đề</Table.HeadCell>
                <Table.HeadCell>Thời gian</Table.HeadCell>
                <Table.HeadCell>Trạng thái</Table.HeadCell>
                <Table.HeadCell>Thao tác</Table.HeadCell>
                {/* </tr> */}
              </Table.Head>
              <Table.Body class="divide-y">
                <Table.Row class="border border-gray-400">
                  <Table.Cell>1</Table.Cell>
                  <Table.Cell>Nguyễn Văn A</Table.Cell>
                  <Table.Cell>Mối quan hệ - gia đình</Table.Cell>
                  <Table.Cell>12/12/2022 09:00 - 10:00</Table.Cell>
                  <Table.Cell>Sắp diễn ra</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Chi tiết
                      </Button>
                      <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Tham gia
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
              <Table.Body className="divide-y">
                <Table.Row class="border border-gray-400">
                  <Table.Cell>2</Table.Cell>
                  <Table.Cell>Nguyễn Văn A</Table.Cell>
                  <Table.Cell>Mối quan hệ - gia đình</Table.Cell>
                  <Table.Cell>12/12/2022 09:00 - 10:00</Table.Cell>
                  <Table.Cell>Sắp diễn ra</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Chi tiết
                      </Button>
                      <Button class="bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Chờ
                      </Button>
                      <Button class="bg-red-500 text-white font-bold py-2 px-4 rounded">
                        Hủy
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>3</Table.Cell>
                  <Table.Cell>Nguyễn Văn A</Table.Cell>
                  <Table.Cell>Mối quan hệ - gia đình</Table.Cell>
                  <Table.Cell>12/12/2022 09:00 - 10:00</Table.Cell>
                  <Table.Cell>Sắp diễn ra</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button>Chi tiết</Button>
                      <Button>Chờ</Button>
                      <Button>Hủy</Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </main>
    </>
  );
}
