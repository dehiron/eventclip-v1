//Component
import { Card, Container, Button, Row, Col } from 'react-bootstrap';



function EventCards(){
    return(
        <Container className="listed-event-container">
            <Card className="listed-event">
                <Card.Img src = "https://picsum.photos/200/100"/>
                <Card.Body>
                    <Card.Title>
                    Card Example
                    </Card.Title>
                    <Card.Text>
                    This is an example of react bootstrap cards
                    </Card.Text>
                    <Button variant="primary">Read More</Button>
                </Card.Body>
            </Card>
            <Card className="listed-event">
                <Card.Img src = "https://picsum.photos/200/100"/>
                <Card.Body>
                    <Card.Title>
                    Card Example
                    </Card.Title>
                    <Card.Text>
                    This is an example of react bootstrap cards
                    </Card.Text>
                    <Button variant="primary">Read More</Button>
                </Card.Body>
            </Card>
            <Card className="listed-event">
                <Card.Img src = "https://picsum.photos/200/100"/>
                <Card.Body>
                    <Card.Title>
                    Card Example
                    </Card.Title>
                    <Card.Text>
                    This is an example of react bootstrap cards
                    </Card.Text>
                    <Button variant="primary">Read More</Button>
                </Card.Body>
            </Card>
            <Card className="listed-event">4</Card>
            <Card className="listed-event">5</Card>
            <Card className="listed-event">6</Card>
        </Container>
    );
};

export default EventCards;