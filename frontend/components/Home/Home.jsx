import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NavBar from '../nav_bar/nav_bar';
import Splash from './splash';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser, logout, demoLogin } = this.props;
    const demoUser = {
      username: 'user',
      password: 'testing'
    };
    const display = currentUser ? (
      <div>
        <NavBar currentUser={currentUser} logout={logout}/>
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
            <img className="pane1-img" src={window.images.pane1_img}/>
          </section>
        </main>
      </div>
    ) : (
      <div>
        <NavBar currentUser={currentUser} demoLogin={demoLogin} demoUser={demoUser}/>
        <Splash demoLogin={demoLogin} demoUser={demoUser}/>
      </div>
    );
    return (
      <div>
        {display}
      </div>
    );
  }
}

export default Home;
