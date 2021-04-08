import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import querystring from 'query-string'
import { login, thirdPartyLogin } from '../actions/authActions'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import SvgIcon from '@material-ui/core/SvgIcon'
import GitHubIcon from '@material-ui/icons/GitHub'
import CircularProgress from '@material-ui/core/CircularProgress'

import { ReactComponent as twitterIcon } from '../assets/twitter.svg'
import { ReactComponent as GoogleIcon } from '../assets/google.svg'

const Login = ({ history, location }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const { status, error } = auth

  useEffect(() => {
    document.title = 'Login on Twitter / Twitter'

    let query = querystring.parse(location.search)
    if (query._id) {
      dispatch(thirdPartyLogin(query, history))
    }
  }, [history, location, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(username, password, history, '/login'))
  }

  return (
    <div className='login-signup'>
      <SvgIcon component={twitterIcon} className='icon ls-icon' />
      <h1 className='ls-title'>Log in to Twitter</h1>
      {status === 'error' && typeof error === 'string' && (
        <p style={{ color: 'red' }}>{error}</p>
      )}
      {status === 'loading' && (
        <CircularProgress size={30} thickness={5} className='cp-spinner' />
      )}
      <form onSubmit={submitHandler} className='ls-form'>
        <TextField
          variant='filled'
          margin='normal'
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id='username'
          label='Email or Username'
          name='username'
          autoComplete='username'
          InputLabelProps={{
            shrink: true,
          }}
          className='ls-input'
          autoFocus
        />
        <TextField
          variant='filled'
          margin='normal'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          InputLabelProps={{
            shrink: true,
          }}
          className='ls-input'
        />
        <Button
          type='submit'
          disabled={username === '' || password === ''}
          className={`btn-fill ${
            username === '' || password === '' ? 'btn-fill-disabled' : ''
          }`}
        >
          Log in
        </Button>
      </form>
      <div className='ls-links'>
        <Link href='#' className='sm-link-primary'>
          Forgot password?
        </Link>
        <span>·</span>
        <Link href='/signup' className='sm-link-primary'>
          Sign up for Twitter
        </Link>
      </div>
      <hr className='divider' />
      <div className='third-party'>
        {/* <form action='/api/v1/auth/google'>
          <Button type='submit' variant='outlined' className='btn-google'>
            <SvgIcon component={GoogleIcon} className='google-icon' />
            <span>Countinue with Google</span>
          </Button>
        </form> */}
        <Link href='/api/v1/auth/google' className='btn-google'>
          <SvgIcon component={GoogleIcon} className='google-icon' />
          <span>Countinue with Google</span>
        </Link>
        <Link href='/api/v1/auth/github' className='btn-github'>
          <GitHubIcon fontSize='small' />
          <span>Countinue with Github</span>
        </Link>
        {/* <Button variant='outlined' className='btn-github'>
          <GitHubIcon fontSize='small' />
          <span>Countinue with Github</span>
        </Button> */}
      </div>
    </div>
  )
}

export default Login
