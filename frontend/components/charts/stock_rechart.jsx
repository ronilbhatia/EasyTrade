import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

class StockRechart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currData: this.props,
      initialData: this.props,
      dailyData: this.props.dailyData
    };
    this.render1DChart = this.render1DChart.bind(this);
    this.render1WChart = this.render1WChart.bind(this);
    this.render1MChart = this.render1MChart.bind(this);
    this.render3MChart = this.render3MChart.bind(this);
    this.render1YChart = this.render1YChart.bind(this);
    this.render5YChart = this.render5YChart.bind(this);
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
    if (priceFlux < 0) {
      priceFlux = priceFlux.toString()[0] + "$" + priceFlux.toString().slice(1);
    } else {
      priceFlux = "+$" + priceFlux.toString().slice(0);
    }
    let priceFluxPercentage = Math.round(((parseFloat(currPrice) - parseFloat(openPrice))/parseFloat(openPrice)) * 10000)/100;
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
    if (priceFlux < 0) {
      priceFlux = priceFlux.toString()[0] + "$" + priceFlux.toString().slice(1);
    } else {
      priceFlux = "+$" + priceFlux.toString().slice(0);
    }
    let priceFluxPercentage = Math.round(((parseFloat(currPrice) - parseFloat(openPrice))/parseFloat(openPrice)) * 10000)/100;
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
    if (priceFlux < 0) {
      priceFlux = priceFlux.toString()[0] + "$" + priceFlux.toString().slice(1);
    } else {
      priceFlux = "+$" + priceFlux.toString().slice(0);
    }
    let priceFluxPercentage = Math.round(((parseFloat(currPrice) - parseFloat(openPrice))/parseFloat(openPrice)) * 10000)/100;
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
    console.log(times);
    for(let i = 0; i < times.length; i++) {
      data.push({
        time: times[i],
        price: dailyData[times[i]]['4. close']
      });
    }
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
    if (priceFlux < 0) {
      priceFlux = priceFlux.toString()[0] + "$" + priceFlux.toString().slice(1);
    } else {
      priceFlux = "+$" + priceFlux.toString().slice(0);
    }
    let priceFluxPercentage = Math.round(((parseFloat(currPrice) - parseFloat(openPrice))/parseFloat(openPrice)) * 10000)/100;
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

  render5YChart() {
    let { dailyData } = this.state.initialData;
    let data = [];
    let times = Object.keys(dailyData);
    times = times.slice(0, 1260);
    for(let i = 0; i < times.length; i+=5) {
      console.log(times[i]);
      data.push({
        time: times[i],
        price: dailyData[times[i]]['4. close']
      });
    }
    data = data.reverse();
    const prices = [];
    for (let i = 0; i < data.length; i++) {
      prices.push(parseFloat(data[i].price));
    }
    let max = Math.max(...prices);
    let min = Math.min(...prices);
    let currPrice = this.state.initialData.currPrice;
    let openPrice = dailyData[times.reverse()[0]]['1. open'];
    openPrice = openPrice.split('').splice(0, openPrice.length - 2).join('');
    let priceFlux = Math.round((parseFloat(currPrice) - parseFloat(openPrice)) * 100)/100;
    if (priceFlux < 0) {
      priceFlux = priceFlux.toString()[0] + "$" + priceFlux.toString().slice(1);
    } else {
      priceFlux = "+$" + priceFlux.toString().slice(0);
    }
    let priceFluxPercentage = Math.round(((parseFloat(currPrice) - parseFloat(openPrice))/parseFloat(openPrice)) * 10000)/100;
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
    let { currPrice, priceFlux, priceFluxPercentage, data, min, max } = this.state.currData;
    return (
      <div className="chart">
        <h1>{this.props.stock.name}</h1>
        <h2>${currPrice}</h2>
        <h3>{priceFlux} ({priceFluxPercentage}%)</h3>
        <div className="stock-chart">
          <LineChart width={710} height={195} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <YAxis
              hide={true}
              domain={[min, max]}
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
            <li><a className='chart-choice' onClick={this.render5YChart}>5Y</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StockRechart;
