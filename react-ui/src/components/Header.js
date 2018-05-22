import React from 'react';
import logo from '../images/Asset-3.png';

export default () => (
  <div className="header">
    <a href="/">
      <img className="logo" src={logo} alt="logo" />
      <h1 className="title">weather</h1>
    </a>
  </div>
);
