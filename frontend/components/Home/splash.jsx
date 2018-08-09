import React from 'react';
import { Link } from 'react-router-dom';

const Splash = ({ demoLogin, demoUser }) => {
  return (
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
          <button className="signup-button" onClick={() => demoLogin(demoUser)}>Demo</button>
        </section>
        <img className="pane1-img" src="https://d2ue93q3u507c2.cloudfront.net/assets/marketing/images/home_redesign/iPhoneHome_still.png"/>
      </section>
    </main>
  );
};

export default Splash;
