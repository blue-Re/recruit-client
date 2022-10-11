import { combineReducers } from "redux";
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_MSG, RECEIVE_MSG_LIST, RECEIVE_USER, RECEIVE_USER_LIST, RESET_USER } from "./actions-type";

const preState = {
  username: '',
  password: '',
  info: ''
}
function user(state = preState, action) {
  const { type, data } = action
  switch (type) {
    case AUTH_SUCCESS:
      return { ...data }

    case ERROR_MSG:
      return { msg: data }

    case RECEIVE_USER:
      return { ...data }

    case RESET_USER:
      return { msg: data }
    default:
      return state
  }
}

// 获取userList
const initUserList = []
function userList(state = initUserList, action) {
  const { type, data } = action
  switch (type) {
    case RECEIVE_USER_LIST:
      return data


    default:
      return state
  }
}

// chat Reducer
const initChat = {}
function chat(state = initChat, action) {
  const { type, data } = action
  console.log(data);

  switch (type) {
    case RECEIVE_MSG_LIST:
      return {
        users: data.users,
        chatMsgs: data.chatMsgs,
        unReadCount: 0
      }
    case RECEIVE_MSG:
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, data],
        unReadCount: 0
      }

    default:
      return state
  }
}



export default combineReducers({
  user,
  userList,
  chat
})