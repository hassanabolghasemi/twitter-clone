import { Link } from 'react-router-dom'

import SvgIcon from '@material-ui/core/SvgIcon'
import SearchIcon from '@material-ui/icons/Search'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'

import LoginInline from '../components/LoginInline'
import { ReactComponent as twitterIcon } from '../assets/twitter.svg'

const Landing = ({ history }) => {
  return (
    <div className='landing-page'>
      <div className='landing-container'>
        <div className='landing-join'>
          <div className='landing-login-form'>
            <LoginInline history={history} />
          </div>
          <div className='join-area'>
            <SvgIcon component={twitterIcon} className='join-icon' />
            <div className='join-description'>
              <span>See what’s happening in the world right now</span>
            </div>
            <div className='join-join'>
              <span>Join Twitter today.</span>
            </div>
            <Link to='/signup' className='btn-fill'>
              Sign up
            </Link>
            <Link to='/login' className='btn-outline'>
              Log in
            </Link>
            <hr className='divider landing-divider' />
            <Link to='/explore' className='btn-outline'>
              Explore without joining
            </Link>
          </div>
        </div>
        <div className='landing-features'>
          <SvgIcon component={twitterIcon} className='features-icon' />
          <div className='features'>
            <div>
              <SearchIcon fontSize='large' />
              <span>Follow your interests.</span>
            </div>
            <div>
              <PeopleOutlineIcon fontSize='large' />
              <span>Hear what people are talking about.</span>
            </div>
            <div>
              <ChatBubbleOutlineIcon fontSize='large' />
              <span>Join the conversation.</span>
            </div>
          </div>
        </div>
        <div className='landing-ls-mobile'>
          <Link to='/signup' className='btn-fill'>
            Sign up
          </Link>
          <Link to='/login' className='btn-outline'>
            Log in
          </Link>
        </div>
      </div>
      <div className='landing-footer'>
        <Link to='#'>About</Link>
        <Link to='#'>Help Center</Link>
        <Link to='#'>Terms of Service</Link>
        <Link to='#'>Privacy Policy</Link>
        <Link to='#'>Cookie Policy</Link>
        <Link to='#'>Ads info</Link>
        <Link to='#'>Blog</Link>
        <Link to='#'>Status</Link>
        <Link to='#'>Careers</Link>
        <Link to='#'>Brand Resources</Link>
        <Link to='#'>Advertising</Link>
        <Link to='#'>Marketing</Link>
        <Link to='#'>Twitter for Business</Link>
        <Link to='#'>Developers</Link>
        <Link to='#'>Directory</Link>
        <Link to='#'>Settings</Link>
        <div className='copyright'>
          <span>© 2021 Twitter, Inc.</span>
        </div>
      </div>
    </div>
  )
}

export default Landing
