import React, { useEffect } from 'react'

import Link from '@material-ui/core/Link'

const Settings = () => {
  useEffect(() => {
    document.title = 'Settings / Twitter'
  }, [])

  return (
    <>
      <div className='primary-content'>
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
          <Link href='#' className='btn-fill nt-connect'>
            <span>Let’s go!</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Settings
