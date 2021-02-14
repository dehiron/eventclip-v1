import React, {useState, useEffect, useCallback} from "react"
import axios from 'axios';
import Modal from 'react-modal';
import './Styles.css'


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
  const handleClickToMap = () => {
    props.history.push("/Map");
  }
  async function handleClickDeleteEvent(event_name){
    // e.preventDefault();
    await axios.delete('/api/event/name', {
      params:{
        event_name:event_name
      }
    }).then((response) => response);
  }

  useEffect(()=>{
    const fetchData = async () => {
      await axios.get("/api/events")
      .then((response) => 
          setEvents(response.data),
          setLoading(false))
    }
    fetchData()
  }, [modalIsOpen])

  if (isLoading){
    return <div> Loading... </div>
  }
  return (
    <div>
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
              }}>詳細情報</button>
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
              }}>delete</button>
            </Modal>
          </li>)
        }
      </ul>
      <p className="link-to-Map" onClick={ handleClickToMap }>マップ（後で置き換える）</p>
    </div>
  );
}

export default Home; 