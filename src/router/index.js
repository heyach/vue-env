import Vue from "vue";
import Router from "vue-router";
import Components from "./components";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

Vue.use(Router);

let router = new Router({
    // mode: 'histpry',此模式需要后台配合让模板始终返回index
    mode: "hash",
    // base: '/hhh/',
    routes: [
        // 默认首页
        { path: "/", redirect: "/home" },
        // 首页-嵌套路由
        {
            path: "/home",
            component: Components.Home,
            children: [
                {
                    path: "childroute",
                    component: Components.ReleaseArticle,
                },
            ],
        },
        // article
        {
            path: "/article",
            component: Components.Article,
            redirect: "/article/list",
            meta: {
                title: "article",
            },
            children: [
                {
                    path: "list",
                    component: Components.ArticleList,
                    meta: {
                        title: "article-list",
                    },
                },
                {
                    path: "release",
                    component: Components.ReleaseArticle,
                    meta: {
                        title: "release-article",
                        auth: true,
                    },
                },
                {
                    path: ":id",
                    component: Components.ArticleDetail,
                    meta: {
                        title: "article-detail",
                    },
                },
            ],
        },
        {
            path: "/user",
            component: Components.User,
            children: [
                {
                    path: "myarticle",
                    component: Components.MyArticle,
                    meta: {
                        title: "my-article",
                        auth: true,
                    },
                },
                {
                    path: "userinfo",
                    component: Components.UserInfo,
                    meta: {
                        title: "userinfo",
                        auth: true,
                    },
                },
            ],
        },
        { path: "/todolist", component: Components.TodoList, meta: { title: "todolist" } },
        { path: "/styleclass", component: Components.StyleClass, meta: { title: "styleclass" } },
        { path: "/vuexaxios", component: Components.VuexAxios, meta: { title: "vuexaxios" } },
        { path: "/slot", component: Components.Slot, meta: { title: "slot" } },
        { path: "/numberbox", component: Components.NumberBox, meta: { title: "numberbox" } },
        { path: "/elementui", component: Components.ElementUi, meta: { title: "element-ui" } },
        { path: "/clearfloat", component: Components.ClearFloat, meta: { title: "clearfloat" } },
        { path: "/aliicon", component: Components.AliIcon, meta: { title: "ali-icon" } },
        { path: "/shuffle", component: Components.Shuffle, meta: { title: "shuffle" } },
        { path: "/bubblesort", component: Components.BubbleSort, meta: { title: "bubblesort" } },
        { path: "/quicksort", component: Components.QuickSort, meta: { title: "quicksort" } },
        { path: "/iviewpractice", component: Components.IviewPractice, meta: { title: "iview" } },
        { path: "/threedemo", component: Components.ThreeDemo, meta: { title: "threedemo" } },
        { path: "/threedemo2", component: Components.ThreeDemo2, meta: { title: "threedemo2" } },
        { path: "/trix", component: Components.Trix, meta: { title: "trix" } },
        { path: "/export", component: Components.Export, meta: { title: "export" } },
        { path: "/dragelm", component: Components.DragElm, meta: { title: "drag" } },
        { path: "/keyframes", component: Components.Keyframes, meta: { title: "keyframes" } },
        { path: "/echarts", component: Components.Echarts, meta: { title: "echarts" } },
        { path: "/draglist", component: Components.DragList, meta: { title: "draglist" } },
        { path: "/bimface", component: Components.Bimface, meta: { title: "bimface" } },
        { path: "/goodslist", component: Components.GoodsList, meta: { title: "bimface" } },
        { path: "/login", component: Components.Login, meta: { title: "login" } },
        { path: "/404", component: Components.Error404, meta: { title: "404" } },
        { path: "*", redirect: "/404" }, // 未匹配到的路由地址
    ],
});

export default router;
