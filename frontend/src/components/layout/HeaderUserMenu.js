import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/authActions'

import Avatar from '@material-ui/core/Avatar'
import SvgIcon from '@material-ui/core/SvgIcon'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

import CheckRoundedIcon from '@material-ui/icons/CheckRounded'
import { ReactComponent as moreIcon } from '../../assets/more.svg'

function HeaderUserMenu() {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const history = useHistory()

  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const logoutBtn = () => {
    dispatch(logout(history))
  }

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        className='header-user'
      >
        <Avatar
          src={
            user && user.profile_image
              ? user.profile_image
              : '/default_profile.png'
          }
          className='huser-img'
        />
        <div className='user-fullname ufn'>
          <span className='name-span'>{user.fullname}</span>
          <span className='username-span'>{`@${user.username}`}</span>
        </div>
        <SvgIcon component={moreIcon} className='user-more' />
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement='top'
        disablePortal={false}
        className='h-user-popper'
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper className='h-paper'>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id='menu-list-grow'>
                  <div className='hum-user bbd-1'>
                    <Avatar
                      src={
                        user && user.profile_image
                          ? user.profile_image
                          : '/default_profile.png'
                      }
                      className='user-img'
                    />
                    <div className='user-fullname'>
                      <span className='name-span'>{user.fullname}</span>
                      <span className='username-span'>{`@${user.username}`}</span>
                    </div>
                    <CheckRoundedIcon className='user-online-check' />
                  </div>
                  <MenuItem className='hum-list bbd-1'>
                    <span className='huml-span'>Add an existing account</span>
                  </MenuItem>
                  <MenuItem className='hum-list' onClick={logoutBtn}>
                    <span className='huml-span'>{`Log out @${user.username}`}</span>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default HeaderUserMenu
