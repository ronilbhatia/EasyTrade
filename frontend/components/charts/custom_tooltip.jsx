import React from 'react';

class CustomTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    let balance = document.getElementById('portfolio-balance');
    let balanceFlux = document.getElementById('portfolio-balance-flux');
    let neg = "+";

    if (prevProps.active && this.props.payload && this.props.payload[0]) {
      let balanceFluxCalc = parseFloat(this.props.payload[0].value - prevProps.openBalance);
      let balanceFluxPercentageCalc = parseFloat(balanceFluxCalc * 100/prevProps.openBalance);
      if (balanceFluxCalc < 0) { neg = "-" ;}
      let balanceFluxString = `${neg}$${Math.abs(balanceFluxCalc).formatMoney(2)} (${balanceFluxPercentageCalc.formatMoney(2)}%)`
      balance.innerHTML = `$${parseFloat(this.props.payload[0].value).formatMoney(2)}`;
      balanceFlux.innerHTML = balanceFluxString;
    } else if (prevProps.balanceFlux !== this.props.balanceFlux) {
      balance.innerHTML = `$${prevProps.balance}`;
      balanceFlux.innerHTML = `${this.props.neg}$${this.props.balanceFlux} (${this.props.balanceFluxPercentage}%)`;
    } else {
      balance.innerHTML = `$${prevProps.balance}`;
      balanceFlux.innerHTML = `${prevProps.neg}$${prevProps.balanceFlux} (${prevProps.balanceFluxPercentage}%)`;
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

export default CustomTooltip;
