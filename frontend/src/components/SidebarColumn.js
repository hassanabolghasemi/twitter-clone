import React, { useState, useEffect } from 'react'

import TrendBox from './sidebar/TrendBox'
import FollowSuggestBox from './sidebar/FollowSuggestBox'
import FooterMoreMenu from './layout/FooterMoreMenu'

import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(() => ({
  sidebarDiv: {
    minHeight: (props) => props.sidebarHeight,
  },
  sidebarInline: {
    top: (props) =>
      props.scrollDown && props.scroll > props.divTop
        ? props.sidebarBottom - 10 < 0
          ? props.sidebarBottom - 10
          : ''
        : '',
    bottom: (props) =>
      !props.scrollDown && !props.divTB
        ? props.sidebarBottom < 0
          ? props.sidebarBottom
          : ''
        : props.scrollDown && props.divTB && props.scroll > props.divTop
        ? '10px'
        : '',
    position: (props) => (props.divTB ? 'fixed' : 'sticky'),
  },
  extramargin: {
    marginTop: (props) => props.divTop,
  },
}))

const SidebarColumn = () => {
  const [scroll, setScroll] = useState(0)
  const [scrollDown, setScrollDown] = useState(true)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  // Sidebar div top
  const [divTop, setDivTop] = useState(0)
  const [divTB, setDivTB] = useState(true)

  window.onresize = () => {
    setWindowHeight(window.innerHeight)
  }

  // let sidebarHeight = document.querySelector('.sidebar').clientHeight;
  let sidebarHeight = 873
  let sidebarBottom = (sidebarHeight - windowHeight) * -1

  let styleProps = {
    scroll,
    scrollDown,
    divTop,
    divTB,
    sidebarHeight,
    sidebarBottom,
  }
  const classes = useStyles(styleProps)

  useEffect(() => {
    function pageScroll() {
      let scrollY = window.scrollY

      if (scrollY > scroll) {
        if (scrollY >= divTop + sidebarHeight - windowHeight) {
          setDivTop(scrollY + windowHeight - sidebarHeight)
          setDivTB(true)
        } else {
          setDivTB(false)
        }
        if (!scrollDown) {
          setScrollDown(true)
        }
      } else {
        if (scrollY <= divTop) {
          setDivTop(scrollY)
          setDivTB(true)
        } else {
          setDivTB(false)
        }
        if (scrollDown) {
          setScrollDown(false)
        }
      }
      setScroll(scrollY)
    }

    window.addEventListener('scroll', pageScroll)

    return () => {
      window.removeEventListener('scroll', pageScroll)
    }
  })

  return (
    <div className='sidebar-col'>
      <div className={`sidebar-div ${classes.sidebarDiv}`}>
        <div className={`m-div ${classes.extramargin}`}></div>
        <div className={`sidebar ${classes.sidebarInline}`}>
          <div className='side-search'>
            <div className='search-box'>
              <SearchIcon className='search-box-icon' />
              <TextField
                variant='outlined'
                margin='none'
                inputMode='search'
                placeholder='Search Twitter'
                className='side-search-input'
              />
            </div>
          </div>
          <div className='empty-div'></div>
          <TrendBox />
          <FollowSuggestBox />
          <div className='side-footer px-15'>
            <Link to='#'>Terms of Service</Link>
            <Link to='#'>Privacy Policy</Link>
            <Link to='#'>Cookie Policy</Link>
            <Link to='#'>Ads info</Link>
            <FooterMoreMenu />
            <div className='copyright'>
              <span>© 2021 Twitter, Inc.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarColumn
