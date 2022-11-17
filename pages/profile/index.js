import { Button, Pagination, Table } from "flowbite-react";
import dayjs from "dayjs";
import { Formik } from "formik";
import _ from "lodash";
import Image from "next/image";
import heroBanner from "../../public/photos/hero-banner-profile.png";
import profileAvatar from "../../public/photos/profile-avatar.png";

import { useRef, useEffect, useState } from "react";
import { profileService } from "../../services/ProfileService";
import { userService } from "../../services/UserService";
import ModalMap from "../../components/modal/ModalMap";
import ModalEditSupProfile from "../../components/modal/ModalEditSupProfile";
import ModalStarMap from "../../components/modal/ModalStarMap";
import { useRadioGroup } from "@mui/material";
import { userAgent } from "next/server";

export default function Profile(props) {

  const modalEditSupProfileRef = useRef();
  const modalStarMapRef = useRef();
  const formRef = useRef();

  const [dataForm, setDataForm] = useState({});
  const modalMapRef = useRef();
  const handleOpenModalPickerChild = () => {
    modalMapRef.current?.open();
  };

  const handleCloseModalEditSupProfile = () => {
    modalEditSupProfileRef.current?.close();

    getSupProfile();
  };

  const pageCount = 5;

  const onSubmit = async (data) => {
    try {
      let dataPost = {
        ...data,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
      };

      await userService.customerUpdate(dataPost, user.email);
    } catch (err) {
      console.log("err", err);
    }
  };

  const [supProfile, setSupProfile] = useState([]);
  const [imageFirebaseUrl, setImageFirebaseUrl] = useState([]);
  const [fileimageFirebaseUrl, setFileImageFirebaseUrl] = useState([]);
  const [starMap, setStarMap] = useState([]);
  const [supProfileId, setSupProfileId] = useState({});
  const [supProfileResult, setSupProfileResult] = useState({});

  const handleOpenModalEditSupProfile = () => {
    modalEditSupProfileRef.current?.open();
    // console.log("supProfileId",supProfileId);
    // getSupProfileDetail();
    // console.log("supProfileResult", supProfileResult);
  };
  const [btnSubmit, setBtnSubmit] = useState(true);
  const handleOpenModalStarMap = () => {
    modalStarMapRef.current?.open();
    // console.log("starMap"   , starMap);
  };
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const data = await profileService.profile(
          localStorage.getItem("idcustomer")
        );

        if (data.statusCode == 200) {
          setUser(data.data[0]);
        }
      }
    })();
  }, []);

  const getSupProfile = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await profileService.getSupProfileDefault(
        localStorage.getItem("idcustomer"),
        currentPage,
        5
      );
      if (data.statusCode == 200) {
        setSupProfile(data.data);
      }
    }
  };

  const postImageFirebase = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await userService.uploadImage();
      if (data.statusCode == 200) {
        setImageFirebaseUrl(data.data);
      }
    }
  };

  const getSupProfileDetail = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await profileService.getSupProfileDetail(
        localStorage.getItem("idcustomer"),
        supProfileId
      );

      if (data.statusCode == 200) {
        setSupProfileResult(data.data);
      }
    }
  };

  useEffect(() => {
    (async () => {
      getSupProfile();
    })();
  }, []);

  return (
    <>
      <section className="bg-blue-300">
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
              <p className=" text-slate-700 font-bold text-5xl pb-5 border-b-4 border-b-slate-700">
                Thông tin cá nhân
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-400">
        <div className="md:container mx-auto py-5">
          <div className="px-7 py-3 rounded-3xl bg-white">
            {user && (
              <div className="flex gap-5 mb-12">
                <div className="flex flex-col gap-2 border-r">
                  <div className="w-[250px] h-[250px] ml-2">
                    <Image
                      loader={() => user.imageUrl}
                      src={profileAvatar}
                      alt=""
                    />
                  </div>
                  <input
                    className="block w-full rounded-3xl"
                    type="file"
                    //chọn file ảnh lên firebase
                    onChange={(e) => {
                      setFileImageFirebaseUrl(e.target.files[0]);
                      console.log("fileimageFirebaseUrl", fileimageFirebaseUrl);
                      postImageFirebase();
                    }}
                  />
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
                      onSubmit={onSubmit}
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
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Họ và Tên
                              </label>
                              <input
                                disabled={btnSubmit} // false
                                type="text"
                                id="fullname"
                                name="fullname"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Nơi sinh
                              </label>
                              <input
                                disabled={btnSubmit} // false
                                id="address"
                                name="address"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Nhập dữ liệu"
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                              />
                            </div>
                          </div>

                          <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                              <label
                                for="gender"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                              >
                                {}
                                Giới tính
                              </label>
                              <select
                                disabled={btnSubmit} // false
                                id="gender"
                                name="gender"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.gender}
                              >
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                              </select>
                            </div>
                            <div>
                              <label
                                for="dob"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Ngày tháng năm sinh
                              </label>
                              <input
                                disabled={btnSubmit} // false
                                type="datetime-local"
                                id="dob"
                                name="dob"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Ngày tháng năm sinh"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={dayjs(
                                  new Date(values.dob)
                                ).format("YYYY-MM-DDTHH:mm")}
                                required
                              />
                            </div>
                          </div>

                          <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                              <label
                                for="longitude"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                              >
                                Kinh độ
                              </label>
                              <input
                                disabled={btnSubmit} // false
                                type="text"
                                id="longitude"
                                name="longitude"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Vĩ độ
                              </label>
                              <input
                                disabled={btnSubmit} // false
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

                          <div className="d-flex flex float-right   text-white  gap-5  focus:outline-none   focus:ring-blue-300 font-medium rounded-full text-sm px-7 py- text-center mr-9   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <button
                              className=" text-white  bg-blue-700  hover:bg-blue-800 focus:outline-none   focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-2  text-center mr-2   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              type="button"
                              width="default"
                              onClick={handleOpenModalPickerChild}
                              disabled={btnSubmit}
                            >
                              Chọn vị trí
                            </button>
                            <button
                              type="submit"
                              // disabled={isSubmitting}
                              class=" text-white  bg-blue-700  hover:bg-blue-800 focus:outline-none   focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-1 text-center mr-2   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={() => {
                                if (btnSubmit == false) {
                                  setBtnSubmit(true);
                                } else {
                                  setBtnSubmit(false);
                                }
                              }}
                            >
                              {btnSubmit == false ? "Lưu" : "Cập nhật"}
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  )}
                </div>
              </div>
            )}
            {/* // */}
            <div>
              <h1 className="text-center mb-6 text-slate-700 font-bold text-3xl pb-5 border-b-4 border-b-slate-700">
                Danh sách các hồ sơ khác của bạn
              </h1>

              <div>
                <Table hoverable={true}>
                  <Table.Head>
                    <Table.HeadCell>STT</Table.HeadCell>
                    <Table.HeadCell>Họ và Tên</Table.HeadCell>
                    <Table.HeadCell>Ngày sinh</Table.HeadCell>
                    <Table.HeadCell>Giới Tính</Table.HeadCell>
                    <Table.HeadCell>Kinh độ</Table.HeadCell>
                    <Table.HeadCell>Vĩ độ</Table.HeadCell>
                    <Table.HeadCell>Nơi Sinh</Table.HeadCell>
                    <Table.HeadCell>Thao tác</Table.HeadCell>
                  </Table.Head>
                  {supProfile.map((item, index) => (
                    <Table.Body key={index} className="divide-y">
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {index + 1}
                        </Table.Cell>
                        <Table.Cell>{item.name} </Table.Cell>

                        <Table.Cell>{`${dayjs(item.dob).format(
                          "DD/MM/YYYY"
                        )} `}</Table.Cell>
                        <Table.Cell>
                          {item.gender == "male" ? "Nam" : "Nữ"}
                        </Table.Cell>
                        <Table.Cell>{item.latitude}</Table.Cell>
                        <Table.Cell>{item.longitude}</Table.Cell>
                        <Table.Cell>{item.birthPlace}</Table.Cell>
                        <Table.Cell>{item.id}</Table.Cell>

                        <Table.Cell>
                          <div className="flex flex-wrap gap-3">
                            <Button
                              outline={true}
                              class="flex justify-center items-center outline w-24 rounded outline-gray-800"
                            >
                              Xóa
                            </Button>

                            <Button
                              outline={true}
                              onClick={() =>
                                handleOpenModalEditSupProfile(
                                  setSupProfileResult(item)
                                )
                              }
                              class="flex justify-center items-center outline w-24 rounded outline-cyan-900"
                            >
                              Chỉnh sửa
                            </Button>
                            <Button
                              outline={true}
                              class="flex justify-center items-center outline w-24 rounded outline-cyan-600 hover:bg-slate-800"
                              onClick={() =>
                                handleOpenModalStarMap(
                                  setStarMap(item.birthChart)
                                )
                              }
                            >
                              Bản đồ sao
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))}
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
                    totalPages={pageCount}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
      <ModalStarMap id={starMap} ref={modalStarMapRef} />
    </>
  );
}
