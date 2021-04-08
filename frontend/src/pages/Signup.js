import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../actions/authActions'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import SvgIcon from '@material-ui/core/SvgIcon'
import GitHubIcon from '@material-ui/icons/GitHub'
import CircularProgress from '@material-ui/core/CircularProgress'

import { ReactComponent as twitterIcon } from '../assets/twitter.svg'
import { ReactComponent as GoogleIcon } from '../assets/google.svg'

const Signup = ({ history }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const { status, error } = auth

  useEffect(() => {
    document.title = 'Sign up for Twitter / Twitter'
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signup(username, email, password, history))
  }

  return (
    <div className='login-signup'>
      <SvgIcon component={twitterIcon} className='icon ls-icon' />
      <h1 className='ls-title'>Sign up to Twitter</h1>
      {status === 'error' && Array.isArray(error) && (
        <>
          {error.map((msg, i) => (
            <p key={i} style={{ color: 'red', alignSelf: 'start' }}>
              • {msg}
            </p>
          ))}
        </>
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
          label='Username'
          name='username'
          autoComplete='username'
          InputLabelProps={{
            shrink: true,
          }}
          helperText=''
          className='ls-input'
          autoFocus
        />
        <TextField
          variant='filled'
          margin='normal'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id='email'
          label='Email'
          name='email'
          inputMode='email'
          autoComplete='email'
          InputLabelProps={{
            shrink: true,
          }}
          helperText=''
          className='ls-input'
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
          helperText=''
          className='ls-input'
        />
        <Button
          type='submit'
          disabled={username === '' || email === '' || password === ''}
          className={`btn-fill ${
            username === '' || email === '' || password === ''
              ? 'btn-fill-disabled'
              : ''
          }`}
        >
          Create Account
        </Button>
      </form>
      <div className='ls-links'>
        <span>Already have an account?</span>
        <Link href='/login' className='sm-link-primary'>
          Log in
        </Link>
      </div>
      <hr className='divider' />
      <div className='third-party'>
        <Link href='/api/v1/auth/google' className='btn-google'>
          <SvgIcon component={GoogleIcon} className='google-icon' />
          <span>Countinue with Google</span>
        </Link>
        <Link href='/api/v1/auth/github' className='btn-github'>
          <GitHubIcon fontSize='small' />
          <span>Countinue with Github</span>
        </Link>
      </div>
    </div>
  )
}

export default Signup
