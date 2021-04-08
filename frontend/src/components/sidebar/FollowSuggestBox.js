import React from 'react'

import UserCard from '../UserCard'

import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

const FollowSuggestBox = () => {
  return (
    <div className='side-box'>
      <div className='stf-header py-10 px-15 bbd-1'>
        <h2>Who to follow</h2>
      </div>
      <div className='stf-article py-10 px-15 bbd-1'>
        <UserCard>
          <Link to='#'>
            <Avatar
              src={
                '/default_profile.png'
                // user && user.profile_image
                //   ? user.profile_image
                //   : '/default_profile.png'
              }
              className='user-img'
            />
          </Link>
        </UserCard>
        <div className='user-fullname'>
          <span className='name-span'>Hassan Abolghasemi</span>
          <span className='username-span'>@admin</span>
        </div>
        <Button className='btn-outline sf-btn'>Follow</Button>
      </div>
      <div className='stf-article py-10 px-15 bbd-1'>
        <UserCard>
          <Link to='#'>
            <Avatar
              src={
                '/default_profile.png'
                // user && user.profile_image
                //   ? user.profile_image
                //   : '/default_profile.png'
              }
              className='user-img'
            />
          </Link>
        </UserCard>
        <div className='user-fullname'>
          <span className='name-span'>Hassan</span>
          <span className='username-span'>@hassan</span>
        </div>
        <Button className='btn-outline sf-btn'>Follow</Button>
      </div>
      <Link to='#' className='stf-more py-10 px-15'>
        <span>Show more</span>
      </Link>
    </div>
  )
}

export default FollowSuggestBox
