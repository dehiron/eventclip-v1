import { Container, Form, Col, Button} from 'react-bootstrap';
import './Styles.css'
import HeaderLoginPage from './HeaderLoginPage'


function Login(props){
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
                    <Button style={{ borderColor:"turquoise", backgroundColor:"darkturquoise", width:"80%", marginTop:"2rem" }}>ログイン</Button>
                </Form>
            </Container>
            <h4 style={{margin:"2.5rem"}}>アカウントをお持ちでない方はこちら</h4>
            <h4 style={{color:"darkturquoise", backgroundColor:"white", padding:"0.5rem", borderRadius:"5px", width:"30%"}}>新規登録</h4>
            </header>
        </div>
    )
}

export default Login;