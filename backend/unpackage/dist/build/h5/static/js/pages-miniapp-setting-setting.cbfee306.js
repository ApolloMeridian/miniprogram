(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-miniapp-setting-setting"],{"2c75":function(n,t,e){"use strict";e.r(t);var a=e("a446"),r=e("f8b4");for(var i in r)"default"!==i&&function(n){e.d(t,n,(function(){return r[n]}))}(i);e("f65e");var u,o=e("f0c5"),c=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,"6a5eddbd",null,!1,a["a"],u);t["default"]=c.exports},"40a9":function(n,t,e){var a=e("24fb");t=a(!1),t.push([n.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.uni-container .input[data-v-6a5eddbd]{margin:20px 0}',""]),n.exports=t},"6caa":function(n,t,e){"use strict";(function(n){var a=e("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("96cf");var r=a(e("1da1")),i=n.database(),u={data:function(){return{docId:null,location_update_duration:null,saveLoading:!1}},onLoad:function(){var n=this;return(0,r.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return uni.showLoading({title:"加载中",mask:!0}),t.next=3,n.getData();case 3:uni.hideLoading();case 4:case"end":return t.stop()}}),t)})))()},methods:{getData:function(){var n=this;return(0,r.default)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i.collection("tx-config").get({getOne:!0});case 3:e=t.sent,console.log("获取设置数据成功：",{resp:e}),n.docId=e.result.data._id,n.location_update_duration=e.result.data.location_update_duration,t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.error("获取设置数据失败：",t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()},saveData:function(){var n=this;return(0,r.default)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n.saveLoading=!0,t.next=4,i.collection("tx-config").where({_id:n.docId}).update({location_update_duration:n.location_update_duration});case 4:e=t.sent,n.saveLoading=!1,console.log("更新设置成功：",{resp:e}),uni.showToast({title:"保存成功",icon:"success",mask:!0}),t.next=12;break;case 10:t.prev=10,t.t0=t["catch"](0);case 12:case"end":return t.stop()}}),t,null,[[0,10]])})))()}}};t.default=u}).call(this,e("a9ff")["default"])},a446:function(n,t,e){"use strict";var a;e.d(t,"b",(function(){return r})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return a}));var r=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",[e("v-uni-view",{staticClass:"uni-header"},[e("v-uni-view",{staticClass:"uni-group"},[e("v-uni-view",{staticClass:"uni-title"},[n._v("小程序设置")])],1)],1),e("v-uni-view",{staticClass:"uni-container"},[n._v("位置更新间隔时间/S："),e("el-input",{staticClass:"input",attrs:{placeholder:"请输入数字(秒)",type:"number",clearable:!0},model:{value:n.location_update_duration,callback:function(t){n.location_update_duration=n._n(t)},expression:"location_update_duration"}}),e("el-button",{attrs:{type:"primary",loading:n.saveLoading},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.saveData.apply(void 0,arguments)}}},[n._v("保存")])],1)],1)},i=[]},f2e4:function(n,t,e){var a=e("40a9");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var r=e("4f06").default;r("35915a6e",a,!0,{sourceMap:!1,shadowMode:!1})},f65e:function(n,t,e){"use strict";var a=e("f2e4"),r=e.n(a);r.a},f8b4:function(n,t,e){"use strict";e.r(t);var a=e("6caa"),r=e.n(a);for(var i in a)"default"!==i&&function(n){e.d(t,n,(function(){return a[n]}))}(i);t["default"]=r.a}}]);