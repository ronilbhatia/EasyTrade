import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
  }

  componentDidMount() {
    // this.props.location.state only exists if demo login was triggered from
    // sign up or splash page
    if (this.props.location.state) {
      this.handleDemoLogin();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleDemoLogin() {
    if (this.props.formType === 'signup') {
      this.props.history.push({
        pathname: '/login',
        state: { isDemo: true }
      });
      return
    }

    const username = 'wbuffet'.split('');
    this.handleDemoUsername(username);
  }

  handleDemoUsername(username) {
    setTimeout(() => {
      this.setState({ username: this.state.username + username.shift() }, () => {
        if (username.length === 0) {
          const password = 'password'.split('');
          this.handleDemoPassword(password)
        } else {
          this.handleDemoUsername(username);
        }
      })
    }, 150)
  }

  handleDemoPassword(password) {
    setTimeout(() => {
      this.setState({ password: this.state.password + password.shift() }, () => {
        if (password.length === 0) {
          this.props.demoLogin(this.state);
        } else {
          this.handleDemoPassword(password);
        }
      })
    }, 150)
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  componentWillUnmount() {
    this.props.receiveErrors([]);
  }

  render() {
    let { errors, demoLogin } = this.props;
    let path, linkTxt, buttonTxt, emailField;
    if (this.props.formType === 'signup') {
      path = '/login';
      linkTxt = 'Sign In';
      buttonTxt = 'Sign Up';
      emailField = (
        <label>Email
          <br />
          <input required type="text" onChange={this.update('email')} value={this.state.email} />
          <br />
        </label>
      );
    } else {
      path = '/signup';
      linkTxt = 'Sign Up';
      buttonTxt = 'Sign In';
      emailField = "";
    }

    return (
      <div className="sessionform">
        <div className="sessionform-image">
        </div>
        <div className="sessionform-text">
          <h2>Welcome to EasyTrade</h2>
          <form onSubmit={this.handleSubmit}>
            {emailField}
            <label>Username
              <br />
              <input required type="text" onChange={this.update('username')} value={this.state.username} />
            </label>
            <br />
            <label>Password
              <br />
              <input required type="password" onChange={this.update('password')} value={this.state.password} />
            </label>
            <br />
            <ul className="sessionform-errors">
              {
                errors.map((error, idx) => <li key={idx}><img src={window.images.exclamation_circle} />{error}</li>)
              }
            </ul>
            <div className="session-buttons">
              <input className="signup-button" type="submit" value={buttonTxt} />
              <button type="button" className="signup-button demo" onClick={this.handleDemoLogin}>Demo</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);
