// import { useState } from 'react';
import { Form, Col, Button, Modal } from 'react-bootstrap';
// import axios from 'axios';
import '../Styles.css'

// const now = new Date();
// const nowYear = now.getYear();
// const year = [...Array(nowYear).keys()].map(i => i + 1900).map(i => i.toString())
// const month = ["01","02","03","04","05","06","07","08","09","10","11","12"]
// const day = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]

function UserSignup(props){

    //作成時はOwnerSignup.jsファイルを参照する。

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
                            <Form.Group controlId="formEmail" >
                            <Form.Label >メールアドレス</Form.Label>
                            <Form.Control type="email" onChange={ null }/>
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group >
                            <Form.Label >ユーザーID</Form.Label>
                            <Form.Control onChange={ null }/>
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group controlId="formPassword" >
                            <Form.Label className="login-input">パスワード</Form.Label>
                            <Form.Control type="password" onChange={ null }/>
                            </Form.Group>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setSignupShow(false)}>
                        キャンセル
                    </Button>
                    <Button onClick={ null } style={{ borderColor:"turquoise", backgroundColor:"darkturquoise"}}>アカウント作成</Button>
                </Modal.Footer>
            </Modal>

    )
}

export default UserSignup;