# EasyTrade

EasyTrade, a Robinhood clone, is an investing application that allows users to purchase and sell shares of stock in publicly-traded companies

[Live Demo](https://easy-trade.herokuapp.com/#/)

## Technologies
* Backend: Rails/ActiveRecord/PostgreSQL
* Frontend: React/Redux
* [IEX API](https://iextrading.com)
* [News API](https://newsapi.org/)
* [Recharts](http://recharts.org/en-US/)
* [CSS Animate](http://animate.css)
* [Emotion](http://emotion.org/)

## Features
* Secure frontend to backend user authentication using BCrypt
* Real-time and historical data of all stocks traded on the NASDAQ and NYSE exchanges
* Interactive charts to display stock price fluctuation over time as well as user's portfolio balance fluctuation overtime
* Ability to simulate real stock-market trades by buying and selling shares at the most recent market price
* Real-time update of portfolio and remaining buying-power after execution of stock transaction
* Stocks are searchable by both their ticker symbol and Company name
* Relevant news displayed for the general market on home page, and for specific stock on the stock's show page

### Dashboard & Portfolio
Once a user logs in, they are immediately redirected to their dashboard, which shows a chart displaying their portfolio balance over time, a list of stocks owned along with the current share price of the stock, and real-time news.


### Fetching Stock Information
When a stock show page is visited, a variety of API calls are made to fetch the necessary information to render the stock's price chart, information ('About' section) and relevant news articles. The following APIs are hit
* Local back-end API to receive name of Company
* IEX API - 3 separate API calls
  * Stock information (CEO, employees, market cap, P/E ratio)
  * Intraday Data
  * Daily Data
* News API

A thunk action creator `fetchStock` is used to chain these async API calls and ensure that nothing on the page is loaded until all of this information is received on the front-end.

```
export const fetchStock = ticker => dispatch => (
  StockApiUtil.fetchStock(ticker)
    .then(stock => dispatch(receiveStock(stock)))
    .then(() => dispatch(fetchStockInfo(ticker)))
    .then(() => dispatch(fetchStockIntradayData(ticker)))
    .then(() => dispatch(fetchStockDailyData(ticker)))
    .then(() => dispatch(fetchStockNews(ticker)))
);
```

### Dynamic Chart Rendering
Charts are dynamic and interactive, allowing users to switch between ranges of **1D**, **1W**, **1M**, **3M**, **1Y**, and **5Y** for individual stocks or their overall portfolio (the **5Y** range is replaced by the **ALL** range for portfolio chart). Buttons for each range appear below the chart with click handlers installed, which serve to update the React component's state with the relevant chunk of data. The `renderChart` function takes in one of the aforementioned ranges as a string, using it to key into the `RANGES` hash to determine the appropriate portion of the dailyData to grab.

```
const RANGES = {
  '1W': { length: 5, increment: 1},
  '1M': { length: 23, increment: 1},
  '3M': { length: 66, increment: 1},
  '1Y': { length: 251, increment: 1},
  '5Y': { length: 1265, increment: 5},
};
```

```
renderChart(range) {
  let { dailyData } = this.state.initialData;
  let data = [];
  let startIdx = RANGES[range].length;
  if (startIdx > dailyData.length) startIdx = dailyData.length;
  let lastIdx;

  for(let i = dailyData.length - startIdx; i < dailyData.length; i+=RANGES[range].increment) {
    if (i < 0) i = 0;
    data.push({
      time: dailyData[i].date,
      price: dailyData[i].close
    });
    lastIdx = i;
  }

  // Set last date as most recent data point regardless
  if (lastIdx !== dailyData.length - 1) {
    data.push({
      time: dailyData[dailyData.length - 1].date,
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
```

A helper function, `calculateDailyPriceData` is used to calculate key price points that the chart needs to render appropriately including the current price, open price, high(max), low(min), price flux, and price flux percentage.

```
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
```

### Transaction Validation

Users are only allowed to purchase shares of stock if they have adequate buying power. Additionally, they are only allowed to sell, at max, as many shares as they own. These checks are handled by the transactions controller on the back-end, and descriptive error messages will be rendered to the page if a user attempts to make an invalid transaction. The form will only submit and trigger a refresh of the page upon a valid transaction submitted by the user.

```
def create
  @transaction = Transaction.new(transaction_params)
  @transaction.user_id = current_user.id
  @transaction.transaction_date = Time.now

  transaction_amount = @transaction.price * @transaction.num_shares
  shares_owned = current_user.shares_owned(@transaction.stock_id)

  if transaction_amount > current_user.calculate_buying_power && @transaction.order_type == 'buy'
    render json: ['Not Enough Buying Power'], status: 401
  elsif @transaction.num_shares > shares_owned && @transaction.order_type == 'sell'
    render json: ['Not Enough Shares'], status: 401
  else
    if @transaction.save
      render json: ['success'], status: 200
    else
      render json: @transaction.errors.full_messages, status: 422
    end
  end
end
```
