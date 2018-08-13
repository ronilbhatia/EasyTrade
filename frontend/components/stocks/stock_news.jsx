import React from 'react';
import StockNewsItem from './stock_news_item';

class StockNews extends React.Component {
  render() {
    const { news } = this.props;
    console.log(news);
    return (
      <div className='stock-news'>
        <h2>News</h2>
        <ul>
          {
            news.slice(0, 3).map((newsItem, idx) => <StockNewsItem newsItem={newsItem} key={idx} />)
          }
        </ul>
      </div>
    );
  }
}

export default StockNews;
