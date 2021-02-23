//Component
import { Container, Col, Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

function Filters(props){

    const [locationCandidate, setLocationCandidate] = useState("東京")
    const [selectedDate, setSelectedDate] = useState("")
    
    //動くけど、API実装方法違うかもしれない。検索後にURLが変わらないことによる弊害はないか注意しておく。
    const handleClickFetchFilteredEvent = async () => {
        try {
            const date = selectedDate ? `date=${selectedDate}` : "";
            // const genre = selectedGenre ? `genre=${selectedGenre}` : "";
            // const other = selectedOthers ? `genre=${selectedOthers` : "";
            const response = await axios.get(`/api/events?${date}`)
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
                    <Form.Control 
                        onChange={(e) => { setLocationCandidate(e.target.value) }} 
                        placeholder="例：渋谷区" />
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group>
                    <Form.Label>日時で検索</Form.Label>
                    <Form.Control 
                        onChange={(e) => {setSelectedDate(e.target.value)}} 
                        type="date" 
                        placeholder="例：2021年12月31日" />
                  </Form.Group>
                </Col>
            </Col>
            <Container style={{display:"flex"}}>    
            <Button 
                onClick={()=>{ 
                    props.setSelectedLocation(locationCandidate); 
                    handleClickFetchFilteredEvent(selectedDate);
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