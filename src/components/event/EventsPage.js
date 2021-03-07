//Page

import React, {useState, useEffect} from "react";
import axios from 'axios';
// import { Card, Container, Button, Row, Col, CardGroup } from 'react-bootstrap';
import Modal from 'react-modal';
import '../Styles.css';

function AllEventsList(props) {
    //state群
    const [isLoading, setLoading] = useState(true)
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [selectedEventName, setSelectedEventName] = useState(null);
    const [selectedEventAddress, setSelectedEventAddress] = useState(null);

    //関数群
    async function handleClickDeleteEvent(id,event_name){
      // e.preventDefault();
      await axios.delete('/api/event/id', {
          params:{
          id:id,
          event_name:event_name
          }
      }).then((response) => response);
    }
    const handleClickToHomePage = () => {
        window.location.reload(); //あまり良くない
        props.history.goBack();
    }

    //style群
    // const styles = {
    //   card: {
    //     backgroundColor: '#B7E0F2',
    //     // borderRadius: 55,
    //     padding: '3rem'
    //   },
    //   cardImage: {
    //     objectFit: 'cover',
    //     height: "20vh",
    //     width: "30vw"
    //   }
    // }

    useEffect(()=>{
        const fetchData = async () => {
        await axios.get("/api/events")
        .then((response) => 
            setEvents(response.data),
            setLoading(false))
        }
        
        fetchData();
    }, [modalIsOpen])

    if (isLoading){
        return <div> Loading... </div>
    }
    return(
      <div>
          <ul>
            {events.map((element) => 
              <li key={element.id}>
                {element.id} {element.event_name}   {element.address}   {element.start_date} {element.start_time} ~ {element.end_date} {element.end_time}
                <button onClick={ () => {
                  setSelectedEventId(element.id);
                  setSelectedEventName(element.event_name);
                  setSelectedEventAddress(element.address);
                  setModalIsOpen(true);
                  }}>詳細情報
                </button>

                {/* //ポップアップモーダル */}
                <Modal 
                  isOpen={modalIsOpen} 
                  onRequestClose = {() => setModalIsOpen(false)}
                >
                  <p>{selectedEventId}</p>
                  <p>{selectedEventName}</p>
                  <p>{selectedEventAddress}</p>
                  <button onClick={()=>{
                    console.log("update");
                    // handleClickUpdateEvent("")
                    setModalIsOpen(false);
                    }}>update
                  </button>
                  <button onClick={()=>{
                    handleClickDeleteEvent(selectedEventId,selectedEventName)
                    setModalIsOpen(false);
                    }}>delete
                  </button>
                </Modal>
              </li>)
            }
          </ul>
        <button onClick={handleClickToHomePage}>Homeに戻る</button>
      </div>
      )
};

export default AllEventsList; 