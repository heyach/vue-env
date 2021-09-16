var now = new Date(); // 当前日期
var nowDayOfWeek = now.getDay(); // 今天本周的第几天
var nowDay = now.getDate(); // 当前日
var nowMonth = now.getMonth(); // 当前月
var nowYear = now.getYear(); // 当前年
nowYear += nowYear < 2000 ? 1900 : 0;
export default {
    F(date, pattern) {
        date = new Date(date);
        pattern = pattern || "yyyy-MM-dd";
        const y = date.getFullYear().toString(),
            o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds()
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
    getTimeByPattern(date, pattern) {
        date = new Date(date);
        pattern = pattern || "yyyy-MM-dd";
        const y = date.getFullYear().toString(),
            o = {
                M: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                m: date.getMinutes(),
                s: date.getSeconds(),
            };
        pattern = pattern.replace(/(y+)/gi, (a, b) => {
            return y.substr(4 - Math.min(4, b.length));
        });
        for (const i in o) {
            pattern = pattern.replace(new RegExp("(" + i + "+)", "g"), (a, b) => {
                return o[i] < 10 && b.length > 1 ? "0" + o[i] : o[i];
            });
        }
        return pattern;
    },
    getStartDayOfWeek() {
        var day = nowDayOfWeek || 7;
        return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 1 - day));
    },
    getEndDayOfWeek() {
        var day = nowDayOfWeek || 7;
        return this.formatDate(new Date(now.getFullYear(), nowMonth, nowDay + 7 - day));
    },
    getStartDayOfMonth() {
        var monthStartDate = new Date(nowYear, nowMonth, 1);
        return this.formatDate(monthStartDate);
    },
    getEndDayOfMonth() {
        var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays());
        return this.formatDate(monthEndDate);
    },
    getStartDayOfYear() {
        return nowYear + "-01-01";
    },
    getEndDayOfYear() {
        return nowYear + "-12-31";
    },
    getMonthDays() {
        var monthStartDate = new Date(nowYear, nowMonth, 1);
        var monthEndDate = new Date(nowYear, nowMonth + 1, 1);
        var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    },
    formatDate(date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();

        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return myyear + "-" + mymonth + "-" + myweekday;
    },
};
