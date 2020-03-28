import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Register = () => {
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
      console.log('success');
    } else {
      console.log('passwords do not match');
    }
  };
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
            minlength="6"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirm password"
            minlength="6"
            onChange={onChange}
          />
        </div>
        <input type="submit" value="register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already registered? <a href="login.html">Sign in</a>
      </p>
    </Fragment>
  );
};

export default Register;
