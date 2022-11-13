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



const GOOGLE_SCRIPT_URL =
    'https://maps.googleapis.com/maps/api/js?libraries=places&key=';

const ModalAutoComplete = ({
    apiKey,
    defaultLocation,
    zoom = 7,
    onChangeLocation,
    onChangeZoom,
    style,
    className,
    mapTypeId,
}) => {
  

    React.useEffect(() => {
        loadScript(GOOGLE_SCRIPT_URL + apiKey, 'google-maps-' + apiKey).then(
            loadMap
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 


   

    return (
      
        <div
            id="google-map-view"
            style={{ height: '100%', width: '100%', ...style }}
            className={className}
        />
      
    );
};
export default ModalAutoComplete;
