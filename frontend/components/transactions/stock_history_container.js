import { connect } from 'react-redux';
import StockHistory from './stock_history';
import { fetchTransactions } from '../../actions/transaction_actions';
import { fetchStockBasic } from '../../actions/stock_actions';
import { logout } from '../../actions/session_actions';
import { transactionsForStock } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
  transactions: transactionsForStock(state, ownProps.match.params.ticker),
  stock: state.entities.stocks[ownProps.match.params.ticker],
  currentUser: state.entities.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
  fetchTransactions: () => dispatch(fetchTransactions()),
  fetchStockBasic: ticker => dispatch(fetchStockBasic(ticker)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(StockHistory);