import React from 'react'
import { useSelector } from 'react-redux'

import HeaderUserMenu from './HeaderUserMenu'
// import HeaderMoreMenu from './HeaderMoreMenu'

import { NavLink, Link, useHistory } from 'react-router-dom'
import SvgIcon from '@material-ui/core/SvgIcon'

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded'
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded'
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded'
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded'
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined'
import SettingsIcon from '@material-ui/icons/Settings'

import { ReactComponent as twitterIcon } from '../../assets/twitter.svg'
import { ReactComponent as hashtagIcon } from '../../assets/hashtag.svg'
// import { ReactComponent as moreRoundIcon } from '../../assets/more-round.svg'
import { ReactComponent as tweet } from '../../assets/tweet.svg'

const Header = () => {
  let history = useHistory()
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  return (
    <header>
      <div className='header-side'>
        <div className='header'>
          <div className='header-navbar'>
            <div className='header-icon'>
              <NavLink
                to={`${isAuthenticated ? '/home' : '/'}`}
                className='icon-link'
              >
                <SvgIcon component={twitterIcon} className='icon' />
              </NavLink>
            </div>
            <nav className='header-nav'>
              {isAuthenticated && (
                <NavLink
                  to='/home'
                  className='nav-link'
                  activeClassName='nav-active'
                >
                  <div className='nl-div'>
                    <HomeOutlinedIcon className='nav-icon' />
                    <span className='nav-span'>Home</span>
                  </div>
                </NavLink>
              )}
              <NavLink
                to='/explore'
                className='nav-link'
                activeClassName='nav-active'
              >
                <div className='nl-div'>
                  <SvgIcon component={hashtagIcon} className='nav-icon' />
                  <span className='nav-span'>Explore</span>
                </div>
              </NavLink>
              {isAuthenticated && (
                <>
                  <div className='nav-link nav-disabled'>
                    <div className='nl-div'>
                      <NotificationsNoneRoundedIcon className='nav-icon' />
                      <span className='nav-span'>Notifications</span>
                    </div>
                  </div>
                  <NavLink
                    to='/messages'
                    className='nav-link nav-disabled'
                    activeClassName='nav-active'
                  >
                    <div className='nl-div'>
                      <MailOutlineRoundedIcon className='nav-icon' />
                      <span className='nav-span'>Messages</span>
                    </div>
                  </NavLink>
                  <div className='nav-link nav-disabled'>
                    <div className='nl-div'>
                      <BookmarkBorderRoundedIcon className='nav-icon' />
                      <span className='nav-span'>Bookmarks</span>
                    </div>
                  </div>
                  <div className='nav-link nav-disabled'>
                    <div className='nl-div'>
                      <FeaturedPlayListOutlinedIcon className='nav-icon' />
                      <span className='nav-span'>Lists</span>
                    </div>
                  </div>
                  <NavLink
                    exact
                    to={`/${user.username}`}
                    className='nav-link'
                    activeClassName='nav-active'
                  >
                    <div className='nl-div'>
                      <PersonOutlineRoundedIcon className='nav-icon' />
                      <span className='nav-span'>Profile</span>
                    </div>
                  </NavLink>
                </>
              )}
              <NavLink
                to='/settings'
                className='nav-link nav-disabled'
                activeClassName='nav-active'
              >
                <div className='nl-div'>
                  <SettingsIcon className='nav-icon' />
                  <span className='nav-span'>Settings</span>
                </div>
              </NavLink>
              {/* <HeaderMoreMenu /> */}
            </nav>
            {isAuthenticated && (
              <div className='header-tweet'>
                <Link
                  to={{
                    pathname: '/compose/tweet',
                    state: { modal: true, from: history.location },
                  }}
                  className='btn-fill tweet-btn'
                >
                  <SvgIcon component={tweet} className='tweet-icon' />
                  <span className='tweet-span'>Tweet</span>
                </Link>
              </div>
            )}
          </div>
          {isAuthenticated && <HeaderUserMenu />}
        </div>
      </div>
    </header>
  )
}

export default Header
