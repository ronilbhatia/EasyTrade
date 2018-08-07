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
  * `GET /api/stocks` - returns relevant stocks (filtered by data/params)
  * `GET /api/stocks/:ticker` - returns a stock

### `transactions`
  * `GET /api/transactions` - returns all of current user's transactions
  * `POST /api/transactions` - adds current user transaction
  * `PATCH /api/transactions` - edits current user transaction
  * `DELETE /api/transactions` - removes current user transaction

### `stockWatches`
  * `GET /api/stock-watches` - returns all stocks watched by a user
  * `POST /api/stock-watches` - adds stock to user's watchlist
  * `DELETE /api/stock-watches` - removes stock from user's watchlist

### `collections`
  * `GET /api/stocks/:ticker/collections` - returns all collections stock is included in
