import { List, Image, Badge } from 'antd-mobile'
import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

function Message(props) {
  const history = useHistory()
  const { user, chat: { users, chatMsgs } = {} } = props

  // 对chatMsg进行分组
  const getLastMsgs = (chatMsgs, userid) => {
    const lastMsgObjs = {}

    if (chatMsgs) {
      chatMsgs.forEach(msg => {

        // 对msg进行个体统计
        if (msg.to === userid && !msg.read) {
          msg.unReadCount = 1
        } else {
          msg.unReadCount = 0
        }

        const chatId = msg.chat_id
        const lastMsg = lastMsgObjs[chatId]

        if (!lastMsg) {
          lastMsgObjs[chatId] = msg
        } else {
          const unReadCount = lastMsg.unReadCount + msg.unReadCount

          if (msg.create_time > lastMsg.create_time) {
            lastMsgObjs[chatId] = msg
          }

          lastMsgObjs[chatId].unReadCount = unReadCount
        }
      })
    }

    const lastMsgs = Object.values(lastMsgObjs)
    lastMsgs.sort(function (m1, m2) {
      return m2.create_time - m1.create_time
    })
    return lastMsgs
  };
  const lastMsgs = getLastMsgs(chatMsgs, user._id)

  return (
    <div style={{ margin: '50px 0' }}>
      <List>
        {lastMsgs.map(msg => {
          const targetUserId = msg.to === user._id ? msg.from : msg.to
          const targetUser = users[targetUserId]
          return (
            (
              <List.Item
                onClick={() => history.push(`/chat/${targetUserId}`)}
                key={msg._id}
                prefix={
                  <Image
                    src={targetUser.header || ''}
                    style={{ borderRadius: 20 }}
                    fit='cover'
                    width={40}
                    height={40}
                  />
                }
                extra={<Badge content={msg.unReadCount || ''} />}
                description={msg.content}
              >
                {targetUser.username}
              </List.Item>
            )
          )
        }
        )}
      </List>
    </div>
  )
}
export default connect(
  state => ({
    user: state.user,
    chat: state.chat
  }),
  {}
)(Message)