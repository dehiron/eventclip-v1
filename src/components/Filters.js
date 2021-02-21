//Component
import { Container, Row, Col, Button, Form} from 'react-bootstrap';

function Filters(){
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
                    <Form.Control placeholder="例：2021年12月31日" />
                  </Form.Group>
                </Col>
            </Col>
            <Container style={{display:"flex"}}>    
            <Button variant="secondary" type="submit" style={{marginLeft: "auto"}}>検索</Button>
            </Container>
            
        </Form>
    )
}

export default Filters;