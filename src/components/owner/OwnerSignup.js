import { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import '../Styles.css'

const now = new Date();
const nowYear = now.getYear();
const year = [...Array(nowYear).keys()].map(i => i + 1900).map(i => i.toString())
const month = ["01","02","03","04","05","06","07","08","09","10","11","12"]
const day = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]

function OwnerSignup(props){

    const [ownerType, setOwnerType] = useState("個人")
    const [ownerFirstName, setOwnerFirstname] = useState(null)
    const [ownerLastName, setOwnerLastName] = useState(null)
    const [ownerTel, setOwnerTel] = useState("01000000000")
    const [ownerEmail, setOwnerEmail] = useState(null)
    const [ownerPrefId, setOwnerPrefId] = useState(null)
    const [ownerPassword, setOwnerPassword] = useState(null)
    const [ownerDobYear, setOwnerDobYear] = useState(null)
    const [ownerDobMonth, setOwnerDobMonth] = useState(null)
    const [ownerDobDay, setOwnerDobDay] = useState(null)
    const [ownerOrganization, setOwnerOrganization] = useState("")

    async function handleClickToRegisterOwner(e){
        e.preventDefault();
        try{
            const body = new FormData();
            body.append("type", ownerType);
            body.append("owner_firstname", ownerFirstName);
            body.append("owner_lastname", ownerLastName);
            body.append("tel", ownerTel);
            body.append("email", ownerEmail);
            body.append("owner_pref_id", ownerPrefId);
            body.append("password", ownerPassword);
            body.append("date_of_birth", ownerDobYear+"-"+ownerDobMonth+"-"+ownerDobDay);
            body.append("organization", ownerOrganization);
            
            await axios.post('/api/owner/register', body)
            .then((response) => console.log(response));
        } catch(error){
            console.log(error);
        }
    };

    return(
        <Modal
                size="lg"
                show={props.signupShow}
                onHide={() => props.setSignupShow(false)}
                centered
                
            >
                <Modal.Header >
                <Modal.Title >
                    イベントオーナーアカウント新規作成
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Col>
                        <Form.Group >
                            <Form.Label>活動形態</Form.Label>
                            <Form.Control as="select" onChange={(e)=>{setOwnerType(e.target.value)}}>
                                <option >選択してください</option>
                                <option >個人</option>
                                <option >グループ</option>
                                <option >企業</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                        {ownerType!=="個人" && 
                            <Col md>
                                <Form.Group>
                                <Form.Label >企業名</Form.Label>
                                <Form.Control placeholder="会社名または団体・グループ名" onChange={(e)=>{setOwnerOrganization(e.target.value)}}/>
                                </Form.Group>
                            </Col>}
                        <Col md>
                            <Row md>
                                <Col>
                                    <Form.Group >
                                    <Form.Label >お名前（名）</Form.Label>
                                    <Form.Control placeholder="記入者様の名" onChange={(e)=>{setOwnerFirstname(e.target.value)}}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group >
                                    <Form.Label >お名前（性）</Form.Label>
                                    <Form.Control placeholder="記入者様の性" onChange={(e)=>{setOwnerLastName(e.target.value)}}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col md>
                            <Form.Group >
                            <Form.Label >ご連絡先電話番号</Form.Label>
                            <Form.Control onChange={(e)=>{setOwnerTel(e.target.value)}}/>
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group controlId="formEmail" >
                            <Form.Label >メールアドレス</Form.Label>
                            <Form.Control type="email" onChange={(e)=>{setOwnerEmail(e.target.value)}}/>
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group >
                            <Form.Label >ユーザーID</Form.Label>
                            <Form.Control onChange={(e)=>{setOwnerPrefId(e.target.value)}}/>
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group controlId="formPassword" >
                            <Form.Label className="login-input">パスワード</Form.Label>
                            <Form.Control type="password" onChange={(e)=>{setOwnerPassword(e.target.value)}}/>
                            </Form.Group>
                        </Col>
                        {/* 企業・団体の場合ここどうするか、検討 */}
                        <Col md>
                            <Form.Label >生年月日</Form.Label>
                            <Form.Text>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</Form.Text>
                            <Row md >
                                <Col >
                                    <Form.Group >
                                    <Form.Control as="select" placeholder="Month" onChange={(e)=>{setOwnerDobMonth(e.target.value)}}>
                                        <option >Month</option>
                                        {month.map((month) => <option key={month}>{month}</option>)}
                                    </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col >
                                    <Form.Group >
                                    <Form.Control as="select" placeholder="Day" onChange={(e)=>{setOwnerDobDay(e.target.value)}}>
                                        <option >Day</option>
                                        {day.map((day) => <option key={day}>{day}</option>)}
                                    </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group >
                                    <Form.Control as="select" onChange={(e)=>{setOwnerDobYear(e.target.value)}}>
                                        <option >Year</option>
                                        {year.map((year) => <option key={year}>{year}</option>)}
                                    </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setSignupShow(false)}>
                        キャンセル
                    </Button>
                    <Button onClick={ handleClickToRegisterOwner } style={{ borderColor:"turquoise", backgroundColor:"darkturquoise"}}>アカウント作成</Button>
                </Modal.Footer>
            </Modal>

    )
}

export default OwnerSignup;