import React from 'react';

const Landing = () => {
  return (
    <section class="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer connector</h1>
          <p className="lead">Create developer profile, share and get help</p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">
              Sign up
            </a>
            <a href="login.html" className="btn btn">
              Log in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
