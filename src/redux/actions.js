import { registerApi, loginApi, getUserFormCookieApi } from "../api/user"
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER } from "./actions-type"
import { updateUserApi } from './../api/user';


const authSuccess = (data) => ({ type: AUTH_SUCCESS, data }) // 授权成功的同步action
const errorMsg = (data) => ({ type: ERROR_MSG, data })// 授权失败的同步action

// 注册异步action
export function register(params) {
  return async dispatch => {
    const { data, code, msg } = await registerApi(params)
    if (code === 0) {
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
const resetUser = (msg) => ({ type: RESET_USER, data: msg })


// 获取用户异步action
export function getUser() {
  return async dispatch => {
    const { data, msg, code } = await getUserFormCookieApi();
    if (code === 0) {
      dispatch(receiveUser(data))
    } else {
      dispatch(resetUser(msg))
    }
  }
}