import { connect } from 'react-redux';
import StockShow from './post_show';
import { fetchPost } from '../../actions/post_actions';

const mapStateToProps = (state, ownProps) => ({
  stock: state.stocks[ownProps.match.params.stockId]
});

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id))
});

export default connect (mapStateToProps, mapDispatchToProps)(StockShow);
