import React, { useState } from 'react'

import { NavBar, Input, Form, Button } from 'antd-mobile'

import HeaderSelect from '../../components/HeaderSelect'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from './../../redux/actions';

function MogulInfo(props) {
  const history = useHistory()

  const { userType } = props.user
  const [form] = Form.useForm()
  const [header, setHeader] = useState('');

  const onFinish = async () => {
    const values = form.getFieldValue()
    values.header = header
    
    await props.updateUser(values)

    const path = userType === 'boss' ? 'boss' : 'mogul'
    if (header) {
      history.push(`/${path}`)
    }else {
      history.push('/login')
    }
  };

  const getHeader = (header) => {
    setHeader(header)
  };

  return (
    <div>
      <NavBar back={null}>大佬信息完善</NavBar>
      <HeaderSelect getHeader={getHeader} />
      <Form
        layout='horizontal'
        form={form}
        onFinish={onFinish}
        footer={<Button color='primary' block onClick={onFinish}> 保 存 </Button>}
      >
        <Form.Item label='求职职位' name='post'>
          <Input placeholder='请输入求职职位' clearable />
        </Form.Item>
        <Form.Item label='个人介绍' name='info'>
          <Input placeholder='请输入个人介绍' clearable />
        </Form.Item>
      </Form>
    </div>
  )
}
export default connect(
  state => ({ user: state.user }),
  { updateUser }
)(MogulInfo)