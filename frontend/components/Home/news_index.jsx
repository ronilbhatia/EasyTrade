import React from 'react';
import StockNewsItem from '../stocks/stock_news_item';

class NewsIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchNews();
  }
  render() {
    const { news } = this.props;
    return (
      <div className='news recent'>
        <h2>Recent News</h2>
        {
          news.hasOwnProperty('0') ? (
            <ul>
              {
                news.map((newsItem, idx) => <StockNewsItem newsItem={newsItem} key={idx} />)
              }
            </ul>
          ) : (
            <div>LOADING</div>
          )
        }
      </div>
    );
  }
}

export default NewsIndex;
