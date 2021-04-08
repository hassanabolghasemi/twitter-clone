import {
  TWEETS_REQUEST,
  COMPOSE_TWEET,
  HOME_TWEETS_SUCCESS,
  EXPLORE_TWEETS_SUCCESS,
  USER_TWEETS_SUCCESS,
  TWEETS_ERROR,
  CURRENT_TWEET_REQUEST,
  CURRENT_TWEET_SUCCESS,
  CURRENT_TWEET_ERROR,
  REPLIES_SUCCESS,
} from '../actions/types'

const initialState = {
  status: 'loading',
  tweetStatus: 'loading',
  allTweets: [],
  homeTweets: [],
  exploreTweets: [],
  userTweets: [],
  currentTweet: null,
  replies: [],
  error: null,
}

const uniqueTweets = (arr) => {
  return [...new Map(arr.map((tweet) => [tweet.id, tweet])).values()]
}

export const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TWEETS_REQUEST:
      return {
        ...state,
        status: 'loading',
        replies: [],
      }
    case COMPOSE_TWEET:
      return {
        ...state,
        status: 'ok',
        allTweets: [action.payload, ...state.allTweets],
        homeTweets: [action.payload, ...state.homeTweets],
        error: null,
      }
    case HOME_TWEETS_SUCCESS:
      return {
        ...state,
        status: 'ok',
        allTweets: uniqueTweets([...state.allTweets, ...action.payload]),
        homeTweets: uniqueTweets([...state.homeTweets, ...action.payload]),
        error: null,
      }
    case EXPLORE_TWEETS_SUCCESS:
      return {
        ...state,
        status: 'ok',
        allTweets: uniqueTweets([...state.allTweets, ...action.payload]),
        exploreTweets: uniqueTweets([
          ...state.exploreTweets,
          ...action.payload,
        ]),
        error: null,
      }
    case USER_TWEETS_SUCCESS:
      return {
        ...state,
        status: 'ok',
        allTweets: uniqueTweets([...state.allTweets, action.payload]),
        userTweets: action.payload,
        error: null,
      }
    case CURRENT_TWEET_REQUEST:
      return {
        ...state,
        tweetStatus: 'loading',
      }
    case CURRENT_TWEET_SUCCESS:
      return {
        ...state,
        tweetStatus: 'ok',
        allTweets: uniqueTweets([...state.allTweets, action.payload]),
        currentTweet: action.payload,
        error: null,
      }
    case CURRENT_TWEET_ERROR:
      return {
        ...state,
        tweetStatus: 'error',
        currentTweet: null,
        error: action.payload,
      }
    case REPLIES_SUCCESS:
      return {
        ...state,
        status: 'ok',
        allTweets: uniqueTweets([...state.allTweets, ...action.payload]),
        replies: uniqueTweets([...state.replies, ...action.payload]),
        error: null,
      }
    case TWEETS_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload,
      }
    default:
      return state
  }
}
