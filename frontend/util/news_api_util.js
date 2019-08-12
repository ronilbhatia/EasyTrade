export const fetchNews = () => (
  $.ajax({
    url: `https://newsapi.org/v2/top-headlines?apiKey=${window.newsKey}&language=en&category=business&country=us`
  })
);
