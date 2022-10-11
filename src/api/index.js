import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
  withCredentials: true,
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error);
  }
)

http.interceptors.response.use(
  (config) => {
    return config.data
  },
  (error) => {
    console.log(error);
  }
)

export default http