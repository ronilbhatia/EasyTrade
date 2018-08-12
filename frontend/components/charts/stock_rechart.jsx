import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

class StockRechart extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = this.props.data;
  // }

  render() {
    let { currPrice, priceFlux, priceFluxPercentage, data, min, max } = this.props;
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
