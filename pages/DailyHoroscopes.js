import React from 'react'

export default function DailyHoroscopes() {
  return (
    <>
    <main className="flex flex-col">
      {/* Content */}
      <div className="flex flex-row">
        <div
        style={{backgroundColor: '#30263B', height: '20vh', width: '100%', marginRight:"10%", marginLeft:"10%", marginTop:"10px", borderRadius:"10px"
      }}
        >
          <h1  className='text-white text-3xl font-bold text-center pt-10'>LÁ PHIẾU HÔM NAY CỦA BẠN</h1>
        </div>
      </div>
        
      {/* Card DailyHoroscopes */}
    <div className="card__dailyHoroscopes flex flex-row justify-center items-center"
      style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}
    >
      

      {/* HÔM QUA */}
    <div class="max-w-sm rounded overflow-hidden shadow-lg mt-5"
      style={{ marginTop: '50px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}
    >
    <div class="font-bold text-xl mb-2 text-center text-gray-900">
      Hôm qua
    </div>
  <img class="w-full" src="https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/zodiac%2Faries.png?alt=media&token=928fed58-c87c-4301-a55c-8e1a3ad53edd" alt="Sunset in the mountains" />
  <div class="px-6 py-4">
    
    <div class="font-bold text-xl mb-2 text-center">Ma Kết</div>
    <p class="text-gray-700 text-base">
      Hôm nay sẽ có cuộc gặp gỡ bất ngờ, không báo trước mang lại cho bạn nhiều cảm xúc lẫn lộn. Tuy nhiện, hãy cẩn thận để tránh xa cám dỗ đấy nhé.
    </p>
  </div>
  <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center">
    <div class="py-3 px-6 border-b border-gray-300 text-gray-900 font-bold text-xl">
      Công việc
    </div>
    <div class="p-6">
      <p class="text-gray-700 text-base mb-4">
          Cơ hội đang mở ra trước mắt bạn, hãy nhanh chóng tận dụng nó để đạt được thành công trong công việc.
      </p>
    </div>
  </div>
    {/* Should and not should */}
  <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center">
    <div class="py-3 px-6 border-b border-gray-300 text-gray-900 font-bold text-xl">
      Tình cảm
    </div>
    <div class="p-6">
      <p class="text-gray-700 text-base mb-4">
          Hôm nay bạn sẽ có cơ hội gặp gỡ người đẹp, hãy nhanh chóng tận dụng cơ hội đó để có thể gặp gỡ được người đó.
      </p>
    </div>
    <div class="grid grid-flow-col auto-rows-max">
      <div class="bg-gray-200 rounded-lg shadow-lg p-4">
        <div class="text-gray-900 font-bold text-xl mb-2">Nên</div>
        <p class="text-gray-700 text-base">
          Gặp bạn bè
        </p>
        <p class="text-gray-700 text-base">
          Nấu ăn
        </p>
      </div>
      <div class="bg-gray-200 rounded-lg shadow-lg p-4">
        <div class="text-gray-900 font-bold text-xl mb-2">Tình yêu</div>
        <p class="text-gray-700 text-base">
          Bỏ bữa
        </p>
        <p class="text-gray-700 text-base">
          Thử vận may
        </p>
      </div>
    </div>
  </div>

  
    {/* Time, color, number, ... */}
    <div class="grid-flow-row gap-4">
      <div class="bg-gray-200 rounded-lg shadow-lg p-4 text-center">
        <div class="text-gray-900 font-bold text-xl mb-2">Thời gian</div>
        <p class="text-gray-700 text-base">
          10h - 12h
        </p>
        <div class="text-gray-900 font-bold text-xl mb-2 ">Màu sắc</div>
        <p class="text-gray-700 text-base">
          Xanh
        </p>

        <div class="text-gray-900 font-bold text-xl mb-2">Số may mắn</div>
        <p class="text-gray-700 text-base">
          3
        </p>
        </div>
    </div>


    <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Ma Kết</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Nhà 1</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Trái Đất</span>
  </div>
    </div>
    {/* HÔM NAY */}
    <div class="max-w-sm rounded overflow-hidden shadow-lg"
      style={{ marginTop: '50px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}
    >
    <div class="font-bold text-xl mb-2 text-center text-gray-900">
      Hôm nay
    </div>
  <img class="w-full" src="https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/zodiac%2Faries.png?alt=media&token=928fed58-c87c-4301-a55c-8e1a3ad53edd" alt="Sunset in the mountains" />
  <div class="px-6 py-4">
    
    <div class="font-bold text-xl mb-2 text-center">Ma Kết</div>
    <p class="text-gray-700 text-base">
      Hôm nay sẽ có cuộc gặp gỡ bất ngờ, không báo trước mang lại cho bạn nhiều cảm xúc lẫn lộn. Tuy nhiện, hãy cẩn thận để tránh xa cám dỗ đấy nhé.
    </p>
  </div>

  {/* Dropdown */}  
  <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center">
    <div class="py-3 px-6 border-b border-gray-300 text-gray-900 font-bold text-xl">
      Công việc
    </div>
    <div class="p-6">
      <p class="text-gray-700 text-base mb-4">
          Cơ hội đang mở ra trước mắt bạn, hãy nhanh chóng tận dụng nó để đạt được thành công trong công việc.
      </p>
    </div>
  </div>
    {/* Should and not should */}
  <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center">
    <div class="py-3 px-6 border-b border-gray-300 text-gray-900 font-bold text-xl">
      Tình cảm
    </div>
    <div class="p-6">
      <p class="text-gray-700 text-base mb-4">
          Hôm nay bạn sẽ có cơ hội gặp gỡ người đẹp, hãy nhanh chóng tận dụng cơ hội đó để có thể gặp gỡ được người đó.
      </p>
    </div>
    <div class="grid grid-flow-col auto-rows-max">
      <div class="bg-gray-200 rounded-lg shadow-lg p-4">
        <div class="text-gray-900 font-bold text-xl mb-2">Nên</div>
        <p class="text-gray-700 text-base">
          Gặp bạn bè
        </p>
        <p class="text-gray-700 text-base">
          Nấu ăn
        </p>
      </div>
      <div class="bg-gray-200 rounded-lg shadow-lg p-4">
        <div class="text-gray-900 font-bold text-xl mb-2">Tình yêu</div>
        <p class="text-gray-700 text-base">
          Bỏ bữa
        </p>
        <p class="text-gray-700 text-base">
          Thử vận may
        </p>
      </div>
    </div>
  </div>
    {/* Time, color, number, ... */}
    <div class="grid-flow-row gap-4">
      <div class="bg-gray-200 rounded-lg shadow-lg p-4 text-center">
        <div class="text-gray-900 font-bold text-xl mb-2">Thời gian</div>
        <p class="text-gray-700 text-base">
          10h - 12h
        </p>
        <div class="text-gray-900 font-bold text-xl mb-2 ">Màu sắc</div>
        <p class="text-gray-700 text-base">
          Xanh
        </p>

        <div class="text-gray-900 font-bold text-xl mb-2">Số may mắn</div>
        <p class="text-gray-700 text-base">
          3
        </p>
        </div>
    </div>
  


    <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Ma Kết</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Nhà 1</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Trái Đất</span>
  </div>
    </div> 
    {/* NGÀY MAI */}
    <div class="max-w-sm rounded overflow-hidden shadow-lg"
      style={{ marginTop: '50px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}
    >
    <div class="font-bold text-xl mb-2 text-center text-gray-900">
      Ngày mai
    </div>
  <img class="w-full" src="https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/zodiac%2Faries.png?alt=media&token=928fed58-c87c-4301-a55c-8e1a3ad53edd" alt="Sunset in the mountains" />
  <div class="px-6 py-4">
    
    <div class="font-bold text-xl mb-2 text-center">Ma Kết</div>
    <p class="text-gray-700 text-base">
      Hôm nay sẽ có cuộc gặp gỡ bất ngờ, không báo trước mang lại cho bạn nhiều cảm xúc lẫn lộn. Tuy nhiện, hãy cẩn thận để tránh xa cám dỗ đấy nhé.
    </p>
  </div>
  <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center">
    <div class="py-3 px-6 border-b border-gray-300 text-gray-900 font-bold text-xl">
      Công việc
    </div>
    <div class="p-6">
      <p class="text-gray-700 text-base mb-4">
          Cơ hội đang mở ra trước mắt bạn, hãy nhanh chóng tận dụng nó để đạt được thành công trong công việc.
      </p>
    </div>
  </div>
    {/* Should and not should */}
  <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center">
    <div class="py-3 px-6 border-b border-gray-300 text-gray-900 font-bold text-xl">
      Tình cảm
    </div>
    <div class="p-6">
      <p class="text-gray-700 text-base mb-4">
          Hôm nay bạn sẽ có cơ hội gặp gỡ người đẹp, hãy nhanh chóng tận dụng cơ hội đó để có thể gặp gỡ được người đó.
      </p>
    </div>
    <div class="grid grid-flow-col auto-rows-max">
      <div class="bg-gray-200 rounded-lg shadow-lg p-4">
        <div class="text-gray-900 font-bold text-xl mb-2">Nên</div>
        <p class="text-gray-700 text-base">
          Gặp bạn bè
        </p>
        <p class="text-gray-700 text-base">
          Nấu ăn
        </p>
      </div>
      <div class="bg-gray-200 rounded-lg shadow-lg p-4">
        <div class="text-gray-900 font-bold text-xl mb-2">Tình yêu</div>
        <p class="text-gray-700 text-base">
          Bỏ bữa
        </p>
        <p class="text-gray-700 text-base">
          Thử vận may
        </p>
      </div>
    </div>
  </div>
    {/* Time, color, number, ... */}
    <div class="grid-flow-row gap-4">
      <div class="bg-gray-200 rounded-lg shadow-lg p-4 text-center">
        <div class="text-gray-900 font-bold text-xl mb-2">Thời gian</div>
        <p class="text-gray-700 text-base">
          10h - 12h
        </p>
        <div class="text-gray-900 font-bold text-xl mb-2 ">Màu sắc</div>
        <p class="text-gray-700 text-base">
          Xanh
        </p>

        <div class="text-gray-900 font-bold text-xl mb-2">Số may mắn</div>
        <p class="text-gray-700 text-base">
          3
        </p>
        </div>
    </div>


    <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Ma Kết</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Nhà 1</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Trái Đất</span>
  </div>
    </div>
    
    </div>
    </main>
    </>
  )
}
