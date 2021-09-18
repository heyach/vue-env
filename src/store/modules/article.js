import axios from "axios";
import interfaces from "../interface";

const Article = {
    namespaced: true,
    actions: {
        getArticleList({ commit, state }, params) {
            return axios.get(interfaces.article.getArticleList, params);
        },
        getArticleClassifyList({ commit, state }, params) {
            return axios.get(interfaces.article.getArticleClassifyList, params);
        },
        releaseArticle({ commit, state }, params) {
            return axios.post(interfaces.article.releaseArticle, params);
        },
        updateArticle({ commit, state }, params) {
            return axios.post(interfaces.article.updateArticle, params);
        },
        getArticleDetail({ commit, state }, params) {
            return axios.get(`${interfaces.article.getArticleDetail}${params.id}`, params);
        },
        commentArticle({ commit, state }, params) {
            return axios.post(interfaces.article.commentArticle, params);
        },
    },
};

export default Article;
