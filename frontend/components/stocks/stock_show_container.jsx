import { connect } from 'react-redux';
import StockShow from './stock_show';
import { fetchStock } from '../../actions/stock_actions';

const mapStateToProps = (state, ownProps) => ({
  stock: state.entities.stocks[ownProps.match.params.ticker]
});

const mapDispatchToProps = dispatch => ({
  fetchStock: ticker => dispatch(fetchStock(ticker))
});

export default connect(mapStateToProps, mapDispatchToProps)(StockShow);
