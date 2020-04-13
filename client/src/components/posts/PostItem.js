import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { addLikesUnlikes, deletePost } from '../../actions/post';

// I always forget that props is the top level object, not the individual prop ("post")
const PostItem = ({
  auth,
  post: { _id, user, avatar, text, likes, comments, date, name },
  addLikesUnlikes,
  deletePost,
  showActions,
}) => {
  return (
    <div className="post bg-white my-1 p-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="profile" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{moment.utc(date)}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              className="btn"
              onClick={() => addLikesUnlikes(_id, 'like')}
            >
              <i className="fas fa-thumbs-up"></i>
              {likes.length > 0 && <span> {likes.length}</span>}
            </button>

            <button
              className="btn"
              onClick={() => addLikesUnlikes(_id, 'unlike')}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => deletePost(_id)}
              >
                <i className="fas fa-times"></i> Delete
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLikesUnlikes: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { addLikesUnlikes, deletePost })(
  PostItem
);
