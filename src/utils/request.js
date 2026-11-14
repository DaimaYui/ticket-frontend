import axios from 'axios'
import { ElMessage } from 'element-plus'

const TOKEN_KEY = 'ticket_token'
const USER_KEY = 'ticket_user'
//创建一个axios的实例
const request = axios.create({
  baseURL: '/api',
  timeout: 60000
})
//清除本地登录状态
export function clearLogin(){
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
}


// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
   }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const data = response.data
    if (data.code === 200) {
      return data.data
    }
    ElMessage.error(data.msg||'请求失败')

    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const status = error.response?.status
    const msg = error.response?.data?.msg
    //获取http状态码
    if(status === 401){
        clearLogin()
        ElMessage.error(msg || '登录过期，请重新登录')
        import('../router').then(r => {
            if(r.default.currentRoute.value.path !== '/login'){
                r.default.push('/login')
            }
        })
    }
    ElMessage.error(msg || '网络异常')
    return Promise.reject(error);
  });
  
export default request