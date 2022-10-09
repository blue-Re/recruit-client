import React, { useState } from 'react'
import { NavBar, Form, Input, Button } from 'antd-mobile'
import Logo from '../../components/Logo/Logo'
import { useHistory } from 'react-router-dom';
import { login } from '../../redux/actions';
import { connect } from 'react-redux';

function Login(props) {
  const { user: { msg, _id } } = props
  const history = useHistory()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const $_login = async () => {
    const params = { username, password }
    props.login(params)

    if (_id) {
      history.push('/')
    }
  };

  const goToPath = () => {
    history.push('/register')
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
            <Button block type='submit' color='primary' size='large' onClick={$_login}> 登 录 </Button><br />
            <Button block type='submit' size='large' onClick={goToPath}> 没 有 账 户</Button>
          </div>
        )}
      >
        <Form.Item name='username' label='用户名' rules={[{ required: true, message: '用户名不能为空' }]}>
          <Input value={username} onChange={val => setUsername(val)} placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item name='password' label='密码' rules={[{ required: true, message: '密码不能为空' }]}>
          <Input value={password} onChange={val => setPassword(val)} placeholder='请输入密码' />
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
    login
  }
)(Login)