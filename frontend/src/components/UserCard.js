import React from 'react'
import { useSelector } from 'react-redux'

// import UserInfo from './UserInfo'

import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  tooltip: {
    margin: '10px 10px 10px 0',
    backgroundColor: '#ffffff',
    color: '#0f140f',
    padding: 15,
    borderRadius: 16,
    boxShadow: [
      'rgba(101, 119, 134, 0.2) 0px 0px 15px',
      'rgba(101, 119, 134, 0.15) 0px 0px 3px',
    ],
  },
  popper: {
    zIndex: 100,
  },
  arrow: {
    color: '#ffffff',
  },
}))

const UserCardContent = (usr, own, flw) => {
  const user = usr || {}

  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <div className='user-card'>
      <div className='ucard-header'>
        <div className='ucardh-avatar'>
          <Link to={`/${user.username}`} className='tcu-link'>
            <Avatar
              src={
                user && user.profile_image
                  ? user.profile_image
                  : '/default_profile.png'
              }
              className='user-img-59'
            />
          </Link>
        </div>
        {isAuthenticated && !own && (
          <Button
            className={`${flw ? 'btn-fill' : 'btn-outline'} ucardh-folbtn`}
          >
            {flw ? '' : 'Follow'}
          </Button>
        )}
      </div>
      <Link to={`/${user.username}`} className='ucard-name'>
        <div className='tcchi-fullname'>
          <span>{user.fullname}</span>
        </div>
        <div className='tcchi-username'>
          <span>{`@${user.username}`}</span>
        </div>
      </Link>
      {user.bio && <div className='ucard-desc mt-10 mb-5'>{user.bio}</div>}
      <div className='ucard-conn mt-10 mb-5'>
        <Link to='#' className='mr-20'>
          <span className='ucardc-count'>{`${user.following_count} `}</span>
          <span>Following</span>
        </Link>
        <Link to='#'>
          <span className='ucardc-count'>{`${user.followers_count} `}</span>
          <span>Followers</span>
        </Link>
      </div>
    </div>
  )
}

const UserCard = (props) => {
  const classes = useStyles()

  const { user, ownProfile, isFollowed } = props

  /*
    Change Tooltip component file to pass a component as title
    in (/node_modules/@material-ui/core/Tooltip/Tooltip.js:484)
  */

  return (
    <Tooltip
      title={UserCardContent(user, ownProfile, isFollowed)}
      interactive
      enterDelay={500}
      enterNextDelay={500}
      arrow={props.arrow || false}
      leaveDelay={300}
      placement={props.placement || 'bottom'}
      classes={{
        tooltip: classes.tooltip,
        popper: classes.popper,
        arrow: classes.arrow,
      }}
    >
      {props.children}
    </Tooltip>
  )
}

export default UserCard
