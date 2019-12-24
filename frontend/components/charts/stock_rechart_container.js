import { connect } from 'react-redux';
import StockRechart from './stock_rechart';
import { fetchStock5yData } from '../../actions/stock_actions';

const mapStateToProps = ({ ui: { dailyLoading } }) => ({
  loading: dailyLoading
})

const mapDispatchToProps = dispatch => ({
  fetchStock5yData: ticker => dispatch(fetchStock5yData(ticker))
});

export default connect(mapStateToProps, mapDispatchToProps)(StockRechart);
