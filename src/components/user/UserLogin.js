import { useState } from 'react';
import { Container, Form, Col, Button} from 'react-bootstrap';
import '../Styles.css'
import HeaderLoginPage from '../header/HeaderLoginPage';
import UserSignup from './UserSignup';


function UserLogin(props){

    const [signupShow, setSignupShow] = useState(false);

    return(
        <div className="App">
            <HeaderLoginPage />
            <header className="App-header" style={{minHeight:"100vh", position:"relative"}}>
            <img src="../logo.png" alt="logo" style={{ marginBottom: "0rem"}}/>
            <h3 style={{ marginTop: "1rem", marginBottom: "1rem", color:"darkturquoise"}}>ログイン</h3>
            <Container className = "login-window" style={{width:"50%"}}>
                <Form >
                    <Col md>
                        <Form.Group controlId="formEmail" >
                        <Form.Label >メールアドレスまたはユーザー名</Form.Label>
                        <Form.Control type="email" />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="formPassword" >
                        <Form.Label className="login-input">パスワード</Form.Label>
                        <Form.Control type="password" />
                        </Form.Group>
                    </Col>
                    <Button 
                            style={{ borderColor:"turquoise", backgroundColor:"darkturquoise", width:"80%", marginTop:"2rem" }} 
                            onClick={() => {
                                // 作成時はOwnerLogin.jsファイルを参照
                            }}
                        >
                            ログイン
                        </Button>
                </Form>
            </Container>
            <h4 style={{margin:"2.5rem"}}>アカウントをお持ちでない方はこちら</h4>
            <Button onClick={()=> setSignupShow(true)} style={{color:"darkturquoise", borderColor:"white", backgroundColor:"white", width:"30%", padding:"0.5rem", borderRadius:"5px" }}>新規登録</Button>
            </header>
            <UserSignup signupShow = {signupShow} setSignupShow = {setSignupShow}/>
        </div>
    )
}

export default UserLogin;