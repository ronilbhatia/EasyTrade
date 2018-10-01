import React from 'react';
import { NavLink } from 'react-router-dom';

class StockSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
    };
    this.renderStocks = this.renderStocks.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.props.fetchStocks();
  }

  renderStocks() {
    const { allStocks } = this.props;
    let stocks;
    if (allStocks && this.state.inputVal.length > 0) {
      stocks = allStocks.filter( (stock) => {
        return (stock.ticker.toLowerCase().includes(this.state.inputVal.toLowerCase()) || stock.name.toLowerCase().includes(this.state.inputVal.toLowerCase()));
      }).slice(0, 6);
      return (
        <ul className="search-res">
          <h4>Stocks</h4>
          {
            stocks.map( (stock, idx) => {
              return (
                <NavLink key={stock.id} to={`/stocks/${stock.ticker}`}>
                  <li key={idx} className="search-res-item">
                    <p className='search-ticker'>{stock.ticker}</p>
                    <p className='search-name'>{stock.name}</p>
                  </li>
                </NavLink>
              );
            })
          }
        </ul>
      );
    } else {
      return (
        <div></div>
      );
    }

  }

  // toggleOff() {
  //   let ul = document.getElementsByClassName('search-res');
  //   ul.addClass
  // }

  handleInput(e) {
    const inputVal = e.target.value;
    this.setState({ inputVal });
  }

  render() {
    return (
      <div className='stock-search'>
        <div className='search-bar'>
          <i class='fas fa-search'></i>
          <input
            type="text"
            placeholder="Search"
            onChange={this.handleInput.bind(this)}
            />
        </div>
        {this.renderStocks()}
      </div>
    );
  }
}

export default StockSearchBar;
