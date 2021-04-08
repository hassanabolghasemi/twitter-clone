import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { composeTweet } from '../actions/tweetsActions'

import { useHistory, Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'
import SentimentSatisfiedRoundedIcon from '@material-ui/icons/SentimentSatisfiedRounded'

const useStyles = makeStyles(() => ({
  paper: {
    minWidth: '600px',
    maxWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '16px',
    top: '-25%',
    '@media (max-width: 599px)': {
      minWidth: '100vw',
      borderRadius: 0,
      top: 0,
    },
    '@media (max-height: 600px)': {
      top: '-20%',
    },
    '@media (max-height: 500px)': {
      top: '-10%',
    },
    '@media (max-height: 400px)': {
      top: 0,
    },
  },
}))

const ComposeModal = () => {
  const [text, setText] = useState('')
  const [progress, setProgress] = useState(0)

  const history = useHistory()
  const theme = useTheme()
  const classes = useStyles()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const handleClose = () => {
    history.goBack()
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const body = {
      text: text,
    }

    dispatch(composeTweet(body))
    setText('')

    history.goBack()
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      classes={{ paper: classes.paper }}
    >
      <div className='cm-header px-15'>
        <div className='cmh-close' onClick={handleClose}>
          {!fullScreen ? <CloseRoundedIcon /> : <ArrowBackRoundedIcon />}
        </div>
        {fullScreen && (
          <Button
            disabled={text.trim() === ''}
            onClick={submitHandler}
            className={`btn-fill ${
              text.trim() === '' ? 'btn-fill-disabled' : ''
            }`}
          >
            Tweet
          </Button>
        )}
      </div>
      <div className='cm-content'>
        <div className='cm-compose px-15'>
          <div className='tc-user'>
            <Link to={`/${user.username}`} className='tcu-link'>
              <Avatar
                src={
                  user && user.profile_image
                    ? user.profile_image
                    : '/default_profile.png'
                }
                className='user-img'
              />
            </Link>
          </div>
          <div className='tc-compose'>
            <div className='tc-text bbd-1'>
              <TextareaAutosize
                placeholder={`What's happening?`}
                className='tc-textarea cm-textarea'
                value={text}
                onChange={(e) => {
                  let text = e.target.value
                  setText(text)
                  setProgress(text.length)
                }}
                maxLength={280}
              />
            </div>
            <div className='tc-utils'>
              <div className='tcu-options'>
                <div className='tcuo'>
                  <ImageOutlinedIcon />
                </div>
                <div className='tcuo'>
                  <SentimentSatisfiedRoundedIcon />
                </div>
              </div>
              <div className='tc-tweet'>
                <CircularProgress
                  variant='determinate'
                  size={progress < 260 ? 20 : 30}
                  thickness={5}
                  value={progress === 0 ? 0 : (progress / 280) * 96 + 4}
                  className={`tctp ${
                    progress < 260
                      ? 'tctp-b'
                      : progress < 280
                      ? 'tctp-o'
                      : 'tctp-r'
                  }`}
                />
                {!fullScreen && (
                  <Button
                    disabled={text.trim() === ''}
                    onClick={submitHandler}
                    className={`btn-fill ${
                      text.trim() === '' ? 'btn-fill-disabled' : ''
                    }`}
                  >
                    Tweet
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default ComposeModal
