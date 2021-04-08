const mongoose = require('mongoose')

const ensureLoggedIn = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next()
    }

    throw new Error('Log in required!')
  } catch (err) {
    return res.status(401).json({ message: 'Log in required!' })
  }
}

module.exports = ensureLoggedIn
