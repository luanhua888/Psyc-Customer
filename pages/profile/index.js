import { Button, Pagination, Table } from "flowbite-react";
import dayjs from "dayjs";
import { Formik } from "formik";
import Image from "next/image";
import heroBanner from "../../public/photos/hero-banner-profile.png";
import profileAvatar from "../../public/photos/profile-avatar.png";
import googleMapReact from "google-map-react";

import { useRef, useEffect, useState } from "react";
import { profileService } from "../../services/ProfileService";
import { userService } from "../../services/UserService";
import onPageChange from "../../services/UserService";
import ModalMap from "../../components/modal/ModalMap";



export default function Profile(props) {

  const { handleOpenModalPicker } = props;
  const modalMapRef = useRef();



  const handleOpenModalPickerChild = () => {
    modalMapRef.current?.open()
  };

  const pageCount = 5;
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  const formRef = useRef();

  const onSubmit = async (data) => {
    console.login(data);
  };

  const [supProfile, setSupProfile] = useState([]);
  const [btnSubmit, setBtnSubmit] = useState("Chỉnh sửa");
  const [isEdit, setIsEdit] = useState(true);
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

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("jwttoken")) {
        const data = await profileService.getSupProfile(
          localStorage.getItem("idcustomer"),
          currentPage,
          5
        );

        if (data.statusCode == 200) {
          setSupProfile(data.data);
        }
      }
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
                  <input className="block w-full rounded-3xl" type="file" />
                </div>
                <div className="flex flex-1 flex-col ">
                  <Formik
                    innerRef={formRef}
                    initialValues={{
                      username: "",
                      password: "",
                    }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.username) {
                        errors.username = "Thông tin bắt buộc";
                      }

                      if (!values.password) {
                        errors.password = "Thông tin bắt buộc";
                      }

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
                      <>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                          <div>
                            <label
                              for="first_name"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Họ và Tên
                            </label>
                            <input
                              type="text"
                              id="first_name"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Nhập họ và tên"
                              value={user.fullname}
                              disabled={isEdit}
                              required
                            ></input>
                          </div>
                        </div>

                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                          <div>
                            <label
                              for="countries"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                            >
                              {}
                              Giới tính
                            </label>
                            <select
                              id="countries"
                              disabled={isEdit}
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              {user.gender == "Male" && (
                                <option color={"pink"}>Nam</option>
                              )}
                              {user.gender == "Female" && (
                                <option color={"pink"}>Nữ</option>
                              )}
                            </select>
                          </div>
                          <div>
                            <label
                              for="first_name"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Ngày tháng năm sinh
                            </label>
                            <input
                              type="datetime-local"
                              id="first_name"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Ngày tháng năm sinh"
                              value={user.dob}
                              disabled={isEdit}
                              required
                            >
                              {user.birthday}
                            </input>
                          </div>
                        </div>

                        <div class="grid gap-6 mb-6 md:grid-cols-3">
                          <div>
                            <label
                              for="countries"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                            >
                              Kinh độ
                            </label>
                            <input
                              type="text"
                              id="first_name"
                              disabled={isEdit}
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Nhập dữ liệu"
                              required
                            />
                          </div>
                          <div>
                            <label
                              for="first_name"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Vĩ độ
                            </label>
                            <input
                              type="text"
                              disabled={isEdit}
                              id="first_name"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Nhập dữ liệu"
                              required
                            />
                          </div>
                          
                            <div>
                            <Button
                              class="block pt-1 mt-7 text-sm rounded-full bg-blue-700  hover:bg-blue-800 font-medium text-white dark:text-gray-300 text-center"
                              type="primary"
                              width="default"
                              onClick={handleOpenModalPickerChild}
                            >
                              Chọn vị trí
                            </Button>
                            </div>
                           
    


                        </div>

                        <div class="grid gap-6 mb-6">
                          <div>
                            <label
                              for="first_name"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Nơi sinh
                            </label>
                            <textarea
                              id="first_name"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Nhập dữ liệu"
                              disabled={isEdit}
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div>
                          <button
                            type="button"
                            class="text-white float-right bg-blue-700  hover:bg-blue-800 focus:outline-none   focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-2.5 text-center mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => {
                              if (isEdit) {
                                setBtnSubmit("Chỉnh Sửa");
                                formRef.current.submitForm();
                                setIsEdit(false);
                              } else {
                                setBtnSubmit("Lưu");
                                setIsEdit(true);
                              }
                            }}
                          >
                            {btnSubmit}
                          </button>
                        </div>
                      </>
                    )}
                  </Formik>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-center mb-6 text-slate-700 font-bold text-xl pb-5 border-b-4 border-b-slate-700">
                Danh sách các hồ sơ khác của bạn
              </h3>

              <div>
                <Table hoverable={true}>
                  <Table.Head>
                    <Table.HeadCell>STT</Table.HeadCell>
                    <Table.HeadCell>Họ và Tên</Table.HeadCell>
                    <Table.HeadCell>Ngày sinh</Table.HeadCell>
                    <Table.HeadCell>Kinh độ</Table.HeadCell>
                    <Table.HeadCell>Vĩ độ</Table.HeadCell>
                    <Table.HeadCell>Giới Tính</Table.HeadCell>
                    <Table.HeadCell>Nơi Sinh</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>

                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                  </Table.Head>
                  {supProfile.map((item, index) => (
                    <Table.Body key={index} className="divide-y">
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          1
                        </Table.Cell>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>{`${dayjs(supProfile.dob).format(
                          "DD/MM/YYYY"
                        )} `}</Table.Cell>
                        <Table.Cell>{item.latitude}</Table.Cell>
                        <Table.Cell>{item.longitude}</Table.Cell>
                        <Table.Cell>{item.gender}</Table.Cell>
                        <Table.Cell>{supProfile.birthPlace}</Table.Cell>
                        <Table.Cell>
                          <Button outline={true} color="warning">
                            Bản đồ sao
                          </Button>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex gap-2">
                            <Button outline={true}>Chỉnh sửa</Button>
                            <Button outline={true} color="failure">
                              Xóa
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
      <ModalMap ref={modalMapRef}/>
      
    </>
  );
}
