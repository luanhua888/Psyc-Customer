import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import MapPicker from "../map/MapPicker";
import Modal from "../modal";
import Image from "next/image";
import profileAvatar from "../../public/photos/profile-avatar.png";
import { userService } from "../../services/UserService";
import { Skeleton } from "@mui/material";
import { profileService } from "../../services/ProfileService";
import loadingIcon from "../../public/photos/icon/loader.png";
import { useRouter } from "next/router";

// eslint-disable-next-line react/display-name
const ModalResultSurvey = forwardRef((id, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

const router = useRouter();

  setTimeout(() => {
    setLoading(false);
  }, 6000);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
      getResultSurvey();
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  const [resultSurvey, setResultSurvey] = useState([]);
  console.log("resultSurvey", resultSurvey);
  const getResultSurvey = async () => {
    const data1 = await profileService.getResultSurvey(
      localStorage.getItem("idcustomer")
    );

    if (data1.statusCode == 200) {
      setResultSurvey(data1.discchart);
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-0 z-50">
      <Modal
        classes="overflow-auto max-w-full max-h-full w-[80%]  h-[80%]  bg-white rounded-lg  items-center justify-center bg-[#17384e]"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDiscard={() => console.log("Button discard")}
      >
        {loading ? (
          <div>
            <div>
              <p className="flex justify-center text-3xl text-[#ff7010]">
                Kết Quả Khảo Sát Của Bạn
              </p>
            </div>
            <div className="flex justify-center items-center mt-[25%]">
              <Image
                src={loadingIcon}
                alt=""
                width={100}
                height={100}
                className="animate-spin"
              />
            </div>
          </div>
        ) : (
          <div>
            {resultSurvey.length > 0 ? (
              <div className="flex flex-col justify-center items-center">
                {" "}
                <div>
                  <p className="flex justify-center text-3xl text-[#ff7010]">
                    Kết Quả Khảo Sát Của Bạn
                  </p>
                </div>
                <Image
                  loader={() => resultSurvey}
                  src={profileAvatar}
                  alt=""
                  className=""
                  width={900}
                  height={1200}
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-center text-4xl text-[#ff7010] ">
                  Bạn chưa làm bài khảo sát nào
                </div>
                
                <div className="flex justify-center">
                <button onClick={
                  () => {
                    router.push("/Survey");
                  }
                }

                className="flex justify-center items-center mt-[25%] text-2xl text-white bg-[#ff7010] rounded-lg w-[50%] h-[10%]"
                
                >
                Làm bài khảo sát
                </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
});

export default ModalResultSurvey;
