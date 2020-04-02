import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  console.log(isAuthenticated);
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps, {})(Landing);
