import {
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
    useEffect,
  } from "react";
  
  import Modal from "../modal";
  import { Button, Pagination, Table } from "flowbite-react";
  import ModalMap from "../../components/modal/ModalMap";
  import { Formik } from "formik";
import { style } from "@mui/system";
  
  // eslint-disable-next-line react/display-name
  const ModalEditSupProfile = forwardRef((props, ref) => {
    const modalMapRef = useRef();
  
    const [isOpen, setIsOpen] = useState(false);
    const [dataForm, setDataForm] = useState({});
    const onSubmit = async (data) => {};
  
    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
    }));
  
    const handleOpenModalPickerChild = () => {
      modalMapRef.current?.open();
    };
  
    return (
      <div className="absolute top-0">
        <Modal
          classes="overflow-hidden max-w-full max-h-full w-2/3 h-auto p-4 bg-white rounded-lg "
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={"Chỉnh sửa thông tin"}
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
            <Formik
              initialValues={{}}
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
                <form>
                  <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        for="fullname"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Họ và Tên
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập họ và tên"
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
                        id="address"
                        name="address"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập dữ liệu"
                        required
                      ></input>
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
                        required
                      />
                    </div>
                  </div>
  
                  <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        for="Longitude"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        Kinh độ
                      </label>
                      <input
                        type="text"
                        id="Longitude"
                        name="Longitude"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập dữ liệu"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={dataForm?.Longitude}
                        readOnly
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="Latitude"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Vĩ độ
                      </label>
                      <input
                        type="text"
                        id="Latitude"
                        name="Latitude"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nhập dữ liệu"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={dataForm?.Latitude}
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
                            class=" text-white  bg-blue-700  hover:bg-blue-800 focus:outline-none   focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-1 text-center mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Lưu
                          </Button>
                        </div>
  
                  
                  
                </form>
              )}
            </Formik>
          </div>
        </Modal>
        <ModalMap
          ref={modalMapRef}
          onChangeLocation={(Latitude, Longitude) =>
            setDataForm({ ...dataForm, Latitude, Longitude })
          }
        />
      </div>
    );
  });
  
  export default ModalEditSupProfile;
  