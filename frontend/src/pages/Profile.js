import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, setCurrentUser } from '../actions/usersActions'
import { getUserTweets } from '../actions/tweetsActions'

import { dateFullGenerator } from '../utils/generator'
import { isEmpty } from '../utils/validator'

import PCHeader from '../components/PCHeader'
import UserInfo from '../components/UserInfo'
import Tweet from '../components/Tweet'
import { UserNotFound } from '../components/NotFound'

import CircularProgress from '@material-ui/core/CircularProgress'

const Profile = () => {
  const { username } = useParams()
  const [fullname, setFullname] = useState('Profile')
  const [tweetCount, setTweetCount] = useState('')
  const [ownProfile, setOwnProfile] = useState(false)
  const [isFollowed, setisFollowed] = useState(false)
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')

  const dispatch = useDispatch()

  const { status, users, currentUser } = useSelector((state) => state.users)
  const authedUser = useSelector((state) => state.auth)
  const tweets = useSelector((state) => state.tweets)

  useEffect(() => {
    async function findUser() {
      if (!isEmpty(users)) {
        var userInList = false
        // eslint-disable-next-line array-callback-return
        await users.map((usr) => {
          if (usr.username === username) {
            userInList = true
            dispatch(setCurrentUser(usr))
          }
        })

        if (!userInList) dispatch(getUser(username))
      } else {
        dispatch(getUser(username))
      }
    }

    if (!currentUser || (currentUser && currentUser.username !== username))
      findUser()
  }, [dispatch, username, users, currentUser])

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserTweets(username))

      const { fullname, tweets_count } = currentUser

      document.title = `${fullname} (@${username}) / Twitter`

      setFullname(fullname)
      setTweetCount(String(tweets_count))

      const { yearUTC, monthUTC } = dateFullGenerator(currentUser.createdAt)
      setYear(yearUTC)
      setMonth(monthUTC)
    } else {
      document.title = 'Profile / Twitter'

      setFullname('Profile')
      setTweetCount('')
    }

    if (authedUser.user && currentUser) {
      if (authedUser.user.username === currentUser.username) {
        setOwnProfile(true)
      } else {
        setOwnProfile(false)

        let following = authedUser.user.following

        // eslint-disable-next-line array-callback-return
        following.map((id) => {
          if (id === currentUser._id) {
            setisFollowed(true)
          }
        })
      }
    }
  }, [dispatch, authedUser, currentUser, username])

  return (
    <>
      {status === 'loading' ? (
        <div className='spinner'>
          <CircularProgress size={30} thickness={5} className='cp-spinner' />
        </div>
      ) : (
        <>
          <PCHeader
            type='user'
            title={fullname}
            info={tweetCount && `${tweetCount} Tweets`}
          />
          <UserInfo
            user={currentUser}
            username={username}
            ownProfile={ownProfile}
            isFollowed={isFollowed}
            year={year}
            month={month}
          />
          <div className='primary-content'>
            {currentUser ? (
              <>
                <div className='bbd-1'></div>
                {tweets.status === 'loading' ? (
                  <div className='spinner'>
                    <CircularProgress
                      size={30}
                      thickness={5}
                      className='cp-spinner'
                    />
                  </div>
                ) : tweets.status === 'error' ? (
                  tweets.error
                ) : !isEmpty(tweets.userTweets) ? (
                  tweets.userTweets.map((tweet) => (
                    <Tweet
                      key={tweet.id}
                      tweet={tweet.text === '' ? tweet.ref_tweet : tweet}
                      retweeter={tweet.text === '' ? tweet.user : null}
                    />
                  ))
                ) : (
                  <p style={{ maxWidth: '100%', width: '100vw' }}>Empty</p>
                )}
              </>
            ) : (
              <>
                <div className='bbd-1'></div>
                <UserNotFound />
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Profile
