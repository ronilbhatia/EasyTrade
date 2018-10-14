import React from 'react';

class StockAbout extends React.Component {

  renderShortDescription() {
    let shortDescription = this.props.stock.shortDescription;
    // shortDescription = shortDescription.split(".").slice(0, 3).join(".");
    return (
      <p className="stock-short-description">
        {shortDescription}
      </p>
    );
  }

  renderLargeNum(largeNum) {
    if (largeNum < 1000000) {
      return <h4>{(largeNum/1000).formatMoney()}K</h4>
    } else if (largeNum < 1000000000) {
      return <h4>{(largeNum/1000000).formatMoney()}M</h4>
    } else if (largeNum < 1000000000000) {
      return <h4>{(largeNum/1000000000).formatMoney()}B</h4>
    } else {
      return <h4>{(largeNum/1000000000000).formatMoney()}T</h4>
    }
  }

  toggleShow() {
    let extraList = document.getElementsByClassName('stock-facts')[2];
    let button = document.getElementsByClassName('show-toggle')[0];
    debugger
    if (extraList.classList[1]) {
      extraList.classList = "stock-facts";
      button.textContent = "Show Less";
    } else {
      extraList.classList = "stock-facts hidden";
      button.textContent = "Show More";
    }
  }

  render() {
    const { stock } = this.props;
    return (
      <div className="stock-about">
        <div className="header">
          <h2>About</h2>
          <h3 className="show-toggle" onClick={this.toggleShow}>Show More</h3>
        </div>
        {
          (Object.keys(stock).length > 4) ? (
            <div>
              {this.renderShortDescription()}
              <ul className="stock-facts">
                <li>
                  <h3>CEO</h3>
                  <h4 className='ceo'>{stock.ceo}</h4>
                </li>
                <li>
                  <h3>Sector</h3>
                  <h4>{stock.sector}</h4>
                </li>
                <li>
                  <h3>Industry</h3>
                  <h4>{stock.industry}</h4>
                </li>
                <li>
                  <h3>Exchange</h3>
                  <h4>{stock.exchange}</h4>
                </li>
              </ul>
              <ul className="stock-facts">
                <li>
                  <h3>Market Cap</h3>
                  {this.renderLargeNum(stock.marketCap)}
                </li>
                <li>
                  <h3>Price-Earnings Ratio</h3>
                  <h4>{stock.peRatio}</h4>
                </li>
                <li>
                  <h3>Average Volume</h3>
                  {this.renderLargeNum(stock.averageVolume)}
                </li>
                <li>
                  <h3>Open Price</h3>
                  <h4>${stock.openPrice.formatMoney()}</h4>
                </li>
              </ul>
              <ul className="stock-facts hidden">
                <li>
                  <h3>High Today</h3>
                  <h4>${stock.high.formatMoney()}</h4>
                </li>
                <li>
                  <h3>Low Today</h3>
                  <h4>${stock.low.formatMoney()}</h4>
                </li>
                <li>
                  <h3>52 Week High</h3>
                  <h4>${stock.yearHigh.formatMoney()}</h4>
                </li>
                <li>
                  <h3>52 Week Low</h3>
                  <h4>${stock.yearLow.formatMoney()}</h4>
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
  }
}

export default StockAbout;
