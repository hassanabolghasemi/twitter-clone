import React from 'react'

import SvgIcon from '@material-ui/core/SvgIcon'

import { ReactComponent as starIcon } from '../assets/star.svg'

const PCHeader = (props) => {
  const { type, title = '', info = '' } = props

  return (
    <div className='primary-header px-15'>
      <div className='p-header'>
        <div className='ph-title'>
          <div className='pht-div'>
            {type === 'user' ? (
              <>
                <div className='phtd-back'></div>
                <div className='phtd-title'>
                  <h2>{title}</h2>
                  <p>{info}</p>
                </div>
              </>
            ) : type === 'search' ? (
              <h2>Explorer</h2>
            ) : (
              <h2>{title}</h2>
            )}
          </div>
        </div>
        <div className='ph-cntpref'>
          {type === 'simple' && (
            <div className='ph-cp-div'>
              <SvgIcon component={starIcon} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PCHeader
