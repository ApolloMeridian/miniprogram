(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-system-menu-edit","pages-demo-icons-icons"],{"0039":function(e,t,a){"use strict";a.r(t);var i=a("b5c5"),n=a("b2d3");for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);a("1b6f");var l,r=a("f0c5"),s=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"e1441e24",null,!1,i["a"],l);t["default"]=s.exports},"02b3":function(e,t,a){"use strict";(function(e){var i=a("4ea4");a("caad"),a("d3b7"),a("2532"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("5530")),o=i(a("f57c")),l=i(a("f51c")),r=a("2f62"),s=e.database(),u=(s.command,"opendb-admin-menus");function c(e){var t={};for(var a in o.default)e.includes(a)&&(t[a]=o.default[a]);return t}var d={components:{Icons:l.default},data:function(){return{formData:{menu_id:"",name:"",icon:"",url:"",sort:"",parent_id:"",permission:[],enable:null},rules:(0,n.default)({},c(["menu_id","name","icon","url","sort","parent_id","permission","enable"]))}},onLoad:function(e){var t=e.id;this.formDataId=t,this.getDetail(t)},methods:(0,n.default)((0,n.default)({},(0,r.mapActions)({init:"app/init"})),{},{submitForm:function(e){this.$refs.form.submit()},submit:function(e){var t=this,a=e.detail,i=a.value,n=a.errors;n||(uni.showLoading({title:"修改中...",mask:!0}),this.$request("system/menu/update",Object.assign({_id:this.formDataId},i)).then((function(e){uni.showToast({title:"修改成功"}),t.init(),t.getOpenerEventChannel().emit("refreshData"),setTimeout((function(){return uni.navigateBack()}),500)})).finally((function(){uni.hideLoading()})))},getDetail:function(e){var t=this;uni.showLoading({mask:!0}),s.collection(u).where({_id:e}).get().then((function(e){var a=e.result.data[0];a&&(t.formData=a)})).catch((function(e){uni.showModal({content:e.message||"请求服务失败",showCancel:!1})})).finally((function(){uni.hideLoading()}))},showIconPopup:function(){this.$refs.iconPopup.open()}})};t.default=d}).call(this,a("a9ff")["default"])},1213:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=["pulldown","refreshempty","back","forward","more","more-filled","scan","qq","weibo","weixin","pengyouquan","loop","refresh","refresh-filled","arrowthindown","arrowthinleft","arrowthinright","arrowthinup","undo-filled","undo","redo","redo-filled","bars","chatboxes","camera","chatboxes-filled","camera-filled","cart-filled","cart","checkbox-filled","checkbox","arrowleft","arrowdown","arrowright","smallcircle-filled","arrowup","circle","eye-filled","eye-slash-filled","eye-slash","eye","flag-filled","flag","gear-filled","reload","gear","hand-thumbsdown-filled","hand-thumbsdown","hand-thumbsup-filled","heart-filled","hand-thumbsup","heart","home","info","home-filled","info-filled","circle-filled","chat-filled","chat","mail-open-filled","email-filled","mail-open","email","checkmarkempty","list","locked-filled","locked","map-filled","map-pin","map-pin-ellipse","map","minus-filled","mic-filled","minus","micoff","mic","clear","smallcircle","close","closeempty","paperclip","paperplane","paperplane-filled","person-filled","contact-filled","person","contact","images-filled","phone","images","image","image-filled","location-filled","location","plus-filled","plus","plusempty","help-filled","help","navigate-filled","navigate","mic-slash-filled","search","settings","sound","sound-filled","spinner-cycle","download-filled","personadd-filled","videocam-filled","personadd","upload","upload-filled","starhalf","star-filled","star","trash","phone-filled","compose","videocam","trash-filled","download","chatbubble-filled","chatbubble","cloud-download","cloud-upload-filled","cloud-upload","cloud-download-filled","headphones","shop"];t.default=i},1862:function(e,t,a){"use strict";a.r(t);var i=a("dd28"),n=a.n(i);for(var o in i)"default"!==o&&function(e){a.d(t,e,(function(){return i[e]}))}(o);t["default"]=n.a},"1b6f":function(e,t,a){"use strict";var i=a("c5fb"),n=a.n(i);n.a},"35c1":function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,".icon-modal-box[data-v-e1441e24]{padding-top:var(--top-window-height)}.icon-modal[data-v-e1441e24]{width:350px;background-color:#fff;height:500px;overflow-y:scroll}@media screen and (min-width:768px){.icon-modal-pc[data-v-e1441e24]{width:600px}}",""]),e.exports=t},4009:function(e,t,a){"use strict";var i=a("dd1d"),n=a.n(i);n.a},a5a3:function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,"\n.icons[data-v-6f807903]{display:flex;flex-wrap:wrap}.icon-item[data-v-6f807903]{display:flex;width:16.6%;height:120px;font-size:30px;text-align:center;justify-content:center;align-items:center;flex-direction:column}.icon-item[data-v-6f807903]:hover,\n.icon-item:hover .icon-text[data-v-6f807903]{color:#007aff}.icon-text[data-v-6f807903]{color:#99a9bf;font-size:12px;text-align:center;height:1em;line-height:1em;margin-top:15px}\n@media only screen and (max-width:500px){.icon-item[data-v-6f807903]{width:33.3%}}\n",""]),e.exports=t},b2d3:function(e,t,a){"use strict";a.r(t);var i=a("02b3"),n=a.n(i);for(var o in i)"default"!==o&&function(e){a.d(t,e,(function(){return i[e]}))}(o);t["default"]=n.a},b5c5:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return i}));var i={uniForms:a("554c").default,uniFormsItem:a("80aa").default,uniEasyinput:a("0be4").default,uniLink:a("4673").default,uniDataCheckbox:a("6a34").default,uniPopup:a("5699").default},n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"uni-container"},[a("uni-forms",{ref:"form",attrs:{labelWidth:"80",rules:e.rules,validateTrigger:"bind"},on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.submit.apply(void 0,arguments)}},model:{value:e.formData,callback:function(t){e.formData=t},expression:"formData"}},[a("uni-forms-item",{attrs:{name:"menu_id",label:"标识",required:!0}},[a("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入菜单项的ID，不可重复"},model:{value:e.formData.menu_id,callback:function(t){e.$set(e.formData,"menu_id",t)},expression:"formData.menu_id"}})],1),a("uni-forms-item",{attrs:{name:"name",label:"名称",required:!0}},[a("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入菜单名称"},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}})],1),a("uni-forms-item",{staticStyle:{"margin-bottom":"40px"},attrs:{name:"icon",label:"图标"}},[a("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入菜单图标css样式类名"},model:{value:e.formData.icon,callback:function(t){e.$set(e.formData,"icon",t)},expression:"formData.icon"}},[a("span",{staticStyle:{color:"#007aff",cursor:"pointer","padding-right":"10px"},attrs:{slot:"right"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.showIconPopup.apply(void 0,arguments)}},slot:"right"},[e._v("内置图标")])]),a("uni-link",{staticClass:"uni-form-item-tips",attrs:{"font-size":"12",href:"https://uniapp.dcloud.net.cn/uniCloud/admin?id=icon-%e5%9b%be%e6%a0%87",text:"如何使用自定义图标？"}})],1),a("uni-forms-item",{attrs:{name:"url",label:"URL"}},[a("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入菜单相路径, 如: /pages/system/menu/add"},model:{value:e.formData.url,callback:function(t){e.$set(e.formData,"url",t)},expression:"formData.url"}})],1),a("uni-forms-item",{attrs:{name:"sort",label:"序号"}},[a("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入菜单序号（越大越靠后）"},model:{value:e.formData.sort,callback:function(t){e.$set(e.formData,"sort",t)},expression:"formData.sort"}})],1),a("uni-forms-item",{attrs:{name:"parent_id",label:"父菜单标识"}},[a("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入父级菜单标识, 一级菜单不需要填写"},model:{value:e.formData.parent_id,callback:function(t){e.$set(e.formData,"parent_id",t)},expression:"formData.parent_id"}})],1),a("uni-forms-item",{staticStyle:{"margin-bottom":"60px"},attrs:{name:"permission",label:"权限列表"}},[a("uni-data-checkbox",{attrs:{multiple:!0,collection:"uni-id-permissions",field:"permission_name as text, permission_id as value"},model:{value:e.formData.permission,callback:function(t){e.$set(e.formData,"permission",t)},expression:"formData.permission"}}),a("v-uni-view",{staticClass:"uni-form-item-tips"},[e._v("当用户拥有以上被选中的权限时，可以访问此菜单，建议仅对子菜单配置权限，父菜单会自动包含。")])],1),a("uni-forms-item",{attrs:{name:"enable",label:"是否启用"}},[a("v-uni-switch",{attrs:{checked:e.formData.enable},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.binddata("enable",t.detail.value)}}})],1),a("v-uni-view",{staticClass:"uni-button-group"},[a("v-uni-button",{staticClass:"uni-button",staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.submitForm.apply(void 0,arguments)}}},[e._v("提交")]),a("v-uni-navigator",{staticStyle:{"margin-left":"15px"},attrs:{"open-type":"navigateBack"}},[a("v-uni-button",{staticClass:"uni-button",staticStyle:{width:"100px"}},[e._v("返回")])],1)],1),a("uni-popup",{ref:"iconPopup",staticClass:"icon-modal-box",attrs:{type:"center"}},[a("v-uni-view",{staticClass:"icon-modal icon-modal-pc"},[a("Icons",{attrs:{tag:!1,"fix-window":!1}})],1)],1)],1)],1)},o=[]},c5fb:function(e,t,a){var i=a("35c1");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("5290bb1e",i,!0,{sourceMap:!1,shadowMode:!1})},dd1d:function(e,t,a){var i=a("a5a3");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("78ebebd4",i,!0,{sourceMap:!1,shadowMode:!1})},dd28:function(e,t,a){"use strict";var i=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("1213")),o={data:function(){return{icons:n.default}},props:{tag:{type:Boolean,default:!0},fixWindow:{type:Boolean,default:!0}},methods:{setClipboardData:function(e,t){var a="uni-icons-"+t;this.tag&&"tag"===e&&(a='<view class="'+a+'"></view>'),uni.setClipboardData({data:a,success:function(e){uni.showToast({icon:"none",title:"复制 "+a+" 成功！"})},fail:function(e){uni.showModal({content:"复制 "+a+" 失败！",showCancel:!1})}})}}};t.default=o},f02c:function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return i}));var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("v-uni-view",{staticClass:"uni-header"},[a("v-uni-view",{staticClass:"uni-group"},[a("v-uni-view",{staticClass:"uni-title"},[e._v("图标（uni-icons）")]),a("v-uni-view",{staticClass:"uni-sub-title"},[e._v("点击图标即可复制图标代码")])],1)],1),a("v-uni-view",{staticClass:"uni-container"},[a("v-uni-view",{staticClass:"icons"},e._l(e.icons,(function(t){return a("v-uni-view",{key:t,staticClass:"icon-item pointer"},[a("v-uni-view",{class:"uni-icons-"+t,on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.setClipboardData("tag",t)}}}),a("v-uni-text",{staticClass:"icon-text",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.setClipboardData("class",t)}}},[e._v("uni-icons-"+e._s(t))])],1)})),1)],1)],1)},o=[]},f51c:function(e,t,a){"use strict";a.r(t);var i=a("f02c"),n=a("1862");for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);a("4009");var l,r=a("f0c5"),s=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"6f807903",null,!1,i["a"],l);t["default"]=s.exports},f57c:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={menu_id:{rules:[{required:!0},{format:"string"}]},name:{rules:[{required:!0},{format:"string"}]},icon:{rules:[{format:"string"}]},url:{rules:[{format:"string"}]},sort:{rules:[{format:"int"}]},parent_id:{rules:[{format:"string"}]},permission:{rules:[{format:"array"}]},enable:{rules:[{format:"bool"}]}};t.default=i}}]);