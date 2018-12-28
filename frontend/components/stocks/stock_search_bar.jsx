import React from 'react';
import { NavLink } from 'react-router-dom';

class StockSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: "",
      hidden: false
    };
    this.renderStocks = this.renderStocks.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addHiddenClass = this.addHiddenClass.bind(this);
    this.removeHiddenClass = this.removeHiddenClass.bind(this);
  }

  componentDidMount() {
    if (!this.props.allStocks) {
      this.props.fetchStocks();
    }
  }

  renderStocks() {
    const { allStocks } = this.props;
    let stocks;
    if (allStocks && this.state.inputVal.length > 0) {
      stocks = allStocks.filter( (stock) => {
        return (stock.ticker.toLowerCase().includes(this.state.inputVal.toLowerCase()) || stock.name.toLowerCase().includes(this.state.inputVal.toLowerCase()));
      }).slice(0, 6);
      return (
        <ul className={this.state.hidden ? "search-res hide" : "search-res"}>
          <h4 key="header">Stocks</h4>
          {
            stocks.map( (stock, idx) => {
              return (
                <li key={stock.id} className="search-res-item" onClick={this.addHiddenClass}>
                  <NavLink key={stock.id} to={`/stocks/${stock.ticker}`}>
                    <p className='search-ticker'>{stock.ticker}</p>
                    <p className='search-name'>{stock.name}</p>
                  </NavLink>
                </li>
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

  addHiddenClass() {
    this.setState({ hidden: true });
  }

  removeHiddenClass() {
    this.setState({ hidden: false });
  }

  render() {
    return (
      <div className='stock-search'>
        <div className='search-bar' onClick={this.removeHiddenClass}>
          <i className='fas fa-search'></i>
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
