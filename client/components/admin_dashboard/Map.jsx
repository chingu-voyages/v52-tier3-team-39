import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import React from "react"

export default function Map(){
    const containerStyle = {
        width: "100%",
        height: "400px",
    }
    
    const startCoords = {
        //L.A. coords
        lat: 34.052235, 
        long: -118.243683,
    }
    
    return(
        <LoadScript googleMapsApiKey = {gMapKey}>
            <GoogleMap
                center={startCoords}
                zoom={15}
            >
            {/*Add markers for all addresses saved in appointments*/}
            {appointments.map(address=> {
                return <Marker position={address.zipcode} />
            })}
            </GoogleMap>
        </Loadscript>
    )
}

