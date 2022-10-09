import React from 'react'

export default function history (props) {
  return (
    <>
    <main className=" history flex flex-row">
      
      <div className="history__body basis-3/4 grow container mx-auto">

      <div className="flex flex-row-reverse" style={{marginRight: '24%',
      marginTop: '5%'
    }}>
      <select className=" history__right__select flex flex-row-reverse" style={{width: '100px',
      height: '30px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#f2f2f2',
      marginRight: '10px'
    }}>
          <option value="all">Tất cả</option>
          <option value="upcoming">Sắp tới</option>
          <option value="past">Đã qua</option>
      </select>
      </div>

      <div className="upcoming ">
      <h1 className=" text-center text-black mt-5">Sắp diễn ra</h1>
    <table
      class='table-auto border-collapse border border-gray-400'
      style={{
        width: '75%',
        margin: 'auto',
        marginTop: '20px'
      }}
    >
      <thead class='bg-gray-200'>
        <tr class='border border-gray-400'>
          <th>Stt</th>
          <th>Tên Tư vấn viên</th>
          <th>Chủ đề</th>
          <th>Thời gian</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody class='text-center'>
        <tr class='border border-gray-400'>
          <td>1</td>
          <td>Nguyễn Văn A</td>
          <td>Mối quan hệ - gia đình</td>
          <td>12/12/2022 09:00 - 10:00</td>
          <td>Sắp diễn ra</td>
          <td>
            <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Chi tiết
            </button>
            <button class='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              Tham gia
            </button>
          </td>
        </tr>
      </tbody>
      <tbody class='text-center'>
        <tr class='border border-gray-400'>
          <td>2</td>
          <td>Nguyễn Văn A</td>
          <td>Mối quan hệ - gia đình</td>
          <td>12/12/2022 09:00 - 10:00</td>
          <td>Sắp diễn ra</td>
          <td>
            <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Chi tiết
            </button>
            <button class='bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              Chờ
            </button>
            <button class='bg-red-500 text-white font-bold py-2 px-4 rounded'>
              Hủy
            </button>
          </td>
        </tr>
      </tbody>
      <tbody class='text-center'>
        <tr class='border border-gray-400'>
          <td>3</td>
          <td>Nguyễn Văn A</td>
          <td>Mối quan hệ - gia đình</td>
          <td>12/12/2022 09:00 - 10:00</td>
          <td>Sắp diễn ra</td>
          <td>
            <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Chi tiết
            </button>
            <button class='bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              Chờ
            </button>
            <button class='bg-red-500 text-white font-bold py-2 px-4 rounded'>
              Hủy
            </button>
          </td>
        </tr>
        </tbody>
    </table>
    </div>

    <div className="accomplished">
      <h1 className=" text-center text-black mt-5">Lịch sử</h1>
    <table
      class='table-auto border-collapse border border-gray-400'
      style={{
        width: '75%',
        margin: 'auto',
        marginTop: '20px'
      }}
    >
      <thead class='bg-gray-200'>
        <tr class='border border-gray-400'>
          <th>Stt</th>
          <th>Tên Tư vấn viên</th>
          <th>Chủ đề</th>
          <th>Thời gian</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody class='text-center'>
        <tr class='border border-gray-400'>
          <td>1</td>
          <td>Nguyễn Văn A</td>
          <td>Mối quan hệ - gia đình</td>
          <td>12/12/2022 09:00 - 10:00</td>
          <td>Hoàn thành</td>
          <td>
            <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Chi tiết
            </button>
            <button class='bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              Xóa
            </button>
            
          </td>
        </tr>
      </tbody>
      <tbody class='text-center'>
        <tr class='border border-gray-400'>
          <td>2</td>
          <td>Nguyễn Văn A</td>
          <td>Mối quan hệ - gia đình</td>
          <td>12/12/2022 09:00 - 10:00</td>
          <td>Hoàn thành</td>
          <td>
            <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Chi tiết
            </button>
            <button class='bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              Xóa
            </button>
            
          </td>
        </tr>
      </tbody>
      <tbody class='text-center'>
        <tr class='border border-gray-400'>
          <td>3</td>
          <td>Nguyễn Văn A</td>
          <td>Mối quan hệ - gia đình</td>
          <td>12/12/2022 09:00 - 10:00</td>
          <td>Hoàn thành</td>
          <td>
            <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Chi tiết
            </button>
            <button class='bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              Xóa
            </button>
            
          </td>
        </tr>
      </tbody>
    </table>
    </div>
      </div>
    </main>
   
    </>
    

    
  )
}
