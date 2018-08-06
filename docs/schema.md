### `users`

| column name       | data type | details                   |
|-------------------|-----------|---------------------------|
| `id`              | integer   | not null, primary key     |
| `username`        | string    | not null, indexed, unique |
| `email`           | string    | not null, indexed, unique |
| `password_digest` | string    | not null                  |
| `session_token`   | string    | not null, indexed, unique |
| `created_at`      | string    | not null                  |
| `updated_at`      | string    | not null                  |


### `stocks`

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

### `exchanges`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| `id`          | integer   | not null, primary key          |
| `name`        | string    | not null                       |
| `created_at`  | string    | not null                       |
| `updated_at`  | string    | not null                       |

### `stockOwnerships`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| `id`          | integer   | not null, primary key          |
| `user_id`     | integer   | not null, indexed, foreign key |
| `stock_id`    | integer   | not null, indexed, foreign key |
| `created_at`  | string    | not null                       |
| `updated_at`  | string    | not null                       |

### `transactions`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| `id`          | integer   | not null, primary key          |
| `user_id`     | integer   | not null, indexed, foreign_key |
| `stock_id`    | integer   | not null, indexed, foreign_key |
| `price`       | float     | not null                       |
| `num_shares`  | integer   | not null                       |
| `created_at`  | string    | not null                       |
| `updated_at`  | string    | not null                       |

### `stockWatches` (stocks on people's watchlists)

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| `id`          | integer   | not null, primary key          |
| `user_id`     | integer   | not null, indexed, foreign key |
| `stock_id`    | integer   | not null, indexed, foreign key |
| `created_at`  | string    | not null                       |
| `updated_at`  | string    | not null                       |

### `followers`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| `id`          | integer   | not null, primary key          |
| `follower_id` | integer   | not null, indexed, foreign key |
| `followee_id` | integer   | not null, indexed, foreign key |
| `created_at`  | string    | not null                       |
| `updated_at`  | string    | not null                       |

### `collections`

| column name   | data type | details               |
|---------------|-----------|-----------------------|
| `id`          | integer   | not null, primary key |
| `name`        | string    | not null, unique      |
| `created_at`  | string    | not null              |
| `updated_at`  | string    | not null              |

### `collectionItems`

| column name     | data type | details                        |
|-----------------|-----------|--------------------------------|
| `id`            | integer   | not null, primary key          |
| `stock_id`      | integer   | not null, indexed, foreign key |
| `collection_id` | integer   | not null, indexed, foreign key |
| `created_at`    | string    | not null                       |
| `updated_at`    | string    | not null                       |
