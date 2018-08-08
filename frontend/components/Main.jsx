import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser } = this.props;
    const display = currentUser ? (
      <div>
        {currentUser.username}
        <button onClick={this.props.logout}>Log Out!</button>
      </div>
    ) : (
      <div>
        <nav className="nav-bar">
          <img src={"http://xignite-cdn.s3.amazonaws.com/static/Mobile%20Apps/EM3Robinhood/applogo_robinhood.png"} />
          <section className="nav-links">
            <NavLink to="/login" className="nav-link">Log In</NavLink>
            <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
          </section>
        </nav>
        <main className="panes">
          <section className="pane1">
            <section className="pane1-text">
              <header>
                <h1>Investing.</h1>
                <h1>Now for the rest of us.</h1>
              </header>
              <div>
                <p>EasyTrade lets you learn to invest in the stock</p>
                <p>market for free.</p>
              </div>
              <Link to="/signup" className="signup-button">Sign Up</Link>
            </section>
            <img className="pane1-img" src="https://d2ue93q3u507c2.cloudfront.net/assets/marketing/images/home_redesign/iPhoneHome_still.png"/>
          </section>
        </main>
      </div>
    );
    return (
      <div>
        {display}
      </div>
    );
  }
}

export default Main;
