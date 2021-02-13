import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, MenuItem, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from "react-router-dom";

import { useAuth } from "../context/auth"
const Header = () => {
    const history = useHistory();
    const {
        authTokens,
        setAuthTokens,
        setIsloggedStatus,
        IsloggedStatus,
        setUserDetails,
        userDetails
      } = useAuth(); 


    return(
        <header>
            <Navbar className='colors-nav' variant='dark' expand="lg" collapseOnSelect>
            <Container>
            <LinkContainer to='/'>
                <Navbar.Brand>Todo App</Navbar.Brand>
            </LinkContainer>
            </Container>

           { authTokens && ( <div>
            <Nav>
            <NavDropdown
                title={
                    <div className="pull-left">
                        <img className="rounded-circle"
                            src={userDetails?.avatar} 
                            alt="user pic"
                            width="34"
                            height="34"
                        />{' '}Vaibhav Naik
                    </div>
                } 
                id="basic-nav-dropdown">
                <NavDropdown.Item 
                onClick={() => {
                  localStorage.clear();
                  history.push('/');
                  setAuthTokens('')
                  setUserDetails('')
                  setIsloggedStatus('')
                  window.location.reload();
                }}>
                <FontAwesomeIcon icon="sign-out-alt"></FontAwesomeIcon> Logout
                </NavDropdown.Item>
            </NavDropdown>
            </Nav>
            </div>)}
            </Navbar>
        </header>
    )
}


export default Header