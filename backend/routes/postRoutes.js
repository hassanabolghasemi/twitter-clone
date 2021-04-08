const express = require('express')
const router = express.Router()

const {
  composeTweet,
  getTweets,
  getAllTweets,
  getTweetsTest,
  getUserTweets,
  getTweet,
  getReplies,
} = require('../controllers/postController')
const ensureLoggedIn = require('../middlewares/authMiddleware')

router.route('/compose').post(ensureLoggedIn, composeTweet)
router.route('/').get(ensureLoggedIn, getTweets)
router.route('/all').get(getAllTweets)
router.route('/:username/status/:id').get(getTweet)
router.route('/:id/replies').get(getReplies)
router.route('/:username/:type').get(getUserTweets)
router.route('/test').get(getTweetsTest)

module.exports = router
