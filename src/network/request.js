import axios from "axios"

// config axios
let instance = axios.create()


instance.defaults.baseURL = "http://152.136.185.210:8000/api/n3"
//拦截器启动
instance.interceptors.request.use(data => {
  
  return data
}, msg => {
  console.log(msg);
})
instance.interceptors.response.use(res => {
  return res.data;
}, msg => {
  console.log(msg);
})


export function request(config = {}) {
  if (Object.keys(config).length === 0) {
    throw new SyntaxError("URL parameters must be passed")
  }
  // 发送网络请求
  return instance(config)
}
