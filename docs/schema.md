# Database Schema
## `users`

| column name       | data type | details                   |
|-------------------|-----------|---------------------------|
| `id`              | integer   | not null, primary key     |
| `username`        | string    | not null, indexed, unique |
| `email`           | string    | not null, indexed, unique |
| `password_digest` | string    | not null                  |
| `session_token`   | string    | not null, indexed, unique |
| `created_at`      | string    | not null                  |
| `updated_at`      | string    | not null                  |

* index on `username, unique: true`
* index on `email, unique: true`
* index on `session_token, unique: true`

## `stocks`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| `id`          | integer   | not null, primary key          |
| `name`        | string    | not null                       |
| `ticker`      | string    | not null, indexed, unique      |
| `max_shares`  | integer   | not null                       |
| `ceo`         | string    |                                |
| `hq_location` | string    |                                |
| `exchange_id` | string    | not null, indexed, foreign_key |
| `created_at`  | string    | not null                       |
| `updated_at`  | string    | not null                       |

* `exchange_id` references `exchanges`
* index on `exchange_id`
* index on `ticker, unique: true`

## `exchanges`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| `id`          | integer   | not null, primary key          |
| `name`        | string    | not null                       |
| `created_at`  | string    | not null                       |
| `updated_at`  | string    | not null                       |

## `transactions`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| `id`          | integer   | not null, primary key          |
| `user_id`     | integer   | not null, indexed, foreign_key |
| `stock_id`    | integer   | not null, indexed, foreign_key |
| `price`       | float     | not null                       |
| `num_shares`  | integer   | not null                       |
| `created_at`  | string    | not null                       |
| `updated_at`  | string    | not null                       |

* `user_id` references `users`
* `stock_id` references `stocks`
* index on `[stock_id, user_id]`
* index on `user_id`

## `deposits`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| `id`          | integer   | not null, primary key          |
| `user_id`     | integer   | not null, indexed, foreign_key |
| `amount`      | float     | not null                       |
| `created_at`  | string    | not null                       |
| `updated_at`  | string    | not null                       |

* `user_id` references `users`
* index on `user_id`

## `stockWatches` (stocks on people's watchlists)

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| `id`          | integer   | not null, primary key          |
| `user_id`     | integer   | not null, indexed, foreign key |
| `stock_id`    | integer   | not null, indexed, foreign key |
| `created_at`  | string    | not null                       |
| `updated_at`  | string    | not null                       |

* `user_id` references `users`
* `stock_id` references `stocks`
* index on `[stock_id, user_id], unique: true`
* index on `user_id`

## `followers`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| `id`          | integer   | not null, primary key          |
| `follower_id` | integer   | not null, indexed, foreign key |
| `followee_id` | integer   | not null, indexed, foreign key |
| `created_at`  | string    | not null                       |
| `updated_at`  | string    | not null                       |

* `follower_id` and `followee_id` reference `users`
* index on `[follower_id, followee_id], unique: true`
* index on `followee_id`

## `collections`

| column name   | data type | details               |
|---------------|-----------|-----------------------|
| `id`          | integer   | not null, primary key |
| `name`        | string    | not null, unique      |
| `created_at`  | string    | not null              |
| `updated_at`  | string    | not null              |

## `collectionItems`

| column name     | data type | details                        |
|-----------------|-----------|--------------------------------|
| `id`            | integer   | not null, primary key          |
| `stock_id`      | integer   | not null, indexed, foreign key |
| `collection_id` | integer   | not null, indexed, foreign key |
| `created_at`    | string    | not null                       |
| `updated_at`    | string    | not null                       |

* `stock_id` references `stocks`
* `collection_id` references `collections`
* index on `[collection_id, stock_id]`
* index on `stock_id`
