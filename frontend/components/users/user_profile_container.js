import { connect } from 'react-redux';
import UserProfile from './user_profile';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.id]
});

export default connect(mapStateToProps, null)(UserProfile);
