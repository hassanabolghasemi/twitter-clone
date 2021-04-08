const express = require('express')
const router = express.Router()

const {
  loginUser,
  signupUser,
  logoutUser,
} = require('../controllers/authController')
const ensureLoggedIn = require('../middlewares/authMiddleware')
const { getUser } = require('../controllers/userController')

router
  .route('/login')
  .get(ensureLoggedIn, (req, res) => {
    const user = req.user
    res.json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      following: user.following,
      followers: user.followers,
      retweets: user.retweets,
      profile_image: user.profile_image || '',
    })
  })
  .post(loginUser)

router
  .route('/signup')
  .get(ensureLoggedIn, (req, res) => {
    const user = req.user
    res.json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      following: user.following,
      followers: user.followers,
      retweets: user.retweets,
      profile_image: user.profile_image || '',
    })
  })
  .post(signupUser)

router.route('/logout').get(logoutUser)

router.route('/:username').get(getUser)

module.exports = router
