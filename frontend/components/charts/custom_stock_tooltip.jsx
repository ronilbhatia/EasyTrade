import React from 'react';

class CustomStockTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    let price = document.getElementById('stock-price');
    let priceFlux = document.getElementById('stock-price-flux');
    let neg = "+";

    if (prevProps.active && this.props.payload[0]) {
      let priceFluxCalc = parseFloat(this.props.payload[0].value) - parseFloat(prevProps.openPrice);
      let priceFluxPercentageCalc = parseFloat(priceFluxCalc * 100/parseFloat(prevProps.openPrice));
      if (priceFluxCalc < 0) { neg = "-" ;}
      let priceFluxString = `${neg}$${Math.abs(priceFluxCalc).formatMoney(2)} (${priceFluxPercentageCalc.formatMoney(2)}%)`
      price.innerHTML = `$${parseFloat(this.props.payload[0].value).formatMoney(2)}`;
      priceFlux.innerHTML = priceFluxString;
    } else if (prevProps.priceFlux !== this.props.priceFlux) {
      price.innerHTML = `$${prevProps.price}`;
      priceFlux.innerHTML = `${this.props.neg}$${this.props.priceFlux} (${this.props.priceFluxPercentage}%)`;
    } else {
      price.innerHTML = `$${prevProps.price}`;
      priceFlux.innerHTML = `${prevProps.neg}$${prevProps.priceFlux} (${prevProps.priceFluxPercentage}%)`;
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
