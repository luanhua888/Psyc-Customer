import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import Router from "next/router";

import Modal from "../modal";

import { userService } from "../../services/UserService";
import GoogleMapReact from "google-map-react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";


import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

// eslint-disable-next-line react/display-name
const ModalLogin = forwardRef((props, ref) => {
  const DefaultLocation = { lat: 10.8, lng: 106.8 };
  const DefaultZoom = 10;

  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const formRef = useRef();
  const modalForgotPasswordRef = useRef();
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
    message.success("Get Location Success!");
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    isError: false,
    message: "",
  });

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div className="absolute  top-0 ">
      <Modal
        classes=" max-w-[70rem] max-h-[45rem]  h-full  px-2 py-2 h-50 rounded bg-white"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"LẤY KINH ĐỘ VÀ VĨ ĐỘ"}
        buttons={[
          {
            role: "discard",
            toClose: true,
            classes:
              "bg-zinc-500/20 px-4 py-2 rounded-lg hover:bg-zinc-500/30 transition-all duration-200",
            label: "Đóng",
          },
        ]}
        {...props}
      >
        <div style={{ height: "74vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
        <div style={{ height: "74vh", width: "100%" }}>
        
        </div>
      </Modal>
    </div>
  );
});

export default ModalLogin;
