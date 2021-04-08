import React from 'react'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { Link as MLink } from '@material-ui/core'

import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined'
import LinkRoundedIcon from '@material-ui/icons/LinkRounded'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'

const UserInfo = (props) => {
  const authedUser = useSelector((state) => state.auth)
  const { user, username, ownProfile, isFollowed, year, month } = props

  return (
    <div className='user-info-container'>
      <div className='user-header'></div>
      <div className='user-info px-15'>
        <div className='uinfo-header'>
          <Link to='#' className='uinfoh-avatar'>
            <Avatar
              src={
                user && user.profile_image
                  ? user.profile_image
                  : '/default_profile.png'
              }
              className='uinfoh-img'
            />
          </Link>
          {authedUser.user && (
            <>
              {user ? (
                ownProfile ? (
                  <Button className='btn-outline uinfoh-btn'>
                    Edit profile
                  </Button>
                ) : (
                  <Button
                    className={`${
                      isFollowed ? 'btn-fill' : 'btn-outline'
                    } uinfoh-btn`}
                  >
                    {isFollowed ? '' : 'Follow'}
                  </Button>
                )
              ) : (
                ''
              )}
            </>
          )}
        </div>
        {user ? (
          <>
            <div className='uinfo-name'>
              <div className='uinfo-fullname'>
                <span>{user.fullname}</span>
              </div>
              <div className='uinfo-username'>
                <span>{`@${user.username}`}</span>
              </div>
            </div>
            {user.bio && <div className='mt-10'>{user.bio}</div>}
            <div className='uinfo-extra mt-10'>
              {user.location && (
                <span className='uinfoe-items mr-10'>
                  <RoomOutlinedIcon className='mr-5' />
                  <span>{user.location}</span>
                </span>
              )}
              {user.website && (
                <span className='uinfoe-items mr-10'>
                  <LinkRoundedIcon className='mr-5' />
                  <MLink href={`http://${user.website}`} target='blank'>
                    {user.website}
                  </MLink>
                </span>
              )}
              <span className='uinfoe-items mr-10'>
                <DateRangeOutlinedIcon className='mr-5' />
                <span>{`Joined ${month} ${year}`}</span>
              </span>
            </div>
            <div className='uinfo-conn mt-10'>
              <Link to='#' className='mr-20'>
                <span className='uinfo-count'>{`${user.following_count} `}</span>
                <span>Following</span>
              </Link>
              <Link to='#'>
                <span className='uinfo-count'>{`${user.followers_count} `}</span>
                <span>Followers</span>
              </Link>
            </div>
          </>
        ) : (
          <div className='uinfo-name'>
            <div className='uinfo-fullname'>
              <span>{`@${username}`}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserInfo
