import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NavBar from '../nav_bar/nav_bar';
import Splash from './splash';
import NewsIndexContainer from './news_index_container';
import PortfolioChart from '../charts/portfolio_chart';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser, logout, demoLogin, fetchNews } = this.props;
    const demoUser = {
      username: 'user',
      password: 'testing'
    };
    const display = currentUser ? (
      <div>
        <NavBar currentUser={currentUser} logout={logout}/>
        <section className="user-home">
          <main>
            <PortfolioChart currentUser={currentUser}/>
            <NewsIndexContainer />
          </main>
          <aside className="stock-dashboard">
            <h4>Stocks</h4>
            <ul>
              {
                Object.keys(currentUser.stocks).map(stock => {
                  return (
                    <h4>{stock} {currentUser.stocks[stock]}</h4>
                  );
                })
              }
            </ul>
          </aside>
        </section>
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
