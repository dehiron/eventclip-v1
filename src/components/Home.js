import React, {useState, useEffect, useRef, useCallback} from "react"
import axios from 'axios';
import Modal from 'react-modal';
import './Styles.css'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css"
import mapStyles from "./MapStyles";
import { formatRelative } from "date-fns";
require('dotenv').config();

//******defining variables, for use of google map component
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
//******defining variables, for use of google map component


Modal.setAppElement("#root")
function Home(props) {

  //state群
  const [isLoading, setLoading] = useState(true)
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState(null);
  const [selectedEventAddress, setSelectedEventAddress] = useState(null);

  //関数群
  const handleClickToOwnerPage = () => {
      props.history.push("/OwnerPage");
  }
  async function handleClickDeleteEvent(event_name){
    // e.preventDefault();
    await axios.delete('/api/event/name', {
      params:{
        event_name:event_name
      }
    }).then((response) => response);
  }

  //******for use of google map component
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries
  });
  const [markers, setMarkers] = useState([]);
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

  useEffect(()=>{
    const fetchData = async () => {
      await axios.get("/api/events")
      .then((response) => 
          setEvents(response.data),
          setLoading(false))
    }
    fetchData();
  }, [modalIsOpen])

  useEffect(()=>{
    const fetchDataForMarkers = async () => {
      try {
        const results = [];
        const response = await axios.get("/api/events")
        const allEvents = response.data;
        for (const event of allEvents){
          const geoCodeInfo = await getGeocode({address:event.address});
          const {lat,lng} = await getLatLng(geoCodeInfo[0]);
          results.push({lat:lat, lng:lng, time:new Date()});
          //参考文献：https://tomokazu-kozuma.com/how-to-use-async-await-promise-all-effectively-in-loop-processing-of-for-statement/
        }
        setMarkers(results);
      } catch(error){
        console.log(error)
      }
    }
    fetchDataForMarkers();
  }, [modalIsOpen])

  //displaying contents
  if (isLoading){
    return <div> Loading... </div>
  } else if (loadError){
    return <div> Error loading maps</div>
  } else if (!isLoaded){
    return <div> Loading maps</div>
  }
  return (
    <div>
      <h1 className="app-title">eventclip
        <span role="img" aria-label="clip">
            🖇
        </span>
      </h1>
      <Search panTo = { panTo } />
      <Locate panTo = { panTo } />
      <h2>Upcoming Events!</h2>
      <p className="link-to-OwnerPage" onClick={ handleClickToOwnerPage }>新規イベント登録はこちら</p>
      <ul>
        {events.map((element) => 
          <li key={element.id}>
            {element.event_name} {element.address}
            <button onClick={ () => {
              setSelectedEventName(element.event_name);
              setSelectedEventAddress(element.address);
              setModalIsOpen(true);
              }}>詳細情報
            </button>
            <Modal 
              isOpen={modalIsOpen} 
              onRequestClose = {() => setModalIsOpen(false)}
            >
              <p>Modal</p>
              <p>{selectedEventName}</p>
              <p>{selectedEventAddress}</p>
              <button onClick={()=>{
                handleClickDeleteEvent(selectedEventName)
                setModalIsOpen(false);
                }}>delete
              </button>
            </Modal>
          </li>)
        }
      </ul>
      <GoogleMap 
            // GoogleMapタグのattitude
                mapContainerStyle={mapContainerStyle}
                zoom = {10}
                center = {center}
                options = {options}
                onLoad = {onMapLoad}
            >
                 {/* GoogleMapタグの中身=マーカーの見た目について */}
                 {markers.map((marker) => (
                    <Marker
                        key = {marker.time.toISOString()}
                        position = {{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: `/bluepin.svg`,
                            // origin: new window.google.maps.Point(0,0),
                            // anchor: new window.google.maps.Point(15,15),
                            scaledSize: new window.google.maps.Size(35,35)
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
                            <h2>Marker Spotted!</h2>
                            <p>Spotted {formatRelative(selected.time, new Date())}</p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
    </div>
  );
}

// 現在地に飛ぶ用
function Locate({ panTo }) {
  return (
      <button className="locate" onClick={()=> {
          navigator.geolocation.getCurrentPosition(
              (positions) => { //sucessの場合
                  panTo ({
                      lat: positions.coords.latitude,
                      lng: positions.coords.longitude,
                  });
              }, 
              () => null, options //failの場合
          )
      }}>
      <img src="compass.svg" alt="compass - locate me" />
  </button>
  )
};


// Search Bar
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
              disabled = {!ready}
              placeholder = "Enter an address" 
              />
              <ComboboxPopover>
                  <ComboboxList>
                      {status === "OK" && data.map(({ id, description },key) =>　(
                          <ComboboxOption key={id} value={description} />
                      ))}
                  </ComboboxList>
              </ComboboxPopover>
          </Combobox>
      </div>
  ); 
}

export default Home; 