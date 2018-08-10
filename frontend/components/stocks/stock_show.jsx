import React from 'react';
import NavBar from '../nav_bar/nav_bar';
import PortfolioChart from '../charts/portfolio_chart';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    this.props.fetchStock(this.props.match.params.ticker);
  }

  render() {
    const { stock, currentUser, logout } = this.props;
    return (
      <div>
        <NavBar currentUser={currentUser} logout={logout}/>
        <main className="stock-show">
          {stock ? (
            <h1>{this.props.stock.ticker}</h1>
          ) : (
            <h1>STOCK SHOW</h1>
          )}
          <PortfolioChart currentUser={currentUser} balance={parseFloat(5400.00)}/>
        </main>
      </div>
    );
  }
}

export default StockShow;
