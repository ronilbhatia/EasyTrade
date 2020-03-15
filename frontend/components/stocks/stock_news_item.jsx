import React from 'react';

const StockNewsItem = ({ newsItem }) => {
  const sources = {
    'Yahoo.com': 'Yahoo Finance',
    'Seekingalpha.com': 'Seeking Alpha',
    'The Wall Street Journal': 'Wall Street Journal',
    'The New York Times': 'New York Times'
  };
  return (
    <li>
      <a target="_blank" href={newsItem.url} className="stock-news-item">
        <img src={newsItem.urlToImage} />
        <main>
          <h4>{newsItem.source.name}</h4>
          <h3>{newsItem.title}</h3>
          <p>{newsItem.description}</p>
        </main>
      </a>
    </li>
  );
};

export default StockNewsItem
