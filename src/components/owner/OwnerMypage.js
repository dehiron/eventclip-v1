import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import HeaderOwnerMypage from "../headers/HeaderOwnerMypage";

function OwnerMypage (props) {

    const selector = useSelector((state) => state);
    const ownerData = selector.owners;

    return (
        <Container>
                {/* ヘッダーのアイコンをからHPに戻るとページが更新されたことになってownerのステートがリフレッシュされる */}
                <HeaderOwnerMypage />
                
                <h2 style={{paddingTop:"7rem"}}>Owner: {ownerData.owner_pref_id}</h2>
                
                {/* このボタンからHPに戻ると、historyにpushしているのでログインしたオーナー情報は保持されたまま */}
                <button onClick={()=>{props.history.push("/")}}>Homeに戻る</button>

                {/* localStorageにキャッシュ？を保存して、ページ更新でもオーナー情報リセットされない様にする */}
                {/* https://qiita.com/Ryusou/items/8bce84e7b036114b8d72 */}
        </Container>
    )
}

export default OwnerMypage;