import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NavBar from '../nav_bar/nav_bar';
import Splash from './splash';
import NewsIndexContainer from './news_index_container';
import PortfolioChart from '../charts/portfolio_chart';
import StockIndex from '../stocks/stock_index';

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
    let balance, balanceData, dailyData, monthData, openBalance, balances, max, min, balanceFlux, balanceFluxPercentage;
    if (currentUser) {
      balance = currentUser.balance;
      balanceData = currentUser.balanceData.reverse();
      dailyData = currentUser.dailyData;
      if (dailyData.length == 0) {
        openBalance = balance;
        balanceFlux = 0;
        balanceFluxPercentage = 0;
        max = 0;
        min = 0;
      } else {
        if (dailyData[0]) { openBalance = dailyData[0].balance;}
        balances = [];
        for (let i = 0; i < dailyData.length; i++) {
          balances.push(parseFloat(dailyData[i].balance));
        }
        max = Math.max(...balances);
        min = Math.min(...balances);
        balanceFlux = Math.round((balance - openBalance) * 100)/100;
        balanceFluxPercentage = Math.round((balanceFlux/openBalance)*10000)/100;
      }
    }

    const display = currentUser ? (
      <div>
        <NavBar currentUser={currentUser} logout={logout}/>
        <section className="user-home">
          <main>
            <PortfolioChart
              currentUser={currentUser}
              balance={balance}
              balanceData={balanceData}
              dailyData={dailyData}
              data={dailyData}
              max={max}
              min={min}
              balanceFlux={balanceFlux}
              balanceFluxPercentage={balanceFluxPercentage}
            />
            <NewsIndexContainer />
          </main>
          <aside className="stock-dashboard">
            <h4>Stocks</h4>
            <StockIndex currentUser={currentUser} />
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
