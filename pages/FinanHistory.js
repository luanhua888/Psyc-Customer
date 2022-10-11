import React from 'react'
import { Button, Table, Pagination,Avatar } from "flowbite-react";
import { input } from 'postcss';

export default function FinanHistory() {
  return (
   <>
     <main className="history flex flex-col"> 
  <label className="text-2xl font-bold text-gray bg-gray-100 mt-40 mr-10 ml-40">Lịch sử giao dịch</label>
  <div className="flex justify-center bg-gray-100 mb-2 mr-10 ml-40">
  <label className="flex flex-row justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 mr-2">Thời gian từ:</label>
  <div>
  <input
                                                        type='date'
                                                        id='first_name'
                                                        value={input}
                                                        className='flex-grow border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 mr-2'
                                                        placeholder='Nhập dữ liệu'
                                                        required
                                                    />
  
  </div>
  <div  className="mt-2 ml-2 mr-2">
    đến ngày: 
  </div>
  <div>
  <input
                                                        type='date'
                                                        id='first_name'
                                                        value={input}
                                                        className='flex-grow border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 mr-2'
                                                        placeholder='Nhập dữ liệu'
                                                        required
                                                    />
  </div>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    Tìm kiếm
  </button>
</div>

      <div className="my__payment flex flex-row">
          <div className="history__body basis-1/4 grow container mx-auto bg-gray-100 mr-70 ml-70 mb-20 ml-40">
          <div className="flex flex-row justify-center items-center mt-9">
          <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
          </div>
          <div className="flex justify-center items-center mt-5 text-2xl">
              anhnok01
          </div>
          <div className="flex justify-center items-center text-xl">
            CUA
          </div>
          <div className="flex justify-center items-center text-fuchsia-600 text-2xl">
            300
          </div>
            </div>

          <div className=" history flex flex-col basis-3/4 justify-center items-center bg-gray-100 ml-70 mb-20 ml-2 mr-10">
      <div className="history__body justify-center items-center">
          <div className="history__body__title flex justify-center items-center text-2xl font-bold">
              <h1>Lịch sử giao dịch</h1>
          </div>
      </div>
      <div className='flex flex-col'>
        <div className=''>
        <Table striped={true}>
  <Table.Head>
    <Table.HeadCell>
      Ngày
    </Table.HeadCell>
    <Table.HeadCell>
      Phương thức
    </Table.HeadCell>
    <Table.HeadCell>
      Số tiền
    </Table.HeadCell>

    <Table.HeadCell>
      ID_Financial
    </Table.HeadCell>

    <Table.HeadCell>
      Trạng thái
    </Table.HeadCell>
    <Table.HeadCell>
      Đang xử lý
    </Table.HeadCell>
    <Table.HeadCell>
      Ghi chú
    </Table.HeadCell>
  </Table.Head>
  <Table.Body className="divide-y">

  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
      2022-10-11 21:18:41
      </Table.Cell>
      <Table.Cell>
      Momo Scan
      </Table.Cell>
      <Table.Cell >
      100.0
      </Table.Cell>
      <Table.Cell >
      2911e8a4-8c76-40b6-aa78-540058103f31
      </Table.Cell>
      <Table.Cell className="text-black dark:text-gray-400">
      Đang xử lý
      </Table.Cell>
      <Table.Cell>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Hủy
        </Button>
      </Table.Cell>
      <Table.Cell>
          Giao dịch bị hủy
        </Table.Cell>
    </Table.Row>

    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
      2022-10-11 21:18:41
      </Table.Cell>
      <Table.Cell>
      Momo Scan
      </Table.Cell>
      <Table.Cell >
      100.0
      </Table.Cell>
      <Table.Cell >
      2911e8a4-8c76-40b6-aa78-540058103f31
      </Table.Cell>
      <Table.Cell className="text-green-500 dark:text-gray-400">
      Thành công
      </Table.Cell>
      <Table.Cell>
      </Table.Cell>
      <Table.Cell>
      </Table.Cell>
    </Table.Row>
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
      2022-10-11 21:18:41
      </Table.Cell>
      <Table.Cell>
      Momo Scan
      </Table.Cell>
      <Table.Cell >
      100.0
      </Table.Cell>
      <Table.Cell >
      2911e8a4-8c76-40b6-aa78-540058103f31
      </Table.Cell>
      <Table.Cell className="text-red-600 dark:text-gray-400">
      Quá Hạn
      </Table.Cell>
      <Table.Cell>
      </Table.Cell>
      <Table.Cell>
          Giao dịch bị hủy
        </Table.Cell>
    </Table.Row>
    
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
      2022-10-11 21:18:41
      </Table.Cell>
      <Table.Cell>
      Momo Scan
      </Table.Cell>
      <Table.Cell >
      100.0
      </Table.Cell>
      <Table.Cell >
      2911e8a4-8c76-40b6-aa78-540058103f31
      </Table.Cell>
      <Table.Cell className="text-red-600 dark:text-gray-400">
        Đã hủy
      </Table.Cell>
      <Table.Cell>
      </Table.Cell>
      <Table.Cell>
          Giao dịch bị hủy
        </Table.Cell>
    </Table.Row>
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
      2022-10-11 21:18:41
      </Table.Cell>
      <Table.Cell>
      Momo Scan
      </Table.Cell>
      <Table.Cell >
      100.0
      </Table.Cell>
      <Table.Cell >
      2911e8a4-8c76-40b6-aa78-540058103f31
      </Table.Cell>
      <Table.Cell className="text-red-600 dark:text-gray-400">
        Đã hủy
      </Table.Cell>
      <Table.Cell>
      </Table.Cell>
      <Table.Cell>
          Giao dịch bị hủy
        </Table.Cell>
    </Table.Row>
  </Table.Body>
      </Table>
        </div>
      
      <div className="flex items-center justify-center text-center">
  <Pagination
    currentPage={1}
    layout="pagination"
    showIcons={true}
    totalPages={1000}
    previousLabel="Quay lại"
    nextLabel="Tiếp"
  />
        </div>
      </div>
        </div>
      </div>

      
    </main>
   </>
  )
}
