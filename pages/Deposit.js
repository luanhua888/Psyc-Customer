import React from 'react'


export default function deposit () {
  return (
    <>
        <div class="flex flex-col justify-center items-center bg-gray-100 mr-70 ml-70 mt-40 mb-20 m-60 pb-40">
            <div class="flex flex-row justify-center items-center bg-white w-1/2 rounded-xl shadow-lg m-2 p-2">
                <div class="justify-center items-center w-full">
                  <div class="flex flex-row justify-center items-center">
                    PHƯƠNG THỨC THANH TOÁN
                  </div>
                </div>
                <button class="justify-center items-center w-40 bg-blue-600 rounded-xl shadow-lg p-1">
                        Lịch sử giao dịch
                </button>
            </div>
            <div className='flex flex-row justify-center'>
    <div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ">
        <a href="#" class="w-full sm:w-auto bg-white-800 hover:bg-slate-400
         focus:ring-4 focus:outline-none focus:ring-gray-300 text-black rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 shadow-lg">

            {/* logo momo */}
            <img src="https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/Desposit%2Flogo-momo-png-2.png?alt=media&token=53a3ea95-c76b-4943-a0ae-34403acc617f" alt="logo momo" class="w-10 h-10"/>
            <div class="text-left p-6">
                <div class="mb-1 text-xs">MoMo PAY</div>
                <div class="-mt-1 font-sans text-sm font-semibold">50k~2000k</div>
            </div>
        </a>
    </div>
            </div>
        </div>

    </>
  )
}
