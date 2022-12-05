import dayjs from "dayjs";

import Head from "next/head";
import Image from "next/image";
import { useRef, useEffect, useState, Component } from "react";
import astroRoundedImg from "../public/photos/astro-rounded.png";
import logoFooterImg from "../public/logo1.png";

import ModalLogin from "../components/modal/ModalLogin";

import logoSpin from "../public/service_img2.png";
import service1 from "../public/photos/service1.svg";
import service2 from "../public/photos/icon/iconCamera.png";
import service3 from "../public/photos/icon/iconTest.png";
import service5 from "../public/photos/icon/service5.svg";
import service6 from "../public/photos/icon/service6.svg";
import service7 from "../public/photos/icon/service7.svg";

import { zodiacService } from "../services/ZodiacService";
import { articleService } from "../services/ArticleService";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper";
import { useRouter } from "next/router";
import { userService } from "../services/UserService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home(props) {
  const modalLoginRef = useRef();

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

  const [user, setUser] = useState({});
  const [articleId, setArticleId] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await zodiacService.getAll();
      if (data.statusCode == 200) {
        setZodiac(data.data);
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
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const data = await userService.profile(localStorage.getItem("iddb"));

        if (data.statusCode == 200) {
          setUser(data.data[0]);
        }
      }
    })();
  }, []);

  const onJoin = () => {
    if (!user.id) {
      modalLoginRef.current.open();
      return;
    }

    router.push({
      pathname: "/dailyHoroscop",
    });
  };

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

  const getArticleDetail = (id) => {
    (async () => {
      const article = await articleService.detailArticle(id);
      console.log("article đó", article.data[0]);

      router.push({
        pathname: "/article",
        query: {
          articleId: article.data[0].id,
          title: article.data[0].title,
          contentNews: article.data[0].contentNews,
          urlBanner: article.data[0].urlBanner,
        },
      });
    })();
  };

  return (
    <div className="">


      <div className="bg-[#031d2e] justify-center items-center flex my-[2%] ">
          <div className=" flex flex-row justify-between items-center text-white font-bold rounded-3xl gap-[5%] ">
            {/* hình ảnh */}
            <div className="min-w-[100px]">
              <Image className="animate-spin  " src={astroRoundedImg} alt="" />
            </div>

            <div className="flex flex-col gap-[10%] text-slate-800 md:text-5xl ">
              <h3 className="font-sans sm:text-5xl text-white">
                Bất kì câu hỏi nào?
              </h3>
              {/* Text */}
              <h1
                className="
                font-sans 
                sm:text-5xl  
               text-white
               min-w-[100px]
               "
              >
                Trò chuyện với tư vấn viên
              </h1>
            </div>
            {/* buttom */}
          </div>
      </div>

      {/*service  */}

      <div className=" bg-[#17384e] ">
        <div className="">
          <div className="grid grid-cols-4 p-4 items-center justify-center">
            {/*  1*/}
            <div className="">
              <div
                className="as_service_box text-center  cursor-pointer  bg-[#07273c] rounded-md pt-[10%] mx-[10%]"
                onClick={() => onJoin()}
              >
                <span className="as_icon ">
                  <Image src={service7} height={40} width={40} alt="" />
                </span>
                <h1
                  className="as_subheading md:text"
                  style={{
                    // cỡ chữ nhỏ nhất là 12px
                    fontSize: "clamp(10px, 1.5vw, 24px)",
                  }}
                >
                  Lá Số Hằng Ngày
                </h1>
              </div>
            </div>
            {/*  2*/}
            <div className=" ">
              <div
                className="as_service_box text-center  cursor-pointer  bg-[#07273c] rounded-md pt-[10%] mx-[10%]"
                onClick={() => router.push("/chat")}
              >
                <span className="as_icon ">
                  <Image src={service1} height={40} width={40} alt="" />
                </span>
                <h4
                  className="as_subheading md:text"
                  style={{
                    // cỡ chữ nhỏ nhất là 12px
                    fontSize: "clamp(10px, 1.5vw, 24px)",
                  }}
                >
                  Đặt lịch
                </h4>
              </div>
            </div>
            {/*  3*/}
            <div className=" ">
              <div
                className="as_service_box text-center  cursor-pointer  bg-[#07273c] rounded-md pt-[10%] mx-[10%]"
                onClick={() => router.push("/RoomLive")}
              >
                <span className="as_icon">
                  <Image src={service2} height={40} width={40} alt="" />
                </span>
                <h4
                  className="as_subheading md:text "
                  style={{
                    // cỡ chữ nhỏ nhất là 12px
                    fontSize: "clamp(10px, 1.5vw, 24px)",
                  }}
                >
                  Trực Tiếp
                </h4>
              </div>
            </div>
            {/* 4 */}
            <div className=" ">
              <div
                className="as_service_box text-center  cursor-pointer  bg-[#07273c] rounded-md pt-[10%] mx-[10%]"
                onClick={() => router.push("/Survey")}
              >
                <span className="as_icon">
                  <Image src={service3} height={40} width={40} alt="" />
                </span>
                <h4
                  className="as_subheading md:text
                "
                  style={{
                    // cỡ chữ nhỏ nhất là 12px
                    fontSize: "clamp(10px, 1.5vw, 24px)",
                  }}
                >
                  Bài Khảo Sát
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-[#031d2e] ">
        <div className="text-center">
          <h1 className="text-white my-[1%]  w-[40%] justify-center flex flex-row items-center mx-auto md:text-3xl border-b-2 border-[#ff7010]">
          CUNG HOÀNG ĐẠO CỦA BẠN LÀ GÌ?​
          </h1>
        </div>

        <div className="px-[10%] my-[2%]">
          <div className="grid grid-cols-6 gap-2 items-center justify-center">
            <div
              className="  bg-[#07273c] rounded-md hover:bg-[#455f71]"
              onClick={() => {
                router.push({
                  pathname: "/zodiac",
                  query: { zodiacId: zodiac1.id },
                });
              }}
            >
              <span className="flex justify-center ">
                <img src={zodiac1.imageUrl} height={80} width={80} alt />
              </span>
              {/*  */}
              <div
                className="flex flex-col items-center justify-center text-[#ff7010]"
                style={{
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                <h5>{zodiac1.name}</h5>
                <p>{`${dayjs(zodiac1.dateStart).format("DD/MM")} - ${dayjs(
                  zodiac1.dateEnd
                ).format("DD/MM")}`}</p>
              </div>
            </div>

            <div
              className=" bg-[#07273c] rounded-md hover:bg-[#455f71]"
              onClick={() => {
                router.push({
                  pathname: "/zodiac",
                  query: { zodiacId: zodiac2.id },
                });
              }}
            >
              <span className="flex justify-center ">
                <img src={zodiac2.imageUrl} height={80} width={80} alt />
              </span>
              {/*  */}
              <div
                className="flex flex-col items-center justify-center 
                 text-[#ff7010]"
                style={{
                  // cỡ chữ nhỏ nhất là 12px
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                <h5>{zodiac2.name}</h5>
                <p>{`${dayjs(zodiac2.dateStart).format("DD/MM")} - ${dayjs(
                  zodiac2.dateEnd
                ).format("DD/MM")}`}</p>
              </div>
            </div>

            <div
              className=" bg-[#07273c] rounded-md hover:bg-[#455f71]"
              onClick={() => {
                router.push({
                  pathname: "/zodiac",
                  query: { zodiacId: zodiac3.id },
                });
              }}
            >
              <span className="flex justify-center ">
                <img src={zodiac3.imageUrl} height={80} width={80} alt />
              </span>
              {/*  */}
              <div
                className="flex flex-col items-center justify-center text-[#ff7010]"
                style={{
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                <h5>{zodiac3.name}</h5>
                <p>{`${dayjs(zodiac3.dateStart).format("DD/MM")} - ${dayjs(
                  zodiac3.dateEnd
                ).format("DD/MM")}`}</p>
              </div>
            </div>

            <div
              className="bg-[#07273c] rounded-md hover:bg-[#455f71]"
              onClick={() => {
                router.push({
                  pathname: "/zodiac",
                  query: { zodiacId: zodiac4.id },
                });
              }}
            >
              <span className="flex justify-center ">
                <img src={zodiac4.imageUrl} height={80} width={80} alt />
              </span>
              {/*  */}
              <div
                className="flex flex-col items-center justify-center text-[#ff7010]"
                style={{
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                <h5>{zodiac4.name}</h5>
                <p>{`${dayjs(zodiac4.dateStart).format("DD/MM")} - ${dayjs(
                  zodiac4.dateEnd
                ).format("DD/MM")}`}</p>
              </div>
            </div>

            <div
              className="bg-[#07273c] rounded-md hover:bg-[#455f71]"
              onClick={() => {
                router.push({
                  pathname: "/zodiac",
                  query: { zodiacId: zodiac5.id },
                });
              }}
            >
              <span className="flex justify-center ">
                <img src={zodiac5.imageUrl} height={80} width={80} alt />
              </span>
              {/*  */}
              <div
                className="flex flex-col items-center justify-center text-[#ff7010]"
                style={{
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                <h5>{zodiac5.name}</h5>
                <p>{`${dayjs(zodiac5.dateStart).format("DD/MM")} - ${dayjs(
                  zodiac5.dateEnd
                ).format("DD/MM")}`}</p>
              </div>
            </div>

            <div
              className=" bg-[#07273c] rounded-md hover:bg-[#455f71]"
              onClick={() => {
                router.push({
                  pathname: "/zodiac",
                  query: { zodiacId: zodiac6.id },
                });
              }}
            >
              <span className="flex justify-center ">
                <img src={zodiac6.imageUrl} height={80} width={80} alt />
              </span>
              {/*  */}
              <div
                className="flex flex-col items-center justify-center text-[#ff7010]"
                style={{
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                <h5>{zodiac6.name}</h5>
                <p>{`${dayjs(zodiac6.dateStart).format("DD/MM")} - ${dayjs(
                  zodiac6.dateEnd
                ).format("DD/MM")}`}</p>
              </div>
            </div>

            <div
              className=" bg-[#07273c] rounded-md hover:bg-[#455f71]"
              onClick={() => {
                router.push({
                  pathname: "/zodiac",
                  query: { zodiacId: zodiac7.id },
                });
              }}
            >
              <span className="flex justify-center ">
                <img src={zodiac7.imageUrl} height={80} width={80} alt />
              </span>
              {/*  */}
              <div
                className="flex flex-col items-center justify-center text-[#ff7010]"
                style={{
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                <h5>{zodiac7.name}</h5>
                <p>{`${dayjs(zodiac7.dateStart).format("DD/MM")} - ${dayjs(
                  zodiac7.dateEnd
                ).format("DD/MM")}`}</p>
              </div>
            </div>

            <div
              className=" bg-[#07273c] rounded-md hover:bg-[#455f71]"
              onClick={() => {
                router.push({
                  pathname: "/zodiac",
                  query: { zodiacId: zodiac8.id },
                });
              }}
            >
              <span className="flex justify-center ">
                <img src={zodiac8.imageUrl} height={80} width={80} alt />
              </span>
              {/*  */}
              <div
                className="flex flex-col items-center justify-center text-[#ff7010]"
                style={{
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                <h5>{zodiac8.name}</h5>
                <p>{`${dayjs(zodiac8.dateStart).format("DD/MM")} - ${dayjs(
                  zodiac8.dateEnd
                ).format("DD/MM")}`}</p>
              </div>
            </div>

            <div
              className=" bg-[#07273c] rounded-md hover:bg-[#455f71]"
              onClick={() => {
                router.push({
                  pathname: "/zodiac",
                  query: { zodiacId: zodiac9.id },
                });
              }}
            >
              <span className="flex justify-center ">
                <img src={zodiac9.imageUrl} height={80} width={80} alt />
              </span>
              {/*  */}
              <div
                className="flex flex-col items-center justify-center text-[#ff7010]"
                style={{
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                <h5>{zodiac9.name}</h5>
                <p>{`${dayjs(zodiac9.dateStart).format("DD/MM")} - ${dayjs(
                  zodiac9.dateEnd
                ).format("DD/MM")}`}</p>
              </div>
            </div>

            <div
              className="bg-[#07273c] rounded-md hover:bg-[#455f71]"
              onClick={() => {
                router.push({
                  pathname: "/zodiac",
                  query: { zodiacId: zodiac10.id },
                });
              }}
            >
              <span className="flex justify-center ">
                <img src={zodiac10.imageUrl} height={80} width={80} alt />
              </span>
              {/*  */}
              <div
                className="flex flex-col items-center justify-center text-[#ff7010]"
                style={{
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                <h5>{zodiac10.name}</h5>
                <p>{`${dayjs(zodiac10.dateStart).format("DD/MM")} - ${dayjs(
                  zodiac10.dateEnd
                ).format("DD/MM")}`}</p>
              </div>
            </div>

            <div
              className=" bg-[#07273c] rounded-md hover:bg-[#455f71]"
              onClick={() => {
                router.push({
                  pathname: "/zodiac",
                  query: { zodiacId: zodiac11.id },
                });
              }}
            >
              <span className="flex justify-center ">
                <img src={zodiac11.imageUrl} height={80} width={80} alt />
              </span>
              {/*  */}
              <div
                className="flex flex-col items-center justify-center text-[#ff7010]"
                style={{
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                <h5>{zodiac11.name}</h5>
                <p>{`${dayjs(zodiac11.dateStart).format("DD/MM")} - ${dayjs(
                  zodiac11.dateEnd
                ).format("DD/MM")}`}</p>
              </div>
            </div>

            <div
              className=" bg-[#07273c] rounded-md hover:bg-[#455f71]"
              onClick={() => {
                router.push({
                  pathname: "/zodiac",
                  query: { zodiacId: zodiac12.id },
                });
              }}
            >
              <span className="flex justify-center ">
                <img src={zodiac12.imageUrl} height={80} width={80} alt />
              </span>
              {/*  */}
              <div
                className="flex flex-col items-center justify-center text-[#ff7010]"
                style={{
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
              >
                <h5>{zodiac12.name}</h5>
                <p>{`${dayjs(zodiac12.dateStart).format("DD/MM")} - ${dayjs(
                  zodiac12.dateEnd
                ).format("DD/MM")}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* article */}

      <section className="bg-[#17384e] ">
        <div className="md:container mx-auto py-8 ">
          <div className="flex flex-row justify-center mb-3">
            <h1 className="text-white justify-center flex flex-row md:text-3xl border-b-2 border-[#ff7010] ">
              NHỮNG BÀI VIẾT MỚI NHẤT​
            </h1>
          </div>
          <div className="flex flex-row justify-center ">
            <div className="max-w-[900px]">
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
                    onClick={() => getArticleDetail(row.id)}
                  >
                    <div className="articleBox flex flex-row">
                      <Image
                        loader={() => row.urlBanner}
                        className="rounded-tl-xl rounded-bl-xl align-middle"
                        src={astroRoundedImg}
                        alt=""
                        width={300}
                        height={300}
                      />
                      <div className=" flex flex-col justify-center items-center gap-5 max-w-[400px] max-h-[400px] bg-gradient-[145deg, #031f31, #031a29] rounded-tr-xl rounded-br-xl "
                        style={{
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
                      >
                        <h1 className="px-2 md:text-2xl  text-white font-semibold "
                        >
                          {row.title}
                        </h1>
                        <h1
                          className="px-2 text-2xl text-white first-of-type:font-semibold 
                            
                    "  style={{
                  fontSize: "clamp(8px, 1.5vw, 16px)",
                }}
                        >
                          {row.description}
                        </h1>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      {/*  */}

      <section id="about_us" className="  bg-[#031d2e]  ">
        <div className="md:container mx-auto  py-5 ">
          <div className="flex flex-row justify-center mb-3">
            <h1 className="text-white w-[40%] justify-center flex flex-row md:text-3xl border-b-2 border-[#ff7010] ">
              TẠI SAO CHỌN PSYC​
            </h1>
          </div>

          <div className="flex flex-row justify-center items-center">
            <div className="max-w-[1000px]">
              <div className="flex flex-col gap-4  ">
                <p className="text-justify text-white">
                  Chiêm tinh học là một ngành khoa học dự đoán với các bộ phương
                  pháp, tuyên bố và phát hiện riêng đã mãi mãi truyền cảm hứng
                  và cho phép mọi người có cái nhìn sâu sắc về các khía cạnh
                  khác nhau của cuộc sống của họ. Chiêm tinh học, với những kinh
                  ngạc và cách thức của nó, hài lòng và đủ chấp thuận để khiến
                  mọi người trở thành một tín đồ của cùng một. Và may mắn thay,
                  nó tiếp tục làm như vậy bất chấp thế giới đang thay đổi căn cứ
                  từ những gì họ tin tưởng và những gì họ không tin tưởng.
                </p>
                <p className="text-justify text-white">
                  Nếu người ta phải đi sâu vào các kỹ thuật của chiêm tinh học,
                  đó là nghiên cứu về các vật thể vũ trụ khác nhau, thường là
                  các ngôi sao và hành tinh, có ảnh hưởng đến cuộc sống của con
                  người. Bạn phải lưu ý rằng có tới 8 hành tinh trong hệ mặt
                  trời. Tuy nhiên, nếu tôi hỏi một nhà chiêm tinh học trực tuyến
                  gần tôi về các hành tinh trong chiêm tinh học, họ sẽ nói với
                  tôi rằng có tới 9 hành tinh trong chiêm tinh học còn được gọi
                  là Navagrahas. Và đáng ngạc nhiên, hành tinh Trái đất, trong
                  chiêm tinh học, không được tính trong số chín hành tinh.
                </p>
                <p className="text-justify text-white">
                  Trong số các hành tinh này, một số hành tinh được gọi là hành
                  tinh thân thiện, có nghĩa là sự hiện diện của chúng mang lại
                  sự tích cực cho cuộc sống của bạn. Và sau đó, cũng có những
                  hành tinh có ảnh hưởng tiêu cực đến con người. Sau này sẽ là
                  các hành tinh như Rahu và Ketu. Sự hiện diện của họ trong
                  Kundli của một người được cho là mang lại nỗi đau và sự khốn
                  khổ. Tuy nhiên, có một khía cạnh khác mà người ta cần phải
                  nhận thức được. Đó là thực tế rằng sự hiện diện của Ketu trong
                  tử vi của một người không phải lúc nào cũng xấu và tương tự,
                  sự hiện diện của Sao Mộc trong Kundli của một người có thể
                  không phải là tốt nhất mọi lúc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#17384e] px-[10%] ">
        <div className="md:container mx-auto py-10  max-w-[800px]">
          <div className="flex flex-row justify-between items-center text-slate-200">
            <div className="flex flex-col gap-5">
              <h3 className="font-semibold text-2xl border-b-2 border-[#ff7010]">
                TỔNG ĐÀI HỖ TRỢ
              </h3>
              <p>Góp ý, khiếu nại 0964155538</p>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="font-semibold text-2xl border-b-2 border-[#ff7010]">
                VỀ PYSC
              </h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="#"
                    className="hover:border-b-2 hover:border-[#ff7010]"
                  >
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:border-b-2 hover:border-[#ff7010]"
                  >
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:border-b-2 hover:border-[#ff7010]"
                  >
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:border-b-2 hover:border-[#ff7010]"
                  >
                    Giới thiệu
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col float-right w-1/5 ">
              <div className="flex flex-row justify-center">
                <Image src={logoFooterImg} alt="" width={100} height={100} />
              </div>

              <p>
                Hướng đến mục tiêu mang lại nơi để mọi người có thể trò chuyện
                với nhau giải quyết các vấn đề tâm lý. Hãy cùng PYSC hướng đến
                cuộc sống năng động tích cực hơn.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <ModalLogin ref={modalLoginRef} />
    </div>
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
