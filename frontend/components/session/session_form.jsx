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
  render() {
    let { errors } = this.props;
    let path, linkTxt, buttonTxt, emailField;
    if (this.props.formType === 'signup') {
      path = '/login';
      linkTxt = 'Sign In!';
      buttonTxt = 'Sign Up!';
      emailField = (
        <label>Email
          <input type="text" onChange={this.update('email')} value={this.state.email} />
          <br />
        </label>
      );
    } else {
      path = '/signup';
      linkTxt = 'Sign Up!';
      buttonTxt = 'Sign In!';
      emailField = "";
    }

    return (
      <div>
        <ul>
          {
            errors.map((error, idx) => <li key={idx}>{error}</li>)
          }
        </ul>
        <h1>{buttonTxt}</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Username
            <input type="text" onChange={this.update('username')} value={this.state.username} />
          </label>
          <br />
          {emailField}
          <label>Password
            <input type="password" onChange={this.update('password')} value={this.state.password} />
          </label>
          <input type="submit" value={buttonTxt} />
        </form>
        <Link to={path}>{linkTxt}</Link>
      </div>
    );
  }
}

export default withRouter(SessionForm);
