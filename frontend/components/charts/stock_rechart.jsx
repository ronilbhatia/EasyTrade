import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

class StockRechart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currData: this.props,
      initialData: this.props
    };
    this.render1DChart = this.render1DChart.bind(this);
    this.render1WChart = this.render1WChart.bind(this);
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
    // let currPrice = intradayData[times.reverse()[0]]['4. close'];
    let currPrice = this.state.initialData.currPrice;
    console.log(currPrice);
    let openPrice = intradayData[times[0]]['1. open'];
    openPrice = openPrice.split('').splice(0, openPrice.length - 2).join('');
    console.log(openPrice);
    let priceFlux = Math.round((parseFloat(currPrice) - parseFloat(openPrice)) * 100)/100;
    console.log(priceFlux);
    if (priceFlux < 0) {
      priceFlux = priceFlux.toString()[0] + "$" + priceFlux.toString().slice(1);
    } else {
      priceFlux = "+$" + priceFlux.toString().slice(0);
    }
    let priceFluxPercentage = Math.round(((parseFloat(currPrice) - parseFloat(openPrice))/parseFloat(openPrice)) * 10000)/100;
    console.log(priceFluxPercentage);
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
    
  }

  render() {
    let { currPrice, priceFlux, priceFluxPercentage, data, min, max } = this.state.currData;
    debugger
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
            <li><a className='chart-choice'>1M</a></li>
            <li><a className='chart-choice'>3M</a></li>
            <li><a className='chart-choice'>1Y</a></li>
            <li><a className='chart-choice'>5Y</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StockRechart;
