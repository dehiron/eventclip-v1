import React, {useState, useEffect} from "react"
import axios from 'axios';
import {Button, Row, Col, Carousel} from 'react-bootstrap';
import Image from 'react-image-resizer';

function EventPage(props){

    const [events, setEvents] = useState([]);
    const [isLoading, setLoading] = useState(true)

    // /api/event/id を作成する。またはHomePageからpropsでeventsを渡してくる。
    useEffect(()=>{
        const fetchData = async () => {
          try {
            const response = await axios.get("/api/events")
            const allEvents = response.data;
            setEvents(allEvents);
            setLoading(false);
          } catch(error){
            console.log(error)
          }
        }
        fetchData();
    }, [])

    let selectedEvent = {};

    for (const event of events){
        if (event.id.toString() === props.match.params.id){
            selectedEvent = event;
        }
    }

    if (isLoading){
    return <div className="loading-img">
        <img src="loading.gif" alt=""/>
    </div>
    } 
    return(
        <div>
            <Col>
                <h1>event id : {props.match.params.id}</h1>
                <h2>{selectedEvent.event_name}</h2>
                <Row>
                    <Col>
                        {/* <img src = {selectedEvent.img1} alt=""/> */}
                        <Carousel>
                            <Carousel.Item>
                                <Image src={selectedEvent.img1} alt=""　width={500} height={400}/>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image src={selectedEvent.img2} alt=""　width={500} height={400}/>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image src={selectedEvent.img3} alt=""　width={500} height={400}/>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image src={selectedEvent.img4} alt=""　width={500} height={400}/>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image src={selectedEvent.img5} alt=""　width={500} height={400}/>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col >
                        <h4><span>{selectedEvent.description}</span></h4>
                        <h4><span>{selectedEvent.description_detail}</span></h4>
                        <p></p>
                        <p></p>
                        <h4><span>{selectedEvent.link_to_hp}</span></h4>
                    </Col>
                </Row>
                <p></p>
                <p></p>
                <h4>開催期間:  <span>{selectedEvent.start_date}</span> ~ <span>{selectedEvent.end_date}</span></h4>
                <p>{selectedEvent.date_detail}</p>
                <h4>開催時間:  <span>{selectedEvent.start_time}</span> ~ <span>{selectedEvent.end_time}</span></h4>
                <p>{selectedEvent.time_detail}</p>
                <h4>開催場所: <span>{selectedEvent.state}</span> <span>{selectedEvent.prefecture}</span> <span>{selectedEvent.city}</span> <span>{selectedEvent.facility_name}</span></h4>
                <h6>料金情報：<span>{selectedEvent.price_detail}</span></h6>
                <h6>駐車場情報：<span>{selectedEvent.park_spots}</span> <span>{selectedEvent.park_price}</span></h6>
                <h6>詳細住所：<span>{selectedEvent.address}</span></h6>
                <h6>詳細施設：<span>{selectedEvent.facility_name}</span></h6>
                <h6>電話番号：<span>{selectedEvent.tel}</span></h6>
                <h6>主催：<span>{selectedEvent.organization}</span></h6>
                <Button variant="primary" >予約する</Button>


            </Col>
            
        </div>
    )
}

export default EventPage;