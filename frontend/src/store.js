import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { authReducer } from './reducers/authReducer'
import { usersReducer } from './reducers/usersReducer'
import { tweetsReducer } from './reducers/tweetsReducer'

const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  tweets: tweetsReducer,
})

const middleware = [thunk]

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
