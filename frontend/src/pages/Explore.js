import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getExploreTweets } from '../actions/tweetsActions'

import PCHeader from '../components/PCHeader'
import Tweet from '../components/Tweet'
import TweetEmpty from '../components/TweetEmpty'

import CircularProgress from '@material-ui/core/CircularProgress'

const Explore = () => {
  const dispatch = useDispatch()

  const { status, exploreTweets } = useSelector((state) => state.tweets)

  useEffect(() => {
    document.title = 'Explore / Twitter'

    dispatch(getExploreTweets())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PCHeader type='search' />
      <div className='primary-content'>
        {status === 'loading' ? (
          <div className='spinner'>
            <CircularProgress size={30} thickness={5} className='cp-spinner' />
          </div>
        ) : exploreTweets.length === 0 ? (
          <TweetEmpty />
        ) : (
          exploreTweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweet={tweet.text === '' ? tweet.ref_tweet : tweet}
              retweeter={tweet.text === '' ? tweet.user : null}
            />
          ))
        )}
      </div>
    </>
  )
}

export default Explore
