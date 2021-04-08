import axios from 'axios'
import {
  TWEETS_REQUEST,
  COMPOSE_TWEET,
  HOME_TWEETS_SUCCESS,
  EXPLORE_TWEETS_SUCCESS,
  USER_TWEETS_SUCCESS,
  TWEETS_ERROR,
  CURRENT_TWEET_SUCCESS,
  CURRENT_TWEET_REQUEST,
  CURRENT_TWEET_ERROR,
  REPLIES_SUCCESS,
  USERS_SUCCESS,
} from './types'

export const composeTweet = (body) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('/api/v1/posts/compose', body, config)

    dispatch({
      type: USERS_SUCCESS,
      payload: [data.user],
    })

    dispatch({
      type: COMPOSE_TWEET,
      payload: data.tweet,
    })
  } catch (error) {
    dispatch({
      type: TWEETS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getHomeTweets = () => async (dispatch) => {
  try {
    dispatch({
      type: TWEETS_REQUEST,
    })

    const { data } = await axios.get('/api/v1/posts')

    dispatch({
      type: USERS_SUCCESS,
      payload: data.users,
    })

    dispatch({
      type: HOME_TWEETS_SUCCESS,
      payload: data.tweets,
    })
  } catch (error) {
    dispatch({
      type: TWEETS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getExploreTweets = () => async (dispatch) => {
  try {
    dispatch({
      type: TWEETS_REQUEST,
    })

    const { data } = await axios.get('/api/v1/posts/all')

    dispatch({
      type: USERS_SUCCESS,
      payload: data.users,
    })

    dispatch({
      type: EXPLORE_TWEETS_SUCCESS,
      payload: data.tweets,
    })
  } catch (error) {
    dispatch({
      type: TWEETS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserTweets = (username, type = 'tweets') => async (
  dispatch
) => {
  try {
    dispatch({
      type: TWEETS_REQUEST,
    })

    const { data } = await axios.get(`/api/v1/posts/${username}/${type}`)

    dispatch({
      type: USERS_SUCCESS,
      payload: data.users,
    })

    dispatch({
      type: USER_TWEETS_SUCCESS,
      payload: data.tweets,
    })
  } catch (error) {
    dispatch({
      type: TWEETS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getTweet = (username, id) => async (dispatch) => {
  try {
    dispatch({
      type: CURRENT_TWEET_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      `/api/v1/posts/${username}/status/${id}`,
      config
    )

    dispatch({
      type: USERS_SUCCESS,
      payload: data.users,
    })

    dispatch({
      type: CURRENT_TWEET_SUCCESS,
      payload: data.tweet,
    })
  } catch (error) {
    dispatch({
      type: CURRENT_TWEET_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getReplies = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TWEETS_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`/api/v1/posts/${id}/replies`, config)

    dispatch({
      type: USERS_SUCCESS,
      payload: data.users,
    })

    dispatch({
      type: REPLIES_SUCCESS,
      payload: data.replies,
    })
  } catch (error) {
    dispatch({
      type: TWEETS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const setCurrentTweet = (tweet) => async (dispatch) => {
  try {
    await dispatch({
      type: CURRENT_TWEET_SUCCESS,
      payload: tweet,
    })
  } catch (error) {
    dispatch({
      type: CURRENT_TWEET_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
