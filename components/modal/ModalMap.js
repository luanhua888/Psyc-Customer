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
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import Script from "next/script";

// eslint-disable-next-line react/display-name
const ModalMap = forwardRef((props, ref) => {
  const mapRef = useRef();
  const { onChangeLocation } = props;
  const [longitude, setLongitude] = useState({});
  const [latitude, setLatitude] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  });

  // const DefaultLocation = { lat:10.844714400335658 , lng:106.77110633438444 };
  const DefaultZoom = 10;

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

  function autocomplete(input) {
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        onChangeLocation({ lat, lng });
        console.log("lat", lat);
        setLongitude(lng);
        setLatitude(lat);
        window.alert(
          "No details available for input: '" + place.name + lng + lat + "'"
        );
        return;
      }

      setIsOpen(false);
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
            placeholder="Search Places"
            onChange={(e) => autocomplete(e.target)}
            id="searchInPut"
            className="controls "
          />
          <MapPicker
            defaultLocation={{ lat: latitude, lng: longitude }}
            zoom={zoom}
            mapTypeId="roadmap"
            style={{ height: "600px" }}
            onChangeLocation={onChangeLocation}
            onChangeZoom={handleChangeZoom}
            // apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
            // apiKey='3yNUgjbBqKLrfnCP7jfW4w8Iq2uGeTPKqdoL1kwg'
            apiKey="AIzaSyDnHXwlz1sdmUWs3ZpUoufVweHQUi4T8SA"
          />
        </div>
      </Modal>
    </div>
  );
});

export default ModalMap;
