import React from 'react';
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';
import HomeContainer from './Home/Home_container';
import StockShowContainer from './stocks/stock_show_container';
import UserProfileContainer from './users/user_profile_container';
import StockHistoryContainer from './transactions/stock_history_container';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path='/signup' component={SignupFormContainer} />
      <AuthRoute exact path='/login' component={LoginFormContainer} />
      <ProtectedRoute exact path="/stocks/:ticker" component={StockShowContainer}/>
      <ProtectedRoute exact path="/users/:id" component={UserProfileContainer} />
      <ProtectedRoute exact path="/history/:ticker" component={StockHistoryContainer} />
      <Route exact path='/' component={HomeContainer} />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;
