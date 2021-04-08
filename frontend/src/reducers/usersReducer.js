import {
  USERS_REQUEST,
  USERS_SUCCESS,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_FAIL,
} from '../actions/types'

const initialState = {
  status: 'ok',
  users: [],
  currentUser: null,
  error: null,
}

const uniqueUsers = (arr) => {
  return [...new Map(arr.map((user) => [user.username, user])).values()]
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_REQUEST:
      return {
        ...state,
        status: 'loading',
      }
    case USERS_SUCCESS:
      return {
        ...state,
        status: 'ok',
        users: uniqueUsers([...state.users, ...action.payload]),
        error: null,
      }
    case CURRENT_USER_SUCCESS:
      return {
        status: 'ok',
        users: uniqueUsers([...state.users, action.payload]),
        currentUser: action.payload,
        error: null,
      }
    case CURRENT_USER_FAIL:
      return {
        ...state,
        status: 'error',
        currentUser: null,
        error: action.payload,
      }
    default:
      return state
  }
}
