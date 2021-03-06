import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInAction } from '../../reducks/owners/actions';
import { Container, Form, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import '../Styles.css';
import HeaderOwnerLoginPage from '../headers/HeaderOwnerLoginPage';
import OwnerSignup from './OwnerSignup';
import { withRouter } from 'react-router-dom';

function OwnerLogin(props){

    const [signupShow, setSignupShow] = useState(false);
    const [inputOwnerPrefId, setInputOwnerPrefId] = useState(false);
    const [inputPassword, setInputPassword] = useState(false);

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    async function handleClickToLogin(){
        // e.preventDefault();
        try{
            const body = new FormData();
            body.append("input_owner_pref_id", inputOwnerPrefId);
            body.append("input_password", inputPassword);
            
            await axios.post('/api/owner/login', body)
            .then(response => {
                if(response.status === 200){
                    const ownerData = response.data;
                    console.log(ownerData);
                    console.log(selector.owners)
                    dispatch(signInAction({
                        owner_pref_id:ownerData.owner_pref_id,
                        owner_firstname:ownerData.owner_firstname
                    }))
                    props.history.replace(`/owner/${ownerData.id}`)
                } else {
                    console.log(response.status)
                }
            })
        } catch(error){
            console.log(error)
        }
    }
    

    return(
        <div className="App">
            <HeaderOwnerLoginPage />
            <header className="App-header" style={{minHeight:"100vh", position:"relative", backgroundColor:"#333333"}}>
            <img src="../logo.png" alt="logo" style={{ marginBottom: "0rem"}}/>
            <h3 style={{ marginTop: "1rem", marginBottom: "1rem", color:"darkturquoise"}}>ログイン</h3>
            <Container className = "login-window" style={{width:"50%"}}>
                <Form >
                    <Col md>
                        <Form.Group controlId="formEmail" >
                        <Form.Label >メールアドレスまたはユーザー名</Form.Label>
                        <Form.Control type="email" onChange={(e)=>{setInputOwnerPrefId(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="formPassword" >
                        <Form.Label className="login-input">パスワード</Form.Label>
                        <Form.Control type="password" onChange={(e)=>{setInputPassword(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                    <Button 
                        style={{ borderColor:"turquoise", backgroundColor:"darkturquoise", padding:"0.5rem", width:"80%", marginTop:"2rem" }} 
                        onClick={ 
                            () => {
                                handleClickToLogin(); 
                            }
                        }
                    >
                        ログイン
                    </Button>
                </Form>
            </Container>
            <h4 style={{margin:"2.5rem"}}>アカウントをお持ちでない方はこちら</h4>
            <Button onClick={()=> setSignupShow(true)} style={{color:"darkturquoise", borderColor:"white", backgroundColor:"white", width:"30%", padding:"0.5rem", borderRadius:"5px" }}>新規登録</Button>
            </header>

            <OwnerSignup signupShow = {signupShow} setSignupShow = {setSignupShow}/>

        </div>
    )
    
}

export default withRouter(OwnerLogin);