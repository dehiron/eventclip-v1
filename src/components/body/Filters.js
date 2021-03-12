//Component
import { Container, Col, Row, Button, Form, InputGroup} from 'react-bootstrap';
import { useState} from 'react';
import axios from 'axios';
import { getGeocode } from "use-places-autocomplete";

function Filters(props){

    const [locationCandidate, setLocationCandidate] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedCategories] = useState("")
    const [locationBarPlaceHolder, setLocationBarPlaceHolder] = useState("Filter by location")
    
    //動くけど、API実装方法違うかもしれない。検索後にURLが変わらないことによる弊害はないか注意しておく。
    const handleClickFetchFilteredEvent = async () => {
        try {
            const date = selectedDate ? `date=${selectedDate}` : "";
            const category = selectedCategories ? `category=${selectedCategories}` : "";
            // const other = selectedOthers ? `category=${selectedOthers` : "";
            const response = await axios.get(`/api/events?${date}&${category}`)
            const filteredEvents = response.data;
            props.setEvents(filteredEvents);
        } catch(error){
            console.log(error)
        }
    }

    return (
        <Form className="filters-container">
            <Row>
                <Col md={{span:6}}>
                  <Form.Group>
                    <Form.Label className="d-none d-sm-block">ロケーションで検索</Form.Label>
                    <InputGroup>
                        <Form.Control
                            id = "location-candidate"
                            onChange={(e) => { setLocationCandidate(e.target.value) }}
                            placeholder = {locationBarPlaceHolder}
                            value = {locationCandidate} />
                        <InputGroup.Append>
                            <Button 
                                variant="outline-secondary"
                                onClick = {()=>{
                                    console.log(1);
                                    setLocationBarPlaceHolder("現在地を取得中...")
                                    console.log(2);
                                    setLocationCandidate("現在地を取得中...") 
                                    console.log(3);
                                    const success = async (position) => {
                                        console.log(4);
                                        const latLng = {
                                            lat: position.coords.latitude,
                                            lng: position.coords.longitude,
                                        };
                                        console.log(5)
                                        const results = await getGeocode({ location: latLng });
                                        console.log(6)
                                        console.log(results)
                                        setLocationCandidate(results[1].formatted_address);
                                        setLocationBarPlaceHolder("Filter by location")
                                        };
                                    const error = (error) => {
                                        const errorMessage = {
                                            0: "原因不明のエラー" ,
                                            1: "位置情報取得の未許可によるエラー" ,
                                            2: "電波状況によるエラー" ,
                                            3: "タイムアウトエラー" ,
                                        }
                                        alert(errorMessage[error.code]);
                                    };
                                    navigator.geolocation.getCurrentPosition(success,error)
                                }
                            }
                            >
                                🧭
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={{span:6}}>
                  <Form.Group>
                    <Form.Label className="d-none d-sm-block">日時で検索</Form.Label>
                    <Form.Control 
                        onChange={(e) => {setSelectedDate(e.target.value)}} 
                        type="date" />
                  </Form.Group>
                </Col>
                {/* <Col md={{span:3}}>
                  <Form.Group>
                    <Form.Label className="d-none d-sm-block">ジャンルで検索</Form.Label>
                    {["イベント","スポット"].map((category) => (
                        <div key={category} className="mb-2">
                        <Form.Check 
                            type="switch" 
                            id={`filter-checkbox-${category}`}
                        >
                            <Form.Check.Input type="checkbox" />
                            <Form.Check.Label 
                                onClick = {() => {
                                    if (!selectedCategories.includes(category)){ //既に選択されていた場合
                                        setSelectedCategories([...selectedCategories,category]);
                                    } else if (selectedCategories.includes(category)) { //未選択の場合
                                        selectedCategories.splice(selectedCategories.indexOf(category),1);
                                        setSelectedCategories([...selectedCategories])
                                    }
                                }}
                            >
                                {category}
                            </Form.Check.Label>
                        </Form.Check>
                        </div>
                    ))}
                  </Form.Group>
                </Col> */}
            </Row>
            
            <Container className="search-button-wrapper">    
                <Button 
                    className = "search-button"
                    onClick={()=>{ 
                        props.setIsSubmitted(true);
                        props.setSelectedLocation(locationCandidate); // Mapコンポーネントに渡したAPIとは関係なしにauto focusする
                        handleClickFetchFilteredEvent();　// こっちで検索結果に基づいたAPIが走る
                    }} 
                    variant="secondary">
                        検索
                </Button>
            </Container>
            
        </Form>
    )
}

export default Filters;