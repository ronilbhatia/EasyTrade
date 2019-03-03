import React from 'react';

class CustomStockTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    let price = document.getElementById('stock-price');
    let priceFlux = document.getElementById('stock-price-flux');
    let neg = "+";

    if (this.props.active && nextProps.payload[0]) {
      let priceFluxCalc = parseFloat(nextProps.payload[0].value) - parseFloat(this.props.openPrice);
      let priceFluxPercentageCalc = parseFloat(priceFluxCalc * 100/parseFloat(this.props.openPrice));
      if (priceFluxCalc < 0) { neg = "-" ;}
      let priceFluxString = `${neg}$${Math.abs(priceFluxCalc).formatMoney(2)} (${priceFluxPercentageCalc.formatMoney(2)}%)`
      price.innerHTML = `$${parseFloat(nextProps.payload[0].value).formatMoney(2)}`;
      priceFlux.innerHTML = priceFluxString;
    } else if (this.props.priceFlux !== nextProps.priceFlux) {
      price.innerHTML = `$${this.props.price}`;
      priceFlux.innerHTML = `${nextProps.neg}$${nextProps.priceFlux} (${nextProps.priceFluxPercentage}%)`;
    } else {
      price.innerHTML = `$${this.props.price}`;
      priceFlux.innerHTML = `${this.props.neg}$${this.props.priceFlux} (${this.props.priceFluxPercentage}%)`;
    }
  }

  render() {
    const { active } = this.props;

    if (active) {
      const { payload } = this.props;
      if (payload && payload[0] && payload[0].payload) {
        return (
          <div className="custom-tooltip">
            {payload[0].payload.time}
          </div>
        );
      }
    }
    return null;
  }
}

export default CustomStockTooltip;
