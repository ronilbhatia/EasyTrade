# Sample State
```js
{
  entities: {
    stocks: {
      1: {
        id: 1,
        name: "Starbucks",
        ticket: "SBUX",
        ceo: "Kevin Johnson",
        hqLocation: "Seattle, Washington"
        price: 52.00,
        dayHigh: 52.24,
        dayLow: 51.25,
        marketCap: 72,420,000,000
        peRatio: 16.28
      },
      2: {
        id: 2,
        name: "Twitter",
        ticket: "TWTR",
        ceo: "Jack Dorsey",
        hqLocation: "San Francisco, California"
        price: 31.96,
        dayHigh: 32.59,
        dayLow: 31.46,
        marketCap: 23,970,000,000,
        peRatio: 106.37
      },
      3: {
        id: 3,
        name: "Microsoft",
        ticket: "MSFT",
        ceo: "Satya Nadella",
        hqLocation: "Redmond, Washington"
        price: 106.43,
        dayHigh: 106.45,
        dayLow: 105.42,
        marketCap: 814,380,000,000,
        peRatio: 50.37
      },
    },
    users: {
      1: {
        id: 1,
        username: "Warren Buffett",
        imgUrl: "https://s3.amazonaws.com/easytrade/filename"
      },
      2: {
        id: 2,
        username: "Jordan Belfort",
        imgUrl: "https://s3.amazonaws.com/easytrade/filename"
      }
    },
    transactions: {
      1: {
        id: 1,
        stockId: 1,
        userId: 1,
        price: 52.00
        num_shares: 30
      },
      2: {
        id: 2,
        stockId: 3,
        userId: 1,
        price: 31.96,
        num_shares: 200
      },
      3: {
        id: 3,
        stockId: 2,
        userId: 2,
        price: 106.43,
        num_shares: 10
      }
    },
    watches: {
      1: {
        id: 1,
        stockId: 3,
        userId: 1
      },
      2: {
        id: 2,
        stockId: 1,
        userId: 3
      },
      3: {
        id: 3,
        stockId: 3,
        userId: 2
      }
    },
  },
  ui: {
    loading: true/false
  },
  errors: {
    login: ["Incorrect username/password combination"],
    tradeForm: ["Not enough buying power"],
  },
  session: { currentUserId: 1 }
}

```
