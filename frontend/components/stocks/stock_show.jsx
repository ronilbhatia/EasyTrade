import React from 'react';
import NavBar from '../nav_bar/nav_bar';
import StockChart from '../charts/stock_chart';
import StockAbout from './stock_about';
import StockNews from './stock_news';
import StockTransaction from './stock_transaction';
import StockShowHistory from '../transactions/stock_show_history';
import Footer from '../footer/footer';
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
    if (!this.props.stock || !this.props.stock.hasOwnProperty('intradayData')) {
      this.props.fetchStock(ticker);
    } 
    if (!this.props.transactions.length) this.props.fetchTransactions();
  }

  componentDidUpdate(prevProps) {
    if ((this.props.match.params.ticker !== prevProps.match.params.ticker) && !this.props.stock) {
      const ticker = this.props.match.params.ticker;
      this.props.fetchStock(ticker);
    }
  }

  render() {
    const { stock, currentUser, logout, createTransaction, transactions, errors, loading } = this.props;
    return (
      <div>
        <NavBar currentUser={currentUser} logout={logout} />
        { (stock && stock.hasOwnProperty('intradayData') && !loading) ? (
          <div>
            <section className="stock-show">
              <main>
                <StockChart stock={stock} />
                <StockAbout stock={stock} />
                <StockNews news={stock.news} />
                { transactions.length ? <StockShowHistory transactions={transactions} stock={stock}/> : '' }
              </main>
              <StockTransaction currentUser={currentUser} stock={stock} errors={errors} createTransaction={createTransaction} />
            </section>
            <Footer />
          </div>
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
