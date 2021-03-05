//Page

import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Modal from 'react-modal';
import './Styles.css'
import "@reach/combobox/styles.css"
import { Container, Col, Button } from 'react-bootstrap';
import { signInAction } from '../reducks/owners/actions'
//componentsのインポート
import Header from "./headers/Header";
import Map from "./Map";
import EventCards from "./EventCards";
import Filters from "./Filters";
//componentsのインポート
require('dotenv').config();

Modal.setAppElement("#root")
function HomePage(props) {

  //reduxのHooksを使ってReactとreduxが繋がっているか、storeにアクセス出来るか確認してみる
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  //storeの情報参照
  console.log(selector.owners);

  //state群
  const [isLoading, setLoading] = useState(true)
  const [events, setEvents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(""); //for filters component(find location)
  const [currentLocation, setCurrentLocation] = useState(""); //for filters component(get current location) 
  const [mapOrList, setMapOrList] = useState("Mapで表示");
  // const [isLoggedInAsOwner, setIsLoggedInAsOwner] = useState(false);


  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/events")
        const allEvents = response.data;
        setEvents(allEvents);
        setLoading(false);
      } catch(error){
        console.log(error)
      }
    }
    fetchData();
  }, [isLoading])

  //displaying contents
  if (isLoading){
    return (
    <div className="loading-img" style={{position:"relative"}}>
        <img src="loading.gif" alt="" />
    </div>
    )
  } 
  return (
    <Container fluid> {/* ここをfluidにしないと変な余白が生まれる */} 
        
        <Col>
        
        <Header mapOrList={mapOrList} setMapOrList={setMapOrList} />
        <Filters 
          setSelectedLocation={setSelectedLocation}
          setCurrentLocation={setCurrentLocation}
          setEvents={setEvents} />

        {/* redux storeの情報更新サンプル */}
        <Button onClick={() => dispatch(signInAction({owner_pref_id:"hoge", owner_firstname:"hogeo"}))}>テスト：Redux(store)へアクセス</Button>

        {/* JSX内で条件分岐させる時は即時関数又はArrow関数で実装できる。最後の()が重要なので注意。 */}
        {(()=>{ 
          if (mapOrList === "Mapで表示"){
            return(
              <Map 
                events={events} 
                selectedLocation={selectedLocation}
                currentLocation={currentLocation}
                setCurrentLocation={setCurrentLocation} />
            )
          } else if (mapOrList === "一覧で表示"){
            return (
              <EventCards 
              events={events}/>
            )
          }
        })()}
        </Col>
    </Container>
  );
}

export default HomePage; 