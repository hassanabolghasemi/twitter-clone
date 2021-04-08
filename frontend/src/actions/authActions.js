import axios from 'axios'
import {
  CHECK_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from './types'

export const login = (username, password, history, location) => async (
  dispatch
) => {
  try {
    dispatch({
      type: AUTH_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/v1/users/login',
      { username, password },
      config
    )

    dispatch({
      type: AUTH_SUCCESS,
      payload: data,
    })

    localStorage.setItem('user', JSON.stringify(data))

    history.push('/home')
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    if (location === '/') {
      history.push('/login')
    }
  }
}

export const signup = (username, email, password, history) => async (
  dispatch
) => {
  try {
    dispatch({
      type: AUTH_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/v1/users/signup',
      { username, email, password },
      config
    )

    dispatch({
      type: AUTH_SUCCESS,
      payload: data,
    })

    localStorage.setItem('user', JSON.stringify(data))

    history.push('/home')
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = (history) => async (dispatch) => {
  await axios.get('/api/v1/users/logout')

  localStorage.removeItem('user')
  dispatch({ type: AUTH_LOGOUT })

  history.push('/')
}

export const thirdPartyLogin = (data, history) => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_REQUEST,
    })

    dispatch({
      type: AUTH_SUCCESS,
      payload: data,
    })

    localStorage.setItem('user', JSON.stringify(data))

    history.push('/home')
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload: 'Error',
      // payload:
      //   error.response && error.response.data.message
      //     ? error.response.data.message
      //     : error.message,
    })

    history.push('/login')
  }
}

export const checkLogin = () => async (dispatch) => {
  try {
    dispatch({
      type: CHECK_AUTH,
    })

    const { data } = await axios.get('/api/v1/users/login')

    dispatch({
      type: AUTH_SUCCESS,
      payload: data,
    })

    localStorage.setItem('user', JSON.stringify(data))

    return true
  } catch (error) {
    dispatch({ type: AUTH_LOGOUT })

    return false
  }
}
