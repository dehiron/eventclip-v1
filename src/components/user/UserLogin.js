import { useState } from 'react';
import { Container, Form, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import '../Styles.css'
import HeaderLoginPage from '../header/HeaderLoginPage';
import UserSignup from './UserSignup';
import { userLogInAction } from '../../reducks/users/actions';
import UserSignupSuccessModal from './modal/UserSignupSuccessModal';
import UserSignupErrorModal from './modal/UserSignupErrorModal';


function UserLogin(props){

    const [signupShow, setSignupShow] = useState(false);
    const [inputUserPrefId, setInputUserPrefId] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [isIdEmpty, setIsIdEmpty] = useState(false);
    const [isPassEmpty, setIsPassEmpty] = useState(false);
    const [isIdCorrect, setIsIdCorrect] = useState("not submitted");
    const [isPassCorrect, setIsPassCorrect] = useState("not submitted");

    //ユーザー新規登録後のポップアップウィンドウ用。UserSignupコンポーネントに渡して発火させて、
    //Loginコンポーネントで受け取ってModalコンポーネントに渡す
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();

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
                    dispatch(userLogInAction({
                        id:userData.id,
                        user_pref_id:userData.user_pref_id,
                        user_firstname:userData.user_firstname,
                        user_lastname: userData.user_lastname,
                        date_of_birth: userData.date_of_birth,
                        tel: userData.tel,
                        email: userData.email,
                    }))
                    props.history.replace("/");
                } else if (response.status === 204){
                    //IDが間違っている=存在しないユーザーの場合：204 no contentにしてる
                    setIsIdCorrect(false);
                }
            })
        } catch(error){
            //Passwordが間違っている場合：クライアントエラー、401にしてる
            //ここの処理をもっと綺麗にしたい
            setIsPassCorrect(false);
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
                                setIsIdCorrect("not submitted");
                                if(e.target.value.length > 0) {setIsIdEmpty(false)};
                                }}
                        />
                        {isIdEmpty && <Form.Text style={{color:"red"}}>メールアドレスまたはユーザー名が空白です</Form.Text>}
                        {!isIdEmpty && !isIdCorrect && <Form.Text style={{color:"red"}}>ユーザーが存在しません</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="formPassword" >
                        <Form.Label className="login-input">パスワード</Form.Label>
                        <Form.Control 
                            type="password"
                            onChange={(e)=>{
                                setInputPassword(e.target.value); 
                                setIsPassCorrect("not submitted");
                                if(e.target.value.length > 0) {setIsPassEmpty(false)};
                                }}
                        />
                        {isPassEmpty && <Form.Text style={{color:"red"}}>パスワードが空白です</Form.Text>}
                        {!isPassEmpty && isIdCorrect && !isPassCorrect && <Form.Text style={{color:"red"}}>パスワードが正しくありません</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Button 
                            style={{ borderColor:"turquoise", backgroundColor:"darkturquoise", width:"80%", marginTop:"2rem" }} 
                            onClick={() => {
                                if (inputUserPrefId.length === 0) {
                                    setIsIdEmpty(true)
                                } if (inputPassword.length === 0){
                                    setIsPassEmpty(true)
                                } else {
                                    handleClickToLogin()
                                }
                            }}
                        >
                            ログイン
                        </Button>
                </Form>
            </Container>
            <h4 style={{margin:"2.5rem"}}>アカウントをお持ちでない方はこちら</h4>
            <Button onClick={()=> setSignupShow(true)} style={{color:"darkturquoise", borderColor:"white", backgroundColor:"white", width:"30%", padding:"0.5rem", borderRadius:"5px" }}>新規登録</Button>
            </header>

            <UserSignup 
                signupShow = {signupShow} 
                setSignupShow = {setSignupShow} 
                setSuccessModalOpen={setSuccessModalOpen} 
                setErrorModalOpen={setErrorModalOpen} 
                setErrorMessage={setErrorMessage}/>

            <UserSignupSuccessModal 
                successModalOpen={successModalOpen} 
                setSuccessModalOpen={setSuccessModalOpen}/>

            <UserSignupErrorModal 
                errorMessage={errorMessage} 
                errorModalOpen={errorModalOpen} 
                setErrorModalOpen={setErrorModalOpen} />
        </div>
    )
}

export default UserLogin;