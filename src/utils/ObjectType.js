export default {
    isObject(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1) == "Object";
    },
    isString(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1) == "String";
    },
    isArray(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1) == "Array";
    },
    isNumber(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1) == "Number";
    },
};
