import React, {useState, useEffect} from "react"
import axios from 'axios';
import './Styles.css'

function Home(props) {

  const [isLoading, setLoading] = useState(true)
  const [events, setEvents] = useState([]);

  const handleClickToOwnerPage = () => {
      props.history.push("/OwnerPage");
    }
  
  const handleClickToMap = () => {
    props.history.push("/Map");
    }

  useEffect(()=>{
    const fetchData = async () => {
      await axios.get("/api/events")
      .then((response) => 
          setEvents(response.data),
          setLoading(false))
    }

    fetchData()
  },[])

  if (isLoading){
    return <div> Loading... </div>
  }
  return (
    <div>
      <h2>Upcoming Events!</h2>
      <p className="link-to-OwnerPage" onClick={handleClickToOwnerPage}>新規イベント登録はこちら</p>
      <ul>
        {events.map((element) => <li key={element.id}>{element.event_name} {element.address}</li>)}
      </ul>
      <p className="link-to-Map" onClick={handleClickToMap}>マップ（後で置き換える）</p>
    </div>
  );
}

export default Home; 