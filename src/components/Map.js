// import React, { useState } from "react";
// import axios from "axios";
import "./Styles.css";
import { 
    GoogleMap, 
    useLoadScript, 
    // Marker, 
    // InfoWindow
} from "@react-google-maps/api"
// import { formatRelative } from "date-fns"
//
//
//
import "@reach/combobox/styles.css"
require('dotenv').config();

const libraries = ["places"]
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
};
const center = {
    lat: 35.681236,
    lng: 139.767125
}

function Map(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    })

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return(
        <div>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom = {10}
                center = {center}
            ></GoogleMap>
        </div>

    )

}

export default Map;  