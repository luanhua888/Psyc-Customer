import React, { FC } from 'react';


function isGoogleMapScriptLoaded(id) {
    const scripts = document.head.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].getAttribute('id') === id) {
            return true;
        }
    }

    return false;
}

function loadScript(src, id) {
    if (isGoogleMapScriptLoaded(id)) {
        // Make sure the script is loaded
        return new Promise((resolve) => setTimeout(resolve, 500));
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    document.querySelector('head').appendChild(script);

    return new Promise((resolve) => {
        script.onload = () => {
            resolve();
        };
    });
}

function isValidLocation(location) {
    return (
        location &&
        Math.abs(location.lat) <= 90 &&
        Math.abs(location.lng) <= 180
    );
}

const GOOGLE_SCRIPT_URL =
    'https://maps.googleapis.com/maps/api/js?libraries=places&key=';

const MapPicker = ({
    apiKey,
    defaultLocation,
    zoom = 7,
    onChangeLocation,
    onChangeLocationAddress,
    onChangeZoom,
    style,
    className,
    mapTypeId,
}) => {
    const MAP_VIEW_ID =
        'google-map-view-' + Math.random().toString(36).substr(2, 9);
    const map = React.useRef();
    const marker = React.useRef();

    function handleChangeLocation() {
        if (onChangeLocation) {
            //lấy vị trí và trả về longitude và latitude và địa chỉ
            const geocoder = new window.google.maps.Geocoder();
            const location = marker.current.getPosition();
            geocoder.geocode(
                { location: location },
                (results, status) => {
                    if (status === 'OK') {
                        if (results[0]) {
                            console.log(results[0].formatted_address);
                            onChangeLocation(location.lat(), location.lng(), results[0].formatted_address);
                        }
                    }
                }
            );
        }
    }

    function handleChangeLocationAddress() {
        if (onChangeLocationAddress) {
            //lấy vị trí và trả về longitude và latitude và địa chỉ
            const geocoder = new window.google.maps.Geocoder();
            const location = marker.current.getPosition();
            geocoder.geocode(
                { location: location },
                (results, status) => {
                    if (status === 'OK') {
                        if (results[0]) {
                            console.log(results[0].formatted_address);
                            onChangeLocationAddress(location.lat(), location.lng(), results[0].formatted_address);
                        }
                    }
                }
            );
        }
    }

    function handleChangeZoom() {
        onChangeZoom && onChangeZoom(map.current.getZoom());
    }

    const [longitude, setLongitude] = React.useState({});
    const [latitude, setLatitude] =React.useState({});

  
    function loadMap() {
        // navigator.geolocation.getCurrentPosition(function (position) {
        //     setLatitude(position.coords.latitude);
        //     setLongitude(position.coords.longitude);
        //   });
        
      
        const Google = window.google;
        const validLocation = isValidLocation(defaultLocation)
            ? defaultLocation
            : { lat: 10.844714400335658, lng: 106.77110633438444 };
        map.current = new Google.maps.Map(
            document.getElementById(MAP_VIEW_ID),
            {
                center: validLocation,
                zoom: zoom,
                ...(mapTypeId && { mapTypeId }),
            }
        );

        if (!marker.current) {
            marker.current = new Google.maps.Marker({
                position: validLocation,
                map: map.current,
                draggable: true,
            });
            Google.maps.event.addListener(
                marker.current,
                'dragend',
                handleChangeLocation,
                handleChangeLocationAddress
            );
        } else {
            marker.current.setPosition(validLocation);
        }

        map.current.addListener('click', function (event) {
            const clickedLocation = event.latLng;

            marker.current.setPosition(clickedLocation);
            handleChangeLocation();
            handleChangeLocationAddress();
        });

        map.current.addListener('zoom_changed', handleChangeZoom);
    }

    React.useEffect(() => {
        loadScript(GOOGLE_SCRIPT_URL + apiKey, 'google-maps-' + apiKey).then(
            loadMap
        );
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    
    React.useEffect(() => {
        if (marker.current) {
            map.current.setCenter(defaultLocation);
            marker.current.setPosition(defaultLocation);
        }
    }, [defaultLocation]);

    React.useEffect(() => {
        if (map.current) {
            map.current.setZoom(zoom);
        }
    }, [zoom]);

    const componentStyle = Object.assign(
        { width: '100%', height: '600px' },
        style || {}
    );

    return (
        <div
            id={MAP_VIEW_ID}
            style={componentStyle}
            className={className}>
            </div>
      

    );
};
export default MapPicker;
