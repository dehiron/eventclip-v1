//Component

import React, {useState, useRef, useCallback} from "react"
import './Styles.css'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import "@reach/combobox/styles.css"
import mapStyles from "./MapStyles";
//componentsのインポート
import AddressSearchBar from "./AddressSearchBar";
import CurrentLocator from "./CurrentLocator";
//componentsのインポート
require('dotenv').config();


function Map(props){

    //******defining variables, for use of google map component
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const libraries = ["places"];
    const mapContainerStyle = {
        width: '100vw',
        height: '100vh'
    };
    const center = { //tokyoに指定
        lat: 35.681236,
        lng: 139.767125
    };
    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true
    };
    //******defining variables, for use of google map component

    //******for use of google map component
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries
    });

    const [selected, setSelected] = useState(null); //選択されたマーカー情報
    //選択したマーカーのステート管理（？）
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    },[])
    const panTo = useCallback(({lat,lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    },[])
    //******for use of google map component


    if (loadError){
        return <div> Error loading maps</div>
    } else if (!isLoaded){
        return <div> Loading maps</div>
    }
    return(
        <div>
            <AddressSearchBar panTo = { panTo } />
            <CurrentLocator panTo = { panTo } />
            <GoogleMap 
                // GoogleMapタグのattitude
                    mapContainerStyle={mapContainerStyle}
                    zoom = {12.5}
                    center = {center}
                    options = {options}
                    onLoad = {onMapLoad}
                >
                        {/* GoogleMapタグの中身=マーカーの見た目について */}
                        {props.events.map((event) => (
                        <Marker
                            key = {event.event_name}
                            position = {{ lat: parseFloat(event.latitude), lng: parseFloat(event.longitude) }}
                            icon={{
                                url: `/bluepin.svg`,
                                // origin: new window.google.maps.Point(0,0),
                                // anchor: new window.google.maps.Point(15,15),
                                scaledSize: new window.google.maps.Size(35,35)
                            }}
                            animation = {window.google.maps.Animation.DROP}
                            onClick = {() => {
                                setSelected(event)
                            }}


                        />
                    ))}

                    {selected ? (
                        <InfoWindow 
                            position = {{ lat: parseFloat(selected.latitude), lng: parseFloat(selected.longitude) }}
                            onCloseClick = {() => { setSelected(null) }}
                        >
                            <div>
                                <h2>Event!</h2>
                                <img src={selected.img1} alt=""/>
                                <p>{selected.description}</p>
                                <p>{selected.start_time}</p>
                            </div>
                        </InfoWindow>
                    ) : null}
                </GoogleMap>
            </div>
    )
};

export default Map;