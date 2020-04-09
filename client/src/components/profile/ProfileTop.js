import React from 'react';
import PropTypes from 'prop-types';
import Profile from './Profile';
import { Link } from 'react-router-dom';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  console.log(website);
  return (
    <div className="profile-top bg-primary p-2">
      <img src={avatar} alt="Profile" className="round-img my-1" />

      <h1 className="large">{name}</h1>
      <p>
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location}</p>
      <div className="icons my-1">
        {website && (
          <Link to={website}>
            <i className="fas ga-globe fa-2x"></i>
          </Link>
        )}
        {social.youtube && (
          <Link to={social.youtube}>
            <i className="fab fa-youtube fa-2x"></i>
          </Link>
        )}
        {social.facebook && (
          <Link to={social.facebook}>
            <i className="fab fa-facebook  fa-2x"></i>
          </Link>
        )}
        {social.linkedin && (
          <Link to={social.linkedin}>
            <i className="fab fa-linkedin fa-2x"></i>
          </Link>
        )}

        {social.twitter && (
          <Link to={social.twitter}>
            <i className="fab fa-twitter fa-2x"></i>
          </Link>
        )}
        {social.xing && (
          <Link to={social.xing}>
            <i className="fab fa-xing fa-2x"></i>
          </Link>
        )}
        {social.instagram && (
          <Link to={social.instagram}>
            <i className="fab fa-instagram fa-2x"></i>
          </Link>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
