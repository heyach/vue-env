export default {
    // 时间格式化
    F(date, pattern) {
        date = new Date(date);
        pattern = pattern || "yyyy-MM-dd";
        const y = date.getFullYear().toString(),
            o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
            };
        pattern = pattern.replace(/(y+)/gi, (a) => {
            return y.substr(4 - Math.min(4, a.length));
        });
        for (const i in o) {
            pattern = pattern.replace(new RegExp("(" + i + ")", "g"), (a) => {
                return o[i] < 10 && a.length > 1 ? "0" + o[i] : o[i];
            });
        }
        return pattern;
    },
    
    // 根据范围取随机值
    RandomRange(min, max) {
        return Math.floor(Math.random() * max) + min;
    },

    // 判断类型，为什么要这样分离，是因为考虑到以后某种类型的值判断方式发生改变
    isObject(p) {
        return Object.prototype.toString.call(p).slice(8, -1) == "Object";
    },
    isString(p) {
        return Object.prototype.toString.call(p).slice(8, -1) == "String";
    },
    isArray(p) {
        return Object.prototype.toString.call(p).slice(8, -1) == "Array";
    },
    isNumber(p) {
        return Object.prototype.toString.call(p).slice(8, -1) == "Number";
    },

    // 根据key获取地址栏参数，遍历匹配
    getUrlParam(key) {
        // 去掉问号
        let query = window.location.search.substring(1);
        // 按照&分割
        let params = query.split("&");
        // 遍历匹配
        for (let i = 0; i < params.length; i++) {
            let kv = params[i].split("=");
            if (kv[0] == key) {
                return kv[1];
            }
        }
        return false;
    },

    // 根据key获取地址栏参数，正则匹配
    getUrlParam2(key) {
        let url = window.location.search;
        url = unescape(unescape(url));
        let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        let r = url.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    },

    // 根据key获取地址栏参数，URLSearchParams方式，该构造函数还有其他功能
    getUrlParam3(key) {
        let qs = new URLSearchParams(location.search); // 获取到所有的参数
        return qs.get(key);
    },
};
