const express = require('express')
const router = express.Router()
const passport = require('passport')
const qs = require('qs')

router.route('/github').get(passport.authenticate('github'))
router
  .route('/github/callback')
  .get(passport.authenticate('github'), (req, res) => {
    if (req.user) {
      let user = {
        _id: String(req.user._id),
        fullname: req.user.fullname,
        username: req.user.username,
        email: req.user.email,
        following: req.user.following,
        followers: req.user.followers,
        retweets: req.user.retweets,
        profile_image: req.user.profile_image || '',
      }
      res.redirect(`http://localhost:3000/login?${qs.stringify(user)}`)
    } else {
      res.redirect(`http://localhost:3000/login`)
    }
  })

router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }))

router
  .route('/google/callback')
  .get(passport.authenticate('google'), (req, res) => {
    if (req.user) {
      let user = {
        _id: String(req.user._id),
        fullname: req.user.fullname,
        username: req.user.username,
        email: req.user.email,
        following: req.user.following,
        followers: req.user.followers,
        retweets: req.user.retweets,
        profile_image: req.user.profile_image || '',
      }
      res.redirect(`http://localhost:3000/login?${qs.stringify(user)}`)
    } else {
      res.redirect(`http://localhost:3000/login`)
    }
  })

module.exports = router
