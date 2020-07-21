export const fetchNews = () => (
  $.ajax({
    url: '/api/news'
  })
);
