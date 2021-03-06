import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addProfileData } from '../../actions/profile';

const AddEducation = ({ history, addProfileData }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: true,
    description: '',
  });

  const [toDateDisabled, toggleToDateDisabled] = useState(true);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addProfileData('education', formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add your education</h1>
      <p className="lead">
        <i className="fas fa-book"></i>Add any school, bootcamp, etc. that you
        have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="school"
            placeholder="* School or bootcamp"
            value={school}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="degree"
            placeholder="* Degree or certificate"
            value={degree}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="fieldofstudy"
            placeholder="Field of study"
            value={fieldofstudy}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={toDateDisabled}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value=""
              checked={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleToDateDisabled(!toDateDisabled);
              }}
            />
            Current School
          </p>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addProfileData })(withRouter(AddEducation));
