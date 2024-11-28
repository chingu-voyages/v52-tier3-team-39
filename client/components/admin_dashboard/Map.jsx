"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { googleApiKey } from "@/constants";
import React, { useRef } from "react";

export default function Map({ appointments }) {
  const mapRef = useRef(null);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const startCoords = appointments.map((item) => ({ location: item.location, visitOrder: item.schedule.order, customerName: item.name }));

  const onLoad = (mapInstance) => {
    mapRef.current = mapInstance;
    const markerEle =
      google.maps.marker?.AdvancedMarkerElement ?? google.maps.Marker;

    startCoords.forEach(({ location, visitOrder, customerName }) => {
      new markerEle({
        position: location,
        map: mapInstance,
        title: customerName,
        label: visitOrder.toString(),
      });
    });
  };
  console.log(appointments[0]);

  return (
    <LoadScript googleMapsApiKey={`${googleApiKey}&v=beta`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={startCoords[0].location}
        zoom={15}
        onLoad={onLoad}
      />
    </LoadScript>
  );
}
