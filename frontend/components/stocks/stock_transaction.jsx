import React from 'react';

class StockTransaction extends React.Component {
  constructor(props) {
    super(props);
    let { stock } = this.props;
    const intradayData = stock.intradayData;

    // Grab most recent price available by iterating backwards through intradayData until value other than -1 is returned
    let currPrice = this.props.stock.openPrice;
    for (let i = intradayData.length - 1; i > 0; i--) {
      if (intradayData[i].average !== -1) {
        currPrice = Math.round(intradayData[i].average * 100) / 100;
        break;
      }
    }
    this.state = {
      ticker: stock.ticker,
      num_shares: '',
      order_type: 'buy',
      cost: '0.00',
      currPrice,
      submitted: ''
    };
    this.update = this.update.bind(this);
    this.updateType = this.updateType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(e) {
    this.setState({ num_shares: e.target.value });
    this.updateCost(e.target.value);
  }

  updateCost(num_shares) {
    if (num_shares === '') {
      num_shares = '0';
      this.setState({ cost: '0.00' });
    } else {
      let cost = Math.round((parseFloat(num_shares) * parseFloat(this.state.currPrice)) * 100) / 100;
      this.setState({ cost });
    }
  }

  updateType(order_type) {
    this.setState({ order_type });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });

    let { ticker, num_shares, order_type, currPrice } = this.state;
    let transaction = {
      ticker,
      num_shares: parseInt(num_shares),
      order_type,
      price: currPrice
    };

    this.props.createTransaction(transaction)
      .fail(() => this.setState({ submitted: '' }));
  }

  renderSellButton() {
    const { currentUser, stock } = this.props
    if (currentUser.stocks.find(el => el.symbol === stock.ticker && el.shares > 0)) {
      return <a className={this.state.order_type === 'sell' ? 'active' : ''} onClick={() => this.updateType('sell')}>Sell {`${stock.ticker}`}</a>;
    }
    return null;
  }

  renderLimit() {
    const { currentUser, stock } = this.props;
    let shares = 0;
    for (let i = 0; i < currentUser.stocks.length; i++) {
      let currStock = currentUser.stocks[i];
      if (currStock.symbol === stock.ticker) {
        shares = currStock.shares;
        break;
      }
    }
    return this.state.order_type === 'buy' ? (
      <div className="buying-power">
        <h4>${currentUser.buyingPower.formatMoney()} Buying Power Available</h4>
      </div>
    ) : (
        <div className="buying-power">
          <h4>{shares} Shares Available</h4>
        </div>
      );
  }

  render() {
    const { stock, currentUser, errors } = this.props;
    const intradayData = stock.intradayData;

    return (
      <aside className="stock-transaction">
        <h3>
          <a className={this.state.order_type === 'buy' ? 'active' : ''} onClick={() => this.updateType('buy')}>Buy {`${stock.ticker}`}</a>
          {this.renderSellButton()}
        </h3>
        <form onSubmit={this.handleSubmit}>
          <div className='transaction-shares'>
            <h4>Shares</h4>
            <input type='text' placeholder='0' value={this.state.num_shares} onChange={this.update} />
          </div>
          <div className='transaction-price'>
            <h4>Market Price</h4>
            <p>${this.state.currPrice.formatMoney()}</p>
          </div>
          <div className='transaction-cost'>
            <h4>Estimated Cost</h4>
            <p>${parseFloat(this.state.cost).formatMoney()}</p>
          </div>
          <div className='transaction-errors'>
            <ul>
              {
                errors.map((error, idx) => <li key={idx}><img src={window.images.exclamation_circle} />{error}</li>)
              }
            </ul>
          </div>
          <div className='transaction-submit'>
            <input
              type="submit"
              value={`SUBMIT ${this.state.order_type.toUpperCase()}`}
              disabled={this.state.submitted}
            />
          </div>
        </form>
        {this.renderLimit()}
      </aside>
    );
  }
}

export default StockTransaction;