import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  if (loading && profile === null) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome, {user && user.name}
      </p>

      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You haven't set up a profile yet</p>
          <Link to="/edit-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
