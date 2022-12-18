import { Button, Pagination, Table, Toast } from "flowbite-react";
import dayjs from "dayjs";
import { Formik } from "formik";
import _, { isNull, set } from "lodash";
import Image from "next/image";
import heroBanner from "../../public/photos/zodiac.png";
import profileAvatar from "../../public/photos/profile-avatar.png";
import addIcon from "../../public/photos/icon/add.png";
import deleteIcon from "../../public/photos/icon/trash.png";
import editIcon from "../../public/photos/icon/edit.png";
import starIcon from "../../public/photos/icon/solar-system.png";
import heartIcon from "../../public/photos/icon/heart-arrow.png";
import successIcon from "../../public/photos/icon/checked.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRef, useEffect, useState } from "react";
import { profileService } from "../../services/ProfileService";
import { userService } from "../../services/UserService";
import ModalMap from "../../components/modal/ModalMap";
import ModalEditSupProfile from "../../components/modal/ModalEditSupProfile";
import ModalStarMap from "../../components/modal/ModalStarMap";
import ModalAddSupProfile from "../../components/modal/ModalAddSupProfile";
import ModalLoveCompality from "../../components/modal/ModalLoveCompality";

import Skeleton from "@mui/material/Skeleton";
import ModalStarCus from "../../components/modal/ModalStarCus";
import ModalResultSurvey from "../../components/modal/ModalResultSurvey";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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

export default function Profile(props) {
  const modalEditSupProfileRef = useRef();
  const modalStarMapRef = useRef();
  const modalStarCusRef = useRef();
  const modalResultSurveyRef = useRef();
  const modalAddSupProfileRef = useRef();
  const modalLoveCompalityRef = useRef();
  const formRef = useRef();
  const [dataForm, setDataForm] = useState({});
  const modalMapRef = useRef();

  const [loading, setLoading] = useState(true);

  const notify = () => toast("Xóa hồ sơ thành công!");
  const uploadSuccess = () => toast("Xóa hồ sơ thành công!");
  const uploadImageSuccess = () => toast("Tải ảnh lên thành công!");
  const uploadInForSuccess = () => toast("Cập nhật thông tin thành công!");

  const handleOpenModalPickerChild = () => {
    modalMapRef.current?.open();
  };

  const handleOpenModalAddSupProfile = () => {
    modalAddSupProfileRef.current?.open();
  };

  const handleOpenModalStarMapCus = () => {
    modalStarCusRef.current?.open();
    getZodiacCus();
  };

  const handleCloseModalEditSupProfile = () => {
    modalEditSupProfileRef.current?.close();

    getSupProfile();
  };

  const [totalpage, setTotalpage] = useState(0);

  console.log("totalpage", totalpage);
  const pageCount = 5;

  const onSubmit = async (data) => {
    try {
      let dataPost = {
        ...data,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
      };

      const infor = await userService.customerUpdate(dataPost, user.email);
      console.log("infor", infor);

      if (infor.statusCode == 201) {
        uploadInForSuccess();
        getProfile();
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const [supProfile, setSupProfile] = useState([]);
  const [nameSupProfile, setNameSupProfile] = useState("");
  const [imageFirebaseUrl, setImageFirebaseUrl] = useState({});
  //upload image  firebase
  // const [fileimageFirebaseUrl, setFileImageFirebaseUrl] = useState();
  const [starMap, setStarMap] = useState([]);
  const [lovecompatility, setLovecompatility] = useState([]);
  const [supProfileId, setSupProfileId] = useState({});
  const [supProfileResult, setSupProfileResult] = useState({});
  console.log("supProfileId", supProfileId);

  const handleOpenModalEditSupProfile = () => {
    modalEditSupProfileRef.current?.open();
  };
  const [btnSubmit, setBtnSubmit] = useState(false);
  const [Btndisable, setBtndisable] = useState(true);
  const [openDelete, setopenDelete] = useState(false);
  const [btnDisplayToast, setBtnDisplayToast] = useState(false);
  const handleOpenModalStarMap = () => {
    modalStarMapRef.current?.open();
  };
  const [user, setUser] = useState({});

  console.log("user nè", user);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getProfile();
  }, []);

  const handleDeleteSupProfile = async (id) => {
    if (localStorage.getItem("jwttoken")) {
      const data = await profileService.deleteSupProfile(id);

      notify();
      getSupProfile();

      modalEditSupProfileRef.current?.close();
    }
  };

  const handleCloseDelete = async (id) => {
    setopenDelete(false);
  };

  const getSupProfile = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await profileService.getSupProfileDefault(
        localStorage.getItem("idcustomer"),
        currentPage,
        5
      );
      if (data.statusCode == 200) {
        setSupProfile(data.data);
        setTotalpage(data.totalpage);
        // console.log("data oksff", data.totalpage);
      }
    }
  };

  const getProfile = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await profileService.profile(
        localStorage.getItem("idcustomer")
      );

      if (data.statusCode == 200) {
        setUser(data.data[0]);
      }
    }
  };

  const postImageFirebase = (e) => {
    if (localStorage.getItem("jwttoken")) {
      // kiểu của file không được để null
      const file = e.target.files[0];
      const data = userService.uploadImage(file);
      //trả về url của data
      data.then((res) => {
        setImageFirebaseUrl(res);
      });

      if (data.statusCode == 200) {
        setImageFirebaseUrl(data.data);
        console.log("data1", data.data);
      }
      //reload lại Image Profile sau khi update
    }
  };

  // console.log("email", localStorage.getItem("email"));
  const updateImageProfile = async () => {
    setLoading(true);
    if (localStorage.getItem("jwttoken")) {
      const data = await userService.updateImageProfile(
        //email,
        user.email,
        imageFirebaseUrl.data
      );

      if (data.statusCode == 201) {
        uploadImageSuccess;
        //reload lại trang
        window.location.reload();
      }
      getProfile();
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      getSupProfile();
    })();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLovecompatility = async (id, name) => {
    if (localStorage.getItem("jwttoken")) {
      const data = await profileService.getLovecompatility(
        localStorage.getItem("idcustomer"),
        id
      );

      if (data.statusCode == 200) {
        setLovecompatility(data);
        modalLoveCompalityRef.current?.open();
        setNameSupProfile(name);
      }
    }
  };

  const [zodiacCus, setZodiacCus] = useState([]);

  const getZodiacCus = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await profileService.getZodiacCus(user.zodiacId);

      const data1 = await profileService.getResultSurvey(
        localStorage.getItem("idcustomer")
      );

      if (data.statusCode == 200) {
        setZodiacCus(data.data[0].name);
      }

      // if (data1.statusCode == 200) {
      //   setResultSurvey(data1.data[0].discchart);
      // }
    }
  };

  const handleOpenModalResult = () => {
    modalResultSurveyRef.current?.open();
  };

  return (
    <>
      {loading ? (
        <div>
          <section className="bg-[#031d2e]">
            <div className="md:container mx-auto px-[10%] py-5">
              <div className="px-7 py-3 rounded-3xl bg-[#17384e]">
                {user && (
                  <div className="flex gap-5 mb-12">
                    <div className="flex flex-col gap-2">
                      <div className="w-[260px] h-[250px] flex flex-row  justify-center items-center">
                        <Skeleton width={260} height={250} />
                      </div>
                      <button>
                        <Skeleton width={100} height={30} />
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col ">
                      {!_.isEmpty(user) && (
                        <Formik
                          innerRef={formRef}
                          initialValues={{
                            email: user.email,
                            fullname: user.fullname,
                            address: user.address,
                            gender: user.gender,
                            dob: user.dob,
                            longitude: user.longitude,
                            latitude: user.latitude,
                          }}
                          validate={(values) => {
                            const errors = {};

                            return errors;
                          }}
                        >
                          {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                          }) => (
                            <form className="pt-2" onSubmit={handleSubmit}>
                              <input
                                type="hidden"
                                name="email"
                                id="email"
                                value={values.email}
                                defaultValue={values.email}
                              />
                              <div class="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                  <label
                                    for="fullname"
                                    class="block mb-2 text-sm font-medium text-[#ff7010] dark:text-gray-300"
                                  >
                                    <Skeleton width={100} height={20} />
                                  </label>
                                  <Skeleton width={300} height={30} />
                                </div>

                                <div>
                                  <label
                                    for="address"
                                    class="block mb-2 text-sm font-medium text-[#ff7010] dark:text-gray-300"
                                  >
                                    <Skeleton width={100} height={20} />
                                  </label>
                                  <Skeleton width={300} height={30} />
                                </div>
                              </div>

                              <div class="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                  <label
                                    for="gender"
                                    class="block mb-2 text-sm font-medium text-[#ff7010] dark:text-gray-400"
                                  >
                                    {}
                                    <Skeleton width={100} height={20} />
                                  </label>
                                  <Skeleton width={300} height={30} />
                                </div>
                                <div>
                                  <label
                                    for="dob"
                                    class="block mb-2 text-sm font-medium text-[#ff7010] dark:text-gray-300"
                                  >
                                    <Skeleton width={100} height={20} />
                                  </label>
                                  <Skeleton width={300} height={30} />
                                </div>
                              </div>

                              <div className="d-flex flex float-right   text-white    focus:outline-none   focus:ring-blue-300 font-medium rounded-full text-sm  text-center   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <button type="submit">
                                  <Skeleton width={100} height={20} />
                                </button>
                              </div>
                            </form>
                          )}
                        </Formik>
                      )}
                    </div>
                  </div>
                )}
                <div>
                  <h1 className="text-center mb-6 text-slate-700 font-bold text-3xl pb-5 border-b-4 border-b-slate-700 flex flex-row">
                    <p className="w-[100%] ">
                      <span className="pr-[20%] pl-[24%] text-[#ff7010]">
                        <Skeleton width={900} height={40} />
                      </span>
                    </p>
                  </h1>

                  <div>
                    <Skeleton width={900} height={40} />
                    <Skeleton width={900} height={40} />
                    <Skeleton width={900} height={40} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <section className="bg-[#031d2e]">
            <div
              className="absolute right-[3%] top-[55%] flex flex-row"
              // không hiển thị
              style={{ display: btnDisplayToast ? "block" : "none" }}
            >
              <Toast title="Success">
                <div className="  h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 ">
                  <Image
                    src={successIcon}
                    width={30}
                    height={30}
                    alt=""
                    className="justify-center items-center"
                  />
                </div>
                <div className="ml-3 text-sm font-normal">Thành công</div>
                <Toast.Toggle />
              </Toast>
            </div>

            <div className="md:container mx-auto px-24 py-6 ">
              <div className="flex justify-center items-center">
                <div className="flex-1">
                  <Image
                    className="animate-spin"
                    src={heroBanner}
                    alt=""
                    width={200}
                    height={200}
                  />
                </div>
                <div className="flex flex-1 justify-center items-center">
                  <p className=" text-[#ff7010] font-bold md:text-5xl pb-5 border-b-4 border-b-[#ff7010]">
                    Thông tin cá nhân
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#031d2e]">
            <div className="md:container mx-auto px-[10%] py-5">
              <div className="px-7 py-3 rounded-3xl bg-[#17384e]">
                {user && (
                  <div className="flex gap-5 mb-12">
                    <div className="flex flex-col gap-2 border-r">
                      <div className="w-[260px] h-[250px] flex flex-row  justify-center items-center">
                        <Image
                          loader={() => user.imageUrl}
                          src={profileAvatar}
                          alt=""
                          className="rounded-xl bg-cover"
                        />
                      </div>
                      <input
                        locale="vi"
                        className=" mt-2 rounded-3xl cursor-pointer text-[#ff7010]"
                        type="file"
                        onChange={postImageFirebase}
                      />
                      <button
                        className=" bg-[#ff7010] mr-2
                  
                  py-1 text-xl text-white rounded-xl"
                        onClick={updateImageProfile}
                      >
                        Tải lên
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col ">
                      {!_.isEmpty(user) && (
                        <Formik
                          innerRef={formRef}
                          initialValues={{
                            email: user.email,
                            fullname: user.fullname,
                            address: user.address,
                            gender: user.gender,
                            dob: user.dob,
                            longitude: user.longitude,
                            latitude: user.latitude,
                          }}
                          validate={(values) => {
                            const errors = {};

                            if (!values.fullname) {
                              errors.fullname =
                                "Thông tin này không được để trống";
                            } else if (values.fullname.length > 15) {
                              errors.fullname = "Must be 15 characters or less";
                            }

                            if (!values.address) {
                              errors.address =
                                "Thông tin này không được để trống";
                            } else if (values.address.length > 20) {
                              errors.address = "Must be 20 characters or less";
                            }

                            const getAge = (dateString) => {
                              var today = new Date();
                              var birthDate = new Date(dateString);
                              var age =
                                today.getFullYear() - birthDate.getFullYear();
                              var m = today.getMonth() - birthDate.getMonth();
                              if (
                                m < 0 ||
                                (m === 0 &&
                                  today.getDate() < birthDate.getDate())
                              ) {
                                age--;
                              }
                              return age;
                            };

                            if (!values.dob) {
                              errors.dob = "Required";
                            } else if (getAge(values.dob) < 18) {
                              errors.dob = "Bạn phải trên 18 tuổi";
                            }

                            return errors;
                          }}
                          // btnSubmit = true;  thì cho phép submit form và hiển thị modal

                          onSubmit={btnSubmit ? null : onSubmit}
                        >
                          {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                          }) => (
                            <form className="pt-2" onSubmit={handleSubmit}>
                              <input
                                type="hidden"
                                name="email"
                                id="email"
                                value={values.email}
                                defaultValue={values.email}
                              />
                              <div class="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                  <div className="flex ">
                                    <label
                                      for="fullname"
                                      class="block mb-2 text-sm font-medium text-[#ff7010] dark:text-gray-300"
                                    >
                                      Họ và Tên
                                    </label>
                                    <div className="mx-[10%] text-[#ff7010] ">
                                   
                                      {errors.fullname &&
                                        touched.fullname &&
                                        errors.fullname}
                                    </div>
                                  </div>
                                  <input
                                    disabled={Btndisable} // false
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    class="p-3 rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                                    placeholder="Nhập họ và tên"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullname}
                                    required
                                  />
                                </div>

                                <div>
                                  <label
                                    for="address"
                                    class="block mb-2 text-sm font-medium text-[#ff7010] dark:text-gray-300"
                                  >
                                    Nơi sinh
                                  </label>
                                  <input
                                    disabled={Btndisable}
                                    id="address"
                                    name="address"
                                    class="p-3 rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                                    placeholder="Nhập dữ liệu"
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address}
                                    onClick={handleOpenModalPickerChild}
                                  />
                                </div>
                              </div>

                              <div class="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                  <label
                                    for="gender"
                                    class="block mb-2 text-sm font-medium text-[#ff7010] dark:text-gray-400"
                                  >
                                    {}
                                    Giới tính
                                  </label>
                                  <select
                                    disabled={Btndisable} // false
                                    id="gender"
                                    name="gender"
                                    class="p-3 rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.gender}
                                  >
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                  </select>
                                </div>
                                <div>
                                 <div className="flex">
                                 <label
                                    for="dob"
                                    class="block mb-2 text-sm font-medium text-[#ff7010] dark:text-gray-300"
                                  >
                                    <p>Ngày tháng năm sinh</p>
                                  </label>
                                  <div className="mx-[10%] text-[#ff7010] ">{errors.dob && touched.dob && errors.dob}</div>
                                 </div>
                                  <input
                                    disabled={Btndisable} // false
                                    type="datetime-local"
                                    id="dob"
                                    name="dob"
                                    class="p-3 rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                                    placeholder="Ngày tháng năm sinh"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    defaultValue={dayjs(
                                      new Date(values.dob)
                                    ).format("YYYY-MM-DDTHH:mm")}
                                    required

                                    // không cho chọn ngày trước ngày hiện tại
                                    max={dayjs(new Date()).format(
                                      "YYYY-MM-DDTHH:mm"
                                    )}
                                  />
                                </div>
                              </div>

                              <div class="hidden">
                                <div>
                                  <label
                                    for="longitude"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                  >
                                    Kinh độ
                                  </label>
                                  <input
                                    disabled={Btndisable} // false
                                    type="text"
                                    id="longitude"
                                    name="longitude"
                                    class="p-3 rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                                    placeholder="Nhập dữ liệu"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.longitude}
                                    readOnly
                                    required
                                  />
                                </div>
                                <div>
                                  <label
                                    for="latitude"
                                    class="block mb-2 text-sm font-medium text-[#ff7010] dark:text-gray-300"
                                  >
                                    Vĩ độ
                                  </label>
                                  <input
                                    disabled={Btndisable} // false
                                    type="text"
                                    id="latitude"
                                    name="latitude"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Nhập dữ liệu"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.latitude}
                                    readOnly
                                    required
                                  />
                                </div>

                                <div className="pt-7"></div>
                              </div>

                              <div className="d-flex flex float-right   text-white    focus:outline-none   focus:ring-blue-300 font-medium rounded-full text-sm  text-center   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <button
                                  type="submit"
                                  // disabled={isSubmitting}
                                  class=" text-white  bg-[#ff7010]  hover:bg-[#031d2e] focus:outline-none   focus:ring-[#031d2e] font-medium rounded-lg text-sm px-8 py-4 text-center   dark:bg-[#031d2e] dark:hover:bg-[#031d2e] dark:focus:ring-[#031d2e] 
                              transition duration-500 ease-in-out
                              "
                                  onClick={() => {
                                    if (btnSubmit == true) {
                                      setBtnSubmit(false);
                                      setBtndisable(true);
                                    } else {
                                      setBtnSubmit(true);
                                      setBtndisable(false);
                                    }
                                  }}
                                >
                                  {btnSubmit == true ? "Lưu" : "Cập nhật"}
                                </button>
                              </div>
                            </form>
                          )}
                        </Formik>
                      )}
                      <div className="flex justify-end mt-2 gap-2 ">
                        <button
                          type="submit"
                          // disabled={isSubmitting}
                          class=" text-white  bg-[#ff7010]  hover:bg-[#031d2e] focus:outline-none   focus:ring-[#031d2e] font-medium rounded-lg text-sm px-6 py-4 text-center dark:bg-[#031d2e] dark:hover:bg-[#031d2e] dark:focus:ring-[#031d2e] transition duration-500 ease-in-out"
                          onClick={() => handleOpenModalResult()}
                        >
                          Kết quả khảo sát
                        </button>

                        <button
                          class=" text-white  bg-[#ff7010]  hover:bg-[#031d2e] focus:outline-none   focus:ring-[#031d2e] font-medium rounded-lg text-sm px-6 py-4 text-center dark:bg-[#031d2e] dark:hover:bg-[#031d2e] dark:focus:ring-[#031d2e] transition duration-500 ease-in-out"
                          onClick={() => handleOpenModalStarMapCus()}
                        >
                          Bản đồ sao
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <h1 className="text-center mb-6 text-slate-700 font-bold text-3xl pb-5 border-b-4 border-b-slate-700 flex flex-row">
                    <p className="w-[100%] ">
                      <span className="pr-[20%] pl-[24%] text-[#ff7010]">
                        Danh sách các hồ sơ phụ
                      </span>
                      <Image
                        src={addIcon}
                        alt=""
                        className="rounded-xl ml-[50%] cursor-pointer"
                        width={30}
                        height={30}
                        onClick={() => {
                          handleOpenModalAddSupProfile();
                        }}
                      />
                    </p>
                  </h1>

                  <div>
                    <Table hoverable={true}>
                      <Table.Head className="bg-[#143246] text-[#ff7010]">
                        <Table.HeadCell>STT</Table.HeadCell>
                        <Table.HeadCell>Họ và Tên</Table.HeadCell>
                        <Table.HeadCell>Ngày sinh</Table.HeadCell>
                        {/* <Table.HeadCell>Giới Tính</Table.HeadCell>
                    <Table.HeadCell>Kinh độ</Table.HeadCell> */}
                        <Table.HeadCell>Giới Tính</Table.HeadCell>
                        <Table.HeadCell>Nơi Sinh</Table.HeadCell>
                        <Table.HeadCell>Thao tác</Table.HeadCell>
                      </Table.Head>
                      {supProfile.length > 0 ? (
                        <Table.Body className=" ">
                          {supProfile.map((item, index) => (
                            <Table.Row
                              key={index}
                              className="bg-[#2e4b5f] text-white dark:border-gray-700 dark:bg-gray-800 hover:bg-[#455f71]"
                            >
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 text-[#ff7010]">
                                {index + 1}
                              </Table.Cell>
                              <Table.Cell>{item.name} </Table.Cell>

                              <Table.Cell>{`${dayjs(item.dob).format(
                                "DD/MM/YYYY"
                              )} `}</Table.Cell>
                              <Table.Cell>
                                {item.gender == "male" ? "Nam" : "Nữ"}
                              </Table.Cell>
                              {/* <Table.Cell>{item.latitude}</Table.Cell>
                        <Table.Cell>{item.longitude}</Table.Cell> */}
                              <Table.Cell>{item.birthPlace}</Table.Cell>

                              <Table.Cell>
                                <div className="flex flex-wrap gap-3">
                                  <div>
                                    <Image
                                      className="cursor-pointer"
                                      src={deleteIcon}
                                      width={20}
                                      height={20}
                                      alt=""
                                      onClick={() => setopenDelete(true)}
                                    />
                                    <Dialog
                                      open={openDelete}
                                      onClose={handleCloseDelete}
                                      aria-labelledby="alert-dialog-title"
                                      aria-describedby="alert-dialog-description"
                                    >
                                      <DialogTitle id="alert-dialog-title">
                                        {"Xác nhận xóa hồ sơ"}
                                      </DialogTitle>
                                      <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                          Bạn có chắc chắn muốn xóa hồ sơ này?
                                        </DialogContentText>
                                      </DialogContent>
                                      <DialogActions>
                                        <Button
                                          onClick={handleCloseDelete}
                                          color="primary"
                                        >
                                          Hủy
                                        </Button>
                                        <Button
                                          onClick={() => {
                                            handleDeleteSupProfile(item.id);
                                            handleCloseDelete();
                                          }}
                                          color="primary"
                                          autoFocus
                                        >
                                          Xác nhận
                                        </Button>
                                      </DialogActions>
                                    </Dialog>
                                  </div>
                                  <div>
                                    <Image
                                      className="cursor-pointer"
                                      src={editIcon}
                                      width={20}
                                      height={20}
                                      alt=""
                                      onClick={() =>
                                        handleOpenModalEditSupProfile(
                                          setSupProfileResult(item)
                                        )
                                      }
                                    />
                                  </div>
                                  {/* <div>
                                    <Image
                                      className="cursor-pointer"
                                      src={starIcon}
                                      width={20}
                                      height={20}
                                      alt=""
                                      onClick={() =>
                                        handleOpenModalStarMap(
                                          setStarMap(item.birthChart)
                                        )
                                      }
                                    />
                                  </div> */}
                                  <div>
                                    <Image
                                      className="cursor-pointer"
                                      src={heartIcon}
                                      width={20}
                                      height={20}
                                      alt=""
                                      onClick={() =>
                                        getLovecompatility(item.id, item.name)
                                      }
                                    />
                                  </div>
                                </div>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      ) : (
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell
                              colSpan={6}
                              className="text-center  hover:text-white hover:bg-[#455f71]  text-2xl"
                            >
                              Không có dữ liệu
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      )}
                    </Table>
                  </div>

                  <div>
                    <div className="flex items-center justify-center text-center">
                      <Pagination
                        previousLabel="Trước"
                        nextLabel="Sau"
                        currentPage={currentPage}
                        layout="pagination"
                        onPageChange={async (page) => {
                          setCurrentPage(page);
                          if (localStorage.getItem("jwttoken")) {
                            const data = await profileService.getSupProfile(
                              localStorage.getItem("idcustomer"),
                              5,
                              page
                            );
                            if (data.statusCode == 200) {
                              setSupProfile(data.data);
                            }
                          }
                        }}
                        showIcons={true}
                        totalPages={totalpage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <ModalMap
        ref={modalMapRef}
        onChangeLocation={(latitude, longitude, address) =>
          formRef.current.setValues({ latitude, longitude, address })
        }
      />
      <ModalEditSupProfile
        id={supProfileResult}
        ref={modalEditSupProfileRef}
        handleClose={handleCloseModalEditSupProfile}
      />
      <ModalStarMap
        id={starMap}
        name={zodiacCus}
        address={user.address}
        nameCus={user.fullname}
        ref={modalStarMapRef}
      />
      <ModalStarCus
        id={user.birthchart}
        name={zodiacCus}
        address={user.address}
        nameCus={user.fullname}
        ref={modalStarCusRef}
      />
      <ModalAddSupProfile ref={modalAddSupProfileRef} />
      <ModalLoveCompality
        name={user.fullname}
        supName={nameSupProfile}
        love={lovecompatility}
        ref={modalLoveCompalityRef}
      />
      <ModalResultSurvey ref={modalResultSurveyRef} />
      <ToastContainer />
    </>
  );
}
