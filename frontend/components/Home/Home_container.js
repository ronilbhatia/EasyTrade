import Home from './Home';
import { connect } from 'react-redux';
import { logout, login, fetchUserInfo, fetchUserPortfolio } from '../../actions/session_actions';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  demoLogin: user => dispatch(login(user)),
  fetchUserInfo: user => dispatch(fetchUserInfo(user)),
  fetchUserPortfolio: user => dispatch(fetchUserPortfolio(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);
