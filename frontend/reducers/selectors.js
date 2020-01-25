export const transactionsForStock = (state, ticker) => {
  return Object.values(state.entities.transactions)
    .filter(transaction => transaction.stock === ticker);
}