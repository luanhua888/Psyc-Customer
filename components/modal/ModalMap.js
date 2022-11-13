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

//
// import Geocoder from '@goongmaps/goong-geocoder-react';
// import '@goongmaps/goong-js/dist/goong-js.css';
// import '@goongmaps/goong-geocoder/dist/goong-geocoder.css';
// import MapGL, { Marker } from '@goongmaps/goong-map-react';
// import ReactMapGL from '@goongmaps/goong-map-react';


// eslint-disable-next-line react/display-name
const ModalMap = forwardRef((props, ref) => {
  const mapRef = useRef();
  const { onChangeLocation } = props;
  const [longitude, setLongitude] = useState({});
  const [latitude, setLatitude] = useState({});

 

  // const DefaultLocation = { lat:10.844714400335658 , lng:106.77110633438444 };
  const DefaultZoom = 12;

  // console.log('DefaultLocation', DefaultLocation);

  // const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  function autocomplete() {
    const input = document.getElementById("searchInPut");

    const options = {
      types: ["(cities)"],
      componentRestrictions: { country: "vn" },
    };
    const autocomplete = new window.google.maps.places.Autocomplete(
      input,
      options
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log(place);
      const { lat, lng } = place.geometry.location;
      setLongitude(lng);
      setLatitude(lat);
      onChangeLocation(lat(), lng());
    });
  }

  return (
    <div className="absolute top-0">
      <Modal
        classes="overflow-hidden max-w-full max-h-full w-2/3 h-auto p-4 bg-white rounded-lg"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"LẤY KINH ĐỘ VÀ VĨ ĐỘ"}
        onDiscard={() => console.log("Button discard")}
        buttons={[
          {
            role: "discard",
            toClose: true,
            classes:
              "bg-zinc-500/20 px-4 py-2 rounded-lg hover:bg-zinc-500/30 transition-all duration-200",
            label: "Cập nhật",
          },
        ]}
      >
        <div style={{ height: "100%", width: "100%" }}>
          <input
            type="text"
            placeholder="Nhập địa chỉ"
            // onChange={(e) => autocomplete(e.target)}
            onBlur={(e) => autocomplete(e.target)}
            id="searchInPut"
            className="controls rounded-sm shadow-sm mb-1 float-right w-1/3"
          />
          <MapPicker
            defaultLocation={{ lat: latitude, lng: longitude }}
            zoom={zoom}
            mapTypeId="roadmap"
            style={{ height: "600px" }}
            onChangeLocation={onChangeLocation}
            onChangeZoom={handleChangeZoom}
            apiKey="AIzaSyA3dTnc5DGN1c4mVUx9J7AgQqGQvg5Asis"
          />
        </div>
      </Modal>
    </div>
  );
});

export default ModalMap;
