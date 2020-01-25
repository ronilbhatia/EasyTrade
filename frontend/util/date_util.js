export const formatTransactionDate = date => {
  const dateParts = new Date(date).toDateString().split(' ').slice(1);
  dateParts[1] += ',';
  return dateParts.join(' ');
}