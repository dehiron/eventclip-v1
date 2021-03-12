//Component
// import {useState} from 'react';
import {Navbar,Nav, NavDropdown} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header (props){

    const selector = useSelector((state) => state);
    const ownerData = selector.owners;
    const userData = selector.users;

    // const handleClickToEventsPage = () => {
    //     props.history.push("/allevents");
    // }
    const handleClickToLoginPage = () => {
        props.history.push("/login");
    }
    const handleClickToOwnerMypage = (id) => {
        props.history.push(`/owner/${id}`)
    }
    const handleClickToUserMypage = (id) => {
        props.history.push(`/user/${id}`)
    }


    return(
        <Navbar className="bootstrap-navbar" expand="md" fixed="top">
            <Navbar.Brand href="/" > 
                <img src="/logo.png" alt="logo"/>
            </Navbar.Brand>
            {/* hrefでコードの見た目良くできるけど、イベント登録ページでのAPIでエラーが起きるのでonClickを使う。 */}
            
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse className="justify-content-end">
                {/* <Nav>
                    <Nav.Item>
                        <Nav.Link onClick={ handleClickToEventsPage }>イベント一覧</Nav.Link>
                    </Nav.Item>
                </Nav> */}
                <NavDropdown id="map-or-list" title={props.mapOrList}>
                    <NavDropdown.Item onSelect={()=>props.setMapOrList("Mapで表示")}>Mapで表示</NavDropdown.Item>
                    <NavDropdown.Item onSelect={()=>props.setMapOrList("一覧で表示")}>一覧で表示</NavDropdown.Item>
                </NavDropdown>
                <Nav>
                    {(()=>{
                        if (ownerData.isLoggedIn || userData.isLoggedIn){
                            return (
                                <Nav.Item>
                                    <Nav.Link onClick={() => {
                                        if (ownerData.isLoggedIn === true) {
                                            handleClickToOwnerMypage(ownerData.id);
                                        } else if (userData.isLoggedIn === true) {
                                            handleClickToUserMypage(userData.id);
                                        }
                                    }} 
                                    >
                                        マイページ
                                    </Nav.Link>
                                </Nav.Item>
                            )
                        } else { //注意：後でここの前にelseifでユーザーマイページも入れる。
                            return (
                                <Nav.Item>
                                    <Nav.Link onClick={ handleClickToLoginPage } >ログイン/新規登録</Nav.Link>
                                </Nav.Item>
                            )
                        }
                    })()}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default withRouter(Header);