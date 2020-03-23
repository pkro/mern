const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const Post = require('../../models/post');
const Profile = require('../../models/profile');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'missing comment text')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = {
        text: req.body.text,
        user: user.id,
        name: user.name,
        avatar: user.avatar,
      };

      const post = new Post(newPost);
      await post.save();
      res.status(200).json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send('server error');
    }
  }
);

// @route   GET api/posts/:id
// @desc    Get post
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', [
      'name',
      'avatar',
    ]);
    if (!post) {
      return res.status(404).json({ msg: 'post not found' });
    }
    return res.status(200).json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'post not found' });
    }
    console.log(err);
    res.status(500).send('server error');
  }
});

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ date: -1 })
      .populate('user', ['name', 'avatar']);
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send('server error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ msg: 'not authorized to delete post' });
    }
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: 'post deleted' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.json(400).json({ msg: 'post not found' });
    }
    console.log(err);
    res.status(500).send('server error');
  }
});
// ToDo: post like / unlike

// @route   PUT api/posts/like/:post_id
// @desc    add a like
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // user already liked?
    if (
      post.likes.length === 0 ||
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
        0
    ) {
      post.likes.unshift(req.user.id);
      await post.save();
      res.status(200).json(post.likes);
    } else {
      res.status(400).json({ msg: 'post already liked' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('server error');
  }
});

// @route   put api/posts/unlike/:post_id
// @desc    Delete a like
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      res.status(400).json({ msg: 'post was not liked to begin with!' });
    } else {
      post.likes = post.likes.filter(
        like => like.user.toString() !== req.user.id
      );
      await post.save();
      res.status(200).json(post.likes);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('server error');
  }
});
module.exports = router;
