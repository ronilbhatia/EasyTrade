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
      <p>
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
            <div className="stock-short-description">
              {this.renderShortDescription()}
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
