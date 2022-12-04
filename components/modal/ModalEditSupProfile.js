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
import { setElSeg } from "@fullcalendar/react";

// eslint-disable-next-line react/display-name
const ModalEditSupProfile = forwardRef((id, ref, handleClose) => {
  const [user, setUser] = useState({});

  const modalMapRef = useRef();
  const formRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [dataForm, setDataForm] = useState({});
  const [errorMessages, setErrorMessages] = useState({
    isError: false,
    message: "",
  });

  const [errorMessagesName, setErrorMessagesName] = useState({
    isError: false,
    message: "",
  });

  const [errorMessagesPlace, setErrorMessagesPlace] = useState({
    isError: false,
    message: "",
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

      let dataPost = {
        ...data,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
      };
      //tuổi phải lớn hơn 18


      if (dayjs().diff(dayjs(data.dob), "year") < 18) {
        setErrorMessages({
          isError: true,
          message: "Tuổi phải lớn hơn 18",
        });
      }

      if (dayjs().diff(dayjs(data.dob), "year") > 18) {
        setErrorMessages({
          isError: false,
          message: "",
        });
      }
      
      //họ tên không được để trống
      if (data.name == "") {
        setErrorMessagesName({
          isError: true,
          message: "Họ tên không được để trống",
        });
      }

      //nơi sinh không được để trống
      if (data.birthPlace == "") {
        setErrorMessagesPlace({
          isError: true,
          message: "Nơi sinh không được để trống",
        });
      }

      
    




   

      // await userService.profileUpdate(dataPost, id.id.id);

      // setIsOpen(false);


    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="absolute top-0">
      <Modal
        classes="overflow-hidden max-w-full max-h-full w-2/3 h-auto p-4  rounded-lg bg-[#17384e] "
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Chỉnh sửa thông tin"}
        onClose={handleClose}
        onDiscard={() => console.log("Button discard") && handleCloseModal()}
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
                email: id.id.email,
                name: id.id.name,
                birthPlace: id.id.birthPlace,
                gender: id.id.gender,
                dob: id.id.dob,
                longitude: id.id.longitude,
                latitude: id.id.latitude,
              }}
              validate={(values) => {
             

             
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
                        class="block mb-2 text-sm font-medium text-[#ff7010]  dark:text-gray-300"
                      >
                        Họ và Tên
                      </label>
                      {errorMessagesName.isError && (
                          <div className="text-[#ff7010] text-sm flex justify-center">
                            {errorMessagesName.message}
                          </div>
                        )}
                      <input
                        type="text"
                        id="name"
                        name="name"
                        class="p-3 rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
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
                        class="block mb-2 text-sm font-medium text-[#ff7010]  dark:text-gray-300"
                      >
                        Nơi sinh
                      </label>
                      <input
                        id="birthPlace"
                        name="birthPlace"
                        class="p-3 rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
                        placeholder="Nhập dữ liệu"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.birthPlace}
                        onClick={handleOpenModalPickerChild}
                      />
                    </div>
                  </div>

                  <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        for="gender"
                        class="block mb-2 text-sm font-medium text-[#ff7010]  dark:text-gray-400"
                      >
                        {}
                        Giới tính
                      </label>
                      <select
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
                      <div className="flex ">
                        {" "}
                        <label
                          for="dob"
                          class="block mb-2 text-sm font-medium text-[#ff7010]  dark:text-gray-300 mx-1"
                        >
                          Ngày tháng năm sinh
                        </label>
                        {errorMessages.isError && (
                          <div className="text-[#ff7010] text-sm flex justify-center">
                            {errorMessages.message}
                          </div>
                        )}
                      </div>

                      <input
                        type="datetime-local"
                        id="dob"
                        name="dob"
                        class="p-3 rounded border-collapse outline-[#5c7383] w-full outline  focus:outline-[#ff7010] focus:ring-[#ff7010] bg-[#17384e] hover:outline-2 hover:outline-[#ff7010]"
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
                    <div className="hidden">
                      <label
                        for="longitude"
                        class="block mb-2 text-sm font-medium text-[#ff7010]  dark:text-gray-400 hidden"
                      >
                        Kinh độ
                      </label>
                      <input
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
                    <div className="hidden">
                      <label
                        for="longitude"
                        class="block mb-2 text-sm font-medium text-[#ff7010]  dark:text-gray-300 "
                      >
                        Vĩ độ
                      </label>
                      <input
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
                  </div>
                  <div className="d-flex flex float-right    text-white  gap-5  focus:outline-none   focus:ring-blue-300 font-medium rounded-full text-sm px-7 py- text-center mr-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
