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

  console.log("user", user);


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
      //all b??i vi???t
      const data = await articleService.getAll();
      if (data.statusCode == 200) {
        setArticle(data.data);
      }

      //all h??nh tinh
      const data1 = await planetService.getAll();

      if ((data1.statusCode = 200)) {
        setPlanet(data1.data);
      }

      // Nh??
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
      console.log("article ????", article.data[0]);

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
      console.log("house ????", house.data[0]);

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
      console.log("planet ????", planet.data[0]);

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

  //c???u h??nh router
  

  return (
    <div className="">
      <div className="bg-[#031d2e] justify-center items-center flex my-[2%] ">
        <div className=" flex flex-row justify-between items-center text-white font-bold rounded-3xl gap-[5%] ">
          {/* h??nh ???nh */}
          <div className="min-w-[100px]">
            <Image className="animate-spin  " src={astroRoundedImg} alt="" />
          </div>

          <div className="flex flex-col gap-[10%] text-slate-800 md:text-5xl ">
            <h3 className="font-sans sm:text-5xl text-white">
              B???t k?? c??u h???i n??o?
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
              Tr?? chuy???n v???i t?? v???n vi??n
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
                  L?? S??? H???ng Ng??y
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
                    // c??? ch??? nh??? nh???t l?? 12px
                    fontSize: "clamp(10px, 1.5vw, 24px)",
                  }}
                >
                  ?????t l???ch
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
                    // c??? ch??? nh??? nh???t l?? 12px
                    fontSize: "clamp(10px, 1.5vw, 24px)",
                  }}
                >
                  Tr???c Ti???p
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
                    // c??? ch??? nh??? nh???t l?? 12px
                    fontSize: "clamp(10px, 1.5vw, 24px)",
                  }}
                >
                  B??i Kh???o S??t
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
            CUNG HO??NG ?????O C???A B???N L?? G??????
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
                  // c??? ch??? nh??? nh???t l?? 12px
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
              NH???NG B??I VI???T M???I NH???T???
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

      {/* h??nh tinh */}

      <div>
        <div className="text-center">
          <h1
            className="text-white my-[1%] w-[40%] justify-center flex flex-row items-center mx-auto md:text-3xl border-b-2 border-[#ff7010]"
            style={{
              fontSize: "clamp(10px, 1.5vw, 24px)",
            }}
          >
            C??C H??NH TINH TRONG CHI??M TINH H???C
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

      {/* Nh??  */}
      <div className="bg-[#17384e] ">
        <div className="text-center">
          <h1
            className="text-white my-[1%] w-[40%] justify-center flex flex-row items-center mx-auto md:text-3xl border-b-2 border-[#ff7010]"
            style={{
              fontSize: "clamp(10px, 1.5vw, 24px)",
            }}
          >
            C??C NH?? TRONG CHI??M TINH H???C
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
              T???I SAO CH???N PSYC???
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
                    PSYC (Psychological Counseling)
                  </span>{" "}
                  c?? th??? gi??p b???n gi???i to??? c???m x??c c???a m??nh c??ng nh?? c???m th???y
                  t??m tr???ng nh??? nh??ng h??n khi gi???i t???a ???????c nh???ng c??ng th???ng. C??
                  c??ch nh??n tho??ng h??n ?????i v???i v???n ????? c???a b???n th??n. B???n s??? c???m
                  th???y ???????c s??? ?????ng c???m khi c?? ng?????i ???ng h???, hi???u v?? kh??ch l???
                  m??nh. B???n s??? nh???n ???????c nh???ng l???i khuy??n t???t v?? nh???n ra c??c gi??
                  tr??? c???a c???a ch??nh m??nh v?? nh???ng ngu???n l???c s???n c??. Tr??? n??n t???
                  tin v?? m???nh m??? ????? t??? quy???t ?????nh v?? gi???i quy???t v???n ?????. B???n s???
                  nh???n ???????c l???i khuy??n h???u ??ch t??? chuy??n gia t??m l?? khi chia s???
                  t??m s??? trong nh???ng ph??t b??? t???c c???a cu???c ?????i v?? t??m th???y ???????c
                  ?????nh h?????ng cho b???n th??n m??nh. Ph???c h???i tinh th???n v?? th??? ch???t.
                  B??n c???nh ????, PSYC c??n c?? th??? gi??p b???n bi???t ???????c Cung Ho??ng ?????o
                  c???a b???n th??n, v?? c?? th??? gi??p b???n t??m hi???u v??? Chi??m Tinh H???c -
                  h??? th???ng b??i to??n d???a tr??n s??? v???n h??nh c???a v?? tr??? v?? c??c h??nh
                  tinh xung quanh Tr??i ?????t. B???n c?? th??? xem ???????c b???n ????? sao c???a
                  m??nh - ???B???n ????? sao??? l?? h??nh th???c t????ng t??? nh?? ???l?? s??? t??? vi???
                  c???a ng?????i ph????ng ????ng???. B???n c?? th??? xem ?? Ngh??a c???a c??c h??nh
                  tinh trong chi??m tinh h???c, s??? li??n h??? gi???a c?? th??? con ng?????i
                  v???i 12 cung ho??ng ?????o. C?? th??? gi??p b???n xem ???????c con s??? may
                  m???n, c??ng nh?? nh??ng ??i???u t???t ?????p n??n l??m, hay nh???ng vi???c kh??ng
                  n??n l??m theo chi??m tinh h???c.
                </p>
                <p className="text-justify text-white">
                  B??n c???nh d???ch v??? VideoCall/LiveStream,{" "}
                  <span className="text-[#ff7010]">
                    PSYC (Psychological Counseling)
                  </span>{" "}
                  c??n c?? ch???c n??ng t???o B???n ????? Sao C?? Nh??n, Xem t??? l??? t????ng th??ch
                  gi???a 2 ng?????i d???a theo cung ho??ng ?????o.
                </p>
                <p className="text-justify text-white">
                  Ngo??i ra PSYC cung c???p Tr???c Nghi???m T??nh C??ch theo DISC - l??
                  m???t lo???i tr???c nghi???m d??ng ????? ????nh gi?? h??nh vi c?? nh??n t???p
                  trung v??o b???n ?????c ??i???m t??nh c??ch n???i b???t con ng?????i trong m???t
                  kho???ng th???i gian nh???t ?????nh: S??? th???ng tr??? (D), ???nh h?????ng (I),
                  S??? ki??n ?????nh (S), v?? S??? tu??n th??? (C). B???n s??? hi???u r?? h??n v???
                  nh??m t??nh c??ch c???a b???n th??n th??ng qua K???t Qu??? m?? PSYC cung c???p
                  sau khi th???c hi???n b??i tr???c nghi???m.
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
                T???NG ????I H??? TR???
              </h3>
              <p>
                G??p ??, khi???u n???i:{" "}
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
                V??? PYSC
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
                    // khi click v??o s??? t???i xu???ng ???ng d???ng
                  >
                    T???i ???ng d???ng
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
