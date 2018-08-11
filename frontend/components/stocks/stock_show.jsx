import React from 'react';
import NavBar from '../nav_bar/nav_bar';
import StockChart from '../charts/stock_chart';
import StockAbout from '../stocks/stock_about';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStock(this.props.match.params.ticker)
      .then(res => this.setState({ stock: res.stock }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.ticker !== this.props.match.params.ticker) {
      this.props.fetchStock(nextProps.match.params.ticker);
    }
  }

  refreshStock(res) {
    this.setState({ stock: res.data.user });
  }

  render() {
    const { currentUser, logout, fetchStockInfo } = this.props;
    let stock;
    if (this.state) { stock = this.state.stock;}
    console.log(this.state);
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
