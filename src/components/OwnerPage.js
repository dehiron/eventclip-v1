//Page

import React, {useState} from "react";
import axios from 'axios';
import { getGeocode, getLatLng } from "use-places-autocomplete";
import './Styles.css';

function OwnerPage(props) {

    const [eventName, setEventName] = useState("")
    const [eventNameKana, setEventNameKana] = useState("")
    const [genre, setGenre] = useState("")
    const [address, setAddress] = useState("")
    const [tel, setTel] = useState("")
    const [email, setEmail] = useState("")
    const [prefecture, setPrefecture] = useState("")
    const [city, setCity] = useState("")
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [description, setDescription] = useState("")
    const [ownerId, setOwnerId] = useState("")
    const [img1, setImg1] = useState("")
    const [img2, setImg2] = useState("")
    const [img3, setImg3] = useState("")
    const [img4, setImg4] = useState("")
    const [img5, setImg5] = useState("")

    const handleClickToHomePage = () => {
        props.history.goBack();
    }

    async function handleRegisterEvent(e){
        e.preventDefault();
        try {
            //ジオコーディング
            //getGeocode関数の問題（らしい）で時々エラーが返るけどちゃんと機能してる。
            const geoCodeInfo = await getGeocode({address:address});
            const {lat,lng} = await getLatLng(geoCodeInfo[0]);

            //body作る
            const body = new FormData();
            body.append('event_name', eventName);
            body.append('event_name_kana', eventNameKana);
            body.append('genre', genre);
            body.append('address', address);
            body.append('latitude', lat);
            body.append('longitude', lng);
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

            await axios.post('/api/event/name', body)
            .then((response) => console.log(response));
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <h2>イベント登録はこちらから</h2>

            <ul className = "all-events">
               <li><p>イベント名称：<input placeholder="例：第一回大江戸花火大会" onChange={e => setEventName(e.target.value)}></input></p></li>
                <li><p>イベント名称かな：<input placeholder="だいいっかいおおえどはなびたいかい" onChange={e => setEventNameKana(e.target.value)}></input></p></li>
                <li><p>ジャンル：<input placeholder="例：イベント" onChange={e => setGenre(e.target.value)}></input></p></li>
                <li><p>住所：<input placeholder="例：東京都渋谷区渋谷0-0-0" onChange={e => setAddress(e.target.value)}></input></p></li>
                <li><p>電話番号：<input placeholder="例：0300000000" onChange={e => setTel(e.target.value)}></input></p></li>
                <li><p>Eメール：<input placeholder="例：test@gmail.com" onChange={e => setEmail(e.target.value)}></input></p></li>
                <li><p>県：<input placeholder="例：東京都" onChange={e => setPrefecture(e.target.value)}></input></p></li>
                <li><p>市：<input placeholder="例：渋谷区" onChange={e => setCity(e.target.value)}></input></p></li>
                <li><p>日付：<input placeholder="例：20210421" onChange={e => setDate(e.target.value)}></input></p></li>
                <li><p>開始時刻：<input placeholder="例：11:00" onChange={e => setStartTime(e.target.value)}></input></p></li>
                <li><p>終了時刻：<input placeholder="例：16:00" onChange={e => setEndTime(e.target.value)}></input></p></li>
                <li><p>詳細情報：<input placeholder="例：花火！" onChange={e => setDescription(e.target.value)}></input></p></li>
                <li><p>オーナーID：<input placeholder="例：hide_owner" onChange={e => setOwnerId(e.target.value)}></input></p></li>
                <li><p>画像1：<input placeholder="例：" onChange={e => setImg1(e.target.value)}></input></p></li>
                <li><p>画像2：<input placeholder="例：" onChange={e => setImg2(e.target.value)}></input></p></li>
                <li><p>画像3：<input placeholder="例：" onChange={e => setImg3(e.target.value)}></input></p></li>
                <li><p>画像4：<input placeholder="例：" onChange={e => setImg4(e.target.value)}></input></p></li>
                <li><p>画像5：<input placeholder="例：" onChange={e => setImg5(e.target.value)}></input></p></li>
            </ul>
            <button onClick={handleRegisterEvent}>イベント登録</button>
            <button onClick={handleClickToHomePage}>Homeに戻る</button>
      </div>
    )
};

export default OwnerPage; 