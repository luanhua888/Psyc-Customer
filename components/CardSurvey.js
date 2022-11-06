import { Card } from 'flowbite-react'
import React from 'react'

function CardSurvey() {
  return (
    <div className="max-w-sm flex  flex-row mx-2">
            <Card
              horizontal={true}
              imgSrc="https://flowbite.com/docs/images/blog/image-4.jpg"
            >

              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Mức độ: Ngắn
              </h5>
              <h4>(20 câu hỏi)</h4>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              <button
                className="start_bnt text-2xl bg-orange-500 p-2 rounded-md  text-white"
                // onClick={startSurvey}
              >
                Bắt đầu
              </button>
            </Card>
          </div>
  )
}

export default CardSurvey