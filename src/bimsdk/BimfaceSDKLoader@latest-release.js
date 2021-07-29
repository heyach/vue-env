"use strict";function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();!function(){var e=window.hostConfig||{APIHost:"https://api.bimface.com",resourceHost:"https://m.bimface.com",staticHost:"https://static.bimface.com",dataEnvType:"BIMFACE"};void 0===Object.assign&&(Object.assign=function(e){if(void 0===e||null===e)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(e),n=1;n<arguments.length;n++){var o=arguments[n];if(void 0!==o&&null!==o)for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r])}return t});var t=Object.freeze({Release:"Release",Debug:"Debug"}),n=Object.freeze({Normal:"Normal",DrawingView:"drawingView"}),o=Object.freeze({BIMFACE:"BIMFACE",Local:"Local"}),r=Object.freeze({zh_CN:"zh_CN",en_GB:"en_GB",sv_SE:"sv_SE"}),a=Object.freeze({Normal:"Normal",Bake:"Bake"}),i=function(){if(window.hostConfig)for(var o in window.hostConfig)e[o]=window.hostConfig[o];return{staticHost:e.staticHost+"/api",APIHost:e.APIHost,language:"zh_CN",viewToken:null,configuration:t.Release,dataEnvType:e.dataEnvType||"BIMFACE",viewType:n.Normal,visualStyle:a.Bake,version:""}};window.BimfaceSDKLoaderConfig=i,window.BimfaceEnvOption=o,window.BimfaceLanguageOption=r,window.BimfaceConfigrationOption=t,window.BimfaceViewTypeOption=n;var s=function(e){var t=e.split("/");return t.pop(),t.join("/")+"/"},c=function(e){var n=Object.assign({},e),r="/Glodon";return e.path?(n.dataEnvType=o.Local,n.url=n.path,n.staticHost=n.sdkPath||s(n.path),n.resourcePath=s(n.path),n.path=s(n.path),r=n.sdkPath?"":"/jssdk"):e.resourcePath?(n.dataEnvType=o.Local,n.url=n.resourcePath,n.resourcePath=s(n.resourcePath)):(n.sdkPath&&(r="",n.staticHost=n.sdkPath),n.url=e.APIHost+"/inside/databag?viewToken="+e.viewToken),n.staticHost+=r,e.build!=t.Debug&&n.configuration!=t.Release||(n.configuration=""),n.configuration=n.configuration?"-"+n.configuration.toLowerCase():"",n},u=function(e,t){for(var n=0;n<t.length;n++)t[n]=e+t[n]},d=function(e,t){return"drawingView"==e.renderType||t.viewType==n.DrawingView},f=function(e){var t=e.sdkVersion,n=e.options,o=n.configuration,r=[],a=["/"+t+"/"+n.language+".js","/"+t+"/Application"+o+".js"];return r=d(e.metadata,e.options)?[].concat(_toConsumableArray(r),a,["/"+t+"/Drawing.css","/"+t+"/bimface.bufferfly.js","/"+t+"/Drawing"+o+".js"]):[].concat(_toConsumableArray(r),a,["/"+t+"/Bimface.css","/"+t+"/thirdparty.js","/"+t+"/lib/loaders/BimTilesLoader.js","/"+t+"/Bimface"+o+".js"])};window.postProcessing=function(e){var n=e.metadata,o=e.options,r=e.successCb,a=f(e);u(o.staticHost,a),n.databagId=""+n.databagId,o.path?(n.path=o.path,n.dataPath="./"):o.resourcePath&&(n.path=o.resourcePath.replace("viewToken","")),n.sdkPath=o.sdkPath,0==a.length?r(n):l(a,function(){if(o.build===t.Debug&&o.dataPath){var e=o.dataPath.split("/");r({databagId:e.pop(),path:e.join("/")})}r(n)})};var l=function e(n,o,r){var a=n.length,i=0,s=function s(c){if(c&&"error"==c.message&&c.element.indexOf("bimface.index")>-1){i=0;var d=r.options;d.build,t.Release;var l=f(r);return u(d.staticHost,l),void e(l,o)}i++,i==a?o():g(n[i],s)};g(n[i],s)},h=[],g=function(e,t){if(h.indexOf(e.split("/").pop())>-1)return void t();var n,o=document.getElementsByTagName("head")[0];return e.indexOf(".css")>-1?(n=document.createElement("link"),n.setAttribute("href",e),n.setAttribute("rel","stylesheet")):(n=document.createElement("script"),n.setAttribute("src",e)),n.url=e,o.appendChild(n),n.addEventListener("load",function(){h.push(this.url.split("/").pop()),t&&t({message:"success"})}),n.addEventListener("error",function(){t&&t({element:e,message:"error"})}),n};window.loadResource=l;var p=function(e){var t,n={type:"get",data:null,success:null,failure:null},o=Object.assign(n,e);t=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),t.onreadystatechange=function(){if(4==t.readyState){var e=t.status;e>=200&&e<300||304==e?o.success&&o.success(t.responseText,t.responseXML):o.failure&&o.failure(e)}},t.open(o.type,o.url,o.async),t.send(o.data)},v=function(){function e(t){_classCallCheck(this,e),this.indexedDB=window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.msIndexedDB,this.indexedDB||console.log("IndexedDB not supported"),this._db=null,this._opt=t}return _createClass(e,[{key:"open",value:function(e,t){var n=this,o=e||this._opt.name,r=t||this._opt.version||1,a=this.indexedDB.open(o,r);return new Promise(function(e,t){a.onsuccess=function(t){n._db=a.result,e(n._db)},a.onupgradeneeded=function(e){var t=n._db=e.target.result;(n._opt.storeList||[]).forEach(function(e){return!t.objectStoreNames.contains(e)&&t.createObjectStore(e)})},a.onerror=function(e){t(e)}})}},{key:"getDB",value:function(){var e=this;return new Promise(function(t,n){e._db?t(e._db):e.open().then(t).catch(n)})}},{key:"addObject",value:function(e,t,n){var o=this;return new Promise(function(r,a){o.getDB().then(function(o){var i=o.transaction(e,"readwrite");i.objectStore(e).put(t,n).onsuccess=function(e){r(e.target.result)},i.onerror=function(e){a(e)}}).catch(a)})}},{key:"getObject",value:function(e,t){var n=this;return new Promise(function(o,r){n.getDB().then(function(n){var a=n.transaction(e,"readonly");a.objectStore(e).get(t).onsuccess=function(e){var t=e.target.result;t?o(t):r(e)},a.onerror=function(e){r(e)}}).catch(r)})}},{key:"deleteObject",value:function(e,t){var n=this;return new Promise(function(o,r){n.getDB().then(function(n){var a=n.transaction(e,"readwrite");a.objectStore(e).delete(t).onsuccess=function(e){o(e.target.result)},a.onerror=function(e){r(e)}}).catch(r)})}},{key:"clearStore",value:function(e){var t=this;return new Promise(function(n,o){t.getDB().then(function(t){var r=t.transaction(e,"readwrite");r.objectStore(e).clear().onsuccess=function(e){n(e.target.result)},r.onerror=function(e){o(e)}}).catch(o)})}},{key:"deleteDB",value:function(e){var t=this;return new Promise(function(n){t.indexedDB.deleteDatabase(e).onsuccess=n})}},{key:"getAllKeys",value:function(e){var t=this;return new Promise(function(n,o){t.getDB().then(function(t){var r=t.transaction(e,"readonly");r.objectStore(e).getAllKeys().onsuccess=function(e){return n(e.target.result)},r.onerror=o}).catch(o)})}},{key:"getAll",value:function(e){var t=this;return new Promise(function(n,o){t.getDB().then(function(t){var r=t.transaction(e,"readonly");r.objectStore(e).getAll().onsuccess=function(e){return n(e.target.result)},r.onerror=o}).catch(o)})}}]),e}(),w=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,{name:"Bf_Loader",version:1,storeList:["d","t"]}))}return _inherits(t,e),_createClass(t,[{key:"getDatabagInfo",value:function(e,t){var n=this;return new Promise(function(o,r){t?n.getObject("d",e).then(function(e){return n.addTemp(e,t).then(function(){return o(e)}).catch(r)}).catch(r):n.getObject("d",e).then(o).catch(r)})}},{key:"addDatabagInfo",value:function(e,t){var n=this;return new Promise(function(o,r){var a=e.modelId,i=function(){return Promise.all([n.addObject("d",e,a),n.addTemp(e,t)]).then(o).catch(r)};n.getDatabagInfo(a).then(function(t){t.databagId!==e.databagId&&n.deleteDB("Bf_"+data.databagId),i()}).catch(function(){i()})})}},{key:"deleteDatabagInfo",value:function(e){var t=this;return new Promise(function(n,o){t.deleteObject("d",e).then(n).catch(o)})}},{key:"addTemp",value:function(e,t){var n=this;return new Promise(function(o,r){n.clearStore("t").then(function(){n.addObject("t",e,t).then(o).catch(r)}).catch(r)})}},{key:"getTemp",value:function(e){var t=this;return new Promise(function(n,o){t.getObject("t",e).then(n).catch(o)})}},{key:"deleteStorageByModelId",value:function(e){var t=this;return new Promise(function(n,o){t.getDatabagInfo(e).then(function(r){var a="gisView"===r.renderType?"Bg_"+r.modelId:"Bf_"+r.databagId;Promise.all([t.deleteDB(a),t.deleteDatabagInfo(e)]).then(n).catch(o)}).catch(n)})}},{key:"getStoredModelIds",value:function(){return this.getAllKeys("d")}},{key:"getStoredModelInfo",value:function(){var e=this;return new Promise(function(t,n){e.getAll("d").then(function(e){var n=e.map(function(e){return{modelId:e.modelId,name:e.name,type:e.renderType}});t(n)}).catch(n)})}}]),t}(v),b=function(e,t,n){var o=function(o){if(e.enableStorage&&e.modelId){(new w).getDatabagInfo(e.modelId,e.viewToken).then(function(e){return n&&n(e)}).catch(function(){console.error("[BIMFACE ERROR]: failed get model info from storage"),t&&t(o)})}else t&&t(o)};if(!e.viewToken&&"Local"!==e.dataEnvType)return void o();p({url:e.url,async:!0,success:function(t){var r=JSON.parse(t);if("Local"!==e.dataEnvType&&"success"!==r.code)return r.message&&console.error("[BIMFACE ERROR]: "+r.message),void o(t);if(r=r.data||r,e.enableStorage){(new w).addDatabagInfo(r,e.viewToken).then(function(){return n&&n(r)}).catch(function(){return n&&n(r)})}else n&&n(r)},failure:o})},m=function(e,t){var o=t.version,r=void 0;e.renderVersion;if(/\d+?\.\d+?\.\d+/.test(o)&&o.split(".")[0]>=3)o="Bimface@"+o;else if("Debug"==t.build)o="Bimface",r="Application";else if(t.viewType==n.DrawingView&&"drawingView"!=e.renderType){var a=e.subRenders;if(a&&0!=a.length)for(var i=0;i<a.length;i++)a[i].renderType==n.DrawingView&&(o=a[i].jsSDKVersion,r=a[i].jsSDKVersion)}else o=e.jsSDKVersion,r=e.jsSDKVersion;return{ui:r,sdk:o}},y=function(e,t,n){b(e,n,function(n){var o=m(n,e);window.BimfaceLoaderConfig.fullStaticHost="Local"==BimfaceLoaderConfig.dataEnvType?e.staticHost+"/bimface":e.staticHost+"/"+o.sdk;var r={metadata:n,options:e,successCb:t,sdkVersion:o.sdk,uiVersion:o.ui},a=window.BimfaceLoaderConfig.fullStaticHost+"/bimface.index.js";l([a],function(){postProcessing(r)},r)})},B=function(e,t){var n="bimView"==e.renderType?"3DView":e.renderType,o=(e.subRenders,{dataEnvType:t.dataEnvType,viewToken:t.viewToken,staticHost:t.staticHost,APIHost:t.APIHost,viewType:n});return Object.assign(o,e)},j={getStorage:function(){return this.storage=this.storage||new w,this.storage},deleteStorageByModelId:function(e){return this.getStorage().deleteStorageByModelId(e)},getStoredModelIds:function(){return this.getStorage().getStoredModelIds()},getStoredModelInfo:function(){return this.getStorage().getStoredModelInfo()},store:function(e){}},P={Version:"2021-4-29-15-48",load:function(e,n,o){window.BimfaceLoaderConfig=e,void 0==e.build&&(e.build=t.Release);var r=c(e),a=new Promise(function(t,n){y(r,function(n){t(B(n,e))},n)});if(!n&&!o)return a;a.then(n).catch(o)},Storage:j};window.BimfaceSDKLoader=P}();