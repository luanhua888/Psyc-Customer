import dayjs from "dayjs";

import Head from "next/head";
import Image from "next/image";
import { useRef, useEffect, useState, Component } from "react";
import astroRoundedImg from "../public/photos/astro-rounded.png";
import logoFooterImg from "../public/photos/icon/logo18age.png";

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
import { planetService } from "../services/PlanetService";
import { houseService } from "../services/HouseService";

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
  const [planet, setPlanet] = useState([]);
  const [house, setHouse] = useState([]);

  console.log("house", house);

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
      //all bài viết
      const data = await articleService.getAll();
      if (data.statusCode == 200) {
        setArticle(data.data);
      }

      //all hành tinh
      const data1 = await planetService.getAll();

      if ((data1.statusCode = 200)) {
        setPlanet(data1.data);
      }

      // Nhà
      const data2 = await houseService.getAll();
      if ((data1.statusCode = 200)) {
        setHouse(data2.data);
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

  const getHouseDetail = (id) => {
    (async () => {
      const house = await houseService.detailHouse(id);
      console.log("house đó", house.data[0]);

      router.push({
        pathname: "/house",
        query: {
          houseId: house.data[0].id,
          name: house.data[0].name,
          imageUrl: house.data[0].imageUrl,
          description: house.data[0].description,
          maincontent: house.data[0].maincontent,
        },
      });
    })();
  };
  const getPlanetDetail = (id) => {
    (async () => {
      const planet = await planetService.detailPlanet(id);
      console.log("planet đó", planet.data[0]);

      router.push({
        pathname: "/planet",
        query: {
          planetId: planet.data[0].id,
          name: planet.data[0].name,
          imageUrl: planet.data[0].imageUrl,
          description: planet.data[0].description,
          maincontent: planet.data[0].maincontent,
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
          <h1
            className="text-white my-[1%]  w-[40%] justify-center flex flex-row items-center mx-auto md:text-3xl border-b-2 border-[#ff7010]"
            style={{
              fontSize: "clamp(10px, 1.5vw, 24px)",
            }}
          >
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
        <div className="md:container mx-auto  ">
          <div className="flex flex-row justify-center item mb-3">
            <h1 className="text-white justify-center flex flex-row md:text-3xl border-b-2 border-[#ff7010] ">
              NHỮNG BÀI VIẾT MỚI NHẤT​
            </h1>
          </div>
          <div className="flex flex-row justify-center    ">
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
                      <div
                        className=" flex flex-col justify-center items-center gap-5 max-w-[400px] max-h-[400px] bg-gradient-[145deg, #031f31, #031a29] rounded-tr-xl rounded-br-xl "
                        style={{
                          fontSize: "clamp(8px, 1.5vw, 16px)",
                        }}
                      >
                        <h1 className="px-2 md:text-2xl  text-white font-semibold ">
                          {row.title}
                        </h1>
                        <h1
                          className="px-2 text-2xl text-white first-of-type:font-semibold 
                            
                    "
                          style={{
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

      {/* hành tinh */}

      <div>
        <div className="text-center">
          <h1
            className="text-white my-[1%] w-[40%] justify-center flex flex-row items-center mx-auto md:text-3xl border-b-2 border-[#ff7010]"
            style={{
              fontSize: "clamp(10px, 1.5vw, 24px)",
            }}
          >
            CÁC HÀNH TINH TRONG CHIÊM TINH HỌC
          </h1>
        </div>
        <div className=" bg-[#031d2e] grid grid-cols-5 gap-4 justify-center m-4">
          {planet.map((row, key) => (
            <div key={key}>
              <div className="">
                <div
                  className="  bg-[#07273c]  hover:bg-[#455f71] rounded-full mx-[10%]"
                  onClick={() => {
                    getPlanetDetail(row.id);
                  }}
                >
                  <span className="flex justify-center ">
                    <Image
                      loader={() => row.imageUrl}
                      src={astroRoundedImg}
                      alt=""
                      width={80}
                      height={80}
                    />
                  </span>
                  {/*  */}
                  <div
                    className="flex flex-col items-center justify-center text-[#ff7010]"
                    style={{
                      fontSize: "clamp(8px, 1.5vw, 16px)",
                    }}
                  >
                    <h5>{row.name}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nhà  */}
      <div className="bg-[#17384e] ">
        <div className="text-center">
          <h1
            className="text-white my-[1%] w-[40%] justify-center flex flex-row items-center mx-auto md:text-3xl border-b-2 border-[#ff7010]"
            style={{
              fontSize: "clamp(10px, 1.5vw, 24px)",
            }}
          >
            CÁC NHÀ TRONG CHIÊM TINH HỌC
          </h1>
        </div>
        <div className=" bg-[#17384e] grid grid-cols-6 gap-4 justify-center m-4">
          {house.map((row, key) => (
            <div key={key}>
              <div className="">
                <div
                  className="  bg-[#07273c]  hover:bg-[#455f71] rounded-full mx-[10%]"
                  onClick={() => {
                    getHouseDetail(row.id);
                  }}
                >
                  <span className="flex justify-center ">
                    <Image
                      loader={() => row.imageUrl}
                      src={astroRoundedImg}
                      alt=""
                      width={80}
                      height={80}
                    />
                  </span>
                  {/*  */}
                  <div
                    className="flex flex-col items-center justify-center text-[#ff7010]"
                    style={{
                      fontSize: "clamp(8px, 1.5vw, 16px)",
                    }}
                  >
                    <h5>{row.name}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      {/*  */}

      <section id="about_us" className="  bg-[#031d2e]  ">
        <div className="md:container mx-auto  py-5 ">
          <div className="flex flex-row justify-center mb-3">
            <h1
              className="text-white w-[40%] justify-center flex flex-row md:text-3xl border-b-2 border-[#ff7010] "
              style={{
                fontSize: "clamp(10px, 1.5vw, 24px)",
              }}
            >
              TẠI SAO CHỌN PSYC​
            </h1>
          </div>

          <div className="flex flex-row justify-center items-center">
            <div className="max-w-[1200px]">
              <div
                className="flex flex-col gap-4  "
                style={{
                  fontSize: "clamp(10px, 1.5vw, 24px)",
                }}
              >
                <p className="text-justify text-white">
                  <span className="text-[#ff7010]">
                    PSYC (Psychological Counselling)
                  </span>{" "}
                  có thể giúp bạn giải toả cảm xúc của mình cũng như cảm thấy
                  tâm trạng nhẹ nhàng hơn khi giải tỏa được những căng thẳng. Có
                  cách nhìn thoáng hơn đối với vấn đề của bản thân. Bạn sẽ cảm
                  thấy được sự đồng cảm khi có người ủng hộ, hiểu và khích lệ
                  mình. Bạn sẽ nhận được những lời khuyên tốt và nhận ra các giá
                  trị của của chính mình và những nguồn lực sẵn có. Trở nên tự
                  tin và mạnh mẽ để tự quyết định và giải quyết vấn đề. Bạn sẽ
                  nhận được lời khuyên hữu ích từ chuyên gia tâm lý khi chia sẻ
                  tâm sự trong những phút bế tắc của cuộc đời và tìm thấy được
                  định hướng cho bản thân mình. Phục hồi tinh thần và thể chất.
                  Bên cạnh đó, PSYC còn có thể giúp bạn biết được Cung Hoàng Đạo
                  của bản thân, và có thể giúp bạn tìm hiểu về Chiêm Tinh Học -
                  hệ thống bói toán dựa trên sự vận hành của vũ trụ và các hành
                  tinh xung quanh Trái Đất. Bạn có thể xem được bản đồ sao của
                  mình - “Bản đồ sao” là hình thức tương tự như “lá số tử vi”
                  của người phương Đông”. Bạn có thể xem Ý Nghĩa của các hành
                  tinh trong chiêm tinh học, sự liên hệ giữa cơ thể con người
                  với 12 cung hoàng đạo. Có thể giúp bạn xem được con số may
                  mắn, cũng như nhũng điều tốt đẹp nên làm, hay những việc không
                  nên làm theo chiêm tinh học.
                </p>
                <p className="text-justify text-white">
                  Bên cạnh dịch vụ VideoCall/LiveStream,{" "}
                  <span className="text-[#ff7010]">
                    PSYC (Psychological Counselling)
                  </span>{" "}
                  còn có chức năng tạo Bản Đồ Sao Cá Nhân, Xem tỉ lệ tương thích
                  giữa 2 người dựa theo cung hoàng đạo.
                </p>
                <p className="text-justify text-white">
                  Ngoài ra PSYC cung cấp Trắc Nghiệm Tính Cách theo DISC - là
                  một loại trắc nghiệm dùng để đánh giá hành vi cá nhân tập
                  trung vào bốn đặc điểm tính cách nổi bật con người trong một
                  khoảng thời gian nhất định: Sự thống trị (D), Ảnh hưởng (I),
                  Sự kiên định (S), và Sự tuân thủ (C). Bạn sẽ hiểu rõ hơn về
                  nhóm tính cách của bản thân thông qua Kết Quả mà PSYC cung cấp
                  sau khi thực hiện bài trắc nghiệm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#17384e] px-[10%] ">
        <div className="md:container mx-auto py-10  max-w-[800px]">
          <div
            className="flex flex-row justify-between items-center text-slate-200"
            style={{
              fontSize: "clamp(10px, 1.5vw, 24px)",
            }}
          >
            <div className="flex flex-col gap-5">
              <h3
                className="font-semibold text-2xl border-b-2 justify-center flex border-[#ff7010]"
                style={{
                  fontSize: "clamp(10px, 1.5vw, 24px)",
                }}
              >
                TỔNG ĐÀI HỖ TRỢ
              </h3>
              <p>
                Góp ý, khiếu nại:{" "}
                <span className="text-[#ff7010]">0964155538</span>
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <h3
                className="font-semibold text-2xl flex justify-center border-b-2 border-[#ff7010]"
                style={{
                  fontSize: "clamp(10px, 1.5vw, 24px)",
                }}
              >
                VỀ PYSC
              </h3>
              <ul
                className="flex flex-col gap-2"
                style={{
                  fontSize: "clamp(10px, 1.5vw, 24px)",
                }}
              >
                <li>
                  <a
                    href="#"
                    className="hover:border-b-2 hover:border-[#ff7010]"
                    // khi click vào sẽ tải xuống ứng dụng
                  >
                    Tải ứng dụng
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col float-right w-1/5 ">
              <div className="flex flex-row justify-center">
                <Image src={logoFooterImg} alt="" />
              </div>

              <p
                style={{
                  fontSize: "clamp(10px, 1.5vw, 24px)",
                }}
                className="text-justify w-[100%]"
              ></p>
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
