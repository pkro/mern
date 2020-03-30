import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Link } from 'react-router-dom';

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData; // destructured just so we don't have to use formData.name etc.

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); // [] so we can use it as key: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names

  const onSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign up</h1>
      <div className="lead">
        <i className="fas fa-user"></i>
        <p>Log into your account</p>
      </div>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={onChange}
          />
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
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </Fragment>
  );
};

export default connect(null, { login })(Login);
