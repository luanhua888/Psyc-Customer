import React from 'react'

export default function LiveStream_r () {
  return (
    <>
    <main>
      {/* roomLive */}
    <div className=" roomBooking flex">
    <div class="flex-none w-1/4">
    banner
  </div>
      <div className="video__stream grow h-10 grid grid-rows-3 grid-flow-col gap-4"style={{marginTop: '4%',height: '700px',backgroundColor:'#30263B',borderRadius: '10px',
      border: '5px solid #30263B'
    }} 
      >
        {/* LiveStream */}
        <div class="video__stream row-span-3  col-span-12" style={{backgroundColor: '#131212'}}> 
        
        </div>
        {/* Chat room */}
      <div class="chat__room row-span-3 col-span-1"
        style={
          {backgroundColor: '#BD7979'
          }
        }
        >
          <div className="chat__room__header flex flex-row-reverse"
          style={{backgroundColor: '#3D083B',height: '50px'}}
          >
            <div className="viewers__liveStream flex flex-row-reverse">
              <h1 style={{color: 'white', marginTop: '10px', marginRight: '10px'}}>1000</h1>
            </div>
            <div className=" time__liveStream flex flex-row-reverse">
              <h1 style={{color: 'white', marginTop: '10px', marginRight: '10px'}}>12:00 - 13:00</h1>
            </div>
            <div className="name__host flex flex-row-reverse">
              <h1 style={{color: 'white', marginTop: '10px', marginRight: '10px'}}>Nguyễn Văn A</h1>
            </div>
            < div className="avatar__host flex flex-row-reverse">
            <img src="https://th.bing.com/th/id/OIP.z8ZH8Cd1lOHkrqB_0rxgAAAAAA?pid=ImgDet&rs=1" alt="avatar" style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
           </div>
          </div>
          <div className="chat__room__body"
          style={{backgroundColor: '#F0E7EF',height: '600px'}}>
            <div className="chat__room__body__message">
              <div className="chat__room__body__message__content flex flex-col">

                <div className="message__content">
                  <h1 style={{color: 'black', marginTop: '10px', marginLeft: '10px'}}>Tuan: Hello</h1>
                </div>

                <div className="message__content">  
                  <h1 style={{color: 'black', marginTop: '10px', marginLeft: '10px'}}>Madara: OMG</h1>
                </div>

                <div className="message__content__host flex flex-row-reverse">
                  <h1 style={{color: 'black', marginTop: '10px', marginRight: '10px', backgroundColor:"#BD7979", padding:"5px", borderRadius:"3px"}}>Solo yasua</h1>
                </div>

              </div>
            </div>
          </div>
        </div>
        </div>  
    <div class="flex-none w-1/4">
    banner
  </div>
</div>

      {/* Consutanlt live orther */}
      <h1 className="text-2xl font-bold text-center text-gray-800 mt-10">Các chuyên gia khác</h1>
      <div className="consultant__live__orther grid grid-cols-4 gap-4 mt-4" style={{marginLeft: '10%', marginRight: '10%'}}>
      <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700
      ">
    {/* <a href="#">
        <img class="rounded-t-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTyW9W41jioWESFi3LEnHzpT8EqQPG4SA1yQ&usqp=CAU" alt="" />
    </a> */}
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chủ Phòng: Năm Căn</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Tôi không làm chính bạn làm.</p>
        <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Tham gia
            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>
      </div>
      
      <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/277177228_530458168645979_1608719967850138988_n.jpg?stp=dst-jpg_s960x960&_nc_cat=107&ccb=1-7&_nc_sid=e3f864&_nc_ohc=59FyXpN7-g0AX87zBOr&_nc_ht=scontent.fsgn5-10.fna&oh=00_AT8R1xRbWGMd5vwRhRXkpYebTJZ00liIEW83nMDo_0kcpA&oe=63468830" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tôi nghèo khó bạn cũng  thế</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Huấn Hoa Hồng</p>
        <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Tham gia
            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>
      </div>

      <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/298734703_6418072631571936_266674629662796090_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=qcbbhTaffeAAX8el-SX&_nc_ht=scontent.fsgn5-5.fna&oh=00_AT-DCNfdoBZRLyXPy5m_-ug744FrBInrd3b-IBPqcaHbwQ&oe=6346F60F" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">10 năm không thể nào nhanh được</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Khá Bảnh</p>
        <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Tham gia
            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>
      </div>

      <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="https://cdn.mos.cms.futurecdn.net/zHPCdAr3tnHmKeih8WViYB-1200-80.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chủ Phòng: Năm Căn</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Tôi không làm chính bạn làm.</p>
        <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Tham gia
            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>
      </div>

      <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="https://cdn.mos.cms.futurecdn.net/zHPCdAr3tnHmKeih8WViYB-1200-80.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chủ Phòng: Năm Căn</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Tôi không làm chính bạn làm.</p>
        <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Tham gia
            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>
      </div>
      </div>
    </main>

        
    </>
  )
}
