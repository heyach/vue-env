import router from "./index";

router.beforeEach((to, from, next) => {
    let store = router.app.$options.store;
    // 根据store to from的状态进行处理，最后用next释放跳转
    if (!store.state.Auth.userInfo && to.meta.auth) {
        // 未登录强行打断跳转到login
        // 由于未跳转到to.path，vue-router会报错Uncaught (in promise) undefined
        // 因为没有回调函数而出现错误提示
        // 通过在push route的时候设置空回调onComplete和onAbort来解决
        // this.$router.push({ path: "/todolist" }, onComplete => {}, onAbort => {});
        router.push(
            { path: "/login" },
            (onComplete) => {},
            (onAbort) => {}
        );
    } else {
        next();
    }
});

export default router;
