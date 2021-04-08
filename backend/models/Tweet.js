const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tweetSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    // type: {
    //   // tweet || reply || retweet || quote
    //   type: String,
    //   required: true,
    // },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      maxlength: 280,
    },
    entities: {
      hashtags: [
        {
          type: Object,
          index: true,
        },
      ],
      mentions: [{}],
      media: [{}],
      urls: [
        {
          type: String,
        },
      ],
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    retweets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
      },
    ],
    quotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
      },
    ],
    // For retweets and quotes
    ref_tweet: {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
    },
    like_count: {
      type: Number,
      default: 0,
    },
    reply_count: {
      type: Number,
      default: 0,
    },
    retweet_count: {
      type: Number,
      default: 0,
    },
    quote_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet
