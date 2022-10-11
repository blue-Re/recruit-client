import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile';
import { AppstoreOutline, FaceRecognitionOutline, MessageOutline, UserCircleOutline } from 'antd-mobile-icons'
import { getPath } from '../../utils';
import { useHistory } from 'react-router-dom';
import { getUser } from '../../redux/actions';

import BossInfo from './../BossInfo/index';
import MogulInfo from './../MogulInfo/index';
import NotFound from './../../components/NotFound/index';
import Boss from './../Boss/index';
import Mogul from './../Mogul/index';
import Message from './../Message/index';
import Personal from './../Personnal/index';

import FooterBar from './../../components/FooterBar/index';
import Chat from '../Chat';

function Main(props) {
  const location = useLocation()
  const { pathname } = location
  const history = useHistory()
  const { user: { _id, userType, header, } } = props

  const navList = [
    {
      path: '/boss',
      component: Boss,
      title: '大佬列表',
      icon: <AppstoreOutline />,
      text: '大佬',
    },
    {
      path: '/mogul',
      component: Mogul,
      title: '老板列表',
      icon: <FaceRecognitionOutline />,
      text: '老板',
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: <MessageOutline />,
      text: '消息',
    },
    {
      path: '/personal',
      component: Personal,
      title: '个人信息',
      icon: <UserCircleOutline />,
      text: '个人',
    },
  ]
  const isShowNavBar = navList.find(item => item.path === pathname)


  if (userType === 'boss') {
    navList[1].hide = true
  } else {
    navList[0].hide = true
  }

  // 处理登录以及重定向问题
  useEffect(() => {
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
  }, [_id, header, history, location, pathname, props, userType])


  return (
    <div>
      {
        isShowNavBar ? <NavBar className='sticky-header' back={null}>{isShowNavBar.title}</NavBar> : ''
      }

      <Switch>
        <Route path='/bossInfo' component={BossInfo} />
        <Route path='/mogulInfo' component={MogulInfo} />
        <Route path='/chat/:userid' component={Chat}/>
        {
          navList.map(item => {
            return (
              <Route key={item.path} path={item.path} component={item.component} />
            )
          })
        }
        <Route component={NotFound} />
      </Switch>
      {
        isShowNavBar ? <FooterBar navList={navList.filter(item => !item.hide)}></FooterBar> : ''
      }
    </div>
  )
}

export default connect(
  state => ({ user: state.user }),
  { getUser, }
)(Main)