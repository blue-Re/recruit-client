import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Register from './pages/Register/index';
import Login from './pages/Login/index';
import Main from './pages/Main/index';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route component={Main} />
      </Switch>
    </div>
  )
}
