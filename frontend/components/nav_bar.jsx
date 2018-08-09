import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  const display = props.currentUser ? (
    <nav className="nav-bar">
      <img src={window.images.logo} />
      <section className="nav-links">
        <button onClick={props.logout} className="nav-link">Log Out</button>
      </section>
    </nav>
  ) : (
    <nav className="nav-bar">
      <img src={window.images.logo} />
      <section className="nav-links">
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
