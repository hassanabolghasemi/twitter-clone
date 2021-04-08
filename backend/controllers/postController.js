const Tweet = require('../models/Tweet')
const User = require('../models/User')
const { tweetIDGenerator, uniqueUsers } = require('../utils/generator')

// @desc    Compose a tweet
// @route   POST /api/v1/tweets/compose
// @access  Private
exports.composeTweet = async (req, res) => {
  try {
    const { text, refTweet } = req.body

    if (!text) {
      if (!refTweet) {
        res.status(400)
        throw new Error('Tweet content is empty!')
      }
    }

    const user = await User.findById(req.user._id)

    if (!user) {
      res.status(404)
      throw new Error('User not found!')
    }

    if (refTweet) {
      await Tweet.findById(refTweet, (err, doc) => {
        if (err) {
          res.status(400)
          throw new Error(err)
        }

        if (!doc) {
          res.status(404)
          throw new Error('ref_tweet not found!')
        }
      })
    }

    let id = tweetIDGenerator()
    let tweetExists = await Tweet.findOne({ id })

    while (tweetExists) {
      id = tweetIDGenerator()
      tweetExists = await Tweet.findOne({ id })
    }

    const newTweet = await Tweet.create({
      id,
      user: user._id,
      text,
      ref_tweet: refTweet || null,
    })

    await user.tweets.push(newTweet._id)
    user.tweets_count += 1
    await user.save()

    const tweet = await Tweet.findById(newTweet._id)
      .populate({
        path: 'ref_tweet',
        select: '-likes -replies -retweets -quotes',
      })
      .select('-likes -replies -retweets -quotes')

    res.status(201).json({ user, tweet })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// @desc    Get all tweets
// @route   GET /api/v1/posts/all
// @access  Public
exports.getAllTweets = async (req, res) => {
  try {
    const allUsers = await User.find({}).select(
      '_id fullname username bio location website profile_image createdAt tweets_count followers_count following_count'
    )

    const tweets = await Tweet.find({
      user: { $in: allUsers.map((user) => user._id) },
    })
      .populate({
        path: 'ref_tweet',
        select: '-likes -replies -retweets -quotes',
      })
      .select('-likes -replies -retweets -quotes')
      .sort('-createdAt')

    const refTweets = await tweets
      .map((tweet) => tweet.ref_tweet)
      .filter((tweet) => tweet !== null)

    const refUsers = await User.find({
      _id: { $in: refTweets.map((tweet) => tweet.user) },
    }).select(
      '_id fullname username bio location website profile_image createdAt tweets_count followers_count following_count'
    )

    const users = uniqueUsers([...allUsers, ...refUsers])

    res.status(200).json({ users, tweets })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// @desc    Get all tweets related on user
// @route   GET /api/v1/posts/
// @access  Public
exports.getTweets = async (req, res) => {
  try {
    const userRelations = [req.user._id, ...req.user.following]

    const tweetUsers = await User.find({
      _id: { $in: userRelations.map((id) => id) },
    }).select(
      '_id fullname username bio location website profile_image createdAt tweets_count followers_count following_count'
    )

    const tweets = await Tweet.find({
      user: { $in: tweetUsers.map((user) => user._id) },
    })
      .populate({
        path: 'ref_tweet',
        select: '-likes -replies -retweets -quotes',
      })
      .select('-likes -replies -retweets -quotes')
      .sort('-createdAt')

    const refTweets = await tweets
      .map((tweet) => tweet.ref_tweet)
      .filter((tweet) => tweet !== null)

    const refUsers = await User.find({
      _id: { $in: refTweets.map((tweet) => tweet.user) },
    }).select(
      '_id fullname username bio location website profile_image createdAt tweets_count followers_count following_count'
    )

    const users = uniqueUsers([...tweetUsers, ...refUsers])

    res.status(200).json({ users, tweets })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// @desc    Get user tweets with spacial type
// @route   GET /api/v1/posts/:username/:type
// @access  Public
exports.getUserTweets = async (req, res) => {
  try {
    const { username, type } = req.params

    const user = await User.findOne({ username: username })

    if (!user) {
      res.status(404)
      throw new Error('This account doesn’t exist')
    }

    let tweets

    if (type === 'tweets') {
      tweets = await Tweet.find({
        _id: { $in: user.tweets.map((id) => id) },
      })
        .populate({
          path: 'ref_tweet',
          select: '-likes -replies -retweets -quotes',
        })
        .select('-likes -replies -retweets -quotes')
        .sort('-createdAt')
    } else if (type === 'with_replies') {
      tweets = await Tweet.find({ user: user._id })
        .populate({
          path: 'ref_tweet',
          select: '-likes -replies -retweets -quotes',
        })
        .select('-likes -replies -retweets -quotes')
        .sort('-createdAt')
    } else if (type === 'media') {
      // Completing soon
    } else if (type === 'likes') {
      // Completing soon
    } else {
      res.status(404)
      throw new Error('Not Found this url!')
    }

    const refTweets = await tweets
      .map((tweet) => tweet.ref_tweet)
      .filter((tweet) => tweet !== null)

    const refUsers = await User.find({
      _id: { $in: refTweets.map((tweet) => tweet.user) },
    }).select(
      '_id fullname username bio location website profile_image createdAt tweets_count followers_count following_count'
    )

    const users = uniqueUsers([user, ...refUsers])

    res.status(200).json({ users, tweets })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// @desc    Get a tweet
// @route   GET /api/v1/posts/:username/status/:id
// @access  Public
exports.getTweet = async (req, res) => {
  try {
    const { username, id } = req.params

    const user = await User.findOne({ username: username })

    if (!user) {
      res.status(404)
      throw new Error('This account doesn’t exist')
    }

    const tweet = await Tweet.findOne({ id: id })
      .populate({
        path: 'ref_tweet',
        select: '-likes -replies -retweets -quotes',
      })
      .select('-likes -replies -retweets -quotes')

    let users

    if (tweet.ref_tweet) {
      const refUser = await User.find({
        _id: { $in: tweet.ref_tweet.map((tweet) => tweet.user) },
      }).select(
        '_id fullname username bio location website profile_image createdAt tweets_count followers_count following_count'
      )
      users = uniqueUsers([user, refUser])
    } else {
      users = [user]
    }

    res.status(200).json({ users, tweet })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// @desc    Get a tweet replies
// @route   GET /api/v1/posts/:id
// @access  Public
exports.getReplies = async (req, res) => {
  try {
    const { id } = req.params

    const tweetReplies = await Tweet.findOne({ id: id })
      .populate({
        path: 'replies',
        select: '-likes -replies -retweets -quotes',
      })
      .select('replies')

    const replies = tweetReplies.replies

    const repliesUsers = await User.find({
      _id: { $in: replies.map((tweet) => tweet.user) },
    }).select(
      '_id fullname username bio location website profile_image createdAt tweets_count followers_count following_count'
    )

    const users = uniqueUsers(repliesUsers)

    res.status(200).json({ users, replies })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// @desc    Get tweets test
// @route   GET /api/v1/posts/test
// @access  Public
exports.getTweetsTest = async (req, res) => {
  try {
    // const userRelations = [req.user._id, ...req.user.following]
    // const users = await User.find({
    //   _id: { $in: userRelations.map((id) => id) },
    // }).select(
    //   '_id fullname username bio location website profile_image createdAt tweets_count followers_count following_count'
    // )
    // const tweets = await Tweet.find({
    //   user: { $in: users.map((user) => user._id) },
    // })
    //   .select(
    //     '-likes -replies -retweets -quotes'
    //   )
    //   .sort('-createdAt')
    // const refTweets = await Tweet.find({
    //   _id: { $in: tweets.map((tweet) => tweet.ref_tweet) },
    // }).select('-likes -replies -retweets -quotes')
    // const tweets = uniquePosts([...userTweets, ...refTweets])
    // res.status(200).json({ users: users, tweets: tweets })
    // res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
