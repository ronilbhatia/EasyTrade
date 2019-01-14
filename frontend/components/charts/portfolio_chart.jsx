import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import StockRechart from './stock_rechart';
import CustomTooltip from './custom_tooltip';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currData: this.props,
      initialData: this.props,
      active: '1D'
    };
    this.render1DChart = this.render1DChart.bind(this);
    this.render1WChart = this.render1WChart.bind(this);
    this.render1MChart = this.render1MChart.bind(this);
    this.render3MChart = this.render3MChart.bind(this);
    this.render1YChart = this.render1YChart.bind(this);
    this.renderAllChart = this.renderAllChart.bind(this);
  }

  calculateDailyPriceData(data, balance) {
    let openBalance, balances, max, min, balanceFlux, balanceFluxPercentage;
    let neg = "+";
    if (data.length === 0) {
      openBalance = balance;
      balanceFlux = 0;
      balanceFluxPercentage = 0;
      max = 0;
      min = 0;
    } else {
      openBalance = data[0].balance;
      balances = [];
      for (let i = 0; i < data.length; i++) {
        balances.push(parseFloat(data[i].balance));
      }
      max = Math.max(...balances);
      min = Math.min(...balances);
      balanceFlux = parseFloat(balance - openBalance);
      balanceFluxPercentage = parseFloat(balanceFlux * 100/openBalance);
      if (balanceFlux < 0) { neg = "-" ;}
    }
    return {
      max,
      min,
      neg,
      openBalance,
      balanceFlux,
      balanceFluxPercentage
    };
  }

  render1DChart() {
    this.setState({ currData: this.state.initialData, active: '1D' });
  }

  render1WChart() {
    let { balanceData, balance } = this.state.initialData;
    let data = balanceData.slice(0);
    data = data.reverse().slice(0, 6).reverse();
    let { max, min, neg, openBalance, balanceFlux, balanceFluxPercentage } = this.calculateDailyPriceData(data, balance);
    this.setState({
      currData: {
        data,
        balance,
        balanceFlux,
        balanceFluxPercentage,
        openBalance,
        min,
        max,
        neg
      },
      active: '1W'
    });
  }


  render1MChart() {
    let { balanceData, balance } = this.state.initialData;
    let data = balanceData.slice(0)
    data = data.reverse().slice(0, 22).reverse();
    let { max, min, neg, openBalance, balanceFlux, balanceFluxPercentage } = this.calculateDailyPriceData(data, balance);
    this.setState({
      currData: {
        data,
        balance,
        balanceFlux,
        balanceFluxPercentage,
        openBalance,
        min,
        max,
        neg
      },
      active: '1M'
    });
  }

  render3MChart() {
    let { balanceData, balance } = this.state.initialData;
    let data = balanceData.slice(0);
    data = data.reverse().slice(0, 67).reverse();
    let { max, min, neg, openBalance, balanceFlux, balanceFluxPercentage } = this.calculateDailyPriceData(data, balance);
    this.setState({
      currData: {
        data,
        balance,
        balanceFlux,
        balanceFluxPercentage,
        openBalance,
        min,
        max,
        neg
      },
      active: '3M'
    });
  }

  render1YChart() {
    let { balanceData, balance } = this.state.initialData;
    let data = balanceData.slice(0);
    data = data.reverse().slice(0, 252).reverse();
    let { max, min, neg, openBalance, balanceFlux, balanceFluxPercentage } = this.calculateDailyPriceData(data, balance);
    this.setState({
      currData: {
        data,
        balance,
        balanceFlux,
        balanceFluxPercentage,
        openBalance,
        min,
        max,
        neg
      },
      active: '1Y'
    });
  }

  renderAllChart() {
    let { balanceData, balance } = this.state.initialData;
    let data = balanceData.slice(0);
    let { max, min, neg, openBalance, balanceFlux, balanceFluxPercentage } = this.calculateDailyPriceData(data, balance);
    this.setState({
      currData: {
        data,
        balance,
        balanceFlux,
        balanceFluxPercentage,
        openBalance,
        min,
        max,
        neg
      },
      active: 'ALL'
    });
  }

  render() {
    let { currentUser } = this.props;
    let { balance, balanceFlux, balanceFluxPercentage, openBalance, data, min, max, neg } = this.state.currData;
    let color = (neg === '+') ? "#82ca9d" : "#f45531";
    if (neg === '-') {
      document.getElementsByTagName('body')[0].className = 'negative';
    } else {
      document.getElementsByTagName('body')[0].className = '';
    }
    balance = parseFloat(balance).formatMoney(2);
    balanceFlux = Math.abs(parseFloat(balanceFlux)).formatMoney(2);
    balanceFluxPercentage = parseFloat(balanceFluxPercentage).formatMoney(2);
    return (
      <div className="chart">
        <h2 id="portfolio-balance">${balance}</h2>
        <h3 id="portfolio-balance-flux">{neg}${balanceFlux} ({balanceFluxPercentage}%)</h3>
        <div className="stock-chart">
          <LineChart width={710} height={195} data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <YAxis
              hide={true}
              domain={[min, max]}
              />
            <Tooltip
              content={<CustomTooltip balance={balance} balanceFlux={balanceFlux} balanceFluxPercentage={balanceFluxPercentage} openBalance={openBalance} neg={neg}/>}
              offset={-40}
              position={{y: -20}}
              isAnimationActive={false}
            />
          <Line type="linear" dataKey="balance" stroke={color} dot={false} strokeWidth={2} />
          </LineChart>
          <ul className="chart-range">
            <li><a className={this.state.active === '1D' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1DChart}>1D</a></li>
            <li><a className={this.state.active === '1W' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1WChart}>1W</a></li>
            <li><a className={this.state.active === '1M' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1MChart}>1M</a></li>
            <li><a className={this.state.active === '3M' ? 'chart-choice active' : 'chart-choice'} onClick={this.render3MChart}>3M</a></li>
            <li><a className={this.state.active === '1Y' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1YChart}>1Y</a></li>
            <li><a className={this.state.active === 'ALL' ? 'chart-choice active' : 'chart-choice'} onClick={this.renderAllChart}>ALL</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PortfolioChart;
