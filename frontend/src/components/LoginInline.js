import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../actions/authActions'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

const LoginInline = ({ history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(username, password, history, '/'))
  }

  return (
    <form onSubmit={submitHandler} className='c-li-form'>
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
        className='ls-input c-li-input'
        autoFocus
      />
      <div className='div-pass'>
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
          className='ls-input c-li-input'
        />
        <Link href='#' className='sm-link-primary c-li-forgot'>
          Forgot password?
        </Link>
      </div>
      <Button type='submit' variant='outlined' className='btn-outline c-li-btn'>
        Log in
      </Button>
    </form>
  )
}

export default LoginInline
