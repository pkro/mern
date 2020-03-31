import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({ isAuthenticated, logout }) => {
  let links;
  if (isAuthenticated) {
    links = (
      <ul>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  } else {
    links = (
      <ul>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i>
        </Link>
        Dev connector
      </h1>
      {links}
    </nav>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { logout })(Navbar);
