import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useEffect, useState, Component } from "react";
import { zodiacService } from "../../services/ZodiacService";
import astroRoundedImg from "../../public/photos/astro-rounded.png";
import Paragraph from "antd/lib/typography/Paragraph";

import Skeleton from '@mui/material/Skeleton';

export default function Zodiac() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  let { zodiacId } = router.query;

  let props = {
    zodiacId,
  };
  const [zodiac, setZodiac] = useState([]);
  useEffect(() => {
    
    (async () => {
      const data = await zodiacService.detailZodiac(zodiacId);
      if (data.statusCode == 200) {
        setZodiac(data.data[0]);
        console.log("zodiac", data.data);
      } 
      
    })();
   
  }, []);

  const getZodiac = async () => {
    const data = await zodiacService.detailZodiac(zodiacId);
    if (data.statusCode == 200) {
      setZodiac(data.data[0]);
      console.log("zodiac", data.data);
    }
  };

  //nếu reload lại trang thì sẽ bị lỗi
  //vì khi reload lại trang thì zodiacId sẽ là undefined
  //vì vậy phải check xem zodiacId có undefined hay không

  useEffect(() => {
    setLoading(true)
    if (zodiacId == zodiacId) {
      (async () => {
        const data = await zodiacService.detailZodiac(zodiacId);
        if (data.statusCode == 200) {
          setZodiac(data.data[0]);
          console.log("zodiac", data.data);
        }
        setLoading(false);
      })();
    }
  }, [zodiacId]);

  return (
    //bài viết cung hoàng đạo
    <div className="row flex flex-row items-center justify-center w-3/5 mt-2 mx-auto">
      
 
      {loading ? (
             
              <div className="flex flex-col items-center justify-center
              mt-20
              ">
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height="20"
                className="mb-4"
                
        
              />
                <Skeleton
                animation="wave"
                variant="rect"
                width={300}
                height={300}
                className="mb-4"
              />  
              <Skeleton
                animation="wave"
                variant="rect"
                width={500}
                height={100}
                //cách bottom 20px
                className="mb-4"
               
              />
             
            <Skeleton
                animation="wave"
                variant="rect"
                width={500}
                height={200}
                className="mb-4"
              />  
              <Skeleton
                animation="wave"
                variant="rect"
                width={500}
                height={100}
                className="mb-4"
              />  
              </div>
      ) : (
        <div className="card "
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}>
                <div className="card-body flex flex-col">
                  <h1
                    className="card-title
                  text-4xl font-bold text-center justify-center text-amber-500 mt-4
                  "
                  >
                    {zodiac.name}
                  </h1>
                  <div className="flex flex-row justify-center items-center">
                    <Image
                      loader={() => zodiac.imageUrl}
                      src={astroRoundedImg}
                      alt=""
                      width={300}
                      height={300}
                    />
                  </div>
                  <div
                  // className="w-full leading-8"
                  // dangerouslySetInnerHTML={{ __html: zodiac.descriptionDetail }}
                  // //căn đêu nội dung
                  // style={{
                  //   textAlign: "justify ",
                  //   //khoảng cách giữa các đoạn văn strong
                  //   p: "padding-top: 100px",
                  // }}
                  >
                    {" "}
                    {/* <Paragraph>
                      
                    </Paragraph> */}
                    {/* nền của Paragraph màu trắng */}
                    <Paragraph
                     
                    >
                        <div
                        // cách lền trái phải trên dưới 20px
                        className="p-20"
                        
                    
                        dangerouslySetInnerHTML={{ __html: zodiac.descriptionDetail }}
                      />
                    </Paragraph>
                  </div>
                </div>
              </div>
      )}
    </div>
  );
}

