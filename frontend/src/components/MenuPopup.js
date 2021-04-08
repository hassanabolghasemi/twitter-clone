import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Popover from '@material-ui/core/Popover'

// Retweet
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'

// Share
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded'
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined'
import LinkRoundedIcon from '@material-ui/icons/LinkRounded'

// Tweet more
import SentimentDissatisfiedRoundedIcon from '@material-ui/icons/SentimentDissatisfiedRounded'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined'
import PostAddIcon from '@material-ui/icons/PostAdd'
import VolumeOffOutlinedIcon from '@material-ui/icons/VolumeOffOutlined'
import BlockIcon from '@material-ui/icons/Block'
import CodeIcon from '@material-ui/icons/Code'
import OutlinedFlagRoundedIcon from '@material-ui/icons/OutlinedFlagRounded'

// User own tweet more
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined'
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded'

const MenuPopup = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const history = useHistory()

  const menu = {
    retweet: [
      {
        svg: <RepeatRoundedIcon className='retweet-svg' />,
        title: `${props.retweet ? 'Undo ' : ''}Retweet`,
        type: 'retweet',
        classname: props.retweet && 'huml-red',
      },
      {
        svg: <CreateOutlinedIcon />,
        title: 'Quote Tweet',
        type: 'quote',
      },
    ],

    share: [
      {
        svg: <MailOutlineRoundedIcon />,
        title: 'Send via Direct Message',
        type: 'dm',
        classname: 'huml-disable',
      },
      {
        svg: <NoteAddOutlinedIcon />,
        title: 'Add Tweet to Bookmarks',
        type: 'bookmark',
        classname: 'huml-disable',
      },
      {
        svg: <LinkRoundedIcon />,
        title: 'Copy link to Tweet',
        type: 'cpLink',
        classname: 'huml-disable',
      },
    ],

    tweetMore: [
      {
        svg: <SentimentDissatisfiedRoundedIcon />,
        title: 'Not interested in this Tweet',
        type: 'notInterest',
        classname: 'huml-disable',
      },
      {
        svg: props.isFollowed ? (
          <PersonAddDisabledOutlinedIcon />
        ) : (
          <PersonAddOutlinedIcon />
        ),
        title: `${props.isFollowed ? 'Unfollow' : 'Follow'} @${props.username}`,
        type: 'follow',
        classname: 'huml-disable',
      },
      {
        svg: <PostAddIcon />,
        title: 'Add/remove from Lists',
        type: 'list',
        classname: 'huml-disable',
      },
      {
        svg: <VolumeOffOutlinedIcon />,
        title: `Mute @${props.username}`,
        type: 'mute',
        classname: 'huml-disable',
      },
      {
        svg: <BlockIcon />,
        title: `Block @${props.username}`,
        type: 'block',
        classname: 'huml-disable',
      },
      {
        svg: <CodeIcon />,
        title: 'Embed Tweet',
        type: 'embed',
        classname: 'huml-disable',
      },
      {
        svg: <OutlinedFlagRoundedIcon />,
        title: 'Report Tweet',
        type: 'report',
        classname: 'huml-disable',
      },
    ],

    ownTweetMore: [
      {
        svg: <DeleteOutlineIcon />,
        title: 'Delete',
        type: 'delete',
        classname: 'huml-red',
      },
      {
        svg: <PinDropOutlinedIcon />,
        title: 'Pin to your profile',
        type: 'pin',
        classname: 'huml-disable',
      },
      {
        svg: <CodeIcon />,
        title: 'Embed Tweet',
        type: 'embed',
        classname: 'huml-disable',
      },
      {
        svg: <BarChartRoundedIcon />,
        title: 'View Tweet activity',
        type: 'activity',
        classname: 'huml-disable',
      },
    ],

    trendMore: [
      {
        svg: <SentimentDissatisfiedRoundedIcon />,
        title: 'Not interested in this',
        type: 'notInterest',
        classname: 'huml-disable',
      },
      {
        svg: <SentimentDissatisfiedRoundedIcon />,
        title: 'This trend is harmful or spammy',
        type: 'spam',
        classname: 'huml-disable',
      },
    ],
  }

  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  const handleItem = (type) => {
    if (type === 'retweet') {
      setAnchorEl(null)
      // dispatch
    } else if (type === 'quote') {
      setAnchorEl(null)
      history.push('/compose/tweet', {
        modal: true,
        from: history.location,
      })
    } else if (type === 'delete') {
      setAnchorEl(null)
      // dispatch
    }
  }

  const open = Boolean(anchorEl)
  const id = open ? 'menu-popup' : undefined

  return (
    <>
      <div
        aria-describedby={id}
        onClick={handleClick}
        className={props.className}
      >
        {props.children}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{ paper: 'menu-popup-paper' }}
      >
        <div className='menu-popup-list'>
          {props.type &&
            menu[props.type].map((item, index) => (
              <div
                key={index}
                className={`hum-list ${item.classname ? item.classname : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  if (item.classname !== 'huml-disable') handleItem(item.type)
                }}
              >
                {item.svg}
                <span className='huml-span'>{item.title}</span>
              </div>
            ))}
        </div>
      </Popover>
    </>
  )
}

export default MenuPopup
