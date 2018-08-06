## Frontend Routes and Components
Our components are organized as follows:
* `Root`
  * `App`
    * `NavBar`
    * (main component goes here)
    * `Footer`

The following routes, defined in `App`, will render components between `NavBar` and `Footer`.

* `/` (not logged in)
  * `Splash`

* `/` (logged in)
  * `HistoryChartShow`
  * `NewsIndex`
    * `NewsIndexItem`
  * `StockIndex`
    * `StockIndexItem`
* `/login`
  * `SessionForm`
* `/signup`
  * `SessionForm`
* `/users/userId`
  * `ProfileComponent`
  * `StockIndex`
    * `StockIndexItem`
* `/stocks/:stockTicker`
  * `StockShow`
* `/collections/:collectionName`
  * `CollectionShow`
