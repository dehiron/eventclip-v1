//Component
import { withRouter } from 'react-router-dom';

function Header (props){

    const handleClickToOwnerPage = () => {
        props.history.push("/OwnerPage");
    }
    const handleClickToEventsPage = () => {
        props.history.push("/EventsPage");
    }

    return(
        <div className = "header">
            <div className = "app-title">
                <img src="../logo.png" alt=""/>
            </div>
            <div id="link-to" className="to-eventspage" onClick={ handleClickToEventsPage }>イベント一覧</div>
            <div id="link-to" className="to-ownerpage" onClick={ handleClickToOwnerPage }>イベント登録</div>
            <div id="link-to" className="to-loginpage" onClick={ null }>ログイン/新規登録</div>
        </div>
    )
};

export default withRouter(Header);