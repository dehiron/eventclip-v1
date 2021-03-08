import { Container, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userLogOutAction } from '../../reducks/users/actions';
import { persistor } from "../../reducks/store/configureStore";
// import HeaderOwnerMypage from "../header/HeaderOwnerMypage";
import UserLogin from "./UserLogin";

function UserMypage (props) {

    const dispatch = useDispatch()
    const selector = useSelector((state) => state);
    const userData = selector.users;

    if (!userData.isLoggedIn){
        props.history.replace("/login");
        return (
            <UserLogin />
        )
    } else {
        return (
            <Container>
                    {/* <HeadeOwnerMypage /> */}
                    
                    <h2 style={{paddingTop:"7rem"}}>Hi {userData.user_pref_id}, Welcome Back!</h2>
                    
                    <Col className="mb-3">
                        <Button　
                            onClick={()=>{
                                props.history.push("/")
                            }}
                        >
                            Homeに戻る
                        </Button>
                    </Col>
                    <Col className="mb-3">
                        <Button　
                            onClick={()=>{
                                persistor.purge(); //localstorageに保存された(condigure)Storeからのstateデータをクリア
                                dispatch(userLogOutAction()); //store内のstateデータをクリア。operationsを使っての非同期処理は必要ないっぽい。
                                props.history.replace("/") //HPに画面遷移
                            }}
                        >
                            ログアウト
                        </Button>
                    </Col>
            </Container>
        )
    }
}

export default UserMypage;