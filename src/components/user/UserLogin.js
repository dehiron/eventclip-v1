import { useState } from 'react';
import { Container, Form, Col, Button} from 'react-bootstrap';
import axios from 'axios';
// import { useDispatch } from 'react-redux';
import '../Styles.css'
import HeaderLoginPage from '../header/HeaderLoginPage';
import UserSignup from './UserSignup';
// import { userLogInAction } from '../../reducks/users/actions';


function UserLogin(props){

    const [signupShow, setSignupShow] = useState(false);
    const [inputUserPrefId, setInputUserPrefId] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    // const [isIdEmpty, setIsIdEmpty] = useState(false);
    // const [isPassEmpty, setIsPassEmpty] = useState(false);
    // const [isIdCorrect, setIsIdCorrect] = useState("not submitted");
    // const [isPassCorrect, setIsPassCorrect] = useState("not submitted");

    // const dispatch = useDispatch();

    async function handleClickToLogin(){
        try{
            const body = new FormData();
            body.append("input_user_pref_id", inputUserPrefId);
            body.append("input_password", inputPassword);
            //他の情報は現時点では認証に必要無いのでappendしない
            
            await axios.post('/api/user/login', body)
            .then(response => {
                if(response.status === 200){
                    const userData = response.data;
                    console.log(userData);
                    // dispatch(userLogInAction({
                    //     id:userData.id,
                    //     user_pref_id:userData.user_pref_id,
                    //     user_firstname:userData.user_firstname,
                    //     user_lastname: userData.user_lastname,
                    //     date_of_birth: userData.date_of_birth,
                    //     tel: userData.tel,
                    //     email: userData.email,
                    // }))
                    props.history.replace("/");
                } else if (response.status === 204){
                    //IDが間違っている=存在しないユーザーの場合：204 no contentにしてる
                    // setIsIdCorrect(false);
                    console.log(response);
                }
            })
        } catch(error){
            //Passwordが間違っている場合：クライアントエラー、401にしてる
            //ここの処理をもっと綺麗にしたい
            // setIsPassCorrect(false);
            console.log(error);
        }
    }

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
                        <Form.Control 
                            type="email" 
                            onChange={(e)=>{
                                setInputUserPrefId(e.target.value); 
                                // setIsIdCorrect("not submitted");
                                // if(e.target.value.length > 0) {setIsIdEmpty(false)};
                                }}
                        />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="formPassword" >
                        <Form.Label className="login-input">パスワード</Form.Label>
                        <Form.Control 
                            type="password"
                            onChange={(e)=>{
                                setInputPassword(e.target.value); 
                                // setIsPassCorrect("not submitted");
                                // if(e.target.value.length > 0) {setIsPassEmpty(false)};
                                }}
                        />
                        </Form.Group>
                    </Col>
                    <Button 
                            style={{ borderColor:"turquoise", backgroundColor:"darkturquoise", width:"80%", marginTop:"2rem" }} 
                            onClick={() => {
                                handleClickToLogin()
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