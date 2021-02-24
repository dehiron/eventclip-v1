//Component
import { Container, Col, Button, Form, InputGroup} from 'react-bootstrap';
import { useState} from 'react';
import axios from 'axios';

function Filters(props){

    const [locationCandidate, setLocationCandidate] = useState(null)
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedGenres, setSelectedGenres] = useState("")
    
    //動くけど、API実装方法違うかもしれない。検索後にURLが変わらないことによる弊害はないか注意しておく。
    const handleClickFetchFilteredEvent = async () => {
        try {
            const date = selectedDate ? `date=${selectedDate}` : "";
            const genre = selectedGenres ? `genre=${selectedGenres}` : "";
            // const other = selectedOthers ? `genre=${selectedOthers` : "";
            const response = await axios.get(`/api/events?${date}&${genre}`)
            const filteredEvents = response.data;
            props.setEvents(filteredEvents);
        } catch(error){
            console.log(error)
        }
    }

    return (
        <Form className="filters-container">
            <Col>
                <Col md>
                  <Form.Group>
                    <Form.Label>ロケーションで検索</Form.Label>
                    <InputGroup>
                        <Form.Control
                            id = "test"
                            onChange={(e) => { setLocationCandidate(e.target.value) }} 
                            placeholder="例：渋谷区" />
                        <InputGroup.Append>
                            <Button 
                                variant="outline-secondary"
                                onClick = {()=>{
                                    props.setCurrentLocation("abled");
                                    document.getElementById('test').value = ""; //入力値をリセット(Form.Controlのボックスから)
                                    props.setLocationCandidate("") //入力値をリセット(ステート情報から)
                                    props.setSelectedLocation("") //入力値をリセット(ステート情報から)
                                }
                            }
                            >
                                現在地 🧭
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group>
                    <Form.Label>日時で検索</Form.Label>
                    <Form.Control 
                        onChange={(e) => {setSelectedDate(e.target.value)}} 
                        type="date" />
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group>
                    <Form.Label>ジャンルで検索</Form.Label>
                    {/* ハードコーディング。最終的にはevent.genreに置き換える */}
                    {["イベント","スポット"].map((genre) => (
                        <div key={genre} className="mb-2">
                        <Form.Check 
                            type="switch" 
                            id={`filter-checkbox-${genre}`}
                        >
                            <Form.Check.Input type="checkbox" />
                            <Form.Check.Label 
                                onClick = {() => {
                                    if (!selectedGenres.includes(genre)){ //既に選択されていた場合
                                        setSelectedGenres([...selectedGenres,genre]);
                                    } else if (selectedGenres.includes(genre)) { //未選択の場合
                                        selectedGenres.splice(selectedGenres.indexOf(genre),1);
                                        setSelectedGenres([...selectedGenres])
                                    }
                                }}
                            >
                                {genre}
                            </Form.Check.Label>
                        </Form.Check>
                        </div>
                    ))}
                  </Form.Group>
                </Col>
            </Col>
            <Container style={{display:"flex"}}>    
            <Button 
                onClick={()=>{ 
                    props.setSelectedLocation(locationCandidate); // Mapコンポーネントに渡したAPIとは関係なしにauto focusする
                    props.setCurrentLocation("disabled"); //ロケーション検索した場合は一度現在地取得用のstateを更新、次回また現在地取得ができる様にする
                    handleClickFetchFilteredEvent();　// こっちで検索結果に基づいたAPIが走る
                }} 
                variant="secondary" 
                style={{marginLeft: "auto"}}>
                    検索
            </Button>
            </Container>
            
        </Form>
    )
}

export default Filters;