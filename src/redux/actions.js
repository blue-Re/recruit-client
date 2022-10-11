import { registerApi, loginApi, getUserFormCookieApi, getUserListApi, getChatMsgListApi } from "../api/user"
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_MSG_LIST, RECEIVE_MSG, RECEIVE_USER, RECEIVE_USER_LIST, RESET_USER } from "./actions-type"
import { updateUserApi } from './../api/user';
import { io } from "socket.io-client";



const authSuccess = (data) => ({ type: AUTH_SUCCESS, data }) // 授权成功的同步action
const errorMsg = (data) => ({ type: ERROR_MSG, data })// 授权失败的同步action

// 接收消息列表同步action
export const receiveMsgList = ({ users, chatMsgs }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs } })
// 接收一条消息的同步action
export const receiveMsg = (chatMsg) => ({ type: RECEIVE_MSG, data: chatMsg })


// 注册异步action
export function register(params) {
  return async dispatch => {
    const { data, code, msg } = await registerApi(params)
    if (code === 0) {
      getMsgList(dispatch, data._id)
      dispatch(authSuccess(data))
    } else {
      dispatch((errorMsg(msg)))
    }
  }
}

// 异步登录action
export function login(params) {
  return async dispatch => {
    const { data, code, msg } = await loginApi(params)
    if (code === 0) {
      getMsgList(dispatch, data._id)
      dispatch(authSuccess(data))
    } else {
      dispatch((errorMsg(msg)))
    }
  }
}

// 异步更新用户信息
export function updateUser(params) {
  return async dispatch => {
    const { data, code, msg } = await updateUserApi(params)

    if (code === 0) {
      dispatch(receiveUser(data))
    } else {
      dispatch(resetUser(msg))
    }
  }
}
// 接收用户同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重置用户的同步action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })


// 获取用户异步action
export function getUser() {
  return async dispatch => {
    const { data, msg, code } = await getUserFormCookieApi();
    if (code === 0) {
      getMsgList(dispatch, data._id)
      dispatch(receiveUser(data))
    } else {
      dispatch(resetUser(msg))
    }
  }
}


// 接收用户列表的同步action
export const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList })
// 获取userList的异步action
export function getUserList(userType) {
  return async dispatch => {
    const { code, data } = await getUserListApi(userType)
    if (code === 0) {
      dispatch(receiveUserList(data))
    }
  }
}

/* 
单例对象
  1. 创建对象之前，判断对象是否存在，不存在创建
  2. 创建对象之后保存对象
*/
function initIo(dispatch, userid) {
  if (!io.socket) {
    io.socket = io('ws://localhost:8000')

    io.socket.on('serverSend', (chatMsg) => {
      console.log('服务端发的消息为： ', chatMsg);

      // 只有当chatMsg是与当前用户相关的消息，采取分发同步action保存消息
      if (userid === chatMsg.from || userid === chatMsg.to) {
        console.log(111);
        dispatch(receiveMsg(chatMsg))
      }
    })
  }
}

// 异步发送消息
export function sendMsg({ from, to, content }) {
  return dispatch => {
    console.log();

    io.socket.emit('browserSend', { from, to, content })
  }
}

// 获取消息列表
async function getMsgList(dispatch, userid) {
  initIo(dispatch, userid)
  const { code, data: { users, chatMsgs } } = await getChatMsgListApi()
  if (code === 0) {
    // 风发同步action
    dispatch(receiveMsgList({ users, chatMsgs }))
  }
}