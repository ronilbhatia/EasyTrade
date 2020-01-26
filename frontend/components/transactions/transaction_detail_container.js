import { connect } from 'react-redux';
import TransactionDetail from './transaction_detail';

const mapStateToProps = (state, ownProps) => ({
  stock: state.entities.stocks[ownProps.transaction.stock]
});

export default connect(mapStateToProps)(TransactionDetail);
