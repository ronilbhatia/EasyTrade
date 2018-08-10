export const fetchStock = (ticker) => (
  $.ajax({
    url: `api/stocks/${ticker}`
  })
);

const getStockDailyData = ticker => $.ajax({
    method: 'get',
    url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=8HKZIEMV1YT01X2A'
});

// .then(res => console.log(res["Time Series (Daily)"]['2018-08-08']))
