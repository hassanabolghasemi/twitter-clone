const passport = require('passport')
const User = require('../models/User')

const { signupValidation } = require('../utils/inputValidation')

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Private
exports.loginUser = async (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.status(401).json({ message: info.message })
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }

        return res.json({
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
    })(req, res, next)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

// @desc    Signup a new user
// @route   POST /api/v1/users/signup
// @access  Private
exports.signupUser = async (req, res) => {
  try {
    const { errors, isValid } = signupValidation(req.body)

    if (!isValid) {
      res.status(400)
      throw new Error(errors)
    }

    const { username, email, password } = req.body

    const userExists = await User.findOne({
      $or: [{ username }, { email }],
    })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists.')
    }

    const user = await User.create({
      fullname: username,
      username,
      email,
      password,
      providers: ['twitter'],
    })

    if (user) {
      req.logIn(user, (err) => {
        if (err) {
          res.status(409)
          throw new Error('User created, Log in now')
        }

        return res.json({
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
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message.split(','),
    })
  }
}

// @desc    Logout user
// @route   GET /api/v1/users/logout
// @access  Public
exports.logoutUser = (req, res) => {
  req.logout()
  req.session.destroy((err) => {
    if (err) console.log('error /logout', err)
  })
  res.json({ isAuthenticate: false })
}
