//Page

import React, {useState, useEffect} from "react"
import axios from 'axios';
import Modal from 'react-modal';
import './Styles.css'
import "@reach/combobox/styles.css"
//componentsのインポート
import Header from "./Header";
import Map from "./Map"
//componentsのインポート
require('dotenv').config();


Modal.setAppElement("#root")
function HomePage(props) {

  //state群
  const [isLoading, setLoading] = useState(true)
  const [events, setEvents] = useState([]);

  //関数群
  const handleClickToOwnerPage = () => {
      props.history.push("/OwnerPage");
  }
  const handleClickToEventsPage = () => {
    props.history.push("/EventsPage");
  }

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
    <div>
      <Header />
      <h2>Upcoming Events!</h2>
      <h3 className="link-to-OwnerPage" onClick={ handleClickToOwnerPage }>オーナーの方はこちら</h3>
      <h3 className="link-to-OwnerPage" onClick={ handleClickToEventsPage }>イベント一覧</h3>
      <Map events = {events}/>
    </div>
  );
}

export default HomePage; 