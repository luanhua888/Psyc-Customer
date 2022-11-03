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
  
  // eslint-disable-next-line react/display-name
  const ModalEditSupProfile = forwardRef((id, ref, handleClose) => {
    const [user, setUser] = useState({});
  
    const modalMapRef = useRef();
    const formRef = useRef();
  
    const [isOpen, setIsOpen] = useState(false);
    const [dataForm, setDataForm] = useState({});
  
    useImperativeHandle(ref, () => ({
      open: (data) => {
        setDataForm(data);
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
    }));
  
  
  
    //   console.log(id.id);
    useEffect(() => {
      (async () => {
        if (localStorage.getItem("jwttoken")) {
          const data = await userService.supProfileId(id.id);
  
          if (data.statusCode == 200) {
            setUser(data.data[0]);
          }
        }
      })();
    }, [id.id]);
  
    const handleOpenModalPickerChild = () => {
      modalMapRef.current?.open();
    };
  
    const onSubmit = async (data) => {
      try {
        let dataPost = {
          ...data,
          latitude: data.latitude.toString(),
          longitude: data.longitude.toString(),
        };
  
        await userService.profileUpdate(dataPost, id.id);
      } catch (err) {
        console.log("err", err);
      }
    };
  
    return (
      <div className="absolute top-0">
        <Modal
          classes="overflow-hidden max-w-full max-h-full w-2/3 h-auto p-4 bg-white rounded-lg "
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={"Chỉnh sửa thông tin"}
          onClose={handleClose}
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
          <div>
            {user && (
              <Formik
                innerRef={formRef}
                initialValues={{
                  email: user.email,
                  name: user.name,
                  birthPlace: user.birthPlace,
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          defaultValue={values.name}
                        />
                      </div>
  
                      <div>
                                <label
                                  for="birthPlace"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Nơi sinh
                                </label>
                                <input
                                  id="birthPlace"
                                  name="birthPlace"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Nhập dữ liệu"
                                  required
                                  onChange={handleChange}
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
                          type="datetime-local"
                          id="dob"
                          name="dob"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Ngày tháng năm sinh"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue={dayjs(new Date(values.dob)).format(
                            "YYYY-MM-DDTHH:mm"
                          )}
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.longitude}
                          readOnly
                          required
                        />
                      </div>
                    </div>
                    <div className="d-flex flex float-right   text-white  gap-5  focus:outline-none   focus:ring-blue-300 font-medium rounded-full text-sm px-7 py- text-center mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <Button
                        class=" text-white  bg-blue-700  hover:bg-blue-800 focus:outline-none   focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-1  text-center mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="primary"
                        width="default"
                        onClick={handleOpenModalPickerChild}
                      >
                        Chọn vị trí
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        class="text-white  bg-blue-700  hover:bg-blue-800 focus:outline-none   focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-1 text-center mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleClose}
                      >
                        Lưu
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
          onChangeLocation={(latitude, longitude) =>
            formRef.current.setValues({ latitude, longitude })
          }
        />
      </div>
      
    );
  });
  
  export default ModalEditSupProfile;
  