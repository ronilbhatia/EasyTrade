import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

class StockRechart extends React.Component {

  render() {
    const date = new Date;
    const dayOfWeek = date.getDay()
    let day = date.getDate();
    if (dayOfWeek === 6) {
      day -= 1;
    } else if (dayOfWeek === 0) {
      day -= 2;
    }
    day = day < 10 ? '0' + day : day;
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const year = date.getFullYear().toString();
    const dateString = year + "-" + month + "-" + day;
    const intradayData = this.props.stock.intradayData;
    debugger
    const times = ['09:35:00', '09:40:00', '09:45:00', '09:50:00', '09:55:00', '10:00:00', '10:05:00', '10:10:00', '10:15:00', '10:20:00', '10:25:00', '10:30:00', '10:35:00', '10:40:00', '10:45:00', '10:50:00', '10:55:00', '11:00:00', '11:05:00', '11:10:00', '11:15:00', '11:20:00', '11:25:00', '11:30:00', '11:35:00', '11:40:00', '11:45:00', '11:50:00', '11:55:00', '12:00:00', '12:05:00', '12:10:00', '12:15:00', '12:20:00', '12:25:00', '12:30:00', '12:35:00', '12:40:00', '12:45:00', '12:50:00', '12:55:00', '13:00:00', '13:05:00', '13:10:00', '13:15:00', '13:20:00', '13:25:00', '13:30:00', '13:35:00', '13:40:00', '13:45:00', '13:50:00', '13:55:00', '14:00:00', '14:05:00', '14:10:00', '14:15:00', '14:20:00', '14:25:00', '14:30:00', '14:35:00', '14:40:00', '14:45:00', '14:50:00', '14:55:00', '15:00:00', '15:05:00', '15:10:00', '15:15:00', '15:20:00', '15:25:00', '15:30:00', '15:35:00', '15:40:00', '15:45:00', '15:50:00', '15:55:00', '16:00:00'];
    let prevTime = '09:35:00';
    const data = times.map(time => {
      if (!intradayData.hasOwnProperty(dateString + ' ' + time)) {
        return {
          time,
          price: intradayData[dateString + ' ' + prevTime]['4. close']
        };
      } else {
        prevTime = time;
        return {
          time,
          price: intradayData[dateString + ' ' + time]['4. close']
        };
      }
    });
    const prices = [];
    for (let i = 0; i < data.length; i++) {
      prices.push(parseFloat(data[i].price));
    }
    let max = Math.max(...prices);
    let min = Math.min(...prices);
    let currPrice = intradayData[dateString + ' 16:00:00']['4. close'];
    currPrice = currPrice.split('').splice(0, currPrice.length - 2).join('');
    let openPrice = intradayData[dateString + ' 09:35:00']['1. open'];
    openPrice = openPrice.split('').splice(0, openPrice.length - 2).join('');
    let priceFlux = Math.round((parseFloat(currPrice) - parseFloat(openPrice)) * 100)/100;
    if (priceFlux < 0) {
      priceFlux = priceFlux.toString()[0] + "$" + priceFlux.toString().slice(1);
    } else {
      priceFlux = "+$" + priceFlux.toString().slice(1)
    }
    let priceFluxPercentage = Math.round(((parseFloat(currPrice) - parseFloat(openPrice))/parseFloat(openPrice)) * 10000)/100;
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
            <li>1D</li>
            <li>1W</li>
            <li>1M</li>
            <li>3M</li>
            <li>1Y</li>
            <li>5Y</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StockRechart;
