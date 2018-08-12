import React from 'react';

class StockAbout extends React.Component {

  renderShortDescription() {
    let shortDescription = this.props.stock.shortDescription;
    shortDescription = shortDescription.split(".").slice(0, 3).join(".");
    return (
      <p className="stock-short-description">
        {shortDescription}.
      </p>
    );
  }

  render() {
    const { stock } = this.props;
    return (
      <div className="stock-about">
        <h2>About</h2>
        {
          (Object.keys(this.props.stock).length > 4) ? (
            <div>
              {this.renderShortDescription()}
              <ul className="stock-facts">
                <li>
                  <h3>CEO</h3>
                  <h4>{stock.ceo}</h4>
                </li>
                <li>
                  <h3>Employees</h3>
                  <h4>{stock.employees}</h4>
                </li>
                <li>
                  <h3>Headquarters</h3>
                  <h4>{stock.hqCity}, {stock.hqState}</h4>
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
