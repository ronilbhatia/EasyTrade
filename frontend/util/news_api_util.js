export const fetchNews = () => (
  $.ajax({
    url: 'https://newsapi.org/v2/top-headlines?apiKey=f0b1d8074e784145b023467d4fc9c649&language=en&sources=bloomberg,business-insider,cnbc'
  })
);
