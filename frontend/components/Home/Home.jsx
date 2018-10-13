import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NavBar from '../nav_bar/nav_bar';
import Splash from './splash';
import NewsIndexContainer from './news_index_container';
import PortfolioChart from '../charts/portfolio_chart';
import StockIndex from '../stocks/stock_index';
import Footer from '../footer/footer';
import { css } from 'react-emotion';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.currentUser && nextProps.currentUser) {
      this.props.fetchUserInfo(nextProps.currentUser);
    }
  }

  render() {
    const { currentUser, logout, demoLogin, fetchNews } = this.props;
    const demoUser = {
      username: 'user',
      password: 'testing'
    };
    let balance, balanceData, dailyData, monthData, openBalance, balances, max, min, balanceFlux, balanceFluxPercentage;
    let neg = "+";
    if (currentUser && currentUser.hasOwnProperty('balanceData')) {
      balance = currentUser.balance;
      balanceData = currentUser.balanceData;
      let time = new Date;
      balanceData.push({ time: time.toLocaleDateString(), balance })
      dailyData = currentUser.dailyData;
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
        // if (neg === '-') {
        //   document.getElementsByTagName('body')[0].className = 'negative';
        // } else {
        //   document.getElementsByTagName('body')[0].className = '';
        // }
      }
    }

    const display = currentUser ? (
      currentUser.hasOwnProperty('balanceData') ? (
        <div>
          <NavBar currentUser={currentUser} logout={logout}/>
          <section className="user-home">
            <main>
              <PortfolioChart
                currentUser={currentUser}
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
              <StockIndex currentUser={currentUser} />
            </aside>
          </section>
          <Footer />
        </div>
      ) : (
        <div className='stock-loading'>
          <BeatLoader
            className={override}
            sizeUnit={"px"}
            size={20}
            color={'#21ce99'}
            loading={true}
          />
        </div>
      )
    ) : (
      <div>
        <NavBar currentUser={currentUser} demoLogin={demoLogin} demoUser={demoUser}/>
        <Splash demoLogin={demoLogin} demoUser={demoUser}/>
        <Footer />
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
