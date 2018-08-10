import React from 'react';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    this.props.fetchStock(this.props.match.params.ticker);
  }

  render() {
    const { stock } = this.props;
    return (
      <div>
      {stock ? (
        <h1>{this.props.stock.ticker}</h1>
      ) : (
        <h1>STOCK SHOW</h1>
      )}
      </div>
    );
  }
}

export default StockShow;
