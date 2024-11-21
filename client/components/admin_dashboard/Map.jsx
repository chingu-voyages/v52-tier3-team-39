"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { googleApiKey } from "@/constants";
import React from "react";

export default function Map() {
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

  return (
    <LoadScript googleMapsApiKey={googleApiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={startCoords[4]}
        zoom={15}
      >
        {startCoords.map((address, index) => (
          <Marker key={index} position={address} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
