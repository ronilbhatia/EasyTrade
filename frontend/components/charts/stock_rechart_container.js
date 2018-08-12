import { connect } from 'react-redux';
import StockRechart from './stock_rechart';
import fetchStockIntradayData from '../../actions/stock_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  return {
    stock: state.entities.stocks[ownProps.match.params.ticker],
  };
};

const mapDispatchToProps = dispatch => ({
  fetchStockIntradayData: ticker => dispatch(fetchStockIntradayData(ticker)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StockRechart));
