//Component
import { Card, Container, Button, } from 'react-bootstrap';



function EventCards(props){

    return(
        <Container className="listed-event-container">
        
            {/* (event) => の後に {} 要らない */}
            {props.events.map((event) => 
                <Card className="listed-event" key = {event.event_name}>
                <Card.Img src = {event.img1}/>
                <Card.Body>
                    <Card.Title>
                    {event.event_name}
                    </Card.Title>
                    <Card.Text>
                    {event.description}
                    </Card.Text>
                    <Card.Text>
                    開始: {event.start_date}  {event.start_time}
                    </Card.Text>
                    <Card.Text>
                    終了: {event.end_date}  {event.end_time}
                    </Card.Text>
                    <Button variant="primary">Read More</Button>
                </Card.Body>
                </Card>
            )}
        
        </Container>
    );
};

export default EventCards;