import React from 'react';
import PropTypes from 'prop-types';

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
          <a rel="noopener noreferrer" target="_blank" href={website}>
            <i className="fas ga-globe fa-2x"></i>
          </a>
        )}
        {social.youtube && (
          <a rel="noopener noreferrer" target="_blank" href={social.youtube}>
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}
        {social.facebook && (
          <a rel="noopener noreferrer" target="_blank" href={social.facebook}>
            <i className="fab fa-facebook  fa-2x"></i>
          </a>
        )}
        {social.aedin && (
          <a rel="noopener noreferrer" target="_blank" href={social.aedin}>
            <i className="fab fa-aedin fa-2x"></i>
          </a>
        )}

        {social.twitter && (
          <a rel="noopener noreferrer" target="_blank" href={social.twitter}>
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {social.xing && (
          <a rel="noopener noreferrer" target="_blank" href={social.xing}>
            <i className="fab fa-xing fa-2x"></i>
          </a>
        )}
        {social.instagram && (
          <a rel="noopener noreferrer" target="_blank" href={social.instagram}>
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
