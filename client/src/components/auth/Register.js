import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  // destructured props so we can use setAlert instead of props.setAlert (if we used (props) => ...)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData; // destructured just so we don't have to use formData.name etc.

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); // [] so we can use it as key: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names

  const onSubmit = e => {
    e.preventDefault();
    if (password === password2) {
      register({ name, email, password });
    } else {
      setAlert('Passwords do not match', 'danger', 3000);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign up</h1>
      <div className="lead">
        <i className="fas fa-user"></i>
        <p>Create your account</p>
      </div>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            minLength="6"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirm password"
            minLength="6"
            onChange={onChange}
          />
        </div>
        <input type="submit" value="register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already registered? <Link to="/login">Sign in</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { setAlert, register })(Register);
// export default connect(STATE, { ACTION(s) })(COMPONENT);
