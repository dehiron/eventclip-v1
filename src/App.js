import './App.css';
import React, {useState, useEffect} from "react"

function App() {

  const [events, setEvents] = useState([]);

  async function fetchData(){
    await fetch("/api/events")
    .then((response) => response.json())
    .then((data) => setEvents(data))
  }

  useEffect(()=>{
    fetchData()
  })

  return (
    <div className="App">
      <header className="App-header">
        <h2>Upcoming Events!</h2>
        <ul>
        {events.map((element) => <li key={element.id}>{element.event_name} {element.address}</li>)}
        </ul>
      </header>
    </div>
  );
}

export default App;
