### Users Table

| column name     | data type | details                   |
|-----------------|-----------|---------------------------|
| id              | integer   | not null, primary key     |
| username        | string    | not null, indexed, unique |
| email           | string    | not null, indexed, unique |
| img_url         | string    | not null                  |
| password_digest | string    | not null                  |
| session_token   | string    | not null, indexed, unique |
| created_at      | string    | not null                  |
| updated_at      | string    | not null                  |

### Stocks Table

| column name | data type | details                        |
|-------------|-----------|--------------------------------|
| id          | integer   | not null, primary key          |
| name        | string    | not null                       |
| ticker      | string    | not null, indexed, unique      |
| ceo         | string    |                                |
| hq_location | string    |                                |
| exchange_id | string    | not null, indexed, foreign_key |
| created_at  | string    | not null                       |
| updated_at  | string    | not null                       |

### Exchange Table

| column name | data type | details                        |
|-------------|-----------|--------------------------------|
| id          | integer   | not null, primary key          |
| name        | string    | not null                       |
| created_at  | string    | not null                       |
| updated_at  | string    | not null                       |

### Stock Ownerships Table

| column name | data type | details                        |
|-------------|-----------|--------------------------------|
| id          | integer   | not null, primary key          |
| user_id     | integer   | not null, indexed, foreign key |
| stock_id    | integer   | not null, indexed, foreign key |
| created_at  | string    | not null                       |
| updated_at  | string    | not null                       |

### Stock Watches Table (stocks on people's watchlists)
