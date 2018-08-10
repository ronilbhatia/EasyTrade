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
        <main className="user-home">
          <PortfolioChart currentUser={currentUser} balance={parseFloat(5400.00)}/>
          <aside className="stock-dashboard">
            PLACEHOLDER TEXT
          </aside>
        </main>
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
