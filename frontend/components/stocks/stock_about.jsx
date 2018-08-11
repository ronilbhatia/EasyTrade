import React from 'react';

class StockAbout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStockInfo(this.props.stock.ticker)
      .then(res => this.setState({ stock: res.stockInfo }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stock.shortDescription) {
      this.state.stock = nextProps.stock;
    }
  }

  renderShortDescription() {
    let shortDescription = this.state.stock.short_description;
    shortDescription = shortDescription.split(".").slice(0, 3).join(".");
    return (
      <p className="stock-short-description">
        {shortDescription}.
      </p>
    );
  }

  render() {
    let stock;
    if (this.state) { stock  = this.state.stock; }
    return (
      <div className="stock-about">
        <h2>About</h2>
        {
          stock ? (
            <div>
              {this.renderShortDescription()}
              <ul className="stock-facts">
                <li>
                  <h3>CEO</h3>
                  <h4>{this.state.stock.ceo}</h4>
                </li>
                <li>
                  <h3>Employees</h3>
                  <h4>{this.state.stock.employees}</h4>
                </li>
                <li>
                  <h3>Headquarters</h3>
                  <h4>{this.state.stock.hq_address_city}, {this.state.stock.hq_state}</h4>
                </li>
                <li>
                  <h3>Founded</h3>
                  <h4>1976</h4>
                </li>
              </ul>
              <ul className="stock-facts">
                <li>
                  <h3>Market Cap</h3>
                  <h4>1976</h4>
                </li>
                <li>
                  <h3>Price-Earnings Ratio</h3>
                  <h4>1976</h4>
                </li>
                <li>
                  <h3>Dividend Yield</h3>
                  <h4>1976</h4>
                </li>
                <li>
                  <h3>Average Volume</h3>
                  <h4>1976</h4>
                </li>
              </ul>
            </div>
          ) : (
            <p>
              LOADING
            </p>
          )
        }

      </div>
    );
  };
}

export default StockAbout;
