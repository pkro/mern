import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { deleteProfileData } from '../../actions/profile';

export const Experience = ({ experience, deleteProfileData }) => {
  console.log(experience);
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
        {exp.to ? (
          <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
        ) : (
          ' Now'
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteProfileData('experience', exp._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array,
  deleteProfileData: PropTypes.func.isRequired,
};

export default connect(null, { deleteProfileData })(Experience);
