import React from 'react'
import { Link } from 'react-router-dom'

import MenuPopup from '../MenuPopup'

import SvgIcon from '@material-ui/core/SvgIcon'

import { ReactComponent as moreIcon } from '../../assets/more.svg'

const TrendBox = () => {
  const trends = [
    {
      title: '#Bitcoin',
      tweetNum: 29476,
    },
    {
      title: 'Elon',
      tweetNum: 5702,
    },
    {
      title: '#DOGE',
      tweetNum: 12607,
    },
    {
      title: 'SpaceX',
      tweetNum: 3954,
    },
  ]

  return (
    <div className='side-box'>
      <div className='stf-header bbd-1 py-10 px-15'>
        <h2>What's Happening</h2>
      </div>

      {trends.map((trend, index) => (
        <div key={index} className='stf-article py-10 px-15 bbd-1'>
          <div className='trend-article'>
            <div className='trend-info'>
              <span>Worldwide</span>
              <span className='dot-divider'>·</span>
              <span>Trending</span>
            </div>
            <div className='trend-title'>
              <span>{trend.title}</span>
            </div>
            <div className='trend-subtitle'></div>
            <div className='trend-info ti-bottom'>
              <span>{trend.tweetNum} Tweets</span>
            </div>
            <div className='trend-more'>
              <div className='tm-div'>
                <MenuPopup type='trendMore' className='tmd-more'>
                  <SvgIcon component={moreIcon} />
                </MenuPopup>
              </div>
            </div>
          </div>
          <div className='trend-image'></div>
        </div>
      ))}

      <Link to='#' className='stf-more py-10 px-15'>
        <span>Show more</span>
      </Link>
    </div>
  )
}

export default TrendBox

/* 
      
      // Trend with photo

      <div className='stf-article py-10 px-15 bbd-1'>
        <div className='trend-article ta-img'>
          <div className='trend-info'>
            <span>News</span>
            <span className='dot-divider'>·</span>
            <span>Yesterday</span>
          </div>
          <div className='trend-title'>
            <span>
              US federal government and 48 states file antitrust lawsuits
              against Facebook
            </span>
          </div>
          <div className='trend-subtitle'></div>
          <div className='trend-info ti-bottom'>
            <span>{`Trending with `}</span>
            <Link to='#' className='t-span'>
              #WhatsApp
            </Link>
          </div>
        </div>
        <div className='trend-image'>
          <div className='t-img'></div>
        </div>
      </div>
      <div className='bbd-1'></div>
      
      // Trend with content

      <div className='stf-article py-10 px-15 bbd-1'>
        <div className='trend-article'>
          <div className='trend-info'>
            <span>Space</span>
            <span className='dot-divider'>·</span>
            <span>Trending</span>
          </div>
          <div className='trend-title'>
            <span>SpaceX</span>
          </div>
          <div className='trend-subtitle'>
            <span>
              SpaceX launched its Starship on the spacecraft's highest test
              flight ever Wednesday, but the trial run ended in a massive
              fireball.
            </span>
          </div>
          <div className='trend-info ti-bottom'>
            <span>9,862 Tweets</span>
          </div>
          <div className='trend-more'>
            <div className='tm-div'>
              <MenuPopup type='trendMore' className='tmd-more'>
                <SvgIcon component={moreIcon} />
              </MenuPopup>
            </div>
          </div>
        </div>
        <div className='trend-image'></div>
      </div>
      */
