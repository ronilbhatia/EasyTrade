export const transactionsForStock = (state, ticker) => {
  return Object.values(state.entities.transactions)
    .filter(transaction => transaction.stock === ticker)
    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
}