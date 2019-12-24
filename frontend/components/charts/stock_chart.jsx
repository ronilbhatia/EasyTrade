import React from 'react';
import { css } from 'react-emotion';
import StockRechartContainer from './stock_rechart_container';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class StockChart extends React.Component {
  render() {
    const { stock } = this.props;
    const { intradayData, dailyData } = this.props.stock;

    // the intraday times which the 1D chart will always render
    const times = ['09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00'];

    let prevPrice, openPrice = dailyData[dailyData.length - 1].close;

    // if market is closed then dailyData will have today's information, therefore previous day's close will actually be second to last item in it
    if (intradayData.length === 0 || dailyData[dailyData.length - 1].date.split("-").join("") === intradayData[intradayData.length - 1].date) {
      openPrice = dailyData[dailyData.length - 2].close;
    }

    // Getting the stock data from the API response into the proper format for recharts
    // Track the most recent price (prevPrice) if data is ever unavailable for a desired time. Initialize prevPrice to prev day close
    // Basic strategy is to iterate through data, stopping at a data point if it matches a desired time.
    // If there is price data (average !== null), use that price, otherwise use prevPrice
    let data = [];
    for (let i = 0; i < intradayData.length; i++) {
      let price;

      if (intradayData[i].minute === times[0]) {
        if (!intradayData[i].label) {
          data.push({
            time: `${intradayData[i].minute} AM ET`,
            price: null
          })
          times.shift();
          continue;
        }
        // check if there is price data, if not take most recent price
        if (!intradayData[i].average) {
          price = prevPrice;
        } else {
          price = intradayData[i].average;
          prevPrice = price;
        }
        let time = (intradayData[i].label.includes(":")) ? `${intradayData[i].label} ET` : `${intradayData[i].label.split(" ")[0]}:00 ${intradayData[i].label.split(" ")[1]} ET`
        data.push({
          time,
          price
        });
        times.shift();
      } else if (intradayData[i].minute === '15:59') {
        data.push({
          time: "4:00 PM ET",
          price: prevPrice
        })
        times.shift();
      } else if (intradayData[i].average) {
        prevPrice = intradayData[i].average;
      }
    }
    // get list of all prices throughout the day to find key data points (high, low)
    const prices = [];
    for (let i = 0; i < data.length; i++) {
      prices.push(parseFloat(data[i].price));
    }
    let max = Math.max(...prices);
    let min = Math.min(...prices);
    let currPrice = Math.round(prevPrice * 100) / 100;
    let priceFlux = Math.round((parseFloat(currPrice) - parseFloat(openPrice)) * 100) / 100;
    let priceFluxPercentage = Math.round(((parseFloat(currPrice) - parseFloat(openPrice)) / parseFloat(openPrice)) * 10000) / 100;
    let neg = "+";
    if (priceFlux < 0) { neg = "-"; }
    let color = (neg === '+') ? "#82ca9d" : "#f45531";
    if (neg === '-') document.getElementsByTagName('body')[0].className = 'negative';

    // After key data points have been determined iterate through rest of times and add nil balance (there will only be remaining times if in middle of market hours)
    for (let i = 0; i < times.length; i++) {
      let hours = parseInt(times[i].split(":")[0]);
      let minutes = times[i].split(":")[1];
      let dayHalf = (hours > 12) ? "PM" : "AM";
      if (hours > 12) hours -= 12;
      let time = `${hours}:${minutes} ${dayHalf} ET`;
      data.push({ time, price: null });
    }

    if (intradayData.length === 0) {
      data = [];
      times.forEach(t => {
        let hours = parseInt(t.split(":")[0]);
        let minutes = t.split(":")[1];
        let dayHalf = (hours >= 12) ? "PM" : "AM";
        if (hours > 12) hours -= 12;
        let time = `${hours}:${minutes} ${dayHalf} ET`;
        let closePrice = dailyData[dailyData.length - 1].close;
        currPrice = closePrice;
        data.push({ time, price: closePrice });
      });
    }

    return (
      <div>
        {
          (Object.keys(stock).length > 31) ? (
            <StockRechartContainer
              stock={stock}
              openPrice={openPrice}
              currPrice={currPrice}
              priceFlux={priceFlux}
              priceFluxPercentage={priceFluxPercentage}
              data={data}
              min={min}
              max={max}
              neg={neg}
              intradayData={intradayData}
              dailyData={dailyData}
              color={color}
            />
          ) : (
              <div className='sweet-loading'>
                <ClipLoader
                  className={override}
                  sizeUnit={"px"}
                  size={150}
                  color={'#123abc'}
                  loading={true}
                />
              </div>
            )
        }
      </div>
    );
  }
}

export default StockChart;
