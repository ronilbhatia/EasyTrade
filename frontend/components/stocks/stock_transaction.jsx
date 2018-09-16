import React from 'react';

class StockTransaction extends React.Component {
  constructor(props) {
    super(props);
    let { stock } = this.props
    const intradayData = stock.intradayData;
    let mostRecentTime = Object.keys(intradayData)[0];
    let currPrice = intradayData[mostRecentTime]['4. close'];
    currPrice = currPrice.split('').splice(0, currPrice.length - 2).join('');
    this.state = {
      stock_id: stock.id,
      num_shares: '',
      order_type: 'buy',
      cost: '0.00',
      currPrice
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
      this.setState({ cost: '0.00'});
    } else {
      let cost = Math.round((parseFloat(num_shares) * parseFloat(this.state.currPrice)) * 100)/100;
      this.setState({ cost });
    }
  }

  updateType(order_type) {
    this.setState({ order_type });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { stock_id, num_shares, order_type, currPrice } = this.state;
    let transaction = {
      stock_id,
      num_shares: parseInt(num_shares),
      order_type,
      price: currPrice
    };
    debugger
    this.props.createTransaction(transaction);
  }

  render() {
    const { stock, currentUser } = this.props;
    const intradayData = stock.intradayData;
    let mostRecentTime = Object.keys(intradayData)[0];
    let currPrice = intradayData[mostRecentTime]['4. close'];
    currPrice = currPrice.split('').splice(0, currPrice.length - 2).join('');
    return (
      <aside className="stock-transaction">
        <h3>
          <a className={this.state.order_type === 'buy' ? 'active' : ''} onClick={() => this.updateType('buy')}>Buy {`${stock.ticker}`}</a>
          <a className={this.state.order_type === 'sell' ? 'active' : ''} onClick={() => this.updateType('sell')}>Sell {`${stock.ticker}`}</a>
        </h3>
        <form onSubmit={this.handleSubmit}>
          <div className='transaction-shares'>
            <h4>Shares</h4>
            <input type='text' placeholder='0' value={this.state.num_shares} onChange={this.update}/>
          </div>
          <div className='transaction-price'>
            <h4>Market Price</h4>
            <p>${currPrice}</p>
          </div>
          <div className='transaction-cost'>
            <h4>Estimated Cost</h4>
            <p>${this.state.cost}</p>
          </div>
          <div className='transaction-submit'>
            <input type="submit" value={`SUBMIT ${this.state.order_type.toUpperCase()}`} />
          </div>
        </form>
        <div className="buying-power">
          <h4>${currentUser.buyingPower} Buying Power Available</h4>
        </div>
      </aside>
    );
  }
}

export default StockTransaction;
