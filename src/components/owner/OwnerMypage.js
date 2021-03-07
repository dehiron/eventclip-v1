import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from '../../reducks/owners/actions';
import { persistor } from "../../reducks/store/configureStore";
import HeaderOwnerMypage from "../headers/HeaderOwnerMypage";

function OwnerMypage (props) {

    const dispatch = useDispatch()
    const selector = useSelector((state) => state);
    const ownerData = selector.owners;

    return (
        <Container>
                <HeaderOwnerMypage />
                
                <h2 style={{paddingTop:"7rem"}}>Owner: {ownerData.owner_pref_id}</h2>
                
                <button onClick={()=>{props.history.push("/")}}>Homeに戻る</button>
                <button onClick={()=>{
                    persistor.purge(); //localstorageに保存された(condigure)Storeからのstateデータをクリア
                    dispatch(logOutAction()); //store内のstateデータをクリア。operationsを使っての非同期処理は必要ないっぽい。
                    props.history.replace("/") //HPに画面遷移
                    }}
                >
                    ログアウト
                </button>
        </Container>
    )
}

export default OwnerMypage;