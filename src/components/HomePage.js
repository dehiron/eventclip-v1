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
  const [selectedLocation, setSelectedLocation] = useState("");

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
    return <div> Loading... </div>
  } 
  return (
    <Container fluid> 
    {/* ここをfluidにしないと変な余白が生まれる */}
        <Header />
        <Row>
          <Col lg={{span:3, order:1}} md={{span:3, order:1}} sm={{span:0, order:2}} xs={{span:0, order: 2}}>
            <Filters setSelectedLocation={setSelectedLocation} />
          </Col>
          <Col lg={{span:6, order:2}} md={{span:6, order:2}} sm={{span:12, order:1}} xs={{span:12, order: 1}}>
            <Map events={events} selectedLocation={selectedLocation} />
          </Col>
          <Col lg={{span:3, order:3}} md={{span:3, order:3}} sm={{span:0, order:3}} xs={{span:0, order: 3}}>
            <EventCards events={events} />
          </Col>
        </Row>
    </Container>
  );
}

export default HomePage; 