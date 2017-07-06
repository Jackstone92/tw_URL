import React from 'react';

const Header = () => {
  return(
    <nav className="nav navbar-default navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand">tw_URL</a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>Enterprise</li>
            <li>Resources</li>
            <li>Blog</li>
            <li>About</li>
          </ul>
          <div className="navButtonWrapper">
            <button className="btn btn-default navbar-btn">Log In</button>
            <button className="btn btn-success navbar-btn">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
