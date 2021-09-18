import axios from "axios";
import interfaces from "../interface";
import Storage from "../../utils/Storage";

const Auth = {
    namespaced: true,
    state: {
        userInfo: Storage.get("userInfo"),
    },
    mutations: {
        setUserInfo: (state, user) => {
            state.userInfo = user;
            Storage.set("userInfo", user);
        },
    },
    actions: {
        login({ commit, state }, params) {
            return axios.get(interfaces.login.login, params);
        },
        getMenus({ commit, state }, params) {
            return axios.get(interfaces.login.getMenus, params);
        },
    },
};

export default Auth;
