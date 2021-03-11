export default {
  // 根据key获取地址栏参数，遍历匹配
  getUrlParam(key) {
    // 去掉问号
    var query = window.location.search.substring(1);
    // 按照&分割
    var params = query.split("&");
    // 遍历匹配
    for (var i = 0; i < params.length; i++) {
      var kv = params[i].split("=");
      if (kv[0] == key) {
        return kv[1];
      }
    }
    return false;
  },
  // 根据key获取地址栏参数，正则匹配
  getUrlParam2(key) {
    var url = window.location.search;
    url = unescape(unescape(url));
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = url.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }
}