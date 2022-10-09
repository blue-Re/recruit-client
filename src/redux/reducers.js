import { combineReducers } from "redux";
import { AUTH_SUCCESS, ERROR_MSG } from "./actions-type";

const preState = {}
function user(state = preState, action) {
  const { type, data } = action
  switch (type) {
    case AUTH_SUCCESS:
      return {...data }

    case ERROR_MSG:
      return { msg: data }
    default:
      return state
  }
}


export default combineReducers({
  user
})