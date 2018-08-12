import React from 'react';
import NavBar from '../nav_bar/nav_bar';
import StockChart from '../charts/stock_chart';
import StockAbout from '../stocks/stock_about';

class StockShow extends React.Component {
  componentDidMount() {
    const ticker = this.props.match.params.ticker;
    Promise.all([
      this.props.fetchStock(ticker),
      this.props.fetchStockInfo(ticker),
      this.props.fetchStockIntradayData(ticker)
    ]);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.ticker !== this.props.match.params.ticker) {
      const ticker = nextProps.match.params.ticker;
      Promise.all([
        this.props.fetchStock(ticker),
        this.props.fetchStockInfo(ticker),
        this.props.fetchStockIntradayData(ticker)
      ]);
    }
  }

  render() {
    const { stock, currentUser, logout, fetchStockInfo } = this.props;
    return (
      <div>
        <NavBar currentUser={currentUser} logout={logout}/>
          {stock ? (
            <section className="stock-show">
              <main>
                <StockChart stock={stock} currentUser={currentUser} balance={parseFloat(5400.00)}/>
                <StockAbout stock={stock} fetchStockInfo={fetchStockInfo}/>
              </main>
              <aside className="stock-dashboard">
                PLACEHOLDER TEXT
              </aside>
            </section>
          ) : (
            <h1>LOADING</h1>
          )}
      </div>
    );
  }
}

export default StockShow;
