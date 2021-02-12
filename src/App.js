import './App.css';
import React, {useState, useEffect} from "react";
import axios from 'axios';

function App() {

  const [isLoading, setLoading] = useState(true)
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventNameKana, setEventNameKana] = useState("");
  const [genre, setGenre] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");

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

    const body = new FormData();
    body.append('event_name', eventName);
    body.append('event_name_kana', eventNameKana);
    body.append('genre', genre);
    body.append('address', address);
    body.append('tel', tel);
    body.append('email', email);
    body.append('prefecture', prefecture);
    body.append('city', city);
    body.append('date', date);
    body.append('start_time', startTime);
    body.append('end_time', endTime);
    body.append('description', description);
    body.append('owner_id', ownerId);
    body.append('img1', img1);
    body.append('img2', img2);
    body.append('img3', img3);
    body.append('img4', img4);
    body.append('img5', img5);

    console.log(body.event_name)

    await axios.post('/api/registerevent', body)
    .then((response) => response);

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

      <ul>
        <input placeholder="イベント名称" onChange={e => setEventName(e.target.value)}></input>
        <input placeholder="イベント名称かな" onChange={e => setEventNameKana(e.target.value)}></input>
        <input placeholder="ジャンル" onChange={e => setGenre(e.target.value)}></input>
        <input placeholder="住所" onChange={e => setAddress(e.target.value)}></input>
        <input placeholder="電話番号" onChange={e => setTel(e.target.value)}></input>
        <input placeholder="Eメール" onChange={e => setEmail(e.target.value)}></input>
        <input placeholder="県" onChange={e => setPrefecture(e.target.value)}></input>
        <input placeholder="市" onChange={e => setCity(e.target.value)}></input>
        <input placeholder="日付" onChange={e => setDate(e.target.value)}></input>
        <input placeholder="開始時刻" onChange={e => setStartTime(e.target.value)}></input>
        <input placeholder="終了時刻" onChange={e => setEndTime(e.target.value)}></input>
        <input placeholder="詳細情報" onChange={e => setDescription(e.target.value)}></input>
        <input placeholder="オーナーID" onChange={e => setOwnerId(e.target.value)}></input>
        <input placeholder="画像1" onChange={e => setImg1(e.target.value)}></input>
        <input placeholder="画像2" onChange={e => setImg2(e.target.value)}></input>
        <input placeholder="画像3" onChange={e => setImg3(e.target.value)}></input>
        <input placeholder="画像4" onChange={e => setImg4(e.target.value)}></input>
        <input placeholder="画像5" onChange={e => setImg5(e.target.value)}></input>
      </ul>

      <button onClick={handleRegisterEvent}>イベント登録</button>
      
    </div>
  );
}

export default App;
