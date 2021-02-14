import React, { useState, useCallback , useRef } from "react";
// import axios from "axios";
import "./Styles.css";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
//
//
//
import "@reach/combobox/styles.css"
import mapStyles from "./MapStyles";
import { formatRelative } from "date-fns";
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
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
};

function Map(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries
    });
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null); //選択されたマーカー情報
    //マーカーを作成する旅にレンダーするのを防ぐためのuseCallback
    const onMapClick = useCallback((event) => {
        setMarkers((current) => [
            ...current, 
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            }   
        ]);
    },[]);
    //選択したマーカーのステート管理（？）
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    },[])

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
                onClick = {onMapClick}
                onLoad = {onMapLoad}
            >
                 {/* GoogleMapタグの中身=マーカーの見た目について */}
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
                        onClick = {() => {
                            setSelected(marker)
                        }}


                    />
                ))}

                {selected ? (
                    <InfoWindow 
                        position = {{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick = {() => { setSelected(null) }}
                    >
                        <div>
                            <h2>Bear Spotted!</h2>
                            <p>Spotted {formatRelative(selected.time, new Date())}</p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>

    )

}

export default Map;  