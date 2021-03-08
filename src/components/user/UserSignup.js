import { useState } from 'react';
import { Form, Col, Row, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import '../Styles.css'

const now = new Date();
const nowYear = now.getYear();
const year = [...Array(nowYear).keys()].map(i => i + 1900).map(i => i.toString())
const month = ["01","02","03","04","05","06","07","08","09","10","11","12"]
const day = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]

function UserSignup(props){

    const [userFirstName, setUserFirstname] = useState(null);
    const [userLastName, setUserLastname] = useState(null);
    const [userTel, setUserTel] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userPrefId, setUserPrefId] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [userDobYear, setUserDobYear] = useState(null)
    const [userDobMonth, setUserDobMonth] = useState(null)
    const [userDobDay, setUserDobDay] = useState(null)

    async function handleClickToRegisterUser(e){
        e.preventDefault();
        try{
            const body = new FormData();
            body.append("user_firstname", userFirstName);
            body.append("user_lastname", userLastName);
            body.append("tel", userTel);
            body.append("email", userEmail);
            body.append("user_pref_id", userPrefId);
            body.append("password", userPassword);
            body.append("date_of_birth", userDobYear+"-"+userDobMonth+"-"+userDobDay);
            
            await axios.post('/api/user/register', body)
            .then((response) => {
                if (response.status === 201){
                    props.setSuccessModalOpen(true);
                    props.setSignupShow(false); //同時に登録フォームを閉じる
                }
            });
        } catch(error){
            props.setErrorMessage(error.toString());
            props.setErrorModalOpen(true);
            // props.setSignupShow(false); //同時に登録フォームを閉じる
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
                ユーザーアカウント新規作成
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* 作成時はOwnerSignup.jsファイルを参照する。 */}
                <Form >
                    <Col md>
                        <Row md>
                            <Col>
                                <Form.Group >
                                <Form.Label >お名前（名）/ First Name</Form.Label>
                                <Form.Control placeholder="記入者様の名" onChange={(e)=>{setUserFirstname(e.target.value)}}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                <Form.Label >お名前（性）/ Last Name</Form.Label>
                                <Form.Control placeholder="記入者様の性" onChange={(e)=>{setUserLastname(e.target.value)}}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                    <Col md>
                        <Form.Group >
                        <Form.Label >ご連絡先電話番号</Form.Label>
                        <Form.Control onChange={(e)=>{setUserTel(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="formEmail" >
                        <Form.Label >メールアドレス</Form.Label>
                        <Form.Control type="email" onChange={(e)=>{setUserEmail(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group >
                        <Form.Label >ユーザーID</Form.Label>
                        <Form.Control onChange={(e)=>{setUserPrefId(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="formPassword" >
                        <Form.Label className="login-input">パスワード</Form.Label>
                        <Form.Control type="password" onChange={(e)=>{setUserPassword(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Label >生年月日</Form.Label>
                        <Form.Text>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</Form.Text>
                        <Row md >
                            <Col >
                                <Form.Group >
                                <Form.Control as="select" placeholder="Month" onChange={(e)=>{setUserDobMonth(e.target.value)}}>
                                    <option >Month</option>
                                    {month.map((month) => <option key={month}>{month}</option>)}
                                </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col >
                                <Form.Group >
                                <Form.Control as="select" placeholder="Day" onChange={(e)=>{setUserDobDay(e.target.value)}}>
                                    <option >Day</option>
                                    {day.map((day) => <option key={day}>{day}</option>)}
                                </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                <Form.Control as="select" onChange={(e)=>{setUserDobYear(e.target.value)}}>
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
                <Button onClick={ handleClickToRegisterUser } style={{ borderColor:"turquoise", backgroundColor:"darkturquoise"}}>アカウント作成</Button>
            </Modal.Footer>
        </Modal>
    
    )
}

export default UserSignup;