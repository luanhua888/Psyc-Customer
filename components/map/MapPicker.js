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
            const currentLocation = marker.current.getPosition();
            onChangeLocation(currentLocation.lat(), currentLocation.lng());
        }
    }

    function handleChangeZoom() {
        onChangeZoom && onChangeZoom(map.current.getZoom());
    }

    function loadMap() {
        const Google = window.google;
        const validLocation = isValidLocation(defaultLocation)
            ? defaultLocation
            : { lat: 0, lng: 0 };

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
                handleChangeLocation
            );
        } else {
            marker.current.setPosition(validLocation);
        }

        map.current.addListener('click', function (event) {
            const clickedLocation = event.latLng;

            marker.current.setPosition(clickedLocation);
            handleChangeLocation();
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
            className={className}></div>
    );
};
export default MapPicker;