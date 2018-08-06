# Backend Routes
## HTML
  * `GET /` `StaticPagesController#root`
## API Endpoints
### `users`
  * `GET /api/users` - returns id, username and email of each User for the User Search feature
  * `POST /api/users` - sign up

### `session`
  * `POST /api/session` - log in
  * `DELETE /api/session` - log out

### `stocks`
  * `GET /api/stocks` - returns relevant stocks (filtered by data/params
  * `GET /api/stocks/:ticker` - returns a stock

### `stockOwnerships`
  * `GET /api/users/:id/stocks` - returns all stocks owned by a user
  * `POST /api/users/:id/stocks` - adds stock to user's portfolio
  * `PATCH /api/users/:id/stocks` - edit's stock in user's portfolio (num shares owned)
  * `DELETE /api/users/:id/stocks` - remove's stock from user's portfolio

### `stockWatches`
  * `GET /api/users/:id/stock-watches` - returns all stocks watched by a user
  * `POST /api/users/:id/stock-watches` - adds stock to user's watchlist
  * `DELETE /api/users/:id/stock-watches` - removes stock from user's watchlist

### `collections`
  * `GET /api/stocks/:ticker/collections` - returns all collections stock is included in
