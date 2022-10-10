import React from 'react'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'

import BossInfo from './../BossInfo/index';
import MogulInfo from './../MogulInfo/index';

function Main() {
  return (
    <div>
      <Switch>
        <Route path='/bossInfo' component={BossInfo}/>
        <Route path='/mogulInfo' component={MogulInfo}/>
      </Switch>
    </div>
  )
}

export default connect(
  state => ({ user: state.user})
)(Main)