import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getReplies, getTweet, setCurrentTweet } from '../actions/tweetsActions'

import PCHeader from './PCHeader'
import Tweet from './Tweet'
import UserCard from './UserCard'
import MenuPopup from './MenuPopup'
import { PageNotFound } from './NotFound'
import { tweetTimeGenerator } from '../utils/generator'
import { isEmpty } from '../utils/validator'

import Avatar from '@material-ui/core/Avatar'
import SvgIcon from '@material-ui/core/SvgIcon'
import CircularProgress from '@material-ui/core/CircularProgress'

import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded'
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import ShareIcon from '@material-ui/icons/Share'

import { ReactComponent as moreIcon } from '../assets/more.svg'

const TweetContent = () => {
  const { username, id } = useParams()
  const [user, setUser] = useState({})
  const [refUser, setRefUser] = useState({})
  const [tweet, setTweet] = useState({})
  const [refTweet, setRefTweet] = useState({})
  const [ownProfile, setOwnProfile] = useState(false)
  const [isFollowed, setisFollowed] = useState(false)
  const [like, setLike] = useState(false)
  const [retweet, setRetweet] = useState(false)

  const tweetDate = tweet.createdAt || ''

  const { tweetTimeFull } = tweetTimeGenerator(tweetDate)
  const refTweetTime = tweetTimeGenerator(refTweet.createdAt).tweetTime

  const history = useHistory()
  const dispatch = useDispatch()

  const { users } = useSelector((state) => state.users)
  const { status, tweetStatus, allTweets, currentTweet, replies } = useSelector(
    (state) => state.tweets
  )
  const authedUser = useSelector((state) => state.auth)

  // Tweet
  useEffect(() => {
    document.title =
      user.fullname && tweet.text
        ? `${user.fullname} on Twitter: "${tweet.text}"`
        : 'Twitter'

    async function findTweet() {
      if (!isEmpty(allTweets)) {
        var tweetInList = false
        // eslint-disable-next-line array-callback-return
        await allTweets.map((tweet) => {
          if (tweet.id === id) {
            tweetInList = true
            dispatch(setCurrentTweet(tweet))
          }
        })

        if (!tweetInList) dispatch(getTweet(username, id))
      } else {
        dispatch(getTweet(username, id))
      }
    }

    if (!currentTweet || (currentTweet && currentTweet.id !== id)) {
      findTweet()
    } else {
      setTweet(currentTweet)

      // eslint-disable-next-line array-callback-return
      users.map((usr) => {
        if (usr._id === tweet.user) {
          setUser(usr)
        }
      })

      if (tweet.ref_tweet) {
        setRefTweet(tweet.ref_tweet)
        // eslint-disable-next-line array-callback-return
        users.map((usr) => {
          if (usr._id === tweet.ref_tweet.user) {
            setRefUser(usr)
          }
        })
      }
    }
  }, [
    dispatch,
    username,
    id,
    tweet,
    currentTweet,
    allTweets,
    users,
    user.fullname,
  ])

  // User
  useEffect(() => {
    if (!isEmpty(authedUser.user) && !isEmpty(user)) {
      if (authedUser.user.username === user.username) {
        setOwnProfile(true)
      } else {
        setOwnProfile(false)

        let following = authedUser.user.following || []

        // eslint-disable-next-line array-callback-return
        following.map((id) => {
          if (id === user._id) {
            setisFollowed(true)
          }
        })
      }

      setRetweet(false)
      // eslint-disable-next-line array-callback-return
      authedUser.user.retweets.map((id) => {
        if (id === tweet._id) {
          setRetweet(true)
        }
      })
    }
  }, [authedUser, tweet, user])

  // Replies
  useEffect(() => {
    if (tweetStatus !== 'error') dispatch(getReplies(id))
  }, [dispatch, id, tweetStatus])

  return (
    <>
      <PCHeader type='user' title='Tweet' />
      {tweetStatus === 'loading' ? (
        <div className='spinner'>
          <CircularProgress size={30} thickness={5} className='cp-spinner' />
        </div>
      ) : tweetStatus === 'error' ? (
        <PageNotFound />
      ) : (
        <>
          <div className='tweet-container pt-5 px-15'>
            <div className='tc-twt'>
              <div className='tc-user'>
                <UserCard
                  user={user}
                  ownProfile={ownProfile}
                  isFollowed={isFollowed}
                >
                  <Link
                    to={`/${user.username}`}
                    className='tcu-link'
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <Avatar
                      src={
                        user && user.profile_image
                          ? user.profile_image
                          : '/default_profile.png'
                      }
                      className='user-img'
                    />
                  </Link>
                </UserCard>
              </div>

              <div className='tc-info fljcen'>
                <div className='tcc-header'>
                  <div className='tcch-info'>
                    <UserCard
                      user={user}
                      ownProfile={ownProfile}
                      isFollowed={isFollowed}
                    >
                      <Link
                        to={`/${user.username}`}
                        className='tcchi-name flex-col'
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <div className='tcchi-fullname'>
                          <span>{user.fullname}</span>
                        </div>
                        <div className='tcchi-username'>
                          <span>{`@${user.username}`}</span>
                        </div>
                      </Link>
                    </UserCard>
                  </div>

                  <div className='tcch-more'>
                    <MenuPopup
                      type={ownProfile ? 'ownTweetMore' : 'tweetMore'}
                      className='tcchm'
                      username={user.username}
                      isFollowed={isFollowed}
                    >
                      <SvgIcon component={moreIcon} />
                    </MenuPopup>
                  </div>
                </div>
              </div>
            </div>

            <div className='tcc-content mt-10'>
              <p className='tccct fs-23'>{tweet.text}</p>

              {tweet.ref_tweet && (
                <div
                  className='tccc-retweet'
                  onClick={(e) => {
                    e.stopPropagation()
                    history.push(
                      `/${refUser.username}/status/${tweet.ref_tweet.id}`
                    )
                  }}
                >
                  <div className='tcch-info'>
                    <div className='tcccri-user'>
                      <Avatar
                        src={
                          refUser && refUser.profile_image
                            ? refUser.profile_image
                            : '/default_profile.png'
                        }
                        className='user-img-20'
                      />
                      <div className='tcchi-fullname'>
                        <span>{refUser.fullname}</span>
                      </div>
                      <div className='tcchi-username'>
                        <span>{`@${refUser.username}`}</span>
                      </div>
                    </div>
                    <div className='tcccri-time'>
                      <span className='px-5'>·</span>
                      <span>{refTweetTime}</span>
                    </div>
                  </div>
                  <div className='tcccr-content'>{refTweet.text}</div>
                </div>
              )}
            </div>

            <div className='color-grli fw-500 my-15'>{tweetTimeFull}</div>

            {tweet.retweet_count || tweet.quote_count || tweet.like_count ? (
              <div className='uinfo-conn py-15 px-5 btd-1'>
                {tweet.retweet_count ? (
                  <Link to='#' className='mr-20'>
                    <span className='uinfo-count'>{`${tweet.retweet_count} `}</span>
                    <span>Retweets</span>
                  </Link>
                ) : (
                  ''
                )}
                {tweet.quote_count ? (
                  <Link to='#' className='mr-20'>
                    <span className='uinfo-count'>{`${tweet.quote_count} `}</span>
                    <span>Qoute Tweets</span>
                  </Link>
                ) : (
                  ''
                )}
                {tweet.like_count ? (
                  <Link to='#'>
                    <span className='uinfo-count'>{`${tweet.like_count} `}</span>
                    <span>Likes</span>
                  </Link>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}

            <div className='tc-actions py-10 btd-1'>
              <div
                className='tcca tccab'
                onClick={(e) => {
                  e.stopPropagation()
                  history.push('/compose/tweet', {
                    modal: true,
                    from: history.location,
                  })
                }}
              >
                <div className='tcca-icon'>
                  <ChatBubbleOutlineRoundedIcon />
                </div>
              </div>
              <MenuPopup
                type='retweet'
                retweet={retweet}
                className={`tcca tccag ${retweet ? 'tccag-active' : ''}`}
              >
                <div className='tcca-icon'>
                  <RepeatRoundedIcon className='retweet-svg' />
                </div>
              </MenuPopup>
              <div
                className={`tcca tccar ${like ? 'tccar-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setLike(!like)
                }}
              >
                <div className='tcca-icon'>
                  {like ? (
                    <FavoriteRoundedIcon />
                  ) : (
                    <FavoriteBorderRoundedIcon />
                  )}
                </div>
              </div>
              <MenuPopup type='share' className='tcca tccab'>
                <div className='tcca-icon'>
                  <ShareIcon />
                </div>
              </MenuPopup>
            </div>
          </div>
          {status === 'loading' ? (
            <div className='spinner'>
              <CircularProgress
                size={30}
                thickness={5}
                className='cp-spinner'
              />
            </div>
          ) : (
            replies.map((tweet) => (
              <Tweet
                key={tweet.id}
                tweet={tweet.text === '' ? tweet.ref_tweet : tweet}
                retweeter={tweet.text === '' ? tweet.user : null}
              />
            ))
          )}
        </>
      )}
    </>
  )
}

export default TweetContent
