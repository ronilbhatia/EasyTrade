import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, receiveErrors } from '../../actions/session_actions';

const mapStateToProps = state => ({
  errors: state.errors.session,
  formType: 'Sign In'
});

const mapDispatchToProps = dispatch => ({
  processForm: user => dispatch(login(user)),
  demoLogin: user => dispatch(login(user)),
  receiveErrors: errors => dispatch(receiveErrors(errors))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
