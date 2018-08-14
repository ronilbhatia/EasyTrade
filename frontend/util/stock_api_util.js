export const fetchStock = (ticker) => (
  $.ajax({
    url: `api/stocks/${ticker}`
  })
);

export const fetchStockDailyData = ticker => (
  $.ajax({
    method: 'get',
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=U9STF363FZMQNHM6&outputsize=full`
  })
);

export const fetchStockIntradayData = ticker => (
  $.ajax({
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&outputsize=full&apikey=8HKZIEMV1YT01X2A&interval=5min`
  })
);

export const fetchStockHistoricalData = ticker => (
  $.ajax({
    url: `https://api.intrinio.com/historical_data?identifier=${ticker}&start_date=2013-08-10&item=adj_close_price&page_size=2500&sort_order=asc`
  })
);

export const fetchStockNews = ticker => (
  $.ajax({
    url: `https://newsapi.org/v2/everything?q=${ticker}&sortBy=publishedAt&apiKey=f0b1d8074e784145b023467d4fc9c649&language=en&domains=wsj.com,nytimes.com,seekingalpha.com,yahoo.com`
  })
);

export const fetchStockInfo = ticker => {
  var https = require("https");
  var username = "0cb46201c7bd30b4ff564cf83515645a";
  var password = "9a54e4beac615020bfe83040e18ced20";
  var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

  return $.ajax({
    url: `https://api.intrinio.com/companies?ticker=${ticker}`,
    headers: {
      "Authorization": auth
    }
  });
};

export const fetchUserStocks = tickers => {
  let url = 'https://www.alphavantage.co/query?function=BATCH_QUOTES_US&apikey=B46V4AYA6Y9N0447&symbols='
  tickers.forEach(ticker => {
    url += ticker;
  });

  return $.ajax({
    url
  });
};
