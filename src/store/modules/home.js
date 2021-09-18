import axios from "axios";
import interfaces from "../interface";

const Home = {
    namespaced: true,
    state: {
        totalCount: 0,
    },
    mutations: {
        addCount: (state) => {
            console.log("home add count");
            state.totalCount += 1;
        },
    },
    getters: {
        getTenCount(state) {
            return state.totalCount * 10;
        },
    },
    actions: {
        addCount: ({ commit }) => {
            return commit("addCount");
        },
        getIndexInfo({ commit, state }, params) {
            return axios.post(interfaces.home.getIndexInfo, params);
        },
    },
};

export default Home;
