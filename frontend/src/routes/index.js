import React from 'react';
// import { Switch, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Login from '../pages/Login'
import Home from '../pages/Home'
import TodoList from '../pages/TodoList'

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/home" component={Home} isPrivate/>
      <Route path="/todolist/:projectId" component={TodoList} isPrivate/>
        {/* Redirect to login page if none of the routes match */}
      <Route component={Login} />
    </Switch>
  );
}