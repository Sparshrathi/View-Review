import React, { useContext, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
import Context from "../Context";

const Map = () => {
  const { location, restaurants, setAddRestFlag, minRating, setTempCoords, addRestFlag } = useContext(Context);
  const [markerView, setMarkerView] = useState()
  const [selected, setSelected] = useState(null)
  let data = []

  const onMapClick = React.useCallback((event) => {
    setAddRestFlag(!addRestFlag)
      data = {
        "geometry":
        {
          "location":
          {
            "lat": event.latLng.lat(),
            "lng": event.latLng.lng(),
          }
        }
      }
    setTempCoords(data)
  })
  const onMarkerClick = (evt) => {
    console.log("marker Clicked", evt);
    setMarkerView(!markerView)
  };

  return (
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{
        lat: location.lat, lng: location.lon
      }}
      onClick={onMapClick}
    >
      {
        restaurants.map((restu) => {
          if (restu.rating < minRating || !restu.rating) 
          {
            return null;
          } 
          else
           {
            return (
              <div>
                <Marker
                  key={restu.name}
                  position={{
                    lat: restu.geometry.location.lat,
                    lng: restu.geometry.location.lng,
                  }}
                  onClick={() => {
                    setSelected(restu)
                  }
                  }
                />
                {selected ? (
                  <InfoWindow position={{
                    lat: selected.geometry.location.lat,
                    lng: selected.geometry.location.lng,
                  }}
                  >
                    <span>{selected.name} has {selected.rating}.</span>
                  </InfoWindow>) : null}
              </div>
            );
          }
        })
      }
    </GoogleMap >
  );
};

export default Map;
