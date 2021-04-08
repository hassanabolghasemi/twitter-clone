import React from 'react';

// import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
// import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// import { ReactComponent as moreIcon } from '../assets/more.svg';
import { ReactComponent as starIcon } from '../assets/star.svg';

const PrimaryColumn = () => {
  return (
    <div className='primary-col'>
      <div className='primary-header px-15'>
        <div className='p-header'>
          <div className='ph-title'>
            <div className='pht-div'>
              <h2>Home</h2>
            </div>
          </div>
          <div className='ph-cntpref'>
            <div className='ph-cp-div'>
              <SvgIcon component={starIcon} />
            </div>
          </div>
        </div>
      </div>
      <div className='primary-tweet-compose'>
        <div className='ptc-user'>
          <Link href='#' className='ptcu-link'>
            <AccountCircleIcon className='no-img' />
          </Link>
        </div>
        <div className='ptc-compose'></div>
      </div>
      <div className='comtwe-devider'></div>
      <div className='primary-tweets'>
        <div className='no-tweet'>
          <div className='nt-title'>
            <span>Welcome to Twitter!</span>
          </div>
          <div className='nt-description'>
            <span>
              This is the best place to see what’s happening in your world. Find
              some people and topics to follow now.
            </span>
          </div>
          <Link href='#' className='btn-fill nt-connect'>
            <span>Let’s go!</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrimaryColumn;
