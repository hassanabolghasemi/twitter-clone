import React from 'react'

import SvgIcon from '@material-ui/core/SvgIcon'

import { ReactComponent as twitterIcon } from '../assets/twitter.svg'

const Loader = () => {
  return (
    <div className='loader'>
      <SvgIcon component={twitterIcon} className='loader-icon' />
    </div>
  )
}

export default Loader
