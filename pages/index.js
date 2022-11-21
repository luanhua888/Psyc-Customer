import dayjs from "dayjs";

import Head from "next/head";
import Image from "next/image";
import { useRef, useEffect, useState, Component } from "react";
import astroRoundedImg from "../public/photos/astro-rounded.png";
import logoFooterImg from "../public/logo_footer.png";
import logoSpin from "../public/photos/hero-banner-profile.png";

import { zodiacService } from "../services/ZodiacService";
import { articleService } from "../services/ArticleService";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper";
import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();
  const { zodiacs, articles } = props;
  const [zodiac, setZodiac] = useState([]);
  const [zodiac1, setZodiac1] = useState([]);
  const [zodiac2, setZodiac2] = useState([]);
  const [zodiac3, setZodiac3] = useState([]);
  const [zodiac4, setZodiac4] = useState([]);
  const [zodiac5, setZodiac5] = useState([]);
  const [zodiac6, setZodiac6] = useState([]);
  const [zodiac7, setZodiac7] = useState([]);
  const [zodiac8, setZodiac8] = useState([]);
  const [zodiac9, setZodiac9] = useState([]);
  const [zodiac10, setZodiac10] = useState([]);
  const [zodiac11, setZodiac11] = useState([]);
  const [zodiac12, setZodiac12] = useState([]);
  const [article, setArticle] = useState([]);
  console.log("article", article.id);
  console.log("zodiac", zodiac);

  console.log("article", article.urlBanner);
  useEffect(() => {
    (async () => {
      const data = await zodiacService.getAll();
      if (data.statusCode == 200) {
        setZodiac(data.data);
        console.log("zodiac", data.data);
        setZodiac1(data.data[0]);
        setZodiac2(data.data[1]);
        setZodiac3(data.data[2]);
        setZodiac4(data.data[3]);
        setZodiac5(data.data[4]);
        setZodiac6(data.data[5]);
        setZodiac7(data.data[6]);
        setZodiac8(data.data[7]);
        setZodiac9(data.data[8]);
        setZodiac10(data.data[9]);
        setZodiac11(data.data[10]);
        setZodiac12(data.data[11]);

      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await articleService.getAll();
      if (data.statusCode == 200) {
        setArticle(data.data);
        console.log("setArticle", data.data);
      }
    })();
  }, []);

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
      <section id="hero-banner" className="bg-[#031d2e]">
        <div className="md:container mx-auto px-[10%] py-6">
          <div className="p-12 flex justify-between items-center text-white font-bold rounded-3xl">
            <Image className="animate-spin  " src={astroRoundedImg} alt="" />
            <div className="flex flex-col gap-4 text-slate-800">
              <h3 className="font-sans text-[2.625rem] leading-[3.125rem] text-white  ">
                Bất kì câu hỏi nào?
              </h3>
              <h1 className="font-sans text-[2.65rem] leading-[3.875rem] text-white  ">
                Trò chuyện với tư vấn viên
              </h1>
              <p className="font-sans text-[2.625rem] leading-[3.125rem] text-white  ">
                Miễn Phí
              </p>
            </div>
            <a
              href="#"
              className="py-3 px-4 bg-[#fd7e14] rounded-full text-3xl font-semibold hover:bg-[#17384e] hover:text-white"
            >
              Trò chuyện ngay
            </a>
          </div>
        </div>
      </section>

      <div className="row bg-[#17384e] md:container mx-auto px-[10%] py-6">
        <div className="col-lg-12 text-center">
          <h1 className="as_heading as_heading_center">our services</h1>
          <p className="as_font14 as_padderBottom5">
            Consectetur adipiscing elit, sed do eiusmod tempor
            incididuesdeentiut labore <br />
            etesde dolore magna aliquapspendisse and the gravida.
          </p>
        </div>

        <div
          className="grid 
        grid-cols-1
        gap-4
        
        "
        >
          <div className=" w-[250px] ">
            <div className="as_service_box text-center">
              <span className="as_icon">
                <img src="assets/images/svg/service1.svg" alt />
              </span>
              <h4 className="as_subheading">Vastu Shastra</h4>
              <p>
                Consectetur adipiscing elit sed do <br />
                eiusmod tempor incididunt.
              </p>
              <a href="service_detail.html" className="as_link">
                read more
              </a>
            </div>
          </div>
        </div>
      </div>



      <div className="as_zodiac_inner text-left">
        <div className="flex flex-row justify-between as_verticle_center md:container mx-auto px-[10%] py-6">
        
          <div className="col-lg-3 col-md-12 col-sm-12 col-12">
            <ul className="as_sign_ul">
              <li className="as_sign_box">
                <a href="zodiac_single.html">
                  <span className="as_sign">
                  <img src={zodiac1.imageUrl} alt />
                  </span>
                  <div>
                    <h5>{zodiac1.name}</h5>
                    <p>Mar 21 - Apr 19</p>
                  </div>
                </a>
              </li>
              <li className="as_sign_box">
                <a href="zodiac_single.html">
                  <span className="as_sign">
                    <img src={zodiac2.imageUrl} alt />
                  </span>
                  <div>
                    <h5>{zodiac2.name}</h5>
                    <p>Mar 21 - Apr 19</p>
                  </div>
                </a>
              </li>
              <li className="as_sign_box">
                <a href="zodiac_single.html">
                  <span className="as_sign">
                    <img src={zodiac3.imageUrl} alt />
                  </span>
                  <div>
                    <h5>{zodiac3.name}</h5>
                    <p>Mar 21 - Apr 19</p>
                  </div>
                </a>
              </li>
              <li className="as_sign_box">
                <a href="zodiac_single.html">
                  <span className="as_sign">
                    <img src={zodiac4.imageUrl} alt />
                  </span>
                  <div>
                    <h5>{zodiac4.name}</h5>
                    <p>Mar 21 - Apr 19</p>
                  </div>
                </a>
              </li>
              <li className="as_sign_box">
                <a href="zodiac_single.html">
                  <span className="as_sign">
                    <img src={zodiac5.imageUrl} alt />
                  </span>
                  <div>
                    <h5>{zodiac5.name}</h5>
                    <p>Mar 21 - Apr 19</p>
                  </div>
                </a>
              </li>
              <li className="as_sign_box">
                <a href="zodiac_single.html">
                  <span className="as_sign">
                    <img src={zodiac6.imageUrl} alt />
                  </span>
                  <div>
                    <h5>{zodiac6.name}</h5>
                    <p>Mar 21 - Apr 19</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="as_sign_img text-center">
              {/* <img
                src="../public/photos/hero-banner-profile.png"
                alt
                className="img-responsive"
              /> */}
               <Image className="animate-spin" src={logoSpin} alt="" />
            </div>
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12 col-12">
            <ul className="as_sign_ul as_sign_ul_right">
              <li className="as_sign_box">
                <a href="zodiac_single.html">
                  <span className="as_sign">
                    <img src={zodiac7.imageUrl} alt />
                  </span>
                  <div>
                    <h5>{zodiac7.name}</h5>
                    <p>Mar 21 - Apr 19</p>
                  </div>
                </a>
              </li>
              <li className="as_sign_box">
                <a href="zodiac_single.html">
                  <span className="as_sign">
                    <img src={zodiac8.imageUrl} alt />
                  </span>
                  <div>
                    <h5>{zodiac8.name}</h5>
                    <p>Mar 21 - Apr 19</p>
                  </div>
                </a>
              </li>
              <li className="as_sign_box">
                <a href="zodiac_single.html">
                  <span className="as_sign">
                    <img src={zodiac9.imageUrl} alt />
                  </span>
                  <div>
                    <h5>{zodiac9.name}</h5>
                    <p>Mar 21 - Apr 19</p>
                  </div>
                </a>
              </li>
              <li className="as_sign_box">
                <a href="zodiac_single.html">
                  <span className="as_sign">
                    <img src={zodiac10.imageUrl} alt />
                  </span>
                  <div>
                    <h5>{zodiac10.name}</h5>
                    <p>Mar 21 - Apr 19</p>
                  </div>
                </a>
              </li>
              <li className="as_sign_box">
                <a href="zodiac_single.html">
                  <span className="as_sign">
                    <img src={zodiac11.imageUrl} alt />
                  </span>
                  <div>
                    <h5>{zodiac11.name}</h5>
                    <p>Mar 21 - Apr 19</p>
                  </div>
                </a>
              </li>
              <li className="as_sign_box">
                <a href="zodiac_single.html">
                  <span className="as_sign">
                    <img src={zodiac12.imageUrl} alt />
                  </span>
                  <div>
                    <h5>{zodiac12.name}</h5>
                    <p>Mar 21 - Apr 19</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <section id="services" className="bg-slate-900">
        <div className="md:container mx-auto px-[10%] py-5">
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
        <div className="md:container mx-auto px-[10%] py-6">
          <div className="flex flex-col justify-between gap-4">
            <div className="grid grid-cols-6 gap-1 justify-between  auto-cols-max">
              {zodiac.map((row, key) => (
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
                    onClick={() => {
                      router.push({
                        pathname: "/zodiacDetail",
                        query: { zodiacId: row.id },
                      });
                    }}
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

      {/* <SliderComponent/> */}

      <section className="bg-slate-100">
        <div className="md:container mx-auto py-8 items-center ">
          <h1 className="text-center text-2xl font-semibold mb-3">
            NHỮNG BÀI VIẾT MỚI NHẤT
          </h1>
          <div className="">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={false}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="mySwiper "
            >
              {article.map((row, key) => (
                <SwiperSlide
                  className="flex flex-row justify-center"
                  key={key}
                  onClick={() => {
                    router.push({
                      pathname: "/articleDetail",
                      query: { articleId: row.id },
                    });
                  }}
                >
                  <Image
                    loader={() => row.urlBanner}
                    className="rounded-tl-xl rounded-bl-xl align-middle"
                    src={astroRoundedImg}
                    alt=""
                    width={350}
                    height={350}
                  />
                  <div className="flex flex-col justify-center items-center gap-5 bg-slate-400 rounded-tr-xl rounded-br-xl">
                    <h1 className="px-2 text-2xl  text-white font-semibold ">
                      {row.title}
                    </h1>
                    <h1 className="px-2 text-2xl text-white first-of-type:font-semibold">
                      {row.description}
                    </h1>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

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

export async function getServerSideProps() {
  const [res, res2] = [];
  const { data: zodiacs } = await zodiacService.getAll();
  const { data: articles } = await articleService.getAll();

  return {
    props: {
      zodiacs,
      articles,
    },
  };
}
