import React from 'react';
import NavBar from '../nav_bar/nav_bar';
import StockChart from '../charts/stock_chart';
import StockAbout from './stock_about';
import StockNews from './stock_news';
import StockTransaction from './stock_transaction';
import { css } from 'react-emotion';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class StockShow extends React.Component {
  componentDidMount() {
    const ticker = this.props.match.params.ticker;
    this.props.fetchStock(ticker);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.ticker !== this.props.match.params.ticker) {
      const ticker = nextProps.match.params.ticker;
      this.props.fetchStock(ticker);
    }
  }

  render() {
    const { stock, currentUser, logout, createTransaction } = this.props;
    return (
      <div>
        <NavBar currentUser={currentUser} logout={logout}/>
          {stock && stock.hasOwnProperty('shortDescription') && stock.hasOwnProperty('intradayData') && stock.hasOwnProperty('dailyData') && stock.hasOwnProperty('news') ? (
            <section className="stock-show">
              <main>
                <StockChart stock={stock} />
                <StockAbout stock={stock} />
                <StockNews news={stock.news} />
              </main>
              <StockTransaction currentUser={currentUser} stock={stock} createTransaction={createTransaction}/>
            </section>
          ) : (
            <div className='stock-loading'>
              <BeatLoader
                className={override}
                sizeUnit={"px"}
                size={20}
                color={'#21ce99'}
                loading={true}
              />
            </div>
          )}
      </div>
    );
  }
}

export default StockShow;
