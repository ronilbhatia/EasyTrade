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

export const fetchStockInfo = ticker => (
  $.ajax({
    url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${ticker}&types=quote,company,info`
  })
);
