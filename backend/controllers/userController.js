const User = require('../models/User')

// @desc    Get user
// @route   GET /api/v1/users/:username
// @access  Public
exports.getUser = async (req, res) => {
  try {
    const { username } = req.params

    const user = await User.findOne({ username })

    if (!user) {
      res.status(404)
      throw new Error('This account doesn’t exist')
    }

    return res.json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      createdAt: user.createdAt,
      tweets_count: user.tweets_count,
      followers_count: user.followers_count,
      following_count: user.following_count,
      profile_image: user.profile_image || '',
      bio: user.bio || '',
      website: user.website || '',
      location: user.location || '',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
