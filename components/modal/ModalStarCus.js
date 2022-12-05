import {
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
    useEffect,
  } from "react";
  import Router from "next/router";
  
  import MapPicker from "../map/MapPicker";
  import Modal from "../modal";
  import Image from "next/image";
  import profileAvatar from "../../public/photos/profile-avatar.png";
  import { userService } from "../../services/UserService";
  
  // eslint-disable-next-line react/display-name
  const ModalStarCus = forwardRef((id, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [supProfile, setSupProfile] = useState(false);


    console.log("idCusstar", id);
  
    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
    }));
  
    return (
      <div className="absolute top-0">
        <Modal
          classes="overflow-hidden max-w-full max-h-full w-[50%]  h-auto p-4 bg-white rounded-lg  items-center justify-center bg-[#17384e]"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
       
          onDiscard={() => console.log("Button discard")}
        >

        <div  className="flex text-4xl justify-center items-center my-[2%] text-[#ff7010]">
       BẢN ĐỒ SAO
        </div>
         
            <div  className="flex justify-center items-center">
              <Image
                loader={() => id.id}
                src={profileAvatar}
                alt=""
                className="sm:w-20 sm:h-20 w-16 h-16 rounded-full"
              />
             
            </div>

            <div className="flex justify-center items-center md:text-xl ">
             <p className="text-2xl text-[#ff7010] mr-[1%]">Họ và tên:</p>  <p>{id.nameCus}</p> 
            </div>
            <div className="flex justify-center items-center md:text-xl ">
             <p className="text-2xl text-[#ff7010] mr-[1%]">Nơi sinh:</p>  <p>{id.address}</p> 
            </div>
            <div className="flex justify-center items-center md:text-xl ">
             <p className="text-2xl text-[#ff7010] mr-[1%]">Cung hoàng đạo của bạn:</p>  <p>{id.name}</p> 
            </div>
      
        </Modal>
      </div>
    );
  });
  
  export default ModalStarCus;