import React, { useState } from "react";
// import axios from "axios";
import "./Styles.css";
import { GoogleMap, useLoadScript, Marker, 
    // InfoWindow
} from "@react-google-maps/api"
// import { formatRelative } from "date-fns"
//
//
//
import "@reach/combobox/styles.css"
import mapStyles from "./MapStyles";
require('dotenv').config();

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
};
const center = {
    lat: 35.681236,
    lng: 139.767125
}
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

function Map(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries
    });
    const [markers, setMarkers] = useState([]);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return(
        <div>
            <h1 className="app-title">eventclip
                <span role="img" aria-label="clip">
                    🖇
                </span>
            </h1>
            <GoogleMap 
            // GoogleMapタグのattitude
                mapContainerStyle={mapContainerStyle}
                zoom = {10}
                center = {center}
                options = {options}
                onClick = {(event) => {
                    setMarkers((current) => [
                        ...current, 
                        {
                            lat: event.latLng.lat(),
                            lng: event.latLng.lng(),
                            time: new Date()
                        }   
                    ]);
                }}
            >
                 {/* GoogleMapタグの中身 */}
                 {markers.map((marker) => (
                    <Marker
                        key = {marker.time.toISOString()}
                        position = {{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: `/bear.svg`,
                            origin: new window.google.maps.Point(0,0),
                            anchor: new window.google.maps.Point(15,15),
                            scaledSize: new window.google.maps.Size(30,30)
                        }}


                    />
                ))}
            </GoogleMap>
        </div>

    )

}

export default Map;  