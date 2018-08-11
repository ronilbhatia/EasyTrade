import React from 'react';
import NavBar from '../nav_bar/nav_bar';
import StockChart from '../charts/stock_chart';
import StockAbout from '../stocks/stock_about';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    this.props.fetchStock(this.props.match.params.ticker);
    this.props.fetchStockInfo(this.props.match.params.ticker);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.ticker !== this.props.match.params.ticker) {
      this.props.fetchStock(nextProps.match.params.ticker);
    }
  }

  render() {
    const { stock, currentUser, logout } = this.props;
    return (
      <div>
        <NavBar currentUser={currentUser} logout={logout}/>
          {stock ? (
            <section className="stock-show">
              <main>
                <StockChart stock={stock} currentUser={currentUser} balance={parseFloat(5400.00)}/>
                <StockAbout stock={stock} />
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
