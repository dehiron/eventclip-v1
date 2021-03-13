import {useEffect, useState} from "react";
import axios from 'axios';
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import '../Styles.css';
import {Upload1, Upload2, Upload3, Upload4, Upload5,} from "../awss3/Upload"
import { saveObject } from "../awss3/s3index";
import HeaderOwnerEventRegister from '../header/HeaderOwnerEventRegister';
import { withRouter } from 'react-router-dom';
import OwnerLogin from "./OwnerLogin";
import SuccessModal from "./modal/RegisterEventSuccessModal";
import ErrorModal from "./modal/RegisterEventErrorModal";

//カレンダーで選べる様にする
const eventCategory = ["音楽","食べる・飲む","エンタメ","フェス","祭り","展示会","講演会","スポーツ"] //注意：カテゴリー分け考える必要ある
const spotCategory = ["カフェ","インドア","アウトドア"] //注意：カテゴリー分け考える必要ある

function OwnerEventRegister(props) {

    const time = new Date();
    const todayStr = `${time.getFullYear()}-${(time.getMonth()+1).toString().padStart(2, '0')}-${time.getDate().toString().padStart(2, '0')}`.replace(/\n|\r/g, '');
    const tenYearsLater = new Date(time.setDate(time.getDate()+3650));
    const tenYearsLaterStr = `${tenYearsLater.getFullYear()}-${(tenYearsLater.getMonth()+1).toString().padStart(2, '0')}-${tenYearsLater.getDate().toString().padStart(2, '0')}`.replace(/\n|\r/g, '');
    const selector = useSelector((state) => state);
    const ownerData = selector.owners;

    //state群
    const [type, setType] = useState(""); //イベントかスポットか（3/9追加）
    const [eventName, setEventName] = useState("");
    const [startDate, setStartDate] = useState(todayStr);
    const [endDate, setEndDate] = useState(tenYearsLaterStr);
    const [dateDetail, setDateDetail] = useState("");
    const [category, setCategory] = useState("");
    const [startTime, setStartTime] = useState("");
    // const [startTimeHour, setStartTimeHour] = useState("");
    // const [startTimeMin, setStartTimeMin] = useState("");
    const [endTime, setEndTime] = useState("");
    const [timeType, setTimeType] = useState("");
    // const [endTimeHour, setEndTimeHour] = useState("");
    // const [endTimeMin, setEndTimeMin] = useState("");
    const [timeDetail, setTimeDetail] = useState("");
    const [state, setState] = useState("");
    const [prefecture, setPrefecture] = useState("");
    const [city, setCity] = useState("");
    const [addressDetail1, setAddressDetail1] = useState("");
    const [addressDetail2, setAddressDetail2] = useState("");
    const [facilityName, setFacilityName] = useState("");
    const [tel, setTel] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionDetail, setDescriptionDetail] = useState("");
    const [parkSpots, setParkSpots] = useState("");
    const [parkPrice, setParkPrice] = useState("");
    const [priceDetail, setPriceDetail] = useState("");
    const [creditCardInfo, setCreditCardInfo] = useState("");
    const [tag, setTag] = useState('{}');
    // オーナーが写真を選ばなければ自動でnoimageの画像になる様に設定
    // 注意：オーナーがまとめてアップロードできる様に、リファクタリング必要
    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [img3, setImg3] = useState("");
    const [img4, setImg4] = useState("");
    const [img5, setImg5] = useState("");
    const [linkToHp, setLinkToHp] = useState("");

    //開催時間のデータ処理
    const dateDiff = (endDate.slice(0,4) + endDate.slice(5,7) + endDate.slice(8,10)) - (startDate.slice(0,4) + startDate.slice(5,7) + startDate.slice(8,10)); 
    const [schedule, setSchedule] = useState([]);

    //イベント登録後のポップアップウィンドウ用
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    //関数群
    async function uploadImage(img){
        if (img !== undefined　&& img !== ""){
            await saveObject(img,time);
            // 注意：確認用。最終的には消す。
            console.log(`imgアップロード成功、S3保存先URL：https://eventclip.s3-ap-northeast-1.amazonaws.com/${time.toISOString()}${img.name}`)
        }
    }
    async function generateScheduleArray(){
        const scheduleResult = [];
        for (let i = 0 ; i < dateDiff+1; i++){
            const fixedStartDate = new Date(startDate);
            const nextDay = new Date(fixedStartDate.setDate(fixedStartDate.getDate()+i));
            const nextDayStr = `${nextDay.getFullYear()}-${(nextDay.getMonth()+1).toString().padStart(2, '0')}-${nextDay.getDate().toString().padStart(2, '0')}`.replace(/\n|\r/g, '');
            scheduleResult.push(nextDayStr);
        }
        setSchedule(scheduleResult)
    }
    async function handleRegisterEvent(e){
        e.preventDefault();
        try {

            //Uploadコンポーネントでセットされた画像ファイルをS3にアップロード
            //注意：オーナーがまとめてアップロードできる様に、リファクタリング必要
            [img1,img2,img3,img4,img5].map((img) => uploadImage(img))

            //ジオコーディング
            //getGeocode関数の問題（らしい）で時々エラーが返るけどちゃんと機能してる。
            const geoCodeInfo = await getGeocode({address:prefecture+city+addressDetail1+addressDetail2});
            const {lat,lng} = await getLatLng(geoCodeInfo[0]);

            //body作る
            const body = new FormData();
            body.append('event_name', eventName);
            body.append('start_date', startDate);
            body.append('end_date', endDate);
            body.append('date_detail', dateDetail);
            body.append('category', type); //temporaly
            body.append('start_time', startTime);
            body.append('end_time', endTime);
            body.append('time_detail', timeDetail);
            body.append('state', state);
            body.append('prefecture', prefecture);
            body.append('city', city);
            body.append('address', prefecture+city+addressDetail1+addressDetail2);
            body.append('latitude', lat);
            body.append('longitude', lng);
            body.append('facility_name', facilityName);
            body.append('tel', tel);
            body.append('description', description);
            body.append('description_detail', descriptionDetail);
            body.append('park_spots', parkSpots);
            body.append('park_price', parkPrice);
            body.append('price_detail', priceDetail);
            body.append('credit_card_info', creditCardInfo);
            body.append('owner_id', ownerData.id);
            body.append('tag', tag);
            (img1 === "" || img1 === undefined) ? body.append('img1', "https://eventclip.s3-ap-northeast-1.amazonaws.com/noimage.png") : body.append('img1', "https://eventclip.s3-ap-northeast-1.amazonaws.com/" + time.toISOString() + img1.name);
            (img2 === "" || img2 === undefined) ? body.append('img2', "https://eventclip.s3-ap-northeast-1.amazonaws.com/noimage.png") : body.append('img2', "https://eventclip.s3-ap-northeast-1.amazonaws.com/" + time.toISOString() + img2.name);
            (img3 === "" || img3 === undefined) ? body.append('img3', "https://eventclip.s3-ap-northeast-1.amazonaws.com/noimage.png") : body.append('img3', "https://eventclip.s3-ap-northeast-1.amazonaws.com/" + time.toISOString() + img3.name);
            (img4 === "" || img4 === undefined) ? body.append('img4', "https://eventclip.s3-ap-northeast-1.amazonaws.com/noimage.png") : body.append('img4', "https://eventclip.s3-ap-northeast-1.amazonaws.com/" + time.toISOString() + img4.name);
            (img5 === "" || img5 === undefined) ? body.append('img5', "https://eventclip.s3-ap-northeast-1.amazonaws.com/noimage.png") : body.append('img5', "https://eventclip.s3-ap-northeast-1.amazonaws.com/" + time.toISOString() + img5.name);
            body.append('link_to_hp', linkToHp);
            
            await axios.post('/api/event/name', body)
            .then((response) => {
                if (response.status === 201){
                    setSuccessModalOpen(true);
                }

            });
        } catch(error){
            setErrorModalOpen(true);
            setErrorMessage(error);
        }
    }

    useEffect(()=>{
        generateScheduleArray();
        // 注意：これでいいのか・・
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[endDate])


    if (!ownerData.isLoggedIn){
        props.history.replace("/ownerlogin");
        return (
            <OwnerLogin />
        )
    } else {
        return (
            <Container>
                <HeaderOwnerEventRegister />
                <Form style={{paddingTop:"7rem"}}>
                <h2>イベント登録フォーム</h2>
                <h6>（ここでイベント/スポット選択して次のページで情報入力のやり方もある）</h6>
                
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label >タイプ</Form.Label>
                            <Form.Control as="select" onChange={(e)=>{setType(e.target.value)}}><option>選択して下さい</option><option>イベント</option><option>スポット</option></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label >カテゴリー</Form.Label>
                            {(type === "選択して下さい" || type === "") &&  <Form.Control as="select"><option>←タイプを選択して下さい</option></Form.Control>}
                            {(type === "イベント") &&  <Form.Control as="select" htmlSize={1} onChange={(e)=>{setCategory(e.target.value)}}><option>{eventCategory.length} categories</option>{eventCategory.map((category)=><option key={category}>{category}</option>)}</Form.Control>}
                            {(type === "スポット") &&  <Form.Control as="select" htmlSize={1} onChange={(e)=>{setCategory(e.target.value)}}><option>{spotCategory.length} categories</option>{spotCategory.map((spot)=><option key={category}>{spot}</option>)}</Form.Control>}
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            {(type === "選択して下さい" || type === "") && <Form.Label >名称</Form.Label>}
                            {(type === "イベント") && <Form.Label >イベント名称</Form.Label>}
                            {(type === "スポット") && <Form.Label >スポット名称</Form.Label>}
                            <Form.Control onChange={(e)=>{setEventName(e.target.value)}}></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            {(type === "イベント" || type === "選択して下さい" || type === "") && <Form.Label >開始日</Form.Label>}
                            {(type === "スポット") && <Form.Label >開始日(オープン済の場合は記入不要です)</Form.Label>}
                            <Form.Control type="date" onChange={(e)=>{setStartDate(e.target.value)}}></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label >終了日</Form.Label>
                            {(type === "イベント" || type === "選択して下さい" || type === "") && <Form.Control type="date" min={startDate} onChange={(e)=>{setEndDate(e.target.value); }}></Form.Control>}
                            {(type === "スポット") && <Form.Control readOnly type="date" onChange={(e)=>{setEndDate(e.target.value);  }}></Form.Control>}
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            {(type === "イベント") && <Form.Label >開催期間についての補足情報</Form.Label>}
                            {(type === "イベント") && <Form.Control as="textarea" onChange={(e)=>{setDateDetail(e.target.value)}}></Form.Control>}
                        </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Form.Group>
                        <Col>
                        {(type === "イベント" || type === "") && <Form.Label >開催時間</Form.Label>}
                        {(type === "スポット") && <Form.Label >営業時間</Form.Label>}
                        {(dateDiff !== 0) && <Form.Control 
                            as="select" 
                            onChange={(e)=>{
                                setTimeType(e.target.value);
                                generateScheduleArray()
                            }}
                        >
                            <option>タイプを選択して下さい</option>
                            <option>月〜日タイプ</option>
                            <option>連日タイプ</option>
                        </Form.Control>}
                        {(dateDiff === 0) && 
                            <Table>
                            <thead>
                                <tr><th>#</th><th>{startDate}</th></tr>
                                <tr><th>開始時間</th>{[1].map((num) => <th key={num}><Form.Control type="time" onChange={(e)=>{setStartTime(e.target.value)}}></Form.Control></th>)}</tr>
                                <tr><th>終了時間</th>{[1].map((num) => <th key={num}><Form.Control type="time" onChange={(e)=>{setEndTime(e.target.value)}}></Form.Control></th>)}</tr>
                            </thead>
                            </Table>
                        }
                        {(timeType === "月〜日タイプ") && 
                            <Table>
                            <thead>
                                <tr><th>#</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr>
                                <tr><th>開始時間</th>{[1,2,3,4,5,6,7].map((num) => <th key={num}><Form.Control type="time" onChange={(e)=>{setStartTime(e.target.value)}}></Form.Control></th>)}</tr>
                                <tr><th>終了時間</th>{[1,2,3,4,5,6,7].map((num) => <th key={num}><Form.Control type="time" onChange={(e)=>{setEndTime(e.target.value)}}></Form.Control></th>)}</tr>
                            </thead>
                            </Table>
                        }
                        {(timeType === "連日タイプ") && 
                            <Table striped hover size="sm">
                            <thead>
                                <tr><th>#</th>{schedule.map((day) => <th key={day}>{day}</th>)}</tr>
                                <tr><th>開始時間</th>{[...Array(dateDiff+1).keys()].map((num) => <th key={num}><Form.Control type="time" onChange={(e)=>{setStartTime(e.target.value)}}></Form.Control></th>)}</tr>
                                <tr><th>終了時間</th>{[...Array(dateDiff+1).keys()].map((num) => <th key={num}><Form.Control type="time" onChange={(e)=>{setEndTime(e.target.value)}}></Form.Control></th>)}</tr>
                            </thead>
                            </Table>
                        }
                        
                        </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            {(type === "イベント"　|| type === "") && <Form.Label >開催時間についての補足情報</Form.Label>}
                            {(type === "スポット") && <Form.Label >営業期間についての補足情報</Form.Label>}
                            <Form.Control as="textarea" onChange={(e)=>{setTimeDetail(e.target.value)}}></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label >住所</Form.Label>
                            <Row className="mb-3">
                            <Col><Form.Control placeholder="地方" onChange={(e) => setState(e.target.value)}></Form.Control></Col>
                            <Col><Form.Control placeholder="都道府県" onChange={(e) => setPrefecture(e.target.value)}></Form.Control></Col>
                            <Col><Form.Control placeholder="市区町村" onChange={(e) => setCity(e.target.value)}></Form.Control></Col>
                            </Row>
                            <Row className="mb-3">
                            <Col><Form.Control placeholder="Address1：番地以降（例：渋谷1-2-3）" onChange={(e) => setAddressDetail1(e.target.value)}></Form.Control></Col>
                            </Row>
                            <Row className="mb-3">
                            <Col><Form.Control placeholder="Address2：ビル名・部屋番号等の詳細（例：渋谷ビル101）" onChange={(e) => setAddressDetail2(e.target.value)}></Form.Control></Col>
                            </Row>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label >施設名</Form.Label>
                            <Form.Control placeholder="施設名（例：渋谷ビル）" onChange={(e) => setFacilityName(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label >電話番号</Form.Label>
                            <Form.Control onChange={(e) => setTel(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label >イベント情報</Form.Label>
                            <Form.Control onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label >更に詳しいイベント情報</Form.Label>
                            <Form.Control as="textarea" onChange={(e) => setDescriptionDetail(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label >駐車場情報</Form.Label>
                            <Form.Control placeholder="例：有/○○台" onChange={(e) => setParkSpots(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label >駐車場料金</Form.Label>
                            <Form.Control as="textarea" placeholder="平日8:00~22:00 300円/10分 平日22:00~8:00 100円/60分&#13;&#10;土日8:00~22:00 500円/10分 土日22:00~8:00 100円/60分" onChange={(e) => setParkPrice(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label >料金情報</Form.Label>
                            <Form.Control placeholder="例：大人700円　子供300円" onChange={(e) => setPriceDetail(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label >クレジットカード利用可否</Form.Label>
                            <Form.Control placeholder="例：可/不可" onChange={(e) => setCreditCardInfo(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label >タグ</Form.Label>
                            <Form.Control placeholder="例：{家族と,デートに,お一人様,癒されたい}"  onChange={(e) => setTag(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    {(type !== "") && 
                        <Row>
                            <Col>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Label >{type}画像1</Form.Label>
                                        <Upload1 setImg1 = {setImg1}/>
                                    </Col>
                            
                                    <Col>
                                        <Form.Label >{type}画像2</Form.Label>
                                        <Upload2 setImg2 = {setImg2}/>
                                    </Col>
                            
                                    <Col>
                                        <Form.Label >{type}画像3</Form.Label>
                                        <Upload3 setImg3 = {setImg3}/>
                                    </Col>
                            
                                    <Col>
                                        <Form.Label >{type}画像4</Form.Label>
                                        <Upload4 setImg4 = {setImg4}/>
                                    </Col>
                            
                                    <Col>
                                        <Form.Label >{type}画像5</Form.Label>
                                        <Upload5 setImg5 = {setImg5}/>
                                    </Col>
                                </Row>
                            </Form.Group>
                            </Col>
                            
                        </Row>
                    }
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label >公式HPリンク</Form.Label>
                            <Form.Control placeholder="例：XXXXXXXX.com"  onChange={(e) => setLinkToHp(e.target.value)}></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                            
                    
                    <Button onClick={handleRegisterEvent}>イベント登録</Button>{' '}
                    <Button onClick={() => {props.history.goBack()} }>マイページに戻る</Button>{' '}
                    <Button onClick={() => {props.history.replace("/")} }>Homeに戻る</Button>
                </Form>

                <SuccessModal successModalOpen = {successModalOpen} setSuccessModalOpen = {setSuccessModalOpen} />
                <ErrorModal errorMessage = {errorMessage} errorModalOpen = {errorModalOpen} setErrorModalOpen = {setErrorModalOpen} />
    
          </Container>
        )
    }
};

export default withRouter(OwnerEventRegister); 