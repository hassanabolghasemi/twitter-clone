import React from 'react'

import { Link } from 'react-router-dom'

export const UserNotFound = () => {
  return (
    <div className='not-found'>
      <h2>This account doesn’t exist</h2>
      <p>Try searching for another.</p>
    </div>
  )
}

export const PageNotFound = () => {
  return (
    <div className='not-found'>
      <h2>Sorry, that page doesn’t exist!</h2>
      <p>
        Why not try a <Link to='/explore'>search</Link> to find something else?
      </p>
    </div>
  )
}
