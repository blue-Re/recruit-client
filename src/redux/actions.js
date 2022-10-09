import { registerApi, loginApi } from "../api/user"
import { AUTH_SUCCESS, ERROR_MSG } from "./actions-type"


const authSuccess = (data) => ({ type: AUTH_SUCCESS, data }) // 授权成功的同步action
const errorMsg = (data) => ({ type: ERROR_MSG, data})// 授权失败的同步action

// 注册异步action
export function register(params) {
  return async dispatch => {
    const { data, code, msg } = await registerApi(params)
    if (code === 0) {
      dispatch(authSuccess(data))
    }else {
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