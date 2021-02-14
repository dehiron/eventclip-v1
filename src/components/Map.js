import React, { useState, useCallback , useRef } from "react";
// import axios from "axios";
import "./Styles.css";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLagLng, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
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
    const panTo = useCallback(({lat,lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
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

            {/* サーチバー */}
            
            <Search panTo = { panTo } />


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
    );
};

function Search({ panTo }) {
    const {
        ready, 
        value, 
        suggestions:{status, data}, 
        setValue, 
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            location:{ lat:() => 35.681236, lng:() => 139.767125 },
            radius: 200 * 1000,
        }
    });

    return(
        <div className="search">
            <Combobox 
                onSelect={async (address) => {
                    setValue(address, false); // falseを設定するのはusePlacesAutocomplete特有のやり方みたい
                    clearSuggestions(); //選んだ瞬間候補がなくなる
                    try{
                        const results = await getGeocode({ address });
                        const { lat, lng } = await getLatLng(results[0]);
                        console.log({ lat,lng })
                        panTo({ lat,lng });
                    } catch(error){
                        console.log("Error!")
                    }
                }}
            >
                <ComboboxInput 
                    value = {value} 
                    onChange = {(e) => {
                        setValue(e.target.value)
                }}
                disablaed = {!ready}
                placeholder = "Enter an address" 
                />
                <ComboboxPopover>
                {status === "OK" && data.map(({ id, description }) =>　(
                    <ComboboxOption key={id} value={description} />
                ))}
                </ComboboxPopover>
            </Combobox>
        </div>
    ); 
}

export default Map;  