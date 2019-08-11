// export const fetchStock = (ticker) => (
//   $.ajax({
//     url: `api/stocks/${ticker}`
//   })
// );

export const fetchStock = (ticker) => (
  $.ajax({
    url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/?token=pk_fb8f7b4b957c4ca2acee83cb23cd44ac`
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
    url: `https://sandbox.iexapis.com/stable/stock/${ticker}/chart/5y/?token=Tpk_9ae29b1583b348919535a4d19affb8dc`
  })
);

export const fetchStockIntradayData = ticker => (
  $.ajax({
    url: `https://cloud.iexapis.com/stable/stock/${ticker}/intraday-prices/?token=pk_fb8f7b4b957c4ca2acee83cb23cd44ac`
  })
);

export const fetchStockNews = ticker => (
  $.ajax({
    url: `https://newsapi.org/v2/everything?q=${ticker}&sortBy=publishedAt&apiKey=f0b1d8074e784145b023467d4fc9c649&language=en&domains=wsj.com,nytimes.com,seekingalpha.com,yahoo.com`
  })
);

export const fetchStockInfo = ticker => (
  $.ajax({
    url: `https://cloud.iexapis.com/stable/stock/aapl/stats?token=pk_fb8f7b4b957c4ca2acee83cb23cd44ac`
  })
);

export const fetchStockInfo2 = ticker => (
  $.ajax({
    url: `https://cloud.iexapis.com/stable/stock/aapl/batch?types=quote&token=pk_fb8f7b4b957c4ca2acee83cb23cd44ac`
  })
);
