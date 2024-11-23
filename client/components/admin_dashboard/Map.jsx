"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { googleApiKey } from "@/constants";
import React, { useRef } from "react";

export default function Map() {
  const mapRef = useRef(null);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const startCoords = [
    {
      //hollywood bowl
      lat: 34.112236,
      lng: -118.339432,
    },
    {
      //Griffith obs.
      lat: 34.1366,
      lng: -118.2942,
    },
    {
      //l.a.county museum
      lat: 34.0639,
      lng: -118.360565,
    },
    {
      //disneyland
      lat: 33.812511,
      lng: -117.918976,
    },
    {
      //pink's
      lat: 34.0839,
      lng: -118.3443,
    },
    {
      //venice beach
      lat: 33.9771,
      lng: -118.467575,
    },
  ];

  const onLoad = (mapInstance) => {
    mapRef.current = mapInstance;
    if (google?.maps?.marker?.AdvancedMarkerElement) {
      startCoords.forEach((address) => {
        new google.maps.marker.AdvancedMarkerElement({
          position: address,
          map: mapInstance,
        });
      });
    } else {
      console.error("AdvancedMarkerEle not available. Using default Marker.");
      startCoords.forEach((address) => {
        new google.maps.Marker({
          map: mapInstance,
          position: address,
        });
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey={`${googleApiKey}&v=beta`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={startCoords[0]}
        zoom={15}
        onLoad={onLoad}
      ></GoogleMap>
    </LoadScript>
  );
}
