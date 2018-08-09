import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NavBar from '../nav_bar/nav_bar';
import Splash from './splash';
import PortfolioChart from '../charts/portfolio_chart';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser, logout, demoLogin } = this.props;
    const demoUser = {
      username: 'user',
      password: 'testing'
    };
    const display = currentUser ? (
      <div>
        <NavBar currentUser={currentUser} logout={logout}/>
        <PortfolioChart currentUser={currentUser}/>
      </div>
    ) : (
      <div>
        <NavBar currentUser={currentUser} demoLogin={demoLogin} demoUser={demoUser}/>
        <Splash demoLogin={demoLogin} demoUser={demoUser}/>
      </div>
    );
    return (
      <div>
        {display}
      </div>
    );
  }
}

export default Home;
