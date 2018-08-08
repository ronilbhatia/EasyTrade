import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  componentWillUnmount() {
    
  }

  render() {
    let { errors } = this.props;
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
            <input className="signup-button" type="submit" value={buttonTxt} />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);
