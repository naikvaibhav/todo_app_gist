import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import LoginCard from '../components/LoginCard'
import Axios from 'axios'
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";
import { BASE_URL } from "../environment";

const Login = ({ match, location }) => {
    const history = useHistory();
    const {
        authTokens,
        setAuthTokens,
        setIsloggedStatus,
        IsloggedStatus,
        setUserDetails,
        userDetails
      } = useAuth(); 

      useEffect(()=>{
          const url = window.location.href;
          const hasCode = url.includes('?code=');

          //Git hub returns the code parameter
          if(hasCode){
            const newUrl = url.split('?code=');

            const requestData = {
                code: newUrl[1]
            }

            Axios({
            method: "get",
            url: `${BASE_URL}/oauth-callback?code=${newUrl[1]}`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            mode: "cors"
          }).then(({data})=>{
              setAuthTokens(data.data.jwttoken);
              setUserDetails(data.data);
              setIsloggedStatus(true);
          }).catch((error) => {
            console.log(error);
          });
          }
        //   let params = new URLSearchParams(location.search);
        //   console.log('getGitHubToken', JSON.stringify(location.search))
      },[])


    const _handleLogin = () => {
        if(!IsloggedStatus){
        const clientId = process.env.REACT_APP_CLIENT_ID;
        console.log(process.env.REACT_APP_CLIENT_ID)
        const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist`
        window.open(url, "_self");
        }else{
            console.log('called else', IsloggedStatus)
            history.push('/home');
        }
    //   fetch(`${BASE_URL}/oauth-callback`, {method: 'GET'}, {mode: "no-cors"})
    //   .then((response) => response.json())
    //   .then((data) => console.log('This is your data', data));
    }
    
    return(
        <>
        <h3 className='text-center pt-4 mb-0 pb-0'>Welcome!! to the Todo app, manage your daily task to be more efficient...</h3>
        <div className='loginCard' style={{marginLeft: 'auto', marginRight: 'auto'}}>
        <LoginCard loginTriggered = {_handleLogin}/>
        </div>
        </>
    )
}

export default Login