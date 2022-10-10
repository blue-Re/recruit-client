import { Button } from 'antd-mobile'
import React from 'react'
import { useHistory } from 'react-router-dom'

export default function NotFound() {
  const history = useHistory()
  return (
    <div>
      <h2>抱歉，我们找不到该页面</h2>
      <Button color='primary' onClick={() => history.replace('/')}>回到首页</Button>
    </div>
  )
}
