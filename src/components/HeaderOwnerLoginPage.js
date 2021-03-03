//Component
// import {useState} from 'react';
import {Navbar} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

function HeaderOwnerLoginPage (props){

    const handleClickToOwnerLoginPage = () => {
        props.history.push("/ownerlogin");
    }

    return(
        <Navbar className="bootstrap-navbar" expand="md" fixed="top">
            <Navbar.Brand href="/" > <img src="../logo.png" alt="logo"/> </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Brand>イベントオーナー専用ログインページ</Navbar.Brand>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default withRouter(HeaderOwnerLoginPage);