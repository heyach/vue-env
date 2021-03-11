import axios from 'axios'
import interfaces from "../interface";

const User = {
  namespaced: true,
  actions: {
    getUserInfo({ commit, state }, params) {
      return axios.get(`${interfaces.user.getUserInfo}${params.id}`, params)
    },
    saveUserInfo({ commit, state }, params) {
      return axios.post(interfaces.user.saveUserInfo, params)  
    },
  }
};

export default User;