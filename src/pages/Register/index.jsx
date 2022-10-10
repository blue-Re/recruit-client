import React, { useState } from 'react'
import { NavBar, Form, Input, Radio, Button, Space, Toast } from 'antd-mobile'

import Logo from '../../components/Logo/Logo'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../redux/actions';


function Register(props) {
  const { user: { msg } } = props
  const history = useHistory()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');

  const $_register = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        icon: 'fail',
        content: '两次密码不一致',
      })
      return
    }
    const params = { userType, username, password }
    await props.register(params)

    history.push('/login')
  };
  const goToPath = () => {
    history.push('/login')
  };

  return (
    <div>
      <NavBar back={null}>信院招聘</NavBar>
      <Logo />
      {
        msg ? <div className='error-msg'>{msg}</div> : ''
      }
      <Form
        layout='horizontal'
        footer={(
          <div>
            <Button block type='submit' color='primary' size='large' onClick={$_register}> 注 册 </Button><br />
            <Button block type='submit' size='large' onClick={goToPath}> 已 有 账 户</Button>
          </div>
        )}
      >
        <Form.Item name='username' label='用户名' rules={[{ required: true, message: '用户名不能为空' }]}>
          <Input value={username} onChange={val => setUsername(val)} placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item name='password' label='密码' rules={[{ required: true, message: '密码不能为空' }]}>
          <Input value={password} type="password" onChange={val => setPassword(val)} placeholder='请输入密码' />
        </Form.Item>
        <Form.Item name='confirmPassword' label='确认密码' rules={[{ required: true, message: '确认密码不能为空' }]}>
          <Input value={confirmPassword} type="password" onChange={val => setConfirmPassword(val)} placeholder='请输入确认密码' />
        </Form.Item>
        <Form.Item name='userType' label='用户类型' rules={[{ required: true, message: '用户类型不能为空' }]}>
          <Radio.Group value={userType} onChange={val => setUserType(val)}>
            <Space direction='horizontal'>
              <Radio value='boss'>老板</Radio>
              <Radio value='mogul'>大佬</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect(
  state => ({
    user: state.user
  }),
  {
    register
  }
)(Register)