import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Header from './components/Header';
import Routes from './routes'
import { AuthContext } from "./context/auth";
import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faEdit, faPencilAlt, faSignOutAlt, faFolderPlus, faFileExport,faFileUpload } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash, faPlus, faEdit, faPencilAlt, faSignOutAlt, faFolderPlus, faFileExport, faFileUpload)



const App = () => {
  const existingTokens = localStorage.getItem("todo_app_token");
  const existingUserDetails = JSON.parse(
  localStorage.getItem("todo_app_userDetails"),
  );
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [IsloggedStatus, setIsloggedStatus] = useState(false);
  const [userDetails, setUserDetails] = useState(existingUserDetails);
  const setTokens = (data) => {
  localStorage.setItem("todo_app_token", data);
  setAuthTokens(data);
  };
  const setDetails = (data) => {
  localStorage.setItem("todo_app_userDetails", JSON.stringify(data));
  setUserDetails(data);
  };

  const setLoggedIn = (loginData) => {
  setIsloggedStatus(loginData);
  };

  return (
    <AuthContext.Provider
        value={{
          authTokens,
          setAuthTokens: setTokens,
          IsloggedStatus,
          setIsloggedStatus: setLoggedIn,
          userDetails,
          setUserDetails: setDetails,
        }}
      >
    <Router basename="/">
    <Header/>
    <main className="py-3">
    <Container>
    <Routes/>
    </Container>
    </main>
    </Router>
    </AuthContext.Provider>
  )
}

export default App;
