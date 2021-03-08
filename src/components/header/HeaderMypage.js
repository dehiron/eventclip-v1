//Component
// import {useState} from 'react';
import {Navbar} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

function HeaderMypage (props){

    return(
        <Navbar className="bootstrap-navbar" expand="md" fixed="top">
            <Navbar.Brand href="/" >
                <img src="/logo.png" alt="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Brand>マイページ</Navbar.Brand>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default withRouter(HeaderMypage);