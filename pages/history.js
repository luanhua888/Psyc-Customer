import React from "react";
import { Button, Table } from "flowbite-react";

export default function history(props) {
  return (
    <>
      <main className=" history flex flex-row">
        <div className="history__body basis-3/4 grow container mx-auto">
          <div
            className="flex flex-row-reverse"
            style={{ marginRight: "24%", marginTop: "5%" }}
          >
            <select
              className=" history__right__select flex flex-row-reverse"
              style={{
                width: "100px",
                height: "30px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#f2f2f2",
                marginRight: "10px",
              }}
            >
              <option value="all">Tất cả</option>
              <option value="upcoming">Sắp tới</option>
              <option value="past">Đã qua</option>
            </select>
          </div>

          <div className="upcoming ">
          <h3 className="text-center mb-6 text-slate-700 font-bold text-xl pb-5 border-b-4 border-b-slate-700">
              Sắp diễn ra
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
