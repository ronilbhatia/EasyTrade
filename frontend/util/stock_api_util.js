export const fetchStock = (ticker) => (
  $.ajax({
    url: `api/stocks/${ticker}`
  })
);

export const fetchStockDailyData = ticker => (
  $.ajax({
    method: 'get',
    url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=8HKZIEMV1YT01X2A`
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
  })
};
// export { request };

// .then(res => console.log(res["Time Series (Daily)"]['2018-08-08']))
