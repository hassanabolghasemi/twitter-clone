import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { composeTweet } from '../actions/tweetsActions'

import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'
import SentimentSatisfiedRoundedIcon from '@material-ui/icons/SentimentSatisfiedRounded'

const Compose = () => {
  const [text, setText] = useState('')
  const [progress, setProgress] = useState(0)

  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    const body = {
      text: text.trim(),
    }

    dispatch(composeTweet(body))
    setText('')
    setProgress(0)
  }

  return (
    <>
      <div className='home-tweet-compose'>
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
          <div className='tc-text'>
            <TextareaAutosize
              dir='auto'
              placeholder={`What's happening?`}
              className='tc-textarea'
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
              <Button
                disabled={text.trim() === ''}
                onClick={submitHandler}
                className={`btn-fill ${
                  text.trim() === '' ? 'btn-fill-disabled' : ''
                }`}
              >
                Tweet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Compose
