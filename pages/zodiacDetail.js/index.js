import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useEffect, useState, Component } from "react";
import { zodiacService } from "../../services/ZodiacService";
import astroRoundedImg from "../../public/photos/astro-rounded.png";
import Paragraph from "antd/lib/typography/Paragraph";

export default function ArticleDetail() {
  const router = useRouter();

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

  return (
    //bài viết cung hoàng đạo
    <div className="row flex flex-row items-center justify-center w-3/5 mt-2 mx-auto bg-[#17384e] text-white">
      <div className="card ">
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
            <Paragraph>
              <div dangerouslySetInnerHTML={{ __html: zodiac.descriptionDetail }} />
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
}
