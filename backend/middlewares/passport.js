const passport = require('passport')
const LocalStrategy = require('passport-local')
const GitHubStrategy = require('passport-github2').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = require('../models/User')
const { usernameGenerator } = require('../utils/generator')

const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/../.env' })

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((_id, done) => {
  User.findById(_id, (err, user) => {
    done(err, user)
  })
})

// Local Strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne(
      {
        $or: [{ username: username }, { email: username }],
      },
      async (err, user) => {
        if (err) {
          return done(err)
        }

        if (!user) {
          return done(null, false, {
            message:
              'The username and password you entered did not match our records. Please double-check and try again.',
          })
        }

        if (!user.password) {
          return done(null, false, {
            message: 'You have registered with another methods.',
          })
        }

        if (!(await user.matchPassword(password))) {
          return done(null, false, {
            message:
              'The username and password you entered did not match our records. Please double-check and try again.',
          })
        }
        return done(null, user)
      }
    )
  })
)

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/v1/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // Insert to DB
      await User.findOneAndUpdate(
        { email: profile.emails[0].value },
        {
          $setOnInsert: {
            fullname: profile.displayName,
            username: usernameGenerator(profile),
            email: Array.isArray(profile.emails) ? profile.emails[0].value : '',
          },
          $addToSet: {
            providers: profile.provider,
          },
        },
        { upsert: true, new: true },
        (err, user) => {
          if (err) return err

          return done(null, user)
        }
      )
    }
  )
)

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/v1/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Insert to DB
      User.findOneAndUpdate(
        { email: profile.emails[0].value },
        {
          $setOnInsert: {
            fullname: profile.displayName || profile.username,
            username: usernameGenerator(profile),
            email: Array.isArray(profile.emails) ? profile.emails[0].value : '',
          },
          $addToSet: {
            providers: profile.provider,
          },
        },
        { upsert: true, new: true },
        (err, user) => {
          if (err) return err

          return done(null, user)
        }
      )
    }
  )
)

module.exports = passport
