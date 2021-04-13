// 导出一个变量
export var name = "hello";
export var name2 = "world";

var name3 = "hey";
var name4 = "ha";

var name7 = "name7";

export { name3, name4, name7 };

// function也可以作为一个变量导出
export function log() {
    return +new Date();
}

var name5 = "default";
var name6 = "default2";

export default {
    name5,
    name6,
};
