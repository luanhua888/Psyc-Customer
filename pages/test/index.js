
import { Button, Pagination, Table, Toast } from "flowbite-react";
import dayjs from "dayjs";
import { Formik } from "formik";
import _, { isNull } from "lodash";
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
import ModalRating from "../../components/modal/ModalRating";

export default function Profile(props) {
  const modalEditSupProfileRef = useRef();
  const modalStarMapRef = useRef();
  const modalAddSupProfileRef = useRef();
  const modalLoveCompalityRef = useRef();
  const modalratingRef = useRef();
  const formRef = useRef();
  const [dataForm, setDataForm] = useState({});
  const modalMapRef = useRef();

  const [loading, setLoading] = useState(true);

  const notify = () => toast("Xóa hồ sơ thành công!");
  const uploadSuccess = () => toast("Xóa hồ sơ thành công!");

  const handleOpenModalPickerChild = () => {
    modalMapRef.current?.open();
  };

  const handleOpenModalAddSupProfile = () => {
    modalAddSupProfileRef.current?.open();
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
  const [btnSubmit, setBtnSubmit] = useState(true);
  const [btnDisplayToast, setBtnDisplayToast] = useState(false);
  const handleOpenModalStarMap = () => {
    modalStarMapRef.current?.open();
  };
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const handleOpen = () => {
    modalratingRef.current?.open();
  }


  // console.log("email", localStorage.getItem("email"));
  const updateImageProfile = async () => {
    if (localStorage.getItem("jwttoken")) {
      const data = await userService.updateImageProfile(
        //email,
        user.email,
        imageFirebaseUrl.data
      );

      if (data.statusCode == 200) {
        uploadSuccess();
      }

      getProfile();
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
        handleOpen();
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
        console.log("data", data);
        setNameSupProfile(name);
      }
    }
  };

  return (
    <>
      <ModalRating ref={modalratingRef} />
    </>
  );
}
