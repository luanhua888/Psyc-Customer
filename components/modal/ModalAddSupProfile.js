import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import dayjs from "dayjs";
import Modal from "../modal";
import { Button, Pagination, Table } from "flowbite-react";
import ModalMap from "../../components/modal/ModalMap";
import { Formik } from "formik";
import { style } from "@mui/system";
import { userService } from "../../services/UserService";
import { Router } from "next/router";
import Profile from "../../pages/profile";

// eslint-disable-next-line react/display-name
const ModalAddSupProfile = forwardRef((props, ref) => {
  const [user, setUser] = useState({});

  const modalMapRef = useRef();
  const formRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [birthPlace, setBirthPlace] = useState([]);
  console.log("birthPlace", birthPlace);

  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    code: "",
    dob: "",
    // birthPlace: "",
    longitude: "",
    latitude: "",
    imageUrl: "",
    gender: "",
  });

  useImperativeHandle(ref, () => ({
    open: (data) => {
      setDataForm(data);
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  const handleOpenModalPickerChild = () => {
    modalMapRef.current?.open();
  };

  const onSubmit = async (data) => {
    try {
      await userService.PostSupProfile(
        dataForm.name,
        dataForm.birthPlace,
        dataForm.dob,
        dataForm.latitude.toString(),
        dataForm.longitude.toString(),
        dataForm.gender,
        localStorage.getItem("idcustomer")
      );
    } catch (err) {
      console.log("err", err);
    }
  };

  console.log("dataForm", dataForm);

  // nếu ModalEditSupProfile discard thì sẽ gọi hàm getSupProfile ở

  return (
    <div className="absolute top-0">
      <Modal
        classes="overflow-hidden max-w-full max-h-full w-2/3 h-auto p-4 bg-white rounded-lg "
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // title={"Thêm hồ sơ phụ" }
        onDiscard={() => console.log("Button discard")}
        // buttons={[
        //   {
        //     role: "discard",
        //     toClose: true,
        //     classes:
        //       "bg-zinc-500/20 px-4 py-2 rounded-lg hover:bg-zinc-500/30 transition-all duration-200",
        //     label: "Cập nhật",
        //   },
        // ]}
      >
        <h1 className="text-3xl font-bold justify-center flex flex-row ">
          Thêm Hồ Sơ Phụ
        </h1>
        <div>
          {user && (
            <Formik
              innerRef={formRef}
              initialValues={{
                name: "",
                email: "",
                username: "",
                password: "",
                code: "",
                dob: "",
                longitude: "",
                latitude: "",
                imageUrl: "",
                gender: "",
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
                <form onSubmit={handleSubmit}>
                  <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Họ và Tên
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập họ và tên"
                        required
                        onChange={(e) =>
                          setDataForm({
                            ...dataForm,
                            name: e.target.value,
                          })
                        }
                        onBlur={handleBlur}
                        // value={values.name}
                      />
                    </div>

                    <div onClick={handleOpenModalPickerChild}>
                      <label
                        for="birthPlace"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Nơi sinh
                      </label>
                      <input
                        type="text"
                        id="birthPlace"
                        disabled={true}
                        name="birthPlace"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập dữ liệu"
                        required
                        onChange={(e) =>
                          setDataForm({
                            ...dataForm,
                            birthPlace: values.birthPlace,
                          })
                        }
                        onBlur={handleBlur}
                        value={values.birthPlace}
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
                        id="gender"
                        name="gender"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) =>
                          setDataForm({
                            ...dataForm,
                            gender: e.target.value,
                          })
                        }
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
                        type="datetime-local"
                        id="dob"
                        name="dob"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Ngày tháng năm sinh"
                        onChange={(e) =>
                          setDataForm({
                            ...dataForm,
                            dob: e.target.value,
                          })
                        }
                        onBlur={handleBlur}
                        defaultValue={dayjs(new Date(values.dob)).format(
                          "YYYY-MM-DDTHH:mm"
                        )}
                        required
                      />
                    </div>
                  </div>

                  <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div className="hidden">
                      <label
                        for="longitude"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        Kinh độ
                      </label>
                      <input
                        type="text"
                        id="longitude"
                        name="longitude"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập dữ liệu"
                        onChange={(e) =>
                          setDataForm({
                            ...dataForm,
                            longitude: e.target.value,
                          })
                        }
                        onBlur={handleBlur}
                        value={values.longitude}
                        readOnly
                        required
                      />
                    </div>
                    <div className="hidden">
                      <label
                        for="longitude"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Vĩ độ
                      </label>
                      <input
                        type="text"
                        id="longitude"
                        name="longitude"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập dữ liệu"
                        onBlur={handleBlur}
                        value={values.latitude}
                        readOnly
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex flex float-right   text-white  gap-5  focus:outline-none   focus:ring-blue-300 font-medium rounded-full text-sm px-7 py- text-center mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      class="text-white  bg-blue-700  hover:bg-blue-800 focus:outline-none   focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-1 text-center mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      // onClick={handleClose}
                    >
                      Thêm mới
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          )}
        </div>
      </Modal>
      <ModalMap
        ref={modalMapRef}
        onChangeLocationAddress={(latitude, longitude, birthPlace) =>
          formRef.current.setFieldValue("latitude", latitude) &&
          formRef.current.setFieldValue("longitude", longitude) &&
          formRef.current.setFieldValue("birthPlace", birthPlace)
        }
        onChangeLocation={(latitude, longitude, birthPlace) =>
          setDataForm({
            ...dataForm,
            latitude,
            longitude,
            birthPlace,
          })
        }
       
      />
    </div>
  );
});

export default ModalAddSupProfile;
