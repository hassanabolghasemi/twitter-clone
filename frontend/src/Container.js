// import React, { useState } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'

import Header from './components/layout/Header'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import ComposeModal from './components/ComposeModal'
import SidebarColumn from './components/SidebarColumn'
import { PageNotFound } from './components/NotFound'
import TweetContent from './components/TweetContent'
// import TweetContent from './components/TweetContent'

const Container = () => {
  const sideless = ['messages', 'settings']
  const reserved = [
    'login',
    'signup',
    'home',
    'explore',
    'notifications',
    'messages',
    'bookmarks',
    'settings',
    'search',
    'hashtag',
    'compose',
  ]

  let location = useLocation()
  let locPaths = location.pathname.split('/').filter((p) => p !== '')

  // let sidebar = !(sideless.indexOf(locPaths[0]) > -1 || locPaths.length > 1)
  let sidebar = !(sideless.indexOf(locPaths[0]) > -1)

  let isModal = location.state && location.state.modal

  return (
    <div className='container'>
      <Header />
      <main className='main'>
        <div className='main-content'>
          <div className='primary-col'>
            <Switch location={isModal ? location.state.from : location}>
              <PrivateRoute exact path='/home' component={Home} />
              <PrivateRoute path='/messages' component={Messages} />

              <Route path='/explore' component={Explore} />
              <Route path='/settings' component={Settings} />

              <PrivateRoute
                exact
                path='/compose/tweet'
                component={ComposeModal}
              />

              {!(reserved.indexOf(locPaths[0]) > -1) && (
                <Switch>
                  <Route
                    path='/:username/status/:id'
                    component={TweetContent}
                  />
                  <Route path='/:username' component={Profile} />
                </Switch>
              )}

              <Route component={PageNotFound} />
            </Switch>
            {isModal && (
              <PrivateRoute
                exact
                path='/compose/tweet'
                component={ComposeModal}
              />
            )}
          </div>
          {sidebar && <SidebarColumn />}
        </div>
      </main>
    </div>
  )
}

export default Container
