import React from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) =>
  <div>
    {text}
  </div>

export default function SimpleMap () {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <div>ttt</div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text='My Marker' />
      </GoogleMapReact>
    </div>
  )
}