import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import { deleteComment, deletePost } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { user, avatar, name, text, date, _id },
  auth,
  deleteComment,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY//MM/DD">{moment.utc(date)}</Moment>
        </p>
      </div>
      {!auth.loading && user === auth.user._id && (
        <button
          className="btn btn-danger"
          onClick={() => deleteComment(postId, _id)}
          type="button"
        >
          <i className="fas fa-times"></i> Delete
        </button>
      )}
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
