import React from 'react';
import NavBar from '../nav_bar/nav_bar';
import StockChart from '../charts/stock_chart';
import StockAbout from './stock_about';
import StockNews from './stock_news';
import StockTransaction from './stock_transaction';

class StockShow extends React.Component {
  componentDidMount() {
    const ticker = this.props.match.params.ticker;
    this.props.fetchStock(ticker);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.ticker !== this.props.match.params.ticker) {
      const ticker = nextProps.match.params.ticker;
      this.props.fetchStock(ticker);
    }
  }

  render() {
    const { stock, currentUser, logout } = this.props;
    return (
      <div>
        <NavBar currentUser={currentUser} logout={logout}/>
          {stock && stock.hasOwnProperty('shortDescription') && stock.hasOwnProperty('intradayData') && stock.hasOwnProperty('dailyData') && stock.hasOwnProperty('news') ? (
            <section className="stock-show">
              <main>
                <StockChart stock={stock} />
                <StockAbout stock={stock} />
                <StockNews news={stock.news} />
              </main>
              <StockTransaction stock={stock} />
            </section>
          ) : (
            <h1>LOADING</h1>
          )}
      </div>
    );
  }
}

export default StockShow;
