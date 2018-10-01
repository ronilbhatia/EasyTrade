import React from 'react';
import NavBar from '../nav_bar/nav_bar';
import NewsIndexContainer from './news_index_container';
import PortfolioChart from '../charts/portfolio_chart';
import StockIndex from '../stocks/stock_index';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.currentUser
    };
  }

  componentDidMount() {
    if (this.props) {
      let user = this.props.currentUser;
      this.props.fetchUserInfo(this.state.user);
    }
  }

  render() {
    const { logout, fetchUserInfo } = this.props;
    const { user } = this.state;
    let balance, balanceData, dailyData, monthData, openBalance, balances, max, min, balanceFlux, balanceFluxPercentage;
    let neg = "+";
    if (user && user.hasOwnProperty('balanceData') && user.hasOwnProperty('balance') && user.hasOwnProperty('dailydata')) {
      balance = user.balance;
      balanceData = user.balanceData;
      let time = new Date;
      balanceData.push({ time: time.toLocaleDateString(), balance })
      dailyData = user.dailyData;
      if (dailyData.length == 0) {
        openBalance = balance;
        balanceFlux = '0.00';
        balanceFluxPercentage = '0.00';
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
        if (balanceFlux < 0) { neg = "-" ;}
      }
      return (
        <div>
          <NavBar currentUser={user} logout={logout}/>
          <section className="user-home">
            <main>
              <PortfolioChart
                currentUser={user}
                balance={balance}
                openBalance={openBalance}
                balanceData={balanceData}
                dailyData={dailyData}
                data={dailyData}
                max={max}
                min={min}
                neg={neg}
                balanceFlux={balanceFlux}
                balanceFluxPercentage={balanceFluxPercentage}
                />
              <NewsIndexContainer />
            </main>
            <aside className="stock-dashboard">
              <h4>Stocks</h4>
              <StockIndex currentUser={user} />
            </aside>
          </section>
        </div>
      );
    } else {
      return (
        <div>
          LOADING
        </div>
      )
    }

  }
}

export default UserHome;
