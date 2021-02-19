//Component
import {Navbar,Nav} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

function Header (props){

    const handleClickToOwnerPage = () => {
        props.history.push("/OwnerPage");
    }
    const handleClickToEventsPage = () => {
        props.history.push("/EventsPage");
    }

    return(
        <Navbar className="bootstrap-navbar" expand="md" fixed="top">
            <Navbar.Brand href="#"> <img src="../logo.png" alt="logo"/> </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    {/* hrefでコードの見た目良くできるけど、イベント登録ページでのAPIでエラーが起きるのでonClickを使う。 */}
                    <Nav.Link onClick={ handleClickToEventsPage }>イベント一覧</Nav.Link>
                    <Nav.Link onClick={ handleClickToOwnerPage }>イベント登録</Nav.Link>
                    <Nav.Link onClick={ null }>ログイン/新規登録</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default withRouter(Header);