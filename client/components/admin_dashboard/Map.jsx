"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { googleApiKey, appointmentsMapId } from "@/constants";
import React, { useRef } from "react";

export default function Map({ appointments }) {
  if (!appointments.length) {
    return <p>No map data available</p>;
  }

  const mapRef = useRef(null);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const startCoords = appointments.map((item) => ({
    location: item.location,
    visitOrder: item.schedule.order,
    customerName: item.name,
  }));

  const onLoad = async (mapInstance) => {
    mapRef.current = mapInstance;

    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    startCoords.forEach(({ location, visitOrder, customerName }) => {
      const pin = new google.maps.marker.PinElement({
        glyph: visitOrder.toString(),
        glyphColor: "white",
      });
      new AdvancedMarkerElement({
        position: location,
        map: mapInstance,
        title: customerName,
        content: pin.element,
        zIndex: 100000 - visitOrder, // Keeps earlier markers visible above later overlapping ones
      });
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={`${googleApiKey}`}
      mapIds={[appointmentsMapId]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={startCoords[0].location}
        zoom={15}
        onLoad={onLoad}
        options={{ mapId: appointmentsMapId }}
      />
    </LoadScript>
  );
}
