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

// eslint-disable-next-line react/display-name
const ModalMap = forwardRef((props, ref) => {
  const { onChangeLocation } = props;
  const { onChangeLocationAddress } = props;

  const DefaultLocation = { lat: 10.8, lng: 106.8 };
  const DefaultZoom = 10;

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

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
      onChangeLocation(lat(), lng(), place.formatted_address);
      setDefaultLocation({ lat: lat(), lng: lng() });

    });
  }

  return (
    <div className="absolute top-0 z-50 ">
      <Modal
        classes="overflow-hidden  max-w-full max-h-full w-2/3 h-auto p-4 bg-white rounded-lg my-auto items-center justify-center"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDiscard={() => console.log("Button discard")}
        title="Chọn vị trí"
       buttons={[
          {
            role: "discard",
            toClose: true,
            classes:
              "bg-zinc-500/20 px-4 py-2 rounded-lg hover:bg-zinc-500/30 transition-all duration-200 bg-[#17384e] text-[#ff7010]",
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
            defaultLocation={defaultLocation}
            zoom={zoom}
            mapTypeId="roadmap"
            style={{ height: "400px" }}
            onChangeLocation={onChangeLocation}
            onChangeLocationAddress={onChangeLocationAddress}
            onChangeZoom={handleChangeZoom}
            apiKey="AIzaSyCeFq8lVqejsWXusxh8E9GFFrKshzziE-s"
          />
        </div>
      </Modal>
    </div>
  );
});

export default ModalMap;
