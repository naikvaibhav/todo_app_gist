import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "../context/auth";


export default function RouteWrapper({ 
    component: Component, 
    isPrivate, 
    ...rest 
  }) {

    const existingTokens = localStorage.getItem("todo_app_token");
    const existingUserDetails = JSON.parse(localStorage.getItem("todo_app_userDetails"));

    const {
      authTokens,
      setAuthTokens,
      setIsloggedStatus,
      IsloggedStatus,
      setUserDetails,
    } = useAuth(); 
  
    const signed = existingTokens ? true : false; 
  
    /**    
    * Redirect user to SignIn page if he tries to access a private      route
    * without authentication.    
    */   
    if (isPrivate && !signed) {     
      return <Redirect to="/" />;   
    }      /**    
    * Redirect user to Main page if he tries to access a non private route    
    * (SignIn or SignUp) after being authenticated.    
    */   
    if (!isPrivate && signed) {     
      return <Redirect to="/home" />;   
    }    
  
    /**    
    * If not included on both previous cases, redirect user to the desired route.    
    */   
    return <Route {...rest} component={Component} />; 
  }

  RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
      .isRequired,
  };
  
  RouteWrapper.defaultProps = {
    isPrivate: false,
  };