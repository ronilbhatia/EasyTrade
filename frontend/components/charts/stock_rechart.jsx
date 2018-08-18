import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import CustomStockTooltip from './custom_stock_tooltip';

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
    this.render1WChart = this.render1WChart.bind(this);
    this.render1MChart = this.render1MChart.bind(this);
    this.render3MChart = this.render3MChart.bind(this);
    this.render1YChart = this.render1YChart.bind(this);
    this.render5YChart = this.render5YChart.bind(this);
  }

  calculateIntradayPriceData(data, times) {
    let { intradayData } = this.state.initialData;
    let neg = "+";
    const prices = [];
    for (let i = 0; i < data.length; i++) {
      prices.push(parseFloat(data[i].price));
    }
    let max = Math.max(...prices);
    let min = Math.min(...prices);
    let currPrice = this.state.initialData.currPrice;
    let openPrice = intradayData[times[0]]['1. open'];
    openPrice = openPrice.split('').splice(0, openPrice.length - 2).join('');
    let priceFlux = Math.round((parseFloat(currPrice) - parseFloat(openPrice)) * 100)/100;
    let priceFluxPercentage = Math.round(((parseFloat(currPrice) - parseFloat(openPrice))/parseFloat(openPrice)) * 10000)/100;
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

  calculateDailyPriceData(data, times) {
    let { dailyData } = this.state.initialData;
    let neg = "+";
    const prices = [];
    for (let i = 0; i < data.length; i++) {
      prices.push(parseFloat(data[i].price));
    }
    let max = Math.max(...prices);
    let min = Math.min(...prices);
    let currPrice = this.state.initialData.currPrice;
    let openPrice = dailyData[times[0]]['1. open'];
    openPrice = openPrice.split('').splice(0, openPrice.length - 2).join('');
    let priceFlux = Math.round((parseFloat(currPrice) - parseFloat(openPrice)) * 100)/100;
    let priceFluxPercentage = Math.round(((parseFloat(currPrice) - parseFloat(openPrice))/parseFloat(openPrice)) * 10000)/100;
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

  render1WChart() {
    let { intradayData } = this.state.initialData;
    let data = [];
    let times = Object.keys(intradayData).reverse();
    for(let i = 0; i < times.length; i++) {
      let dateAndTime = times[i].split(' ');
      let dateNums = dateAndTime[0].split('-');
      let timeNums = dateAndTime[1].split(':');
      let timeString = `${timeNums[0]}:${timeNums[1]}, ${dateNums[1]}/${dateNums[2]} ET`;
      debugger;
      if (i === 0) {
        data.push({
          time: timeString,
          price: intradayData[times[i]]['4. close']
        });
      } else if (i % 2 === 0){
        continue;
      } else {
        data.push({
          time: timeString,
          price: intradayData[times[i]]['4. close']
        });
      }
    }
    let { max, min, neg, currPrice, openPrice, priceFlux, priceFluxPercentage } = this.calculateIntradayPriceData(data, times);

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
        intradayData
      },
      active: '1W'
    });
  }


  render1MChart() {
    let { dailyData } = this.state.initialData;
    let data = [];
    let times = Object.keys(dailyData);
    times = times.slice(0, 22).reverse();
    for(let i = 0; i < times.length; i++) {
      data.push({
        time: times[i],
        price: dailyData[times[i]]['4. close']
      });
    }
    let { max, min, neg, currPrice, openPrice, priceFlux, priceFluxPercentage } = this.calculateDailyPriceData(data, times);
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
        dailyData
      },
      active: '1M'
    });
  }

  render3MChart() {
    let { dailyData } = this.state.initialData;
    let data = [];
    let times = Object.keys(dailyData);
    times = times.slice(0, 66).reverse();
    for(let i = 0; i < times.length; i++) {
      data.push({
        time: times[i],
        price: dailyData[times[i]]['4. close']
      });
    }
    let { max, min, neg, currPrice, openPrice, priceFlux, priceFluxPercentage } = this.calculateDailyPriceData(data, times);
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
        dailyData
      },
      active: '3M'
    });
  }

  render1YChart() {
    let { dailyData } = this.state.initialData;
    let data = [];
    let times = Object.keys(dailyData);
    times = times.slice(0, 251).reverse();
    for(let i = 0; i < times.length; i++) {
      data.push({
        time: times[i],
        price: dailyData[times[i]]['4. close']
      });
    }
    let { max, min, neg, currPrice, openPrice, priceFlux, priceFluxPercentage } = this.calculateDailyPriceData(data, times);
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
        dailyData
      },
      active: '1Y'
    });
  }

  render5YChart() {
    let { dailyData } = this.state.initialData;
    let data = [];
    let times = Object.keys(dailyData);
    times = times.slice(0, 1260);
    for(let i = 0; i < times.length; i+=5) {
      data.push({
        time: times[i],
        price: dailyData[times[i]]['4. close']
      });
    }
    data = data.reverse();
    times = times.reverse();
    let { max, min, neg, currPrice, openPrice, priceFlux, priceFluxPercentage } = this.calculateDailyPriceData(data, times);
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
      active: '5Y'
    });
  }

  render() {
    let { currPrice, openPrice, priceFlux, priceFluxPercentage, data, min, max, neg } = this.state.currData;
    debugger;
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
              offset={-24}
              position={{y: -15}}
            />
            <Line type="linear" dataKey="price" stroke="#82ca9d" dot={false} strokeWidth={2} />
          </LineChart>
          <ul className="chart-range">
            <li><a className={this.state.active === '1D' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1DChart}>1D</a></li>
            <li><a className={this.state.active === '1W' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1WChart}>1W</a></li>
            <li><a className={this.state.active === '1M' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1MChart}>1M</a></li>
            <li><a className={this.state.active === '3M' ? 'chart-choice active' : 'chart-choice'} onClick={this.render3MChart}>3M</a></li>
            <li><a className={this.state.active === '1Y' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1YChart}>1Y</a></li>
            <li><a className={this.state.active === '5Y' ? 'chart-choice active' : 'chart-choice'} onClick={this.render5YChart}>5Y</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StockRechart;
