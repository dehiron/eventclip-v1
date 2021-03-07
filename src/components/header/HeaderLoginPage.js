//Component
// import {useState} from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

function HeaderLoginPage (props){

    const handleClickToOwnerLoginPage = () => {
        props.history.push("/ownerlogin");
    }

    return(
        <Navbar className="bootstrap-navbar" expand="md" fixed="top">
            <Navbar.Brand href="/" >
                <img src="/logo.png" alt="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Item>
                        <Nav.Link onClick={ handleClickToOwnerLoginPage }>イベントオーナーの方はこちら</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        
    )
};

export default withRouter(HeaderLoginPage);