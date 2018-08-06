# Sample State
```js
{
  entities: {
    stocks: {
      1: {
        id: 1,
        name: "Starbucks",
        ticket: "SBUX",
        ceo: Kevin Johnson,
        hqLocation: Seattle, Washington
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
        ceo: Jack Dorsey,
        hqLocation: San Francisco, California
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
        ceo: Satya Nadella,
        hqLocation: Redmond, Washington
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
        stockIds: [1, 3]
        img_url: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiT__7Fxc3cAhVo3IMKHV2iCRwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.biography.com%2Fpeople%2Fwarren-buffett-9230729&psig=AOvVaw3YmNlSowvVwhchCIJaK9DI&ust=1533270952353699"
      },
      2: {
        id: 2,
        username: "Jordan Belfort",
        chirpIds: [2]
        img_url: "https://m.media-amazon.com/images/M/MV5BM2QzODgxMTUtZGJhMy00NzJlLTk0NzQtZGZjNjkwMzg4NjNhXkEyXkFqcGdeQXVyNTc3MjUzNTI@._V1_.jpg"
      }
    },
    ownerships: {
      1: {
        id: 1,
        stockId: 1,
        userId: 1
      },
      2: {
        id: 2,
        stockId: 3,
        userId: 1
      },
      3: {
        id: 3,
        stockId: 2,
        userId: 2
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
