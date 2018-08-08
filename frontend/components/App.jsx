import React from 'react';
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';
import MainContainer from './Main_container';
import StockIndex from './stocks/stock_index';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path='/signup' component={SignupFormContainer} />
      <AuthRoute exact path='/login' component={LoginFormContainer} />
      <ProtectedRoute exact path="/stocks" component={StockIndex}/>
      <Route exact path='/' component={MainContainer} />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;
