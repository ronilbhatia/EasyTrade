export const createTransaction = transaction => (
  $.ajax({
    url: '/api/transactions',
    method: 'post',
    data: { transaction }
  })
);

export const fetchTransactions = () => (
  $.ajax({
    url: '/api/transactions'
  })
);