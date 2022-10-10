import { Button, List, Result, Dialog } from 'antd-mobile'
import React from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { resetUser } from '../../redux/actions'

function Personal(props) {
  const { user: { header, post, username, info, salary, company } } = props

  return (
    <div>
      <Result
        icon={<img src={header} alt="" />}
        status='success'
        title={`姓名：${username}`}
        description={`公司名称：${company}`}
      />
      <List style={{ padding: '0 15px' }} >
        {post ? <div>招聘职位： {post}</div> : ''}
        {info ? <div>简介：{info}</div> : ''}
        {salary ? <div>薪资：{salary}</div> : ''}
      </List>
      <Button
        block
        color='danger'
        onClick={async () => {
          const result = await Dialog.confirm({
            content: '确定要退出码？',
          })
          if (result) {
            Cookies.remove('user_id')
            props.resetUser()
          } else {

          }
        }}
      >
        退 出 登 录
      </Button>
    </div>
  )
}


export default connect(
  state => ({ user: state.user }),
  {
    resetUser
  }
)(Personal)