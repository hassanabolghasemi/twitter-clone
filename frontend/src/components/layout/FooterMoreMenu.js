import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import SvgIcon from '@material-ui/core/SvgIcon'
import Menu from '@material-ui/core/Menu'

import { ReactComponent as moreIcon } from '../../assets/more.svg'

const FooterMoreMenu = () => {
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
        className='sfooter-more'
      >
        <div>More</div>
        <SvgIcon component={moreIcon} />
      </div>
      <Menu
        id='more-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: 'more-paper footer-more-paper', list: 'more-list' }}
      >
        <Link to='#' className='hum-list'>
          <span className='huml-span'>About</span>
        </Link>
        <Link to='#' className='hum-list'>
          <span className='huml-span'>Status</span>
        </Link>
        <Link to='#' className='hum-list'>
          <span className='huml-span'>Twitter for Business</span>
        </Link>
        <Link to='#' className='hum-list'>
          <span className='huml-span'>Developers</span>
        </Link>
      </Menu>
    </>
  )
}

export default FooterMoreMenu
