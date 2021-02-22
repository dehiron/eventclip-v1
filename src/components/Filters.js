//Component
import { Container, Col, Button, Form} from 'react-bootstrap';
import { useState } from 'react';

function Filters(props){

    const [selectedDate, setSelectedDate] = useState("1900-01-01")
    const [locationCandidate, setLocationCandidate] = useState("日本")

    return (
        <Form className="filters-container">
            <Col>
                <Col md>
                  <Form.Group>
                    <Form.Label>ロケーションで検索</Form.Label>
                    <Form.Control onChange={(e) => { setLocationCandidate(e.target.value) }} placeholder="例：渋谷区" />
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group>
                    <Form.Label>日時で検索</Form.Label>
                    <Form.Control onChange={(e) => {setSelectedDate(e.target.value)}} type="date" placeholder="例：2021年12月31日" />
                  </Form.Group>
                </Col>
            </Col>
            <Container style={{display:"flex"}}>    
            <Button onClick={()=>{props.setSelectedLocation(locationCandidate); console.log(selectedDate)}} variant="secondary" style={{marginLeft: "auto"}}>検索</Button>
            </Container>
            
        </Form>
    )
}

export default Filters;