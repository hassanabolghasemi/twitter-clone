import {
  CHECK_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from '../actions/types'

const initialState = {
  firstStatus: 'ok',
  status: 'ok',
  isAuthenticated: !!localStorage.getItem('user'),
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: null,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_AUTH:
      return { firstStatus: 'loading' }
    case AUTH_REQUEST:
      return { status: 'loading' }
    case AUTH_SUCCESS:
      return {
        firstStatus: 'ok',
        status: 'ok',
        isAuthenticated: true,
        user: action.payload,
      }
    case AUTH_FAIL:
      return {
        firstStatus: 'ok',
        status: 'error',
        isAuthenticated: false,
        error: action.payload,
      }
    // Log out
    case AUTH_LOGOUT:
      return {
        firstStatus: 'ok',
        status: 'ok',
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}
