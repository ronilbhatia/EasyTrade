import React from 'react';
import { Link } from 'react-router-dom';

const Splash = ({ demoLogin, demoUser }) => {
  return (
    <main className="panes">
      <section className="pane1">
        <section className="pane1-text">
          <header>
            <h1 class="animated fadeInUp">Investing.</h1>
            <h1 class="animated fadeInUp delay-1s">Now for the rest of us.</h1>
          </header>
          <div>
            <p class="animated fadeInUp delay-2s">EasyTrade lets you learn to invest in the stock</p>
            <p class="animated fadeInUp delay-2s">market for free.</p>
          </div>
          <button class="signup-button animated fadeInUp delay-3s" onClick={() => demoLogin(demoUser)}>Demo</button>
        </section>
        <img class="pane1-img animated fadeIn delay-2s" src={window.images.pane1_img}/>
      </section>
    </main>
  );
};

export default Splash;
