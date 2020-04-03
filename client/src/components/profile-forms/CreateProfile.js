import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    xing: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [showSocialNetworks, setShowSocialNetworks] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    xing,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, false);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create your profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Add some information to make your profile
        stand out
      </p>
      <small>* = required</small>

      <form action="" onSubmit={onSubmit} className="form">
        <div className="form-group">
          <select name="status" onChange={onChange} value={status}>
            <option value="0">* Select professional status</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Developer">Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or learning">Student or learning</option>
            <option value="Instructor">Instructor</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">Current status / position</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="company"
            placeholder="Company"
            onChange={onChange}
            value={company}
          />
          <small className="form-text">Current company</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="website"
            placeholder="website"
            onChange={onChange}
            value={website}
          />
          <small className="form-text">Your or your company website</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={onChange}
            value={location}
          />
          <small className="form-text">City / State</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="skills"
            placeholder="* Skills"
            onChange={onChange}
            value={skills}
          />
          <small className="form-text">
            Please use a comma separated list (e.g. Java, Python, HTML5)
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="githubusername"
            placeholder="Github Username"
            onChange={onChange}
            value={githubusername}
          />
          <small className="form-text">
            Enter if you want to show your latest repos and a github link in
            your profile
          </small>
        </div>

        <div className="form-group">
          <textarea
            name="bio"
            cols="30"
            rows="4"
            placeholder="A short bio of yourself"
            onChange={onChange}
            value={bio}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn"
            onClick={() => setShowSocialNetworks(!showSocialNetworks)}
          >
            Add social network links
          </button>
          <span>Optional</span>
        </div>
        {showSocialNetworks && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="url"
                name="twitter"
                placeholder="Twitter URL"
                onChange={onChange}
                value={twitter}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="url"
                name="facebook"
                placeholder="facebook URL"
                onChange={onChange}
                value={facebook}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="url"
                name="youtube"
                placeholder="youtube URL"
                onChange={onChange}
                value={youtube}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="url"
                name="linkedin"
                placeholder="linkedin URL"
                onChange={onChange}
                value={linkedin}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-xing fa-2x"></i>
              <input
                type="url"
                name="xing"
                placeholder="# URL"
                onChange={onChange}
                value={xing}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="url"
                name="instagram"
                placeholder="instagram URL"
                onChange={onChange}
                value={instagram}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />

        <a href="dashboard.html" className="btn btn-ligh my-1">
          Go back
        </a>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

// withRouter so we have history object in props
export default connect(null, { createProfile })(withRouter(CreateProfile));
