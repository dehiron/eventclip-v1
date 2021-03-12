import {useState, useEffect} from "react";
import {Container, Card, Row, Col} from "react-bootstrap";
import axios from "axios";


function Recoms(props){

    const [selectedRecom, setSelectedRecom] = useState();

    useEffect(()=>{

        const handleClickToMap = async (input) => {
            if (selectedRecom !== undefined){
                try {
                    console.log(selectedRecom);
                    const recom = selectedRecom ? `recom=${selectedRecom}` : "";
                    const response = await axios.get(`/api/events?${recom}`)
                    const filteredEvents = response.data;
                    props.setEvents(filteredEvents);
                    props.setIsSubmitted(true);
                } catch(error){
                    console.log(error)
                }
            }
        };
        handleClickToMap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedRecom])


    return(
        <div style={{display:"flex", textAlign:"center"}}>
        <Container style={{paddingTop:"1rem"}}>
            <h4>おすすめから選ぶ</h4>
            <Row >
                <Col >
                <Card
                    xs={{span:12}}
                    sm={{span:6}}
                    md={{span:4}}
                    style={{width:300, height:200}}
                    onClick={() => {setSelectedRecom("フェス")}}>
                    <Card.Img style={{width:300, height:200, opacity:"70%"}} src="fes.jpg" alt="none"/>
                    <Card.ImgOverlay style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Card.Title style={{backgroundColor:"white", color:"limegreen", padding:"10px"}}>フェス</Card.Title>
                    </Card.ImgOverlay>
                </Card>
                </Col>
                <Col>
                <Card 
                    xs={{span:12}}
                    sm={{span:6}}
                    md={{span:4}}
                    style={{width:300, height:200}}
                    onClick={() => {setSelectedRecom("カフェ")}}>
                    <Card.Img style={{width:300, height:200, opacity:"70%"}} variant="top" src="cafe.jpg" alt="none"/>
                    <Card.ImgOverlay style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Card.Title style={{backgroundColor:"white", color:"limegreen", padding:"10px"}}>カフェ</Card.Title>
                    </Card.ImgOverlay>
                </Card>
                </Col>
                <Col>
                <Card 
                    xs={{span:12}}
                    sm={{span:6}}
                    md={{span:4}}
                    style={{width:300, height:200}}
                    onClick={() => {setSelectedRecom("デート")}}>
                    <Card.Img style={{width:300, height:200, opacity:"70%"}} variant="top" src="date.jpg" alt="none"/>
                    <Card.ImgOverlay style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Card.Title style={{backgroundColor:"white", color:"limegreen", padding:"10px"}}>デート</Card.Title>
                    </Card.ImgOverlay>
                </Card>
                </Col>
            
                <Col>
                <Card 
                    xs={{span:12}}
                    sm={{span:6}}
                    md={{span:4}}
                    style={{width:300, height:200}}
                    onClick={() => {setSelectedRecom("スポーツ")}}>
                    <Card.Img style={{width:300, height:200, opacity:"70%"}} variant="top" src="sports.jpg" alt="none"/>
                    <Card.ImgOverlay style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Card.Title style={{backgroundColor:"white", color:"limegreen", padding:"10px"}}>スポーツ</Card.Title>
                    </Card.ImgOverlay>
                </Card>
                </Col>
                <Col>
                <Card 
                    xs={{span:12}}
                    sm={{span:6}}
                    md={{span:4}}
                    style={{width:300, height:200}}
                    onClick={() => {setSelectedRecom("食")}}>
                    <Card.Img style={{width:300, height:200, opacity:"70%"}} variant="top" src="eat.jpg" alt="none"/>
                    <Card.ImgOverlay style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Card.Title style={{backgroundColor:"white", color:"limegreen", padding:"10px"}}>食べる・飲む</Card.Title>
                    </Card.ImgOverlay>
                </Card>
                </Col>
                <Col>
                <Card
                    xs={{span:12}}
                    sm={{span:6}}
                    md={{span:4}}
                    style={{width:300, height:200}}
                    onClick={() => {setSelectedRecom("ショッピング")}}>
                    <Card.Img style={{width:300, height:200, opacity:"70%"}} variant="top" src="shopping.jpg" alt="none"/>
                    <Card.ImgOverlay style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Card.Title style={{backgroundColor:"white", color:"limegreen", padding:"10px", borderRadius:"3px"}}>ショッピング</Card.Title>
                    </Card.ImgOverlay>
                </Card>
                </Col>
            
                <Col>
                <Card 
                    xs={{span:12}}
                    sm={{span:6}}
                    md={{span:4}}
                    style={{width:300, height:200}}
                    onClick={() => {setSelectedRecom("イベント")}}>
                    <Card.Img style={{width:300, height:200, opacity:"70%"}} variant="top" src="event.jpg" alt="none"/>
                    <Card.ImgOverlay style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Card.Title style={{backgroundColor:"white", color:"limegreen", padding:"10px"}}>イベント</Card.Title>
                    </Card.ImgOverlay>
                </Card>
                </Col>
                <Col>
                <Card 
                    xs={{span:12}}
                    sm={{span:6}}
                    md={{span:4}}
                    style={{width:300, height:200}}
                    onClick={() => {setSelectedRecom("自然")}}>
                    <Card.Img style={{width:300, height:200, opacity:"70%"}} variant="top" src="nature.jpg" alt="none"/>
                    <Card.ImgOverlay style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Card.Title style={{backgroundColor:"white", color:"limegreen", padding:"10px"}}>自然</Card.Title>
                    </Card.ImgOverlay>
                </Card>
                </Col>
                <Col>
                <Card 
                    xs={{span:12}}
                    sm={{span:6}}
                    md={{span:4}}
                    style={{width:300, height:200}}
                    onClick={() => {setSelectedRecom("映え")}}>
                    <Card.Img style={{width:300, height:200, opacity:"70%"}} variant="top" src="photo.jpg" alt="none"/>
                    <Card.ImgOverlay style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Card.Title style={{backgroundColor:"white", color:"limegreen", padding:"10px"}}>写真映え</Card.Title>
                    </Card.ImgOverlay>
                </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default Recoms;