import { List, Image, Input, Form, Button, NavBar, Grid } from 'antd-mobile'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom';

import { sendMsg, readMsg } from '../../redux/actions';

const emojis = [
  '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀'
  , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
  , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
  , '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣', '😀', '😁', '🤣'
]

function Chat(props) {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { user, chat: { users, chatMsgs } = {} } = props

  const [content, setContent] = useState('');
  const [emojIsShow, setEmojIsShow] = useState(false);


  const [currentMsgs, setCurrentMsgs] = useState([]);
  const [targetHeader, setTargetHeader] = useState('');


  const meId = user._id
  const targetId = routeMatch.params.userid

  const handSend = async () => {
    const from = user._id
    const to = routeMatch.params.userid

    if (content) {
      await props.sendMsg({ from, to, content })
    }
    setContent('')
  };

  useEffect(() => {
    const chatId = [meId, targetId].sort().join('_')
    if (users) {
      const targetHeader = users[targetId].header
      setTargetHeader(targetHeader)
    }
    if (chatMsgs) {
      const currentMsgs = chatMsgs.filter(msg => msg.chat_id === chatId)
      setCurrentMsgs(currentMsgs)
    }

    return () => {
    };
  }, [chatMsgs, meId, routeMatch.params.userid, targetId, user._id, users]);


  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)


    return () => {
    };
  });

  // 发请求更新未读消息
  useEffect(() => {
    return () => {
      const from = routeMatch.params.userid
      const to = user._id
      props.readMsg(from, to)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id='chat-page'>
      <NavBar
        className='sticky-header'
        back='返回'
        onBack={() => history.goBack()}
      >
        {users[targetId].username}
      </NavBar>
      <List style={{ marginTop: 50, marginBottom: emojIsShow ? 300 : 70 }}>
        {
          currentMsgs.map(msg => {
            if (meId === msg.to) {
              return (
                <List.Item
                  key={msg._id}
                  prefix={
                    <Image
                      src={targetHeader}
                      style={{ borderRadius: 20 }}
                      fit='cover'
                      width={40}
                      height={40}
                    />
                  }
                  description={msg.content}
                />
              )
            } else {
              return (
                <List.Item
                  className='chat-me'
                  key={msg._id}
                  extra={
                    <Image
                      src={user.header}
                      style={{ borderRadius: 20 }}
                      fit='cover'
                      width={40}
                      height={40}
                    />
                  }
                  description={msg.content}
                />
              )
            }
          })
        }
      </List>
      <div >
        <Form.Item style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <div style={{ display: 'flex' }}>
            <Input onFocus={() => setEmojIsShow(false)} value={content} onChange={setContent} style={{ flex: 1 }} placeholder='请输入' clearable />
            <Button onClick={() => setEmojIsShow(!emojIsShow)}>😀</Button>
            <Button size='mini' color='primary' onClick={() => handSend()}>发送</Button>
          </div>
          {
            emojIsShow ? (
              <Grid columns={6} style={{}}>
                {
                  emojis.map((item, index) => {
                    return (
                      <Grid.Item onClick={() => setContent(`${content}${item}`)} key={index}>
                        <Button size='small' className={['grid-demo-item-block']}>{item}</Button>
                      </Grid.Item>
                    )
                  })
                }
              </Grid>
            )
              : ''
          }
        </Form.Item>


      </div>
    </div>
  )
}

export default connect(
  state => ({ user: state.user, chat: state.chat }),
  { sendMsg, readMsg }
)(Chat)