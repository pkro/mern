import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';

// I always forget that props is the top level object, not the individual prop ("post")
const PostItem = ({
  auth,
  post: { _id, user, text, likes, comments, date },
}) => {
  return (
    <div className="post bg-white my-1">
      <div>
        <Link to={`/profile/${user._id}`}>
          <img className="round-img" src={user.avatar} alt="profile" />
          <h4>{user.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{moment.utc(date)}</Moment>
        </p>
        <button className="btn">
          <i className="fas fa-thumbs-up"></i>
          {likes.length > 0 && <span> {likes.length}</span>}
        </button>

        <button className="btn">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{' '}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user._id === auth.user._id && (
          <button className="btn btn-danger" type="button">
            <i className="fas fa-times"></i> Delete
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, {})(PostItem);
