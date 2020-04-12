const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const User = require('../../models/User');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const request = require('request');
const normalize = require('normalize-url');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'No profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   POST api/profile
// @desc    Create / update profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      // auth + check middleware
      check('status', 'Status is a required field').not().isEmpty(),
      check('skills', 'Skills is a required field').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      xing,
      linkedin,
    } = req.body;

    const profileFields = {
      user: req.user.id,
      company,
      location,
      website: website === '' ? '' : normalize(website, { forceHttps: true }),
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => skill.trim()),
      status,
      githubusername,
    };

    socialFields = { youtube, twitter, instagram, xing, linkedin, facebook };
    for (const [key, value] of Object.entries(socialFields)) {
      socialFields[key] =
        value.length > 0 ? normalize(value, { forceHttps: true }) : '';
    }
    profileFields.social = socialFields;

    try {
      let profile = await Profile.findOne({
        user: req.user.id,
      });
      if (profile) {
        // always keep async in mind!!!!! A bitch o debug.
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      res.status(500).send('server error');
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.log(err);
    res.status(500).send('server error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    return res.json(profile);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    console.log(err);
    res.status(500).send('server error');
  }
});

// @route   DELETE api/profile
// @desc    delete profile, user and posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // Optionally remove posts
    if (config.get('deletePostsOnAccountDelete')) {
      await Post.deleteMany({ user: req.user.id });
    }
    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).send('server error');
  }
});

// @route   PUT api/profile/experience
// @desc    add profile experience
// @access  Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'missing title').not().isEmpty(),
      check('company', 'missing title').not().isEmpty(),
      check('from', 'missing from date').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile.experience.unshift(newExp);
        await profile.save();
        res.status(200).json(profile);
      } else {
        res
          .status(500)
          .json({ msg: `Profile not found for id ${req.user.id}` });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('server error');
    }
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    delete profile experience
// @access  Private
router.delete('/experience/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const experienceId = req.params.id;
    const newExperienceList = profile.experience.filter(
      (p) => p._id != experienceId
    );
    profile.experience = newExperienceList;
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json('server error');
  }
});

// @route   PUT api/profile/education
// @desc    add profile education
// @access  Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'missing school').not().isEmpty(),
      check('degree', 'missing degree').not().isEmpty(),
      check('fieldofstudy', 'missing fieĺdofstudy').not().isEmpty(),
      check('from', 'missing from date').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile.education.unshift(newEdu);
        await profile.save();
        res.status(200).json(profile);
      } else {
        res
          .status(500)
          .json({ msg: `Profile not found for id ${req.user.id}` });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('server error');
    }
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    delete profile education
// @access  Private
router.delete('/education/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const educationId = req.params.id;
    const newEducationList = profile.education.filter(
      (p) => p._id != educationId
    );
    profile.education = newEducationList;
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json('server error');
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get('/github/:username', (req, res) => {
  const githubCLientId = config.get('githubClientId');
  const githubClientSecret = config.get('githubClientSecret');
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
      method: 'GET',
      headers: {
        'user-agent': 'node.js',
        '-u': `${githubCLientId}:${githubClientSecret}`,
      },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
      }
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'no githubprofile' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err);
    res.status(500).json('server error');
  }
});
module.exports = router;
