//Component
import { Card, Container, Button, Row, Col} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Image from 'react-image-resizer';

function EventCards(props){

    const handleClickToEventPage = (id) => {
        props.history.push(`/event/${id}`);
    }

    return(
        <Container className="listed-event-container">
        
            {/* (event) => の後に {} 要らない */}
            {props.events.map((event) => 
                <Card className="listed-event" key = {event.event_name}>
                <Row>
                <Col>
                <Image src={event.img1} alt=""　width={300} height={200}/>
                </Col>
                
                <Card.Body>
                    <Card.Title>
                    <h3> {event.event_name} </h3>
                    </Card.Title>
                    <Card.Text>
                    {event.description}
                    </Card.Text>
                    <Card.Text>
                    開催期間: {event.start_date} ~ {event.end_date}
                    </Card.Text>
                    <Card.Text>
                    開催時間: {event.start_time} ~ {event.end_time}
                    </Card.Text>
                    <Button 
                                    variant="primary" 
                                    onClick = {()=> {
                                        handleClickToEventPage(event.id)
                                    }}
                                >
                                    詳細を見る
                                </Button>
                </Card.Body>
                
                </Row>
                </Card>
            )}
        
        </Container>
    );
};

export default withRouter(EventCards);