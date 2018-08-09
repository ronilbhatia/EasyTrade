import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ currentUser, demoLogin, demoUser, logout }) => {
  const display = currentUser ? (
    <nav className="nav-bar">
      <img src={window.images.logo} />
      <section className="nav-links">
        <button onClick={logout} className="nav-link">Log Out</button>
      </section>
    </nav>
  ) : (
    <nav className="nav-bar">
      <img src={window.images.logo} />
      <section className="nav-links">
        <button onClick={() => demoLogin(demoUser)} className="nav-link">Demo</button>
        <NavLink to="/login" className="nav-link">Log In</NavLink>
        <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
      </section>
    </nav>
  );
  return (
    <div>
      {display}
    </div>
  );
};

export default NavBar;
