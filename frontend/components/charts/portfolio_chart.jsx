import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import StockRechart from './stock_rechart';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currData: this.props.currentUser.balanceData,
      initialData: this.props.currentUser.balanceData
    };
    this.render1DChart = this.render1DChart.bind(this);
    this.render1WChart = this.render1WChart.bind(this);
    this.render1MChart = this.render1MChart.bind(this);
    this.render3MChart = this.render3MChart.bind(this);
    this.render1YChart = this.render1YChart.bind(this);
    this.renderAllChart = this.renderAllChart.bind(this);
  }

  calculateDailyPriceData(data, times) {
    let { dailyData } = this.state.initialData;
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
    console.log(openPrice, currPrice, priceFlux);
    if (priceFlux < 0) {
      priceFlux = priceFlux.toString()[0] + "$" + priceFlux.toString().slice(1);
    } else if (priceFlux.toString().indexOf('.') === -1) {
      priceFlux = "+$" + priceFlux.toString() + ".00";
    } else {
      priceFlux = "+$" + priceFlux.toString();
    }
    if (priceFlux.split('.')[1].length === 1) {
      priceFlux += "0";
    }
    let priceFluxPercentage = Math.round(((parseFloat(currPrice) - parseFloat(openPrice))/parseFloat(openPrice)) * 10000)/100;
    if (priceFluxPercentage.toString().split('.')[1].length === 1) {
      priceFluxPercentage += "0";
    }
    return {
      max,
      min,
      currPrice,
      openPrice,
      priceFlux,
      priceFluxPercentage
    };
  }

  render1DChart() {
    this.setState({ currData: this.state.initialData });
  }

  render1WChart() {
    let { intradayData } = this.state.initialData;
    let data = [];
    let times = Object.keys(intradayData).reverse();
    for(let i = 0; i < times.length; i++) {
      if (i === 0) {
        data.push({
          time: times[i].split(' ')[1],
          price: intradayData[times[i]]['4. close']
        });
      } else if (i % 2 === 0){
        continue;
      } else {
        data.push({
          time: times[i].split(' ')[1],
          price: intradayData[times[i]]['4. close']
        });
      }
    }
    let { max, min, currPrice, openPrice, priceFlux, priceFluxPercentage } = this.calculateIntradayPriceData(data, times);

    this.setState({
      currData: {
        data,
        currPrice,
        priceFlux,
        priceFluxPercentage,
        min,
        max,
        intradayData
      }
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
    let { max, min, currPrice, openPrice, priceFlux, priceFluxPercentage } = this.calculateDailyPriceData(data, times);
    this.setState({
      currData: {
        data,
        currPrice,
        priceFlux,
        priceFluxPercentage,
        min,
        max,
        dailyData
      }
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
    let { max, min, currPrice, openPrice, priceFlux, priceFluxPercentage } = this.calculateDailyPriceData(data, times);
    this.setState({
      currData: {
        data,
        currPrice,
        priceFlux,
        priceFluxPercentage,
        min,
        max,
        dailyData
      }
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
    let { max, min, currPrice, openPrice, priceFlux, priceFluxPercentage } = this.calculateDailyPriceData(data, times);
    this.setState({
      currData: {
        data,
        currPrice,
        priceFlux,
        priceFluxPercentage,
        min,
        max,
        dailyData
      }
    });
  }

  renderAllChart() {
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
    let { max, min, currPrice, openPrice, priceFlux, priceFluxPercentage } = this.calculateDailyPriceData(data, times);
    this.setState({
      currData: {
        data,
        currPrice,
        priceFlux,
        priceFluxPercentage,
        min,
        max,
        dailyData
      }
    });
  }

  render() {
    let { currentUser } = this.props;
    let { currPrice, priceFlux, priceFluxPercentage, data, min, max } = this.state.currData;
    // let data = [
    //   { time: '9:00 AM ET', price: 5200 },
    //   { time: '9:05 AM ET', price: 5300 },
    //   { time: '9:10 AM ET', price: 5325 },
    //   { time: '9:15 AM ET', price: 5275 },
    //   { time: '9:20 AM ET', price: 5200 },
    //   { time: '9:25 AM ET', price: 5225 },
    //   { time: '9:30 AM ET', price: 5225 },
    //   { time: '9:35 AM ET', price: 5250 },
    //   { time: '9:40 AM ET', price: 5300 },
    //   { time: '9:45 AM ET', price: 5400 },
    //   { time: '9:50 AM ET', price: 5500 },
    //   { time: '9:55 AM ET', price: 5430 },
    //   { time: '10:00 AM ET', price: 5450 },
    //   { time: '10:05 AM ET', price: 5500 },
    //   { time: '10:10 AM ET', price: 5400 },
    //   { time: '10:15 AM ET', price: 5250 },
    //   { time: '10:20 AM ET', price: 5300 },
    //   { time: '10:25 AM ET', price: 5400 },
    //   { time: '10:30 AM ET', price: 5300 },
    //   { time: '10:35 AM ET', price: 5250 },
    //   { time: '10:40 AM ET', price: 5350 },
    //   { time: '10:45 AM ET', price: 5400 },
    //   { time: '10:50 AM ET', price: 5500 },
    //   { time: '10:55 AM ET', price: 5550 },
    //   { time: '11:00 AM ET', price: 5600 },
    //   { time: '11:05 AM ET', price: 5500 },
    //   { time: '11:10 AM ET', price: 5520 },
    //   { time: '11:15 AM ET', price: 5450 },
    //   { time: '11:20 AM ET', price: 5400 },
    //   { time: '11:25 AM ET', price: 5400 },
    //   { time: '11:30 AM ET', price: 5350 },
    //   { time: '11:35 AM ET', price: 5450 },
    //   { time: '11:40 AM ET', price: 5350 },
    //   { time: '11:45 AM ET', price: 5250 },
    //   { time: '11:50 AM ET', price: 5300 },
    //   { time: '11:55 AM ET', price: 5330 },
    //   { time: '12:00 PM ET', price: 5350 },
    //   { time: '12:05 PM ET', price: 5250 },
    //   { time: '12:10 PM PT', price: 5220 },
    //   { time: '12:15 PM ET', price: 5280 },
    //   { time: '12:20 PM ET', price: 5330 },
    //   { time: '12:25 PM ET', price: 5400 },
    //   { time: '12:30 PM ET', price: 5300 },
    //   { time: '12:35 PM ET', price: 5250 },
    //   { time: '12:40 PM ET', price: 5350 },
    //   { time: '12:45 PM ET', price: 5400 },
    //   { time: '12:50 PM ET', price: 5500 },
    //   { time: '12:55 PM ET', price: 5400 },
    //   { time: '1:00 PM ET', price: 5150 },
    //   { time: '1:05 PM ET', price: 5050 },
    //   { time: '1:10 PM PT', price: 5000 },
    //   { time: '1:15 PM ET', price: 4950 },
    //   { time: '1:20 PM ET', price: 4975 },
    //   { time: '1:25 PM ET', price: 5050 },
    //   { time: '1:30 PM ET', price: 5025 },
    //   { time: '1:35 PM ET', price: 5000 },
    //   { time: '1:40 PM ET', price: 5025 },
    //   { time: '1:45 PM ET', price: 5015 },
    //   { time: '1:50 PM ET', price: 5060 },
    //   { time: '1:55 PM ET', price: 5080 },
    //   { time: '2:00 PM ET', price: 5150 },
    //   { time: '2:05 PM ET', price: 5100 },
    //   { time: '2:10 PM PT', price: 5125 },
    //   { time: '2:15 PM ET', price: 5075 },
    //   { time: '2:20 PM ET', price: 5000 },
    //   { time: '2:25 PM ET', price: 4950 },
    //   { time: '2:30 PM ET', price: 5000 },
    //   { time: '2:35 PM ET', price: 5050 },
    //   { time: '2:40 PM ET', price: 5075 },
    //   { time: '2:45 PM ET', price: 5025 },
    //   { time: '2:50 PM ET', price: 5090 },
    //   { time: '2:55 PM ET', price: 5120 },
    //   { time: '3:00 PM ET', price: 5110 },
    //   { time: '3:05 PM ET', price: 5080 },
    //   { time: '3:10 PM PT', price: 5130 },
    //   { time: '3:15 PM ET', price: 5150 },
    //   { time: '3:20 PM ET', price: 5200 },
    //   { time: '3:25 PM ET', price: 5220 },
    //   { time: '3:30 PM ET', price: 5170 },
    //   { time: '3:35 PM ET', price: 5150 },
    //   { time: '3:40 PM ET', price: 5180 },
    //   { time: '3:45 PM ET', price: 5200 },
    //   { time: '3:50 PM ET', price: 5230 },
    //   { time: '3:55 PM ET', price: 5250 },
    //   { time: '4:00 PM ET', price: 5150 },
    //   { time: '4:05 PM ET', price: 5050 },
    //   { time: '4:10 PM PT', price: 5000 },
    //   { time: '4:15 PM ET', price: 5150 },
    //   { time: '4:20 PM ET', price: 5200 },
    //   { time: '4:25 PM ET', price: 5400 },
    //   { time: '4:30 PM ET', price: 5300 },
    //   { time: '4:35 PM ET', price: 5250 },
    //   { time: '4:40 PM ET', price: 5350 },
    //   { time: '4:45 PM ET', price: 5400 },
    //   { time: '4:50 PM ET', price: 5500 },
    //   { time: '4:55 PM ET', price: 5400 },
    //   { time: '5:00 PM ET', price: 5150 },
    //   { time: '5:05 PM ET', price: 5050 },
    //   { time: '5:10 PM PT', price: 5000 },
    //   { time: '5:15 PM ET', price: 5150 },
    //   { time: '5:20 PM ET', price: 5200 },
    //   { time: '5:25 PM ET', price: 5400 },
    //   { time: '5:30 PM ET', price: 5300 },
    //   { time: '5:35 PM ET', price: 5250 },
    //   { time: '5:40 PM ET', price: 5350 },
    //   { time: '5:45 PM ET', price: 5400 },
    //   { time: '5:50 PM ET', price: 5500 },
    //   { time: '5:55 PM ET', price: 5400 }
    // ];
    console.log(currentUser);
    return (
      <div className="chart">
        <h2>${currentUser.balance}</h2>
        <h3>{`$1.20`} ({`3.21`}%)</h3>
        <div className="stock-chart">
          <LineChart width={710} height={195} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <YAxis
              hide={true}
              domain={[4800, 5600]}
              />
            <Tooltip />
            <Line type="linear" dataKey="price" stroke="#82ca9d" dot={false} strokeWidth={2} />
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
