//Page

import React, {useState} from "react";
import axios from 'axios';
import { getGeocode, getLatLng } from "use-places-autocomplete";
import './Styles.css';

//カレンダーで選べる様にする
const year = ["2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031"]
const month = ["01","02","03","04","05","06","07","08","09","10","11","12"]
const day = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]
const hour = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]
const min = ["00","30"]

function OwnerPage(props) {

    const [eventName, setEventName] = useState("")
    const [eventNameKana, setEventNameKana] = useState("")
    const [genre, setGenre] = useState("")
    // const [address, setAddress] = useState("")
    const [tel, setTel] = useState("")
    const [email, setEmail] = useState("")
    const [prefecture, setPrefecture] = useState("")
    const [city, setCity] = useState("")
    const [addressDetail1, setAddressDetail1] = useState("")
    const [addressDetail2, setAddressDetail2] = useState("")
    const [startTimeYear, setStartTimeYear] = useState("Year")
    const [startTimeMonth, setStartTimeMonth] = useState("Month")
    const [startTimeDay, setStartTimeDay] = useState("Day")
    const [startTimeHour, setStartTimeHour] = useState("")
    const [startTimeMin, setStartTimeMin] = useState("")
    const [endTimeYear, setEndTimeYear] = useState("Year")
    const [endTimeMonth, setEndTimeMonth] = useState("Month")
    const [endTimeDay, setEndTimeDay] = useState("Day")
    const [endTimeHour, setEndTimeHour] = useState("")
    const [endTimeMin, setEndTimeMin] = useState("")
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
            const geoCodeInfo = await getGeocode({address:prefecture+city+addressDetail1+addressDetail2});
            const {lat,lng} = await getLatLng(geoCodeInfo[0]);

            //body作る
            const body = new FormData();
            body.append('event_name', eventName);
            body.append('event_name_kana', eventNameKana);
            body.append('genre', genre);
            body.append('address', prefecture+city+addressDetail1+addressDetail2);
            body.append('latitude', lat);
            body.append('longitude', lng);
            body.append('tel', tel);
            body.append('email', email);
            body.append('prefecture', prefecture);
            body.append('city', city);
            body.append('start_date', startTimeYear+"/"+startTimeMonth+"/"+startTimeDay);
            body.append('start_time', startTimeHour+":"+startTimeMin);
            body.append('end_date', endTimeYear+"/"+endTimeMonth+"/"+endTimeDay);
            body.append('end_time', endTimeHour+":"+endTimeMin);
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
                {/* <li><p>住所：<input placeholder="例：東京都渋谷区渋谷0-0-0" onChange={e => setAddress(e.target.value)}></input></p></li> */}
                {/* searchBar参考にして入力しやすい様にする */}
                <li><p>住所：
                    <label className="registered-address"><input placeholder="県を入力（例：東京都）" onChange={e => setPrefecture(e.target.value)}></input></label>
                    <label className="registered-address"><input placeholder="市区町村を入力（例：渋谷区）" onChange={e => setCity(e.target.value)}></input></label>
                    <label className="registered-address"><input placeholder="番地以降を入力（例：渋谷1-2-3）" onChange={e => setAddressDetail1(e.target.value)}></input></label>
                    <label className="registered-address"><input placeholder="（該当する場合）詳細を入力（例：渋谷ビル101）" onChange={e => setAddressDetail2(e.target.value)}></input></label>
                    </p>
                </li>
                <li><p>電話番号：<input placeholder="例：0300000000" onChange={e => setTel(e.target.value)}></input></p></li>
                <li><p>Eメール：<input placeholder="例：test@gmail.com" onChange={e => setEmail(e.target.value)}></input></p></li>
                <li><p>県：<input placeholder="例：東京都" onChange={e => setPrefecture(e.target.value)}></input></p></li>
                <li><p>市：<input placeholder="例：渋谷区" onChange={e => setCity(e.target.value)}></input></p></li>                
                <li><p>開始日：
                    <select name="Year" onChange={e => {setStartTimeYear(e.target.value); setEndTimeYear(e.target.value)}}>
                        <option value="Year">{startTimeYear}</option>
                        {year.map((year) => <option key={year}>{year}</option>)}
                    </select>
                    <span> / </span>
                    <select name="Month" onChange={e => {setStartTimeMonth(e.target.value); setEndTimeMonth(e.target.value)}}>
                        <option value="Month">Month</option>
                        {month.map((month) => <option key={month}>{month}</option>)}
                    </select>
                    <span> / </span>
                    <select name="Day" onChange={e => {setStartTimeDay(e.target.value); setEndTimeDay(e.target.value)}}>
                        <option value="Day">Day</option>
                        {day.map((day) => <option key={day}>{day}</option>)}
                    </select>
                    </p>
                </li>
                <li><p>開始時刻：
                    <select name="Hour" onChange={e => setStartTimeHour(e.target.value)}>
                        <option value="Hour">Hour</option>
                        {hour.map((hour) => <option key={hour}>{hour}</option>)}
                    </select>
                    <span> : </span>
                    <select name="Min" onChange={e => setStartTimeMin(e.target.value)}>
                        <option value="Min">Min</option>
                        {min.map((min) => <option key={min}>{min}</option>)}
                    </select>
                    </p>
                </li>
                <li><p>終了日：
                    <select name="Year" onChange={e => setEndTimeYear(e.target.value)}>
                        <option value="Year">{endTimeYear}</option>
                        {year.map((year) => <option key={year}>{year}</option>)}
                    </select>
                    <span> / </span>
                    <select name="Month" onChange={e => setEndTimeMonth(e.target.value)}>
                        <option value="Month">{endTimeMonth}</option>
                        {month.map((month) => <option key={month}>{month}</option>)}
                    </select>
                    <span> / </span>
                    <select name="Day" onChange={e => setEndTimeDay(e.target.value)}>
                        <option value="Day">{endTimeDay}</option>
                        {day.map((day) => <option key={day}>{day}</option>)}
                    </select>
                    </p>
                </li>
                <li><p>終了時刻：
                    <select name="hour" onChange={e => setEndTimeHour(e.target.value)}>
                        <option value="Hour">Hour</option>
                        {hour.map((hour) => <option key={hour}>{hour}</option>)}
                    </select>
                    <span> : </span>
                    <select name="min" onChange={e => setEndTimeMin(e.target.value)}>
                        <option value="Min">Min</option>
                        {min.map((min) => <option key={min}>{min}</option>)}
                    </select>
                    </p>
                </li>
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