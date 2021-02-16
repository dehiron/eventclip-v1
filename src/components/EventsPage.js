import React, {useState, useEffect} from "react";
import axios from 'axios';
import Modal from 'react-modal';
import './Styles.css';

function OwnerPage(props) {
    //state群
    const [isLoading, setLoading] = useState(true)
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEventName, setSelectedEventName] = useState(null);
    const [selectedEventAddress, setSelectedEventAddress] = useState(null);

    //関数群
    async function handleClickDeleteEvent(event_name){
    // e.preventDefault();
    await axios.delete('/api/event/name', {
        params:{
        event_name:event_name
        }
    }).then((response) => response);
    }
    const handleClickToHomePage = () => {
        props.history.goBack();
    }

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
      <button onClick={handleClickToHomePage}>Homeに戻る</button>
    </div>
    )
};

export default OwnerPage; 