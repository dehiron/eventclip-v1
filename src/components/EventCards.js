//Component
import { Card, Container, Button, } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Image from 'react-image-resizer';

function EventCards(props){

    const handleClickToEventPage = (id) => {
        console.log(id);
        props.history.push(`/event/${id}`);
    }

    return(
        <Container className="listed-event-container">
        
            {/* (event) => の後に {} 要らない */}
            {props.events.map((event) => 
                <Card className="listed-event" key = {event.event_name}>
                <Image src={event.img1} alt=""　width={300} height={200}/>
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
                    <Button 
                                    variant="primary" 
                                    onClick = {()=> {
                                        handleClickToEventPage(event.id)
                                    }}
                                >
                                    詳細を見る
                                </Button>
                </Card.Body>
                </Card>
            )}
        
        </Container>
    );
};

export default withRouter(EventCards);