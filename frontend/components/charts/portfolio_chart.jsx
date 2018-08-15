import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import StockRechart from './stock_rechart';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currData: this.props,
      initialData: this.props
    };
    this.render1DChart = this.render1DChart.bind(this);
    this.render1WChart = this.render1WChart.bind(this);
    this.render1MChart = this.render1MChart.bind(this);
    this.render3MChart = this.render3MChart.bind(this);
    this.render1YChart = this.render1YChart.bind(this);
    this.renderAllChart = this.renderAllChart.bind(this);
  }

  calculateDailyPriceData(data, balance) {
    const openBalance = data[0].balance;
    const balances = [];
    for (let i = 0; i < data.length; i++) {
      balances.push(parseFloat(data[i].balance));
    }
    const max = Math.max(...balances);
    const min = Math.min(...balances);
    const balanceFlux = Math.round((balance - openBalance) * 100)/100;
    const balanceFluxPercentage = Math.round((balanceFlux/openBalance)*10000)/100;
    return {
      max,
      min,
      openBalance,
      balanceFlux,
      balanceFluxPercentage
    };
  }

  render1DChart() {
    this.setState({ currData: this.state.initialData });
  }

  render1WChart() {
    let { balanceData, balance } = this.state.initialData;
    let data = balanceData.slice(0, 5).reverse();
    let { max, min, openBalance, balanceFlux, balanceFluxPercentage } = this.calculateDailyPriceData(data, balance);
    this.setState({
      currData: {
        data,
        balance,
        balanceFlux,
        balanceFluxPercentage,
        min,
        max
      }
    });
  }


  render1MChart() {
    let { balanceData, balance } = this.state.initialData;
    let data = balanceData.slice(0, 21).reverse();
    let { max, min, openBalance, balanceFlux, balanceFluxPercentage } = this.calculateDailyPriceData(data, balance);
    this.setState({
      currData: {
        data,
        balance,
        balanceFlux,
        balanceFluxPercentage,
        min,
        max
      }
    });
  }

  render3MChart() {
    let { balanceData, balance } = this.state.initialData;
    let data = balanceData.slice(0, 66).reverse();
    let { max, min, openBalance, balanceFlux, balanceFluxPercentage } = this.calculateDailyPriceData(data, balance);
    this.setState({
      currData: {
        data,
        balance,
        balanceFlux,
        balanceFluxPercentage,
        min,
        max
      }
    });
  }

  render1YChart() {
    let { balanceData, balance } = this.state.initialData;
    let data = balanceData.slice(0, 251).reverse();
    let { max, min, openBalance, balanceFlux, balanceFluxPercentage } = this.calculateDailyPriceData(data, balance);
    this.setState({
      currData: {
        data,
        balance,
        balanceFlux,
        balanceFluxPercentage,
        min,
        max
      }
    });
  }

  renderAllChart() {
    let { balanceData, balance } = this.state.initialData;
    let data = balanceData.slice(0).reverse();
    let { max, min, openBalance, balanceFlux, balanceFluxPercentage } = this.calculateDailyPriceData(data, balance);
    this.setState({
      currData: {
        data,
        balance,
        balanceFlux,
        balanceFluxPercentage,
        min,
        max
      }
    });
  }

  render() {
    let { currentUser } = this.props;
    let { balance, balanceFlux, balanceFluxPercentage, data, min, max } = this.state.currData;
    return (
      <div className="chart">
        <h2>${balance}</h2>
        <h3>{balanceFlux} ({balanceFluxPercentage}%)</h3>
        <div className="stock-chart">
          <LineChart width={710} height={195} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <YAxis
              hide={true}
              domain={[min, max]}
              />
            <Tooltip />
            <Line type="linear" dataKey="balance" stroke="#82ca9d" dot={false} strokeWidth={2} />
          </LineChart>
          <ul className="chart-range">
            <li><a className='chart-choice' onClick={this.render1DChart}>1D</a></li>
            <li><a className='chart-choice' onClick={this.render1WChart}>1W</a></li>
            <li><a className='chart-choice' onClick={this.render1MChart}>1M</a></li>
            <li><a className='chart-choice' onClick={this.render3MChart}>3M</a></li>
            <li><a className='chart-choice' onClick={this.render1YChart}>1Y</a></li>
            <li><a className='chart-choice' onClick={this.renderAllChart}>ALL</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PortfolioChart;
