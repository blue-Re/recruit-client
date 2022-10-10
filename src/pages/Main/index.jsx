import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

import BossInfo from './../BossInfo/index';
import MogulInfo from './../MogulInfo/index';
import { getPath } from '../../utils';
import { useHistory } from 'react-router-dom';
import { getUser } from '../../redux/actions';

function Main(props) {
  const location = useLocation()
  const history = useHistory()
  const { user: { _id, userType, header, } } = props


  // 处理登录以及重定向问题
  useEffect(() => {
    const { pathname } = location
    const userId = Cookies.get('user_id')
    // 读取cookie中的user_id, 没有转到登录，有的话读取redux状态
    // 没有状态，跳转到保存状态页面
    if (!userId) {
      history.replace('/login')
      return;
    }
    if (userId && !_id) {
      // 发请求获取user
      (async function () {
        await props.getUser()
      })()
    }

    // 有数据
    const path = getPath(userType, header)
    if (pathname === '/') {
      history.replace(path)
    }

    return () => {

    }
  }, [_id, header, history, location, location.pathname, props, userType])


  return (
    <div>
      <Switch>
        <Route path='/bossInfo' component={BossInfo} />
        <Route path='/mogulInfo' component={MogulInfo} />
      </Switch>
    </div>
  )
}

export default connect(
  state => ({ user: state.user }),
  { getUser, }
)(Main)