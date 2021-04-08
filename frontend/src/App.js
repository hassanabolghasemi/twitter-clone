import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin } from './actions/authActions'

import PublicRoute from './utils/PublicRoute'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Container from './Container'

import Loader from './components/Loader'

const App = () => {
  const { firstStatus } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    // if (user === null) {
    //   dispatch(checkLogin())
    // }
    dispatch(checkLogin())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      {firstStatus === 'loading' ? (
        <Loader />
      ) : (
        <Switch>
          <PublicRoute exact path='/' component={Landing} />
          <PublicRoute exact path='/login' component={Login} />
          <PublicRoute exact path='/signup' component={Signup} />
          <Container />
        </Switch>
      )}
    </Router>
  )
}

export default App
