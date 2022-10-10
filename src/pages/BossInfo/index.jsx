import React, { useState } from 'react'

import { NavBar, Input, Form, TextArea, Button } from 'antd-mobile'

import HeaderSelect from '../../components/HeaderSelect'
import { connect } from 'react-redux';
import { updateUser } from './../../redux/actions';
import { useHistory } from 'react-router-dom';

function BossInfo(props) {
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
      <NavBar back={null}>老板信息完善</NavBar>
      <HeaderSelect getHeader={getHeader} />
      <Form
        layout='horizontal'
        form={form}
        onFinish={onFinish}
        footer={<Button color='primary' block onClick={onFinish}> 保 存 </Button>}
      >
        <Form.Item label='招聘职位' name='post'>
          <Input placeholder='请输入招聘职位' clearable />
        </Form.Item>
        <Form.Item label='公司名称' name='company'>
          <Input placeholder='请输入公司名称' clearable />
        </Form.Item>
        <Form.Item label='职位薪资' name='salary'>
          <Input placeholder='请输入职位薪资' clearable />
        </Form.Item>
        <Form.Item label='职位要求' name='info'>
          <TextArea placeholder='请输入职位要求' maxLength={100}/>
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect(
  state => ({ user: state.user}),
  { updateUser }
)(BossInfo)