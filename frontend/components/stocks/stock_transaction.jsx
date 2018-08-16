import React from 'react';

class StockTransaction extends React.Component {
  constructor(props) {
    super(props);
    const intradayData = this.props.stock.intradayData;
    let mostRecentTime = Object.keys(intradayData)[0];
    let currPrice = intradayData[mostRecentTime]['4. close'];
    currPrice = currPrice.split('').splice(0, currPrice.length - 2).join('');
    this.state = {
      shares: '',
      type: 'buy',
      cost: '0.00',
      currPrice
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(e) {
    this.setState({ shares: e.target.value });
    this.updateCost(e.target.value);
  }

  updateCost(shares) {
    if (shares === '') {
      shares = '0';
      this.setState({ cost: '0.00'});
    } else {
      let cost = Math.round((parseFloat(shares) * parseFloat(this.state.currPrice)) * 100)/100;
      this.setState({ cost });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { stock } = this.props;
    const intradayData = stock.intradayData;
    let mostRecentTime = Object.keys(intradayData)[0];
    let currPrice = intradayData[mostRecentTime]['4. close'];
    currPrice = currPrice.split('').splice(0, currPrice.length - 2).join('');
    return (
      <aside className="stock-transaction">
        <h3>
          <a>Buy {`${stock.ticker}`}</a>
          <a>Sell {`${stock.ticker}`}</a>
        </h3>
        <form onSubmit={this.handleSubmit}>
          <div className='transaction-shares'>
            <h4>Shares</h4>
            <input type='text' placeholder='0' value={this.state.shares} onChange={this.update}/>
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
            <input type="submit" value={`SUBMIT ${this.state.type.toUpperCase()}`} />
          </div>
        </form>
      </aside>
    );
  }
}

export default StockTransaction;
