//Component

import React, {useState, useRef, useCallback} from "react";
import { Button } from "react-bootstrap";
import './Styles.css'
import { 
    GoogleMap, 
    // useLoadScript,
    Marker, 
    InfoWindow } from "@react-google-maps/api";
import "@reach/combobox/styles.css"
import mapStyles from "./MapStyles";
//componentsのインポート
import AddressSearchBar from "./AddressSearchBar";
import CurrentLocator from "./CurrentLocator";
//componentsのインポート
require('dotenv').config();

// 元々ここでGmap API keyとlibraryを定義していたけど、
// index.html内に書き込むことによって不要になった

const mapContainerStyle = {
    // width: '100vw', //これがあるとbootstrapのグリッドが正常に機能しない
    height: "82vh", //改良の余地あり。Styles.cssのnavbar min-heightと関連してる。
};
const center = {
    lat: 38.204306,
    lng: 139.684389
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
};
//******defining variables, for use of google map component


function Map(props){

    // 元々ここでAPikeyを使ってisLoadedとloadErrorを定義していたけど、
    // index.html内に書き込むことによって不要になった

    const [selected, setSelected] = useState(null); //選択されたマーカー情報
    //選択したマーカーのステート管理（？）
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    },[])
    const panTo = useCallback(({lat,lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(12);
    },[])
    //******for use of google map component

    //元々isLoadedとloadErrorがあった場所
    return(
        <div className = "map">
            <AddressSearchBar panTo = { panTo } selectedLocation = {props.selectedLocation}/>
            <CurrentLocator panTo = { panTo } currentLocation = {props.currentLocation} />
            <div>
            <GoogleMap 
                // GoogleMapタグのattitude
                mapContainerStyle={mapContainerStyle}
                zoom = {5.6}
                center = {center}
                options = {options}
                onLoad = {onMapLoad}
                onClick = {() => { 
                    setSelected(null); 
                    props.setCurrentLocation("disabled") }}
                onCenterChanged= {() => { 
                    props.setCurrentLocation("disabled") }}
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
                                <h2>{selected.event_name}</h2>
                                <img src={selected.img1} alt=""　width="200px" height="120px"/>
                                <p>{selected.description}</p>
                                <p>開催期間</p>
                                <p><span>{selected.start_date}</span> ~ <span>{selected.end_date}</span></p>
                                <p>開催時間</p>
                                <p><span>{selected.start_time}</span> ~ <span>{selected.end_time}</span></p>
                                
                                <Button variant="primary" onClick = {()=> console.log(selected.id)}>詳細を見る</Button>
                            </div>
                        </InfoWindow>
                    ) : null}
            </GoogleMap>
            </div>
            </div>
    )
};

export default Map;