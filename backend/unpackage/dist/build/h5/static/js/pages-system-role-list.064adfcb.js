(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-system-role-list"],{"01b7":function(n,t,e){"use strict";e("a9e3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={name:"UniPagination",props:{prevText:{type:String,default:"上一页"},nextText:{type:String,default:"下一页"},current:{type:[Number,String],default:1},total:{type:[Number,String],default:0},pageSize:{type:[Number,String],default:10},showIcon:{type:[Boolean,String],default:!1}},data:function(){return{currentIndex:1}},computed:{maxPage:function(){var n=1,t=Number(this.total),e=Number(this.pageSize);return t&&e&&(n=Math.ceil(t/e)),n}},watch:{current:function(n){this.currentIndex=+n}},created:function(){this.currentIndex=+this.current},methods:{clickLeft:function(){1!==Number(this.currentIndex)&&(this.currentIndex-=1,this.change("prev"))},clickRight:function(){Number(this.currentIndex)!==this.maxPage&&(this.currentIndex+=1,this.change("next"))},change:function(n){this.$emit("change",{type:n,current:this.currentIndex})}}};t.default=i},"1e5e":function(n,t,e){"use strict";e.r(t);var i=e("6045"),a=e.n(i);for(var r in i)"default"!==r&&function(n){e.d(t,n,(function(){return i[n]}))}(r);t["default"]=a.a},"3ee5":function(n,t,e){var i=e("e6d5");"string"===typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);var a=e("4f06").default;a("c71b4f34",i,!0,{sourceMap:!1,shadowMode:!1})},"4af1":function(n,t,e){"use strict";(function(n){var i=e("4ea4");e("4160"),e("c975"),e("fb6a"),e("a434"),e("a9e3"),e("b64b"),e("d3b7"),e("ac1f"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(e("2909")),r={load:"load",error:"error"},o={add:"add",replace:"replace"},u=["pageCurrent","pageSize","collection","action","field","getcount","orderby","where","groupby","groupField","distinct"],s={name:"UniClouddb",props:{options:{type:[Object,Array],default:function(){return{}}},collection:{type:String,default:""},action:{type:String,default:""},field:{type:String,default:""},orderby:{type:String,default:""},where:{type:[String,Object],default:""},pageData:{type:String,default:"add"},pageCurrent:{type:Number,default:1},pageSize:{type:Number,default:20},getcount:{type:[Boolean,String],default:!1},getone:{type:[Boolean,String],default:!1},gettree:{type:[Boolean,String],default:!1},gettreepath:{type:[Boolean,String],default:!1},startwith:{type:String,default:""},limitlevel:{type:Number,default:10},groupby:{type:String,default:""},groupField:{type:String,default:""},distinct:{type:[Boolean,String],default:!1},manual:{type:Boolean,default:!1}},data:function(){return{loading:!1,hasMore:!1,dataList:this.getone?void 0:[],paginationInternal:{},errorMessage:""}},created:function(){var n=this;this._isEnded=!1,this.paginationInternal={current:this.pageCurrent,size:this.pageSize,count:0},this.$watch((function(){var t=[];return u.forEach((function(e){t.push(n[e])})),t}),(function(t,e){n.paginationInternal.size=n.pageSize;for(var i=!1,a=2;a<t.length;a++)if(t[a]!==e[a]){i=!0;break}i&&(n.clear(),n.reset()),t[0]!==e[0]&&(n.paginationInternal.current=n.pageCurrent),n._execLoadData()})),this.manual||this.loadData()},beforeDestroy:function(){},methods:{loadData:function(n,t){var e=null,i=!1;"object"===typeof n?(n.clear&&(this.pageData===o.replace?this.clear():i=n.clear,this.reset()),void 0!==n.current&&(this.paginationInternal.current=n.current),"function"===typeof t&&(e=t)):"function"===typeof n&&(e=n),this._execLoadData(e,i)},loadMore:function(){this._isEnded||this._execLoadData()},refresh:function(){this.clear(),this._execLoadData()},clear:function(){this._isEnded=!1,this.dataList=[]},reset:function(){this.paginationInternal.current=1},add:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=e.action,a=e.showToast,r=void 0===a||a,o=e.toastTitle,u=e.success,s=e.fail,c=e.complete;uni.showLoading();var l=n.database();i&&(l=l.action(i)),l.collection(this.collection).add(t).then((function(n){u&&u(n),r&&uni.showToast({title:o||"新增成功"})})).catch((function(n){s&&s(n),uni.showModal({content:n.message,showCancel:!1})})).finally((function(){uni.hideLoading(),c&&c()}))},remove:function(n){var t=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=e.action,a=e.success,r=e.fail,o=e.complete,u=e.confirmTitle,s=e.confirmContent;n&&n.length&&uni.showModal({title:u||"提示",content:s||"是否删除该数据",showCancel:!0,success:function(e){e.confirm&&t._execRemove(n,i,a,r,o)}})},update:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=i.action,r=i.showToast,o=void 0===r||r,u=i.toastTitle,s=i.success,c=i.fail,l=i.complete;uni.showLoading();var d=n.database();return a&&(d=d.action(a)),d.collection(this.collection).doc(t).update(e).then((function(n){s&&s(n),o&&uni.showToast({title:u||"修改成功"})})).catch((function(n){c&&c(n),uni.showModal({content:n.message,showCancel:!1})})).finally((function(){uni.hideLoading(),l&&l()}))},_execLoadData:function(n,t){var e=this;this.loading||(this.loading=!0,this.errorMessage="",this._getExec().then((function(i){e.loading=!1;var u=i.result,s=u.data,c=u.count;e._isEnded=s.length<e.pageSize,e.hasMore=!e._isEnded;var l=e.getone?s.length?s[0]:void 0:s;if(n&&n(l,e._isEnded),e._dispatchEvent(r.load,l),e.getone||e.pageData===o.replace)e.dataList=l;else{var d;if(t)e.dataList=l;else(d=e.dataList).push.apply(d,(0,a.default)(l));e.dataList.length&&e.paginationInternal.current++}e.getcount&&(e.paginationInternal.count=c)})).catch((function(t){e.loading=!1,e.errorMessage=t,n&&n(),e.$emit(r.error,t)})))},_getExec:function(){var t=n.database();this.action&&(t=t.action(this.action)),t=t.collection(this.collection),this.where&&Object.keys(this.where).length&&(t=t.where(this.where)),this.field&&(t=t.field(this.field)),this.groupby&&(t=t.groupBy(this.groupby)),this.groupField&&(t=t.groupField(this.groupField)),!0===this.distinct&&(t=t.distinct()),this.orderby&&(t=t.orderBy(this.orderby));var e=this.paginationInternal,i=e.current,a=e.size,r={};this.getcount&&(r.getCount=this.getcount);var o={limitLevel:this.limitlevel,startWith:this.startwith};return this.gettree&&(r.getTree=o),this.gettreepath&&(r.getTreePath=o),t=t.skip(a*(i-1)).limit(a).get(r),t},_execRemove:function(t,e,i,a,r){var u=this;if(this.collection&&t){var s=Array.isArray(t)?t:[t];if(s.length){uni.showLoading({mask:!0});var c=n.database(),l=c.command,d=c;e&&(d=d.action(e)),d.collection(this.collection).where({_id:l.in(s)}).remove().then((function(n){i&&i(n.result),u.pageData===o.replace?u.refresh():u.removeData(s)})).catch((function(n){a&&a(n),uni.showModal({content:n.message,showCancel:!1})})).finally((function(){uni.hideLoading(),r&&r()}))}}},removeData:function(n){for(var t=n.slice(0),e=this.dataList,i=e.length-1;i>=0;i--){var a=t.indexOf(e[i]._id);a>=0&&(e.splice(i,1),t.splice(a,1))}},_dispatchEvent:function(n,t){this._changeDataFunction?this._changeDataFunction(t,this._isEnded):this.$emit(n,t,this._isEnded)}}};t.default=s}).call(this,e("a9ff")["default"])},"5b2f":function(n,t,e){"use strict";var i;e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return i}));var a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",[n._t("default",null,{options:n.options,data:n.dataList,pagination:n.paginationInternal,loading:n.loading,hasMore:n.hasMore,error:n.errorMessage})],2)},r=[]},6045:function(n,t,e){"use strict";e("a9e3"),e("e25e"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=e("1218"),a={name:"uniDateformat",props:{date:{type:[Object,String,Number],default:function(){return Date.now()}},locale:{type:String,default:"zh"},threshold:{type:Array,default:function(){return[0,0]}},format:{type:String,default:"yyyy/MM/dd hh:mm:ss"},refreshRate:{type:[Number,String],default:0}},data:function(){return{refreshMark:0}},computed:{dateShow:function(){return this.refreshMark,(0,i.friendlyDate)(this.date,{locale:this.locale,threshold:this.threshold,format:this.format})}},watch:{refreshRate:{handler:function(){this.setAutoRefresh()},immediate:!0}},methods:{refresh:function(){this.refreshMark++},setAutoRefresh:function(){var n=this;clearInterval(this.refreshInterval),this.refreshRate&&(this.refreshInterval=setInterval((function(){n.refresh()}),parseInt(this.refreshRate)))}}};t.default=a},"63f4":function(n,t,e){"use strict";e.r(t);var i=e("f467"),a=e("1e5e");for(var r in a)"default"!==r&&function(n){e.d(t,n,(function(){return a[n]}))}(r);var o,u=e("f0c5"),s=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"d411a642",null,!1,i["a"],o);t["default"]=s.exports},"6b82":function(n,t,e){"use strict";e.r(t);var i=e("f139"),a=e("ffb2");for(var r in a)"default"!==r&&function(n){e.d(t,n,(function(){return a[n]}))}(r);e("e3d8");var o,u=e("f0c5"),s=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"cba29ae8",null,!1,i["a"],o);t["default"]=s.exports},"7f17":function(n,t,e){"use strict";(function(n){var i=e("4ea4");e("a15b"),e("d81d"),e("d3b7"),e("4d63"),e("ac1f"),e("25f0"),e("498a"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("96cf");var a=i(e("1da1")),r=(n.database(),"create_date desc"),o=["role_id","role_name"],u=20,s=1,c={data:function(){return{query:"",where:"",orderby:r,options:{pageSize:u,pageCurrent:s}}},methods:{onqueryload:function(n,t){for(var e=0;e<n.length;e++){var i=n[e];i.permission=i.permission.map((function(n){return n.permission_name})).join("、")}},getWhere:function(){var n=this.query.trim();if(!n)return"";var t=new RegExp(n,"i");return o.map((function(n){return t+".test("+n+")"})).join(" || ")},search:function(){var n=this.getWhere(),t=n===this.where;this.where=n,t&&this.loadData()},loadData:function(){var n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.udb.loadData({clear:n})},onPageChanged:function(n){this.$refs.udb.loadData({current:n.current})},navigateTo:function(n,t){var e=this;uni.navigateTo({url:n,events:{refreshData:function(){e.loadData(t)}}})},selectedItems:function(){var n=this.$refs.udb.dataList;return this.selectedIndexs.map((function(t){return n[t].role_id}))},delTable:function(){var n=this;uni.showModal({title:"提示",content:"确认删除多条记录？",success:function(t){t.confirm&&n.delete(n.selectedItems())}})},selectionChange:function(n){this.selectedIndexs=n.detail.index},confirmDelete:function(n){var t=this;uni.showModal({title:"提示",content:"确认删除该记录？",success:function(e){e.confirm&&t.delete(n)}})},delete:function(n){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({mask:!0}),e.next=3,t.$request("system/role/remove",{id:n}).then((function(n){uni.showToast({title:"删除成功"})})).catch((function(n){uni.showModal({content:n.message||"请求服务失败",showCancel:!1})})).finally((function(n){uni.hideLoading()}));case 3:t.loadData(!1);case 4:case"end":return e.stop()}}),e)})))()},praseRoleArr:function(n){return n?n.map((function(n){return n.permission_name})).join("、"):"-"}}};t.default=c}).call(this,e("a9ff")["default"])},"848e":function(n,t,e){"use strict";e.r(t);var i=e("4af1"),a=e.n(i);for(var r in i)"default"!==r&&function(n){e.d(t,n,(function(){return i[n]}))}(r);t["default"]=a.a},9155:function(n,t,e){var i=e("24fb");t=i(!1),t.push([n.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.uni-pagination[data-v-36080c62]{display:flex;position:relative;overflow:hidden;flex-direction:row;justify-content:center;align-items:center}.uni-pagination__btn[data-v-36080c62]{display:flex;width:60px;height:30px;line-height:30px;font-size:14px;position:relative;background-color:#f8f8f8;flex-direction:row;justify-content:center;align-items:center;text-align:center;border-width:1px;border-style:solid;border-color:#c8c7cc;cursor:pointer}.uni-pagination__child-btn[data-v-36080c62]{display:flex;font-size:14px;position:relative;flex-direction:row;justify-content:center;align-items:center;text-align:center}.uni-pagination__num[data-v-36080c62]{display:flex;flex:1;flex-direction:row;justify-content:center;align-items:center;height:30px;line-height:30px;font-size:14px;color:#333}.uni-pagination__num-current[data-v-36080c62]{display:flex;flex-direction:row}.uni-pagination__num-current-text[data-v-36080c62]{font-size:15px}.uni-pagination--enabled[data-v-36080c62]{color:#333;opacity:1}.uni-pagination--disabled[data-v-36080c62]{opacity:.3;cursor:not-allowed}.uni-pagination--hover[data-v-36080c62]{color:rgba(0,0,0,.6);background-color:#f1f1f1}',""]),n.exports=t},"960d":function(n,t,e){"use strict";e.r(t);var i=e("5b2f"),a=e("848e");for(var r in a)"default"!==r&&function(n){e.d(t,n,(function(){return a[n]}))}(r);var o,u=e("f0c5"),s=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);t["default"]=s.exports},b7b3:function(n,t,e){"use strict";var i=e("b7e3"),a=e.n(i);a.a},b7e3:function(n,t,e){var i=e("9155");"string"===typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);var a=e("4f06").default;a("8085ea4c",i,!0,{sourceMap:!1,shadowMode:!1})},c6fb:function(n,t,e){"use strict";e.r(t);var i=e("01b7"),a=e.n(i);for(var r in i)"default"!==r&&function(n){e.d(t,n,(function(){return i[n]}))}(r);t["default"]=a.a},caf7:function(n,t,e){"use strict";e.r(t);var i=e("dba2"),a=e("c6fb");for(var r in a)"default"!==r&&function(n){e.d(t,n,(function(){return a[n]}))}(r);e("b7b3");var o,u=e("f0c5"),s=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"36080c62",null,!1,i["a"],o);t["default"]=s.exports},dba2:function(n,t,e){"use strict";e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return i}));var i={uniIcons:e("da47").default},a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",{staticClass:"uni-pagination"},[e("v-uni-view",{staticClass:"uni-pagination__btn",class:1===n.currentIndex?"uni-pagination--disabled":"uni-pagination--enabled",attrs:{"hover-class":1===n.currentIndex?"":"uni-pagination--hover","hover-start-time":20,"hover-stay-time":70},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.clickLeft.apply(void 0,arguments)}}},[!0===n.showIcon||"true"===n.showIcon?[e("uni-icons",{attrs:{color:"#000",size:"20",type:"arrowleft"}})]:[e("v-uni-text",{staticClass:"uni-pagination__child-btn"},[n._v(n._s(n.prevText))])]],2),e("v-uni-view",{staticClass:"uni-pagination__num"},[e("v-uni-view",{staticClass:"uni-pagination__num-current"},[e("v-uni-text",{staticClass:"uni-pagination__num-current-text",staticStyle:{color:"#007aff"}},[n._v(n._s(n.currentIndex))]),e("v-uni-text",{staticClass:"uni-pagination__num-current-text"},[n._v("/"+n._s(n.maxPage||0))])],1)],1),e("v-uni-view",{staticClass:"uni-pagination__btn",class:n.currentIndex===n.maxPage?"uni-pagination--disabled":"uni-pagination--enabled",attrs:{"hover-class":n.currentIndex===n.maxPage?"":"uni-pagination--hover","hover-start-time":20,"hover-stay-time":70},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.clickRight.apply(void 0,arguments)}}},[!0===n.showIcon||"true"===n.showIcon?[e("uni-icons",{attrs:{color:"#000",size:"20",type:"arrowright"}})]:[e("v-uni-text",{staticClass:"uni-pagination__child-btn"},[n._v(n._s(n.nextText))])]],2)],1)},r=[]},e3d8:function(n,t,e){"use strict";var i=e("3ee5"),a=e.n(i);a.a},e6d5:function(n,t,e){var i=e("24fb");t=i(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""]),n.exports=t},f139:function(n,t,e){"use strict";e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return i}));var i={unicloudDb:e("960d").default,uniTable:e("0d5b").default,uniTr:e("ddb2").default,uniTh:e("151c").default,uniTd:e("26a7").default,uniDateformat:e("63f4").default,uniPagination:e("caf7").default},a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",[e("v-uni-view",{staticClass:"uni-header"},[e("v-uni-view",{staticClass:"uni-group"},[e("v-uni-view",{staticClass:"uni-title"}),e("v-uni-view",{staticClass:"uni-sub-title"})],1),e("v-uni-view",{staticClass:"uni-group"},[e("v-uni-input",{staticClass:"uni-search",attrs:{type:"text",placeholder:"请输入搜索内容"},on:{confirm:function(t){arguments[0]=t=n.$handleEvent(t),n.search.apply(void 0,arguments)}},model:{value:n.query,callback:function(t){n.query=t},expression:"query"}}),e("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.search.apply(void 0,arguments)}}},[n._v("搜索")]),e("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.navigateTo("./add")}}},[n._v("新增")]),e("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.delTable.apply(void 0,arguments)}}},[n._v("批量删除")])],1)],1),e("v-uni-view",{staticClass:"uni-container"},[e("unicloud-db",{ref:"udb",attrs:{collection:"uni-id-roles,uni-id-permissions",options:n.options,where:n.where,field:"role_id,role_name,permission{permission_id,permission_name},comment,create_date","page-data":"replace",orderby:n.orderby,getcount:!0,"page-size":n.options.pageSize,"page-current":n.options.pageCurrent},on:{load:function(t){arguments[0]=t=n.$handleEvent(t),n.onqueryload.apply(void 0,arguments)}},scopedSlots:n._u([{key:"default",fn:function(t){var i=t.data,a=t.pagination,r=t.loading,o=t.error;return[e("uni-table",{attrs:{loading:r,emptyText:o.message||"没有更多数据",border:!0,stripe:!0,type:"selection"},on:{"selection-change":function(t){arguments[0]=t=n.$handleEvent(t),n.selectionChange.apply(void 0,arguments)}}},[e("uni-tr",[e("uni-th",{attrs:{align:"center"}},[n._v("角色Id")]),e("uni-th",{attrs:{align:"center"}},[n._v("角色名")]),e("uni-th",{attrs:{align:"center"}},[n._v("权限")]),e("uni-th",{attrs:{align:"center"}},[n._v("备注")]),e("uni-th",{attrs:{width:"170",align:"center"}},[n._v("创建时间")]),e("uni-th",{attrs:{width:"204",align:"center"}},[n._v("操作")])],1),n._l(i,(function(t,i){return e("uni-tr",{key:i},[e("uni-td",{attrs:{align:"center"}},[n._v(n._s(t.role_id))]),e("uni-td",{attrs:{align:"center"}},[n._v(n._s(t.role_name))]),e("uni-td",{attrs:{align:"center"}},[n._v(n._s(t.permission))]),e("uni-td",{attrs:{align:"center"}},[n._v(n._s(t.comment))]),e("uni-td",{attrs:{align:"center"}},[e("uni-dateformat",{attrs:{date:t.create_date,threshold:[0,0]}})],1),e("uni-td",{attrs:{align:"center"}},["admin"===t.role_id?e("v-uni-view",[n._v("-")]):e("v-uni-view",{staticClass:"uni-group"},[e("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"primary"},on:{click:function(e){arguments[0]=e=n.$handleEvent(e),n.navigateTo("./edit?id="+t._id,!1)}}},[n._v("修改")]),e("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"warn"},on:{click:function(e){arguments[0]=e=n.$handleEvent(e),n.confirmDelete(t.role_id)}}},[n._v("删除")])],1)],1)],1)}))],2),e("v-uni-view",{staticClass:"uni-pagination-box"},[e("uni-pagination",{attrs:{"show-icon":!0,"page-size":a.size,total:a.count},on:{change:function(t){arguments[0]=t=n.$handleEvent(t),n.onPageChanged.apply(void 0,arguments)}},model:{value:a.current,callback:function(t){n.$set(a,"current",t)},expression:"pagination.current"}})],1)]}}])})],1)],1)},r=[]},f467:function(n,t,e){"use strict";var i;e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return i}));var a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-text",[n._v(n._s(n.dateShow))])},r=[]},ffb2:function(n,t,e){"use strict";e.r(t);var i=e("7f17"),a=e.n(i);for(var r in i)"default"!==r&&function(n){e.d(t,n,(function(){return i[n]}))}(r);t["default"]=a.a}}]);