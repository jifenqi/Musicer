import axios from 'axios'
const http = axios.create({
    // baseURL:'http://192.168.33.13:3000'
    baseURL: 'http://holder.qicp.vip:3000'
    // baseURL:'http://localhost:3000'
})
export default http;