import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import SvgIcon from '@material-ui/core/SvgIcon'
import Menu from '@material-ui/core/Menu'

import { ReactComponent as moreRoundIcon } from '../../assets/more-round.svg'

const HeaderMoreMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <div
        aria-controls='more-menu'
        aria-haspopup='true'
        onClick={handleClick}
        className='nav-link'
      >
        <div className='nl-div'>
          <SvgIcon component={moreRoundIcon} className='nav-icon' />
          <div className='nav-span'>More</div>
        </div>
      </div>
      <Menu
        id='more-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: 'more-paper', list: 'more-list' }}
      >
        <Link to='#' className='hum-list'>
          <span className='huml-span'>Bookmarks</span>
        </Link>
        <Link to='#' className='hum-list'>
          <span className='huml-span'>Lists</span>
        </Link>
        <Link to='#' className='hum-list'>
          <span className='huml-span'>Topics</span>
        </Link>
        <Link to='#' className='hum-list'>
          <span className='huml-span'>Moments</span>
        </Link>
        <Link to='#' className='hum-list'>
          <span className='huml-span'>Twitter Ads</span>
        </Link>
        <Link to='#' className='hum-list'>
          <span className='huml-span'>Analytics</span>
        </Link>
        <div className='bbd-1'></div>
        <Link to='#' className='hum-list'>
          <span className='huml-span'>Settings and privacy</span>
        </Link>
        <Link to='#' className='hum-list'>
          <span className='huml-span'>Help Center</span>
        </Link>
        <Link to='#' className='hum-list'>
          <span className='huml-span'>Display</span>
        </Link>
        <Link to='#' className='hum-list'>
          <span className='huml-span'>Keyboard shortcuts</span>
        </Link>
      </Menu>
    </>
  )
}

export default HeaderMoreMenu
