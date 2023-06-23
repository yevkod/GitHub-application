import React from 'react';
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";


const Map = ({ location }) => {
    const center = {
      lat: 25.761681,
      lng: -80.191788,
    };

    if (location === null) {
      return (
        <div className="h-screen flex justify-center items-center">
          Location not specified!
        </div>
      );
    }

    return (
      <div className="h-screen">
        <LoadScriptNext googleMapsApiKey="">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "70%",
            }}
            center={center}
            zoom={10}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScriptNext>
      </div>
    );
  };

  export default Map;
