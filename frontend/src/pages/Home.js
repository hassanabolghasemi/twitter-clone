import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHomeTweets } from '../actions/tweetsActions'

import PCHeader from '../components/PCHeader'
import Compose from '../components/Compose'
import Tweet from '../components/Tweet'
import TweetEmpty from '../components/TweetEmpty'

import CircularProgress from '@material-ui/core/CircularProgress'

const Home = () => {
  const dispatch = useDispatch()

  const { status, homeTweets } = useSelector((state) => state.tweets)

  useEffect(() => {
    document.title = 'Home / Twitter'

    if (!homeTweets.length) dispatch(getHomeTweets())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PCHeader type='simple' title='Home' />
      <Compose />
      <div className='comtwe-devider'></div>
      <div className='primary-content'>
        {status === 'loading' ? (
          <div className='spinner'>
            <CircularProgress size={30} thickness={5} className='cp-spinner' />
          </div>
        ) : homeTweets.length === 0 ? (
          <TweetEmpty />
        ) : (
          homeTweets.map((tweet) => (
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

export default Home
