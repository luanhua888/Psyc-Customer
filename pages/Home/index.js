import { AutoGapSlider } from "autogapslider";
import { Button, Table, Pagination, Tabs } from "flowbite-react";
import { useRef, useEffect, useState, Component } from "react";

import Image from "next/image";

import dayjs from "dayjs";

import Head from "next/head";

import astroRoundedImg from "../../public/photos/astro-rounded.png";
import logoFooterImg from "../../public/logo_footer.png";

import { zodiacService } from "../../services/ZodiacService";
import { articleService } from "../../services/ArticleService";

import "autogapslider/dist/index.css";

export async function getServerSideProps(context) {
  const { req, res } = context;
  const { token } = req.cookies;
  if (!token) {
    res.writeHead(302, { Location: "/" });
    res.end();
  }
  return {
    props: {},
  };
}


export default function Home() {

    const [zodiacs, setZodiac] = useState([]);
    const [articles, setArticle] = useState([]);
    const settings = {
        autoAdjustGap: true,
        minGapBetweenSlides: 20,
        autoMoveSlider: true,
        autoMoveSliderInterval: 1000,
        slidesToScroll: 5,
        sliderCardWidth: "200px",
        sliderCardHeight: "300px",
        stopUponHover: true,
      };

  return (
    <>
    <section id="hero-banner" className="bg-slate-700">
      <div className="md:container mx-auto py-6">
        <div className="p-12 flex justify-between items-center bg-gradient-to-r from-indigo-400 to-slate-100 rounded-3xl">
          <Image className="animate-spin  " src={astroRoundedImg} alt="" />
          <div className="flex flex-col gap-4 text-slate-800">
            <h3 className="font-sans text-[2.625rem] leading-[3.125rem]">
              Bất kì câu hỏi nào?
            </h3>
            <h1 className="font-sans text-[2.65rem] leading-[3.875rem] font-semibold">
              Trò chuyện với tư vấn viên
            </h1>
            <p className="font-sans text-[2.625rem] leading-[3.125rem]">
              MIễn Phí
            </p>
          </div>
          <a
            href="#"
            className="py-3 px-8 bg-indigo-500 rounded-full text-3xl font-semibold hover:ring-8 hover:ring-offset-sky-700-500"
          >
            Trò chuyện ngay
          </a>
        </div>
      </div>
    </section>
    <section id="services" className="bg-slate-900">
      <div className="md:container mx-auto py-5">
        <div className="flex justify-around">
          <div className="flex flex-col gap-3 justify-center items-center bg-white py-5 px-24 rounded-xl min-w-[200px] max-w-[250px]">
            <Image src={astroRoundedImg} alt="" width={65} height={65} />
            <a className=" w-max h-max" href="#">
              Trực tiếp
            </a>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center bg-white py-5 px-24 rounded-xl min-w-[200px] max-w-[250px]">
            <Image src={astroRoundedImg} alt="" width={65} height={65} />
            <a className=" w-max h-max" href="#">
              Dịch vụ
            </a>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center bg-white py-5 px-24 rounded-xl min-w-[200px] max-w-[250px]">
            <Image src={astroRoundedImg} alt="" width={65} height={65} />
            <a className=" w-max h-max" href="#">
              Tương thích cặp đôi
            </a>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center bg-white py-5 px-24 rounded-xl min-w-[200px] max-w-[250px]">
            <Image src={astroRoundedImg} alt="" width={65} height={65} />
            <a className=" w-max h-max" href="#">
              Bản đồ sao
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="services" className="bg-indigo-300">
      <div className="md:container mx-auto py-6">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-row flex-wrap justify-between gap-6 auto-cols-max">
            {zodiacs.map((row, key) => (
              <div
                key={key}
                className="flex flex-col gap-1 justify-center items-center bg-white py-5 px-12 rounded-xl w-[200px] "
              >
                <Image
                  loader={() => row.imageUrl}
                  src={astroRoundedImg}
                  alt=""
                  width={65}
                  height={65}
                />
                <a href="#" className="text-lg font-semibold">
                  {row.name}
                </a>
                <p>{`${dayjs(row.dateStart).format("DD/MM")} - ${dayjs(
                  row.dateEnd
                ).format("DD/MM")}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {articles && (
      <section id="complimentary-astrology" className="bg-slate-100">
        <div className="md:container mx-auto py-8">
          <h1 className="text-center text-2xl font-semibold mb-3">
            NHỮNG BÀI VIẾT MỚI NHẤT
          </h1>
          <div className="flex justify-evenly ">
            {articles.map((row, key) => (
              <div
                key={key}
                className="flex flex-col gap-2 justify-center items-center bg-white py-2 px-1 rounded-xl  shadow-md shadow-indigo-300"
              >
                <Image
                  loader={() => row.urlBanner}
                  className="rounded-xl align-middle"
                  src={astroRoundedImg}
                  alt=""
                  width={350}
                  height={350}
                />
                <div className="flex flex-col justify-center items-center gap-2 px-3">
                  <h3 className="text-sm font-semibold">{row.title}</h3>
                  <p className="text-sm text-justify">{row.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* <SliderComponent/> */}
    <AutoGapSlider settings={settings} imgArrData={articles} />

    <section
      id="#trust_score"
      className="bg-gradient-to-b from-indigo-300 to-slate-800"
    >
      <div className="md:container mx-auto py-9 ">
        <div className="flex justify-evenly items-center text-white text-center">
          <div>
            <p className="text-3xl font-bold">6,902+</p>
            <p className="text-base">Total Astrologers</p>
          </div>
          <div>
            <p className="text-3xl font-bold">6,902+</p>
            <p className="text-base">Total Astrologers</p>
          </div>
          <div>
            <p className="text-3xl font-bold">6,902+</p>
            <p className="text-base">Total Astrologers</p>
          </div>
        </div>
      </div>
    </section>

    <section id="about_us" className="bg-slate-100">
      <div className="md:container mx-auto py-5">
        <div className="text-center pb-4">
          <h3 className="font-semibold text-2xl">WHY ASTROLOGY ?</h3>
          <p className="text-xl font-medium">
            Astrology reveals the will of the God
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p>
            Chiêm tinh học là một ngành khoa học dự đoán với các bộ phương
            pháp, tuyên bố và phát hiện riêng đã mãi mãi truyền cảm hứng và
            cho phép mọi người có cái nhìn sâu sắc về các khía cạnh khác nhau
            của cuộc sống của họ. Chiêm tinh học, với những kinh ngạc và cách
            thức của nó, hài lòng và đủ chấp thuận để khiến mọi người trở
            thành một tín đồ của cùng một. Và may mắn thay, nó tiếp tục làm
            như vậy bất chấp thế giới đang thay đổi căn cứ từ những gì họ tin
            tưởng và những gì họ không tin tưởng.
          </p>
          <p>
            Nếu người ta phải đi sâu vào các kỹ thuật của chiêm tinh học, đó
            là nghiên cứu về các vật thể vũ trụ khác nhau, thường là các ngôi
            sao và hành tinh, có ảnh hưởng đến cuộc sống của con người. Bạn
            phải lưu ý rằng có tới 8 hành tinh trong hệ mặt trời. Tuy nhiên,
            nếu tôi hỏi một nhà chiêm tinh học trực tuyến gần tôi về các hành
            tinh trong chiêm tinh học, họ sẽ nói với tôi rằng có tới 9 hành
            tinh trong chiêm tinh học còn được gọi là Navagrahas. Và đáng ngạc
            nhiên, hành tinh Trái đất, trong chiêm tinh học, không được tính
            trong số chín hành tinh.
          </p>
          <p>
            Trong số các hành tinh này, một số hành tinh được gọi là hành tinh
            thân thiện, có nghĩa là sự hiện diện của chúng mang lại sự tích
            cực cho cuộc sống của bạn. Và sau đó, cũng có những hành tinh có
            ảnh hưởng tiêu cực đến con người. Sau này sẽ là các hành tinh như
            Rahu và Ketu. Sự hiện diện của họ trong Kundli của một người được
            cho là mang lại nỗi đau và sự khốn khổ. Tuy nhiên, có một khía
            cạnh khác mà người ta cần phải nhận thức được. Đó là thực tế rằng
            sự hiện diện của Ketu trong tử vi của một người không phải lúc nào
            cũng xấu và tương tự, sự hiện diện của Sao Mộc trong Kundli của
            một người có thể không phải là tốt nhất mọi lúc.
          </p>
        </div>
      </div>
    </section>

    <footer className="bg-slate-600">
      <div className="md:container mx-auto py-10 px-12">
        <div className="flex justify-between text-slate-200">
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-2xl border-b-2 border-indigo-300">
              TỔNG ĐÀI HỖ TRỢ
            </h3>
            <p>Góp ý, khiếu nại 0964155538</p>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-2xl border-b-2 border-indigo-300">
              VỀ PYSC
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#"
                  className="hover:border-b-2 hover:border-indigo-300"
                >
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:border-b-2 hover:border-indigo-300"
                >
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:border-b-2 hover:border-indigo-300"
                >
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:border-b-2 hover:border-indigo-300"
                >
                  Giới thiệu
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col w-[18.75rem]">
            <Image src={logoFooterImg} alt="" />
            <p>
              Hướng đến mục tiêu mang lại nơi để mọi người có thể trò chuyện
              với nhau giải quyết các vấn đề tâm lý. Hãy cùng PYSC hướng đến
              cuộc sống năng động tích cực hơn.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </>
  );
}
