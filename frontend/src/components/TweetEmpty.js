import React from 'react'

import { Link } from 'react-router-dom'

const TweetEmpty = () => {
  return (
    <div className='no-tweet'>
      <div className='nt-title'>
        <span>Welcome to Twitter!</span>
      </div>
      <div className='nt-description'>
        <span>
          This is the best place to see what’s happening in your world. Find
          some people and topics to follow now.
        </span>
      </div>
      <Link to='#' className='btn-fill nt-connect'>
        <span>Let’s go!</span>
      </Link>
    </div>
  )
}

export default TweetEmpty
