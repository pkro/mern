import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/post';
import { connect } from 'react-redux';

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();

    addComment(postId, { text });
    setText('');
  };
  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(null, { addComment })(CommentForm);
