import './App.css';
import React, {useState, useEffect} from "react";
import axios from 'axios';

function App() {

  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  // async function fetchData(){
  //   await fetch("/api/events")
  //   .then((response) => response.json())
  //   .then((data) => setEvents(data))
  // }

  useEffect(()=>{

    const fetchData = async () => {
      await axios.get("/api/events")
      .then((response) => 
          setEvents(response.data),
          setLoading(false))
    }

    fetchData()
  }, [])

  async function handleRegisterEvent(e){
    e.preventDefault();

    console.log(1);
  }


  if (isLoading){
    return <div> Loading... </div>
  }
  return (
    <div>
      <h2>Upcoming Events!</h2>
      <ul>
        {events.map((element) => <li key={element.id}>{element.event_name} {element.address}</li>)}
      </ul>

      <button onClick={handleRegisterEvent}>イベント登録</button>
      
    </div>
  );
}

export default App;
