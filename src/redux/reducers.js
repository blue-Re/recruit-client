import { combineReducers } from "redux";
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RECEIVE_USER_LIST, RESET_USER } from "./actions-type";

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


export default combineReducers({
  user,
  userList
})