//Component
import { Container, Col, Button, Form} from 'react-bootstrap';
import { useState } from 'react';

function Filters(){

    const [selectedDate, setSelectedDate] = useState("1900-01-01")

    return (
        <Form className="filters-container">

            <Col>
                <Col md>
                  <Form.Group>
                    <Form.Label>エリアで検索</Form.Label>
                    <Form.Control placeholder="例：渋谷区" />
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group>
                    <Form.Label>日時で検索</Form.Label>
                    <Form.Control onChange={(e) => {setSelectedDate(e.target.value)}}type="date" placeholder="例：2021年12月31日" />
                  </Form.Group>
                </Col>
            </Col>
            <Container style={{display:"flex"}}>    
            <Button onClick={(e)=>{console.log(selectedDate)}} variant="secondary" style={{marginLeft: "auto"}}>検索</Button>
            </Container>
            
        </Form>
    )
}

export default Filters;