import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import UserCard from './UserCard'
import MenuPopup from './MenuPopup'
import { tweetTimeGenerator } from '../utils/generator'
import { isEmpty } from '../utils/validator'

import Avatar from '@material-ui/core/Avatar'
import SvgIcon from '@material-ui/core/SvgIcon'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded'
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import ShareIcon from '@material-ui/icons/Share'

import { ReactComponent as moreIcon } from '../assets/more.svg'

const useStyles = makeStyles(() => ({
  tooltip: {
    margin: '3px 0',
  },
}))

const Tweet = (props) => {
  const [user, setUser] = useState({})
  const [refUser, setRefUser] = useState({})
  const [refTweet, setRefTweet] = useState({})
  const [retweeter, setRetweeter] = useState(null)
  const [ownProfile, setOwnProfile] = useState(false)
  const [isFollowed, setisFollowed] = useState(false)
  const [like, setLike] = useState(false)
  const [retweet, setRetweet] = useState(false)
  const classes = useStyles()

  const { tweet } = props
  const tweetDate = tweet.createdAt || ''

  const { tweetTime, tweetTimeFull } = tweetTimeGenerator(tweetDate)
  const refTweetTime = tweetTimeGenerator(refTweet.createdAt).tweetTime

  const history = useHistory()

  const { users } = useSelector((state) => state.users)
  const authedUser = useSelector((state) => state.auth)

  useEffect(() => {
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

    if (props.retweeter) {
      // eslint-disable-next-line array-callback-return
      users.map((usr) => {
        if (usr._id === props.retweeter) {
          setRetweeter({
            fullname: usr.fullname,
            username: usr.username,
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

      // eslint-disable-next-line array-callback-return
      authedUser.user.retweets.map((id) => {
        if (id === tweet._id) {
          setRetweet(true)
        }
      })
    }
  }, [authedUser, tweet._id, user])

  const tweetHandler = () => {
    // console.log('Tweet Clicked')
    history.push(`/${user.username}/status/${tweet.id}`)
  }

  return (
    <div
      className='tweet-container tc-hover pt-5 px-15 pb-10'
      onClick={tweetHandler}
    >
      {retweeter && (
        <div className='tc-retwt-info'>
          <RepeatRoundedIcon className='retweet-svg' />
          <Link
            to={retweeter.username}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {retweeter.fullname} Retweeted
          </Link>
        </div>
      )}
      <div className='tc-twt'>
        <div className='tc-user'>
          <UserCard user={user} ownProfile={ownProfile} isFollowed={isFollowed}>
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
        <div className='tc-info'>
          <div className='tcc-header'>
            <div className='tcch-info'>
              <UserCard
                user={user}
                ownProfile={ownProfile}
                isFollowed={isFollowed}
              >
                <Link
                  to={`/${user.username}`}
                  className='tcchi-name'
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <div className='tcchi-fullname mr-5'>
                    <span>{user.fullname}</span>
                  </div>
                  <div className='tcchi-username'>
                    <span>{`@${user.username}`}</span>
                  </div>
                </Link>
              </UserCard>
              <span className='px-5'>·</span>
              <Tooltip
                title={tweetTimeFull}
                enterDelay={500}
                enterNextDelay={500}
                classes={{ tooltip: classes.tooltip }}
              >
                <div className='tcchi-time'>{tweetTime}</div>
              </Tooltip>
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
          <div className='tcc-content'>
            <p className='tccct'>{tweet.text}</p>

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

          <div className='tcc-actions'>
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
              <div className='tcca-count'>{tweet.reply_count}</div>
            </div>
            <MenuPopup
              type='retweet'
              retweet={retweet}
              className={`tcca tccag ${retweet ? 'tccag-active' : ''}`}
            >
              <div className='tcca-icon'>
                <RepeatRoundedIcon className='retweet-svg' />
              </div>
              <div className='tcca-count'>
                {tweet.retweet_count + tweet.quote_count}
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
                {like ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
              </div>
              <div className='tcca-count'>{tweet.like_count}</div>
            </div>
            <MenuPopup type='share' className='tcca tccab'>
              <div className='tcca-icon'>
                <ShareIcon />
              </div>
            </MenuPopup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
