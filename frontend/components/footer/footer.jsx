import React from 'react';

const Footer = (props) => (
  <div className='footer'>
    <a href="mailto:ronilbhatia@gmail.com"><img src={window.images.email} /></a>
    <a href="https://github.com/ronilbhatia"><img className="github" src={window.images.github2} /></a>
    <a href="https://www.linkedin.com/in/ronilbhatia/"><img src={window.images.linkedin} /></a>
  </div>
);

export default Footer;
