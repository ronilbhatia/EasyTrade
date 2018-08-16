import { connect } from 'react-redux';
import StockShow from './stock_show';
import { logout } from '../../actions/session_actions';
import {
  fetchStock,
  fetchStockInfo,
  fetchStockIntradayData,
  fetchStockDailyData,
  fetchStockNews
} from '../../actions/stock_actions';
import { createTransaction } from '../../util/transaction_api_util';

const mapStateToProps = (state, ownProps) => {
  return {
    stock: state.entities.stocks[ownProps.match.params.ticker],
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = dispatch => ({
  fetchStock: ticker => dispatch(fetchStock(ticker)),
  fetchStockInfo: ticker => dispatch(fetchStockInfo(ticker)),
  fetchStockIntradayData: ticker => dispatch(fetchStockIntradayData(ticker)),
  fetchStockDailyData: ticker => dispatch(fetchStockDailyData(ticker)),
  fetchStockNews: ticker => dispatch(fetchStockNews(ticker)),
  createTransaction: transaction => createTransaction(transaction),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(StockShow);
