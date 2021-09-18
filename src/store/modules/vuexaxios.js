import axios from "axios";
import interfaces from "../interface";

const VuexAxios = {
    // namespaced为true的时候，vuex会根据module自动添加访问路径，防止各module里重名的action
    // 例如VuexAxios和Home里都有add，Home通过mapAction引入add，触发add后也会同时触发VuexAxios里的add
    // 这样声明后，再引入的时候指定module，就不会导致各module里的同名action重复触发
    // ...mapActions("VuexAxios", ["add", "reduce"]),
    // 同样的mapState和mapGetters也要这样声明引入
    // ...mapState({
    //   count: state => state.VuexAxios.count
    // })
    // ...mapGetters("VuexAxios", ["getTenCount"]),
    namespaced: true,
    state: {
        totalCount: 0,
    },
    mutations: {
        addCount: (state) => {
            console.log("vuexaxios add count");
            state.totalCount = state.totalCount + 1;
        },
        reduceCount: (state) => {
            state.totalCount -= 1;
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
        reduceCount: ({ commit }) => {
            return commit("reduceCount");
        },
        getAsyncInfo({ commit, state }, params) {
            return axios.post(interfaces.vuexaxios.getAsyncInfo, params);
        },
    },
};

export default VuexAxios;
