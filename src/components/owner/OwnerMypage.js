import { Container, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ownerLogOutAction } from '../../reducks/owners/actions';
import { persistor } from "../../reducks/store/configureStore";
import HeaderOwnerMypage from "../header/HeaderOwnerMypage";
import OwnerLogin from "./OwnerLogin";

function OwnerMypage (props) {

    const dispatch = useDispatch()
    const selector = useSelector((state) => state);
    const ownerData = selector.owners;

    if (!ownerData.isLoggedIn){
        props.history.replace("/ownerlogin");
        return (
            <OwnerLogin />
        )
    } else {
        return (
            <Container>
                    <HeaderOwnerMypage />
                    
                    <h2 style={{paddingTop:"7rem"}}>Hi {ownerData.owner_pref_id}, Welcome Back!</h2>
                    
                    <Col className="mb-3">
                        <Button　
                            onClick={()=>{
                                props.history.push(`/owner/${ownerData.id}/allevents`)
                            }}
                        >
                            イベント管理
                        </Button>
                    </Col>
                    <Col className="mb-3">
                        <Button　
                            onClick={()=>{
                                props.history.push(`/owner/${ownerData.id}/eventregister`)
                            }}
                        >
                            新規イベント登録
                        </Button>
                    </Col>
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
                                dispatch(ownerLogOutAction()); //store内のstateデータをクリア。operationsを使っての非同期処理は必要ないっぽい。
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

export default OwnerMypage;