import React from 'react';
import NavBar from '../nav_bar/nav_bar';
import StockChart from '../charts/stock_chart';
import StockAbout from './stock_about';
import StockNews from './stock_news';
import StockTransaction from './stock_transaction';
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
    if (!this.props.stock) {
      this.props.fetchStock(ticker);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.ticker !== prevProps.match.params.ticker) {
      const ticker = this.props.match.params.ticker;
      this.props.fetchStock(ticker);
    }
  }

  render() {
    const { stock, currentUser, logout, createTransaction, errors, loading } = this.props;
    return (
      <div>
        <NavBar currentUser={currentUser} logout={logout} />
        { (stock && !loading) ? (
          <div>
            <section className="stock-show">
              <main>
                <StockChart stock={stock} />
                <StockAbout stock={stock} />
                <StockNews news={stock.news} />
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
