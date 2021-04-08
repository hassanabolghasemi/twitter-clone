import axios from 'axios'
import { USERS_REQUEST, CURRENT_USER_SUCCESS, CURRENT_USER_FAIL } from './types'

export const getUser = (username) => async (dispatch) => {
  try {
    dispatch({
      type: USERS_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`/api/v1/users/${username}`, config)

    dispatch({
      type: CURRENT_USER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CURRENT_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const setCurrentUser = (user) => async (dispatch) => {
  try {
    await dispatch({
      type: CURRENT_USER_SUCCESS,
      payload: user,
    })
  } catch (error) {
    dispatch({
      type: CURRENT_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
