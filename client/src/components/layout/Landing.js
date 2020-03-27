import React from 'react';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer connector</h1>
          <p className="lead">Create developer profile, share and get help</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign up
            </Link>
            <Link to="/login" className="btn">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
