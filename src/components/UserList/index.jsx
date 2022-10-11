import React from 'react'
import { Card, } from 'antd-mobile'
import { useHistory } from 'react-router-dom';

export default function UserList(props) {
  const { userList } = props
  const history = useHistory()

  const goToPath = (userId) => {
    history.push(`/chat/${userId}`)
  };
  
  return (
    <div style={{ margin: '50px 0'}}>
      {
        userList.map(item => {
          return (
            <div onClick={() => goToPath(item._id)} key={item._id} style={{ display: 'flex', padding: '8px 0', border: '1px solid #efefef', alignItems: 'center' }}>
              <Card>
                <img src={item.header} alt="" />
              </Card>
              <div >
                <div>姓名：{item.username}</div>
                {item.post ? <div>职位：{item.post}</div> : ''}
                {item.company ? <div>公司：{item.company}</div> : ''}
                {item.salary ? <div>月薪：{item.salary}</div> : ''}
                {item.info ? <div>描述：{item.info}</div> : ''}
              </div>
            </div>

          )
        })
      }
    </div >
  )
}
