import axios from 'axios'
import interfaces from '../interface'
export default{
    login({username,password}){
        return axios.post(interfaces.login.login,{username,password})
    },
    logout(){
        return axios.get(interfaces.login.logout)
    }
}