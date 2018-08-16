export const createTransaction = transaction => (
  $.ajax({
    url: '/api/transactions',
    method: 'post',
    data: { transaction }
  })
);
