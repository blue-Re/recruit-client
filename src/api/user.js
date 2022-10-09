import http from "./index";

export const loginApi = (params) =>  http.post('/api/login', params)
export const registerApi = (params) =>  http.post('/api/register', params)

