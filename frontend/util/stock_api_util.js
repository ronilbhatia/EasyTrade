export const fetchStock = (ticker) => (
  $.ajax({
    url: `api/stocks/${ticker}`
  })
);

export const fetchStocks = () => (
  $.ajax({
    url: 'api/stocks'
  })
);

export const fetchStockDailyData = ticker => (
  $.ajax({
    method: 'get',
    url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/5y`
  })
);

export const fetchStockIntradayData = ticker => (
  $.ajax({
    url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/1d`
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

// export const fetchStockInfo = ticker => {
//   var https = require("https");
//   var username = "0cb46201c7bd30b4ff564cf83515645a";
//   var password = "9a54e4beac615020bfe83040e18ced20";
//   var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
//
//   return $.ajax({
//     url: `https://api.intrinio.com/companies?ticker=${ticker}`,
//     headers: {
//       "Authorization": auth
//     }
//   });
// };

export const fetchStockInfo = ticker => (
  $.ajax({
    url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${ticker}&types=quote,news,company,chart&range=1d&last=5`
  })
);

// export const fetchUserStocks = tickers => {
//   let url = 'https://www.alphavantage.co/query?function=BATCH_QUOTES_US&apikey=B46V4AYA6Y9N0447&symbols='
//   tickers.forEach(ticker => {
//     url += ticker;
//   });
//
//   return $.ajax({
//     url
//   });
// };
