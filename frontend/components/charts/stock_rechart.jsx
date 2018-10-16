import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import CustomStockTooltip from './custom_stock_tooltip';

const RANGES = {
  '1W': { length: 5, increment: 1},
  '1M': { length: 23, increment: 1},
  '3M': { length: 66, increment: 1},
  '1Y': { length: 251, increment: 1},
  '5Y': { length: 1265, increment: 5},
};

const MONTHS = {
  1: "JAN",
  2: "FEB",
  3: "MAR",
  4: "APR",
  5: "MAY",
  6: "JUN",
  7: "JUL",
  8: "AUG",
  9: "SEP",
  10: "OCT",
  11: "NOV",
  12: "DEC"
};

class StockRechart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currData: this.props,
      initialData: this.props,
      dailyData: this.props.dailyData,
      active: '1D'
    };
    this.render1DChart = this.render1DChart.bind(this);
  }

  calculateDailyPriceData(data, startIdx) {
    let { dailyData } = this.state.initialData;
    let neg = "+";
    const prices = [];

    if (startIdx < 0) startIdx = 0;
    for (let i = 0; i < data.length; i++) {
      prices.push(parseFloat(data[i].price));
    }

    // calculate key price data points
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const currPrice = this.state.initialData.currPrice;
    const openPrice = dailyData[startIdx].close;
    const priceFlux = Math.round((parseFloat(currPrice) - parseFloat(openPrice)) * 100)/100;
    const priceFluxPercentage = Math.round(((parseFloat(currPrice) - parseFloat(openPrice))/parseFloat(openPrice)) * 10000)/100;
    if (priceFlux < 0) { neg = "-" ;}

    return {
      max,
      min,
      neg,
      currPrice,
      openPrice,
      priceFlux,
      priceFluxPercentage
    };
  }

  render1DChart() {
    this.setState({ currData: this.state.initialData, active: '1D' });
  }

  formatDate(date) {
    let [year, month, day] = date.split("-");
    return `${MONTHS[parseInt(month)]} ${day}, ${year}`;
  }

  renderChart(range) {
    let { dailyData } = this.state.initialData;
    let data = [];
    let startIdx = RANGES[range].length;
    if (startIdx > dailyData.length) startIdx = dailyData.length;
    let lastIdx;

    for(let i = dailyData.length - startIdx; i < dailyData.length; i+=RANGES[range].increment) {
      if (i < 0) i = 0;
      let time = this.formatDate(dailyData[i].date);
      data.push({
        time,
        price: dailyData[i].close
      });
      lastIdx = i;
    }

    // Set last date as most recent data point regardless
    if (lastIdx !== dailyData.length - 1) {
      let time = this.formatDate(dailyData[dailyData.length-1].date);
      data.push({
        time,
        price: dailyData[dailyData.length - 1].close
      });
    }

    let { max, min, neg, currPrice, openPrice, priceFlux, priceFluxPercentage } = this.calculateDailyPriceData(data, dailyData.length - startIdx - 1);
    this.setState({
      currData: {
        data,
        currPrice,
        openPrice,
        priceFlux,
        priceFluxPercentage,
        min,
        max,
        neg,
        dailyData,
      },
      active: range
    });
  }

  render() {
    let { currPrice, openPrice, priceFlux, priceFluxPercentage, data, min, max, neg } = this.state.currData;
    let color = (neg === '+') ? "#82ca9d" : "#f45531";
    if (neg === '-') {
      document.getElementsByTagName('body')[0].className = 'negative';
    } else {
      document.getElementsByTagName('body')[0].className = '';
    }

    currPrice = parseFloat(currPrice).formatMoney(2);
    priceFlux = Math.abs(parseFloat(priceFlux)).formatMoney(2);
    priceFluxPercentage = parseFloat(priceFluxPercentage).formatMoney(2);

    return (
      <div className="chart">
        <h1>{this.props.stock.name}</h1>
        <h2 id="stock-price">${currPrice}</h2>
        <h3 id="stock-price-flux">{neg}${priceFlux} ({priceFluxPercentage}%)</h3>
        <div className="stock-chart">
          <LineChart width={710} height={195} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <YAxis
              hide={true}
              domain={[min, max]}
              />
            <Tooltip
              content={<CustomStockTooltip price={currPrice} priceFlux={priceFlux} priceFluxPercentage={priceFluxPercentage} openPrice={openPrice} neg={neg}/>}
              offset={-40}
              position={{y: -20}}
              isAnimationActive={false}
            />
            <Line type="linear" dataKey="price" stroke={color} dot={false} strokeWidth={2} />
          </LineChart>
          <ul className="chart-range stock">
            <li><a className={this.state.active === '1D' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1DChart}>1D</a></li>
            <li><a className={this.state.active === '1W' ? 'chart-choice active' : 'chart-choice'} onClick={() => this.renderChart('1W')}>1W</a></li>
            <li><a className={this.state.active === '1M' ? 'chart-choice active' : 'chart-choice'} onClick={() => this.renderChart('1M')}>1M</a></li>
            <li><a className={this.state.active === '3M' ? 'chart-choice active' : 'chart-choice'} onClick={() => this.renderChart('3M')}>3M</a></li>
            <li><a className={this.state.active === '1Y' ? 'chart-choice active' : 'chart-choice'} onClick={() => this.renderChart('1Y')}>1Y</a></li>
            <li><a className={this.state.active === '5Y' ? 'chart-choice active' : 'chart-choice'} onClick={() => this.renderChart('5Y')}>5Y</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StockRechart;
