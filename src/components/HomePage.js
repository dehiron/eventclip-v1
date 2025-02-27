//Page

import React, {useState, useEffect} from "react"
// import { useSelector } from "react-redux";
import axios from 'axios';
import Modal from 'react-modal';
import './Styles.css'
import "@reach/combobox/styles.css"
import { Container, Col } from 'react-bootstrap';
//componentsのインポート
import Header from "./header/Header";
import Map from "./map/Map";
import EventCards from "./event/EventCards";
import Filters from "./body/Filters";
import Recoms from "./body/Recoms";
//componentsのインポート
require('dotenv').config();

Modal.setAppElement("#root")
function HomePage(props) {

  console.log("test");

  // storeの情報参照
  // const selector = useSelector((state) => state);
  // console.log(selector)

  //state群
  const [isLoading, setLoading] = useState(true)
  const [events, setEvents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(""); //for filters component(find location)
  const [mapOrList, setMapOrList] = useState("Mapで表示");
  const [isSubmitted, setIsSubmitted] = useState(false);


  useEffect(()=>{
    const fetchData = async () => {
      try {
        //fetch events data
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
          setEvents={setEvents}
          setIsSubmitted = {setIsSubmitted}
        />

        {/* JSX内で条件分岐させる時は即時関数又はArrow関数で実装できる。最後の()が重要なので注意。 */}
        {(()=>{ 
          if (mapOrList === "Mapで表示" && isSubmitted){
            return(
              <Map 
                events={events} 
                selectedLocation={selectedLocation}
              />
            )
          } else if (mapOrList === "一覧で表示" && isSubmitted){
            return (
              <EventCards 
              events={events}/>
            )
          } else if (!isSubmitted){
            return(
              <Recoms setEvents={setEvents} setIsSubmitted={setIsSubmitted}/>
            )
          }
        })()}
        </Col>
    </Container>
  );
}

export default HomePage; 