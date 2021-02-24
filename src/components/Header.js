//Component
import {useState} from 'react';
import {Navbar,Nav, NavDropdown} from 'react-bootstrap';
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
            {/* hrefでコードの見た目良くできるけど、イベント登録ページでのAPIでエラーが起きるのでonClickを使う。 */}
            <NavDropdown id="map-or-list" title={props.mapOrList}>
                <NavDropdown.Item onSelect={()=>props.setMapOrList("Mapで表示")}>Mapで表示</NavDropdown.Item>
                <NavDropdown.Item onSelect={()=>props.setMapOrList("一覧で表示")}>一覧で表示</NavDropdown.Item>
            </NavDropdown>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Item>
                        <Nav.Link onClick={ handleClickToEventsPage }>イベント一覧</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={ handleClickToOwnerPage }>イベント登録</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav>
                    <Nav.Item>
                        <Nav.Link onClick={ null }>ログイン/新規登録</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default withRouter(Header);