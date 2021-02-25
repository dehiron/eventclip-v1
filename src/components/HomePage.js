//Page

import React, {useState, useEffect} from "react"
import axios from 'axios';
import Modal from 'react-modal';
import './Styles.css'
import "@reach/combobox/styles.css"
import { Container, Row, Col } from 'react-bootstrap';
//componentsのインポート
import Header from "./Header";
import Map from "./Map";
import EventCards from "./EventCards";
import Filters from "./Filters";
//componentsのインポート
require('dotenv').config();


Modal.setAppElement("#root")
function HomePage(props) {

  //state群
  const [isLoading, setLoading] = useState(true)
  const [events, setEvents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(""); //for filters component(find location)
  const [currentLocation, setCurrentLocation] = useState(""); //for filters component(get current location) 
  const [mapOrList, setMapOrList] = useState("Mapで表示");

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
    return <div className="loading-img">
      <img src="loading.gif" alt=""/>
    </div>
  } 
  return (
    <Container fluid> 
    {/* ここをfluidにしないと変な余白が生まれる */}
        <Header mapOrList={mapOrList} setMapOrList={setMapOrList}/>
        <Row>
          <Col 
            // className = "hp-component-container" 
            lg={{span:3, order:1}} md={{span:3, order:1}} sm={{span:12, order:1}} xs={{span:12, order: 1}}>
            <Filters 
              setSelectedLocation={setSelectedLocation}
              setCurrentLocation={setCurrentLocation}
              setEvents={setEvents} />
          </Col>
          {/* JSX内で条件分岐させる時は即時関数又はArrow関数で実装できる。最後の()が重要なので注意。 */}
          {(() => {
              if (mapOrList === "Mapで表示"){
                return (
                  <Col 
                    // className = "hp-component-container" 
                    lg={{span:9, order:2}} md={{span:9, order:2}} sm={{span:0, order:2}} xs={{span:0, order: 2}}>
                    <Map 
                      events={events} 
                      selectedLocation={selectedLocation}
                      currentLocation={currentLocation}
                      setCurrentLocation={setCurrentLocation} />
                  </Col>
                )
              } else {
                return (
                  <Col 
                    // className = "hp-component-container" 
                    lg={{span:9, order:2}} md={{span:9, order:2}} sm={{span:0, order:2}} xs={{span:0, order: 2}}>
                    <EventCards 
                      events={events} />
                  </Col>
                )
              }
            })()
          }
        </Row>
    </Container>
  );
}

export default HomePage; 