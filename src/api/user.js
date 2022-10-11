import http from "./index";

export const loginApi = (params) => http.post('/login', params)
export const registerApi = (params) => http.post('/register', params)
export const updateUserApi = (params) => http.post('/update', params)
export const getUserFormCookieApi = () => http.get('/getUserFormCookie')
export const getUserListApi = (userType) => http.get('/userList', { params: { userType } })

