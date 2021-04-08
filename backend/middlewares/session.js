const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/../.env' })

const store = new MongoStore({
  mongooseConnection: mongoose.connection,
  // secret: true,
})

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'my session secret',
  name: 'twitter_clone',
  resave: false,
  saveUninitialized: true,
  key: 'express.sid',
  store: store,
  cookie: {
    secure: false,
    maxAge: 14 * 24 * 60 * 60 * 1000, // 2 Weeks
  },
})

module.exports = sessionMiddleware
