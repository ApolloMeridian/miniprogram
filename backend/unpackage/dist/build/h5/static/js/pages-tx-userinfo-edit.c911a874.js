(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-tx-userinfo-edit"],{"0b53":function(e,t,a){"use strict";var n=a("68c2"),r=a.n(n);r.a},"0be4":function(e,t,a){"use strict";a.r(t);var n=a("adb0"),r=a("909c");for(var i in r)"default"!==i&&function(e){a.d(t,e,(function(){return r[e]}))}(i);a("107e");var o,s=a("f0c5"),l=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"a6557bda",null,!1,n["a"],o);t["default"]=l.exports},"107e":function(e,t,a){"use strict";var n=a("a85f"),r=a.n(n);r.a},"17d9":function(e,t,a){"use strict";a.r(t);var n=a("6a50"),r=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,(function(){return n[e]}))}(i);t["default"]=r.a},1998:function(e,t,a){"use strict";a("a9e3"),a("ac1f"),a("5319"),a("498a"),a("1e25"),a("eee7"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;a("c501");var n={name:"uni-easyinput",props:{name:String,value:[Number,String],type:{type:String,default:"text"},clearable:{type:Boolean,default:!0},autoHeight:{type:Boolean,default:!1},placeholder:String,placeholderStyle:String,focus:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},clearSize:{type:[Number,String],default:15},inputBorder:{type:Boolean,default:!0},prefixIcon:{type:String,default:""},suffixIcon:{type:String,default:""},trim:{type:[Boolean,String],default:!0},styles:{type:Object,default:function(){return{color:"#333",disableColor:"#eee",borderColor:"#e5e5e5"}}}},data:function(){return{focused:!1,errMsg:"",val:"",showMsg:"",border:!1,isFirstBorder:!1,showClearIcon:!1,showPassword:!1}},computed:{msg:function(){return this.errorMessage||this.errMsg},inputMaxlength:function(){return Number(this.maxlength)}},watch:{value:function(e){this.errMsg&&(this.errMsg=""),this.val=e,this.form&&this.formItem&&this.formItem.setValue(e)},focus:function(e){var t=this;this.$nextTick((function(){t.focused=t.focus}))}},created:function(){this.val=this.value,this.form=this.getForm("uniForms"),this.formItem=this.getForm("uniFormsItem"),this.form&&this.formItem&&this.formItem.name&&(this.rename=this.formItem.name,this.form.inputChildrens.push(this))},mounted:function(){var e=this;this.$nextTick((function(){e.focused=e.focus}))},methods:{init:function(){},onClickIcon:function(e){this.$emit("iconClick",e)},getForm:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"uniForms",t=this.$parent,a=t.$options.name;while(a!==e){if(t=t.$parent,!t)return!1;a=t.$options.name}return t},onEyes:function(){this.showPassword=!this.showPassword},onInput:function(e){var t=e.detail.value;this.trim&&("boolean"===typeof this.trim&&this.trim&&(t=this.trimStr(t)),"string"===typeof this.trim&&(t=this.trimStr(t,this.trim))),this.errMsg&&(this.errMsg=""),this.val=t,this.$emit("input",t)},onFocus:function(e){this.$emit("focus",e)},onBlur:function(e){e.detail.value;this.$emit("blur",e)},onConfirm:function(e){this.$emit("confirm",e.detail.value)},onClear:function(e){this.val="",this.$emit("input","")},fieldClick:function(){this.$emit("click")},trimStr:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"both";return"both"===t?e.trim():"left"===t?e.trimLeft():"right"===t?e.trimRight():"start"===t?e.trimStart():"end"===t?e.trimEnd():"all"===t?e.replace(/\s+/g,""):e}}};t.default=n},"1e25":function(e,t,a){"use strict";var n=a("23e7"),r=a("58a8").end,i=a("c8d2"),o=i("trimEnd"),s=o?function(){return r(this)}:"".trimEnd;n({target:"String",proto:!0,forced:o},{trimEnd:s,trimRight:s})},"3d27":function(e,t,a){var n=a("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.uni-easyinput[data-v-a6557bda]{width:100%;flex:1;position:relative;text-align:left;color:#333;font-size:14px}.uni-easyinput__content[data-v-a6557bda]{flex:1;width:100%;display:flex;box-sizing:border-box;min-height:36px;flex-direction:row;align-items:center}.uni-easyinput__content-input[data-v-a6557bda]{width:auto;position:relative;overflow:hidden;flex:1;line-height:2;font-size:14px}.is-textarea[data-v-a6557bda]{align-items:flex-start}.is-textarea-icon[data-v-a6557bda]{margin-top:5px}.uni-easyinput__content-textarea[data-v-a6557bda]{position:relative;overflow:hidden;flex:1;line-height:1.5;font-size:14px;padding-top:6px;padding-bottom:10px;height:80px;min-height:80px;width:auto}.input-padding[data-v-a6557bda]{padding-left:10px}.content-clear-icon[data-v-a6557bda]{padding:0 5px}.label-icon[data-v-a6557bda]{margin-right:5px;margin-top:-1px}.is-input-border[data-v-a6557bda]{display:flex;box-sizing:border-box;flex-direction:row;align-items:center;border:1px solid #c8c7cc;border-radius:4px}.is-required[data-v-a6557bda]{color:#dd524d}.uni-error-message[data-v-a6557bda]{position:absolute;bottom:-17px;left:0;line-height:12px;color:#dd524d;font-size:12px;text-align:left}.uni-error-msg--boeder[data-v-a6557bda]{position:relative;bottom:0;line-height:22px}.is-input-error-border[data-v-a6557bda]{border-color:#dd524d}.uni-easyinput--border[data-v-a6557bda]{margin-bottom:0;padding:10px 15px;border-top:1px #eee solid}.uni-easyinput-error[data-v-a6557bda]{padding-bottom:0}.is-first-border[data-v-a6557bda]{border:none}.is-disabled[data-v-a6557bda]{background-color:#eee}',""]),e.exports=t},5913:function(e,t,a){"use strict";a.r(t);var n=a("6d76"),r=a("17d9");for(var i in r)"default"!==i&&function(e){a.d(t,e,(function(){return r[e]}))}(i);a("0b53");var o,s=a("f0c5"),l=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"e91b8c7c",null,!1,n["a"],o);t["default"]=l.exports},"5a1f":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.enumConverter=t.validator=void 0;var n={sex:{rules:[{required:!0,errorMessage:"请输入{label}"},{format:"string",errorMessage:"请输入{label}"}],label:"性别"},age:{rules:[{required:!0,errorMessage:"请输入{label}"},{format:"string",errorMessage:"请输入{label}"}],label:"年龄"},education:{rules:[{required:!0,errorMessage:"请输入{label}"},{format:"string",errorMessage:"请输入{label}"}],label:"文化程度"},occupation:{rules:[{required:!0,errorMessage:"请输入{label}"},{format:"string",errorMessage:"请输入{label}"}],label:"职业"},income_min:{rules:[{required:!0,errorMessage:"{label}不能为空"},{format:"string",errorMessage:"{label}不能为空"}],label:"收入范围（最低）"},income_max:{rules:[{required:!0,errorMessage:"{label}不能为空"},{format:"string",errorMessage:"{label}不能为空"}],label:"收入范围（最高）"},private_car:{rules:[{required:!0,errorMessage:"请输入{label}"},{format:"string",errorMessage:"请输入{label}"}],label:"私人小汽车"},construction_area:{rules:[{required:!0,errorMessage:"请输入{label}"},{format:"string",errorMessage:"请输入{label}"}],label:"建筑面积"},bicycle:{rules:[{required:!0,errorMessage:"请输入{label}"},{format:"string",errorMessage:"请输入{label}"}],label:"是否拥有自行车"},housing_nature:{rules:[{required:!0,errorMessage:"请输入{label}"},{format:"string",errorMessage:"请输入{label}"}],label:"住房性质"},total_people:{rules:[{required:!0,errorMessage:"请输入{label}"},{format:"string",errorMessage:"请输入{label}"}],label:"总人数"}};t.validator=n;var r={};t.enumConverter=r},"68c2":function(e,t,a){var n=a("de63");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var r=a("4f06").default;r("24c1dabc",n,!0,{sourceMap:!1,shadowMode:!1})},"6a50":function(e,t,a){"use strict";(function(e){var n=a("4ea4");a("c975"),a("d3b7"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("5530")),i=a("5a1f"),o=e.database(),s="tx-userinfo";function l(e){var t={};for(var a in i.validator)e.indexOf(a)>-1&&(t[a]=i.validator[a]);return t}var u={data:function(){return{formData:{sex:"",age:"",education:"",occupation:"",income_min:"",income_max:"",private_car:"",construction_area:"",bicycle:"",housing_nature:"",total_people:""},formOptions:{},rules:(0,r.default)({},l(["sex","age","education","occupation","income_min","income_max","private_car","construction_area","bicycle","housing_nature","total_people"]))}},onLoad:function(e){var t=e.id;this.formDataId=t,this.getDetail(t)},onReady:function(){this.$refs.form.setRules(this.rules)},methods:{submit:function(){var e=this;uni.showLoading({mask:!0}),this.$refs.form.submit().then((function(t){e.submitForm(t)})).catch((function(e){uni.hideLoading()}))},submitForm:function(e){var t=this;o.collection(s).doc(this.formDataId).update(e).then((function(e){uni.showToast({icon:"none",title:"修改成功"}),t.getOpenerEventChannel().emit("refreshData"),setTimeout((function(){return uni.navigateBack()}),500)})).catch((function(e){uni.showModal({content:e.message||"请求服务失败",showCancel:!1})})).finally((function(){uni.hideLoading()}))},getDetail:function(e){var t=this;uni.showLoading({mask:!0}),o.collection(s).doc(e).field("sex,age,education,occupation,income_min,income_max,private_car,construction_area,bicycle,housing_nature,total_people").get().then((function(e){var a=e.result.data[0];a&&(t.formData=a)})).catch((function(e){uni.showModal({content:e.message||"请求服务失败",showCancel:!1})})).finally((function(){uni.hideLoading()}))}}};t.default=u}).call(this,a("a9ff")["default"])},"6d76":function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return n}));var n={uniForms:a("554c").default,uniFormsItem:a("80aa").default,uniEasyinput:a("0be4").default},r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"uni-container"},[a("uni-forms",{ref:"form",attrs:{value:e.formData,"validate-trigger":"submit","err-show-type":"toast"}},[a("uni-forms-item",{attrs:{name:"sex",label:"性别",required:!0}},[a("uni-easyinput",{model:{value:e.formData.sex,callback:function(t){e.$set(e.formData,"sex",t)},expression:"formData.sex"}})],1),a("uni-forms-item",{attrs:{name:"age",label:"年龄",required:!0}},[a("uni-easyinput",{model:{value:e.formData.age,callback:function(t){e.$set(e.formData,"age",t)},expression:"formData.age"}})],1),a("uni-forms-item",{attrs:{name:"education",label:"文化程度",required:!0}},[a("uni-easyinput",{model:{value:e.formData.education,callback:function(t){e.$set(e.formData,"education",t)},expression:"formData.education"}})],1),a("uni-forms-item",{attrs:{name:"occupation",label:"职业",required:!0}},[a("uni-easyinput",{model:{value:e.formData.occupation,callback:function(t){e.$set(e.formData,"occupation",t)},expression:"formData.occupation"}})],1),a("uni-forms-item",{attrs:{name:"income_min",label:"收入范围（最低）",required:!0}},[a("uni-easyinput",{model:{value:e.formData.income_min,callback:function(t){e.$set(e.formData,"income_min",t)},expression:"formData.income_min"}})],1),a("uni-forms-item",{attrs:{name:"income_max",label:"收入范围（最高）",required:!0}},[a("uni-easyinput",{model:{value:e.formData.income_max,callback:function(t){e.$set(e.formData,"income_max",t)},expression:"formData.income_max"}})],1),a("uni-forms-item",{attrs:{name:"private_car",label:"私人小汽车",required:!0}},[a("uni-easyinput",{model:{value:e.formData.private_car,callback:function(t){e.$set(e.formData,"private_car",t)},expression:"formData.private_car"}})],1),a("uni-forms-item",{attrs:{name:"construction_area",label:"建筑面积",required:!0}},[a("uni-easyinput",{model:{value:e.formData.construction_area,callback:function(t){e.$set(e.formData,"construction_area",t)},expression:"formData.construction_area"}})],1),a("uni-forms-item",{attrs:{name:"bicycle",label:"是否拥有自行车",required:!0}},[a("uni-easyinput",{model:{value:e.formData.bicycle,callback:function(t){e.$set(e.formData,"bicycle",t)},expression:"formData.bicycle"}})],1),a("uni-forms-item",{attrs:{name:"housing_nature",label:"住房性质",required:!0}},[a("uni-easyinput",{model:{value:e.formData.housing_nature,callback:function(t){e.$set(e.formData,"housing_nature",t)},expression:"formData.housing_nature"}})],1),a("uni-forms-item",{attrs:{name:"total_people",label:"总人数",required:!0}},[a("uni-easyinput",{model:{value:e.formData.total_people,callback:function(t){e.$set(e.formData,"total_people",t)},expression:"formData.total_people"}})],1),a("v-uni-view",{staticClass:"uni-button-group"},[a("v-uni-button",{staticClass:"uni-button",attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.submit.apply(void 0,arguments)}}},[e._v("提交")])],1)],1)],1)},i=[]},"909c":function(e,t,a){"use strict";a.r(t);var n=a("1998"),r=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,(function(){return n[e]}))}(i);t["default"]=r.a},a85f:function(e,t,a){var n=a("3d27");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var r=a("4f06").default;r("d2ca53ce",n,!0,{sourceMap:!1,shadowMode:!1})},adb0:function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return n}));var n={uniIcons:a("da47").default},r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"uni-easyinput",class:{"uni-easyinput-error":e.msg},style:{color:e.inputBorder&&e.msg?"#dd524d":e.styles.color}},[a("v-uni-view",{staticClass:"uni-easyinput__content",class:{"is-input-border":e.inputBorder,"is-input-error-border":e.inputBorder&&e.msg,"is-textarea":"textarea"===e.type,"is-disabled":e.disabled},style:{"border-color":e.inputBorder&&e.msg?"#dd524d":e.styles.borderColor,"background-color":e.disabled?e.styles.disableColor:""}},[e.prefixIcon?a("uni-icons",{staticClass:"content-clear-icon",attrs:{type:e.prefixIcon,color:"#c0c4cc"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClickIcon("prefix")}}}):e._e(),"textarea"===e.type?a("v-uni-textarea",{staticClass:"uni-easyinput__content-textarea",class:{"input-padding":e.inputBorder},attrs:{name:e.name,value:e.val,placeholder:e.placeholder,placeholderStyle:e.placeholderStyle,disabled:e.disabled,maxlength:e.inputMaxlength,focus:e.focused,autoHeight:e.autoHeight},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.onInput.apply(void 0,arguments)},blur:function(t){arguments[0]=t=e.$handleEvent(t),e.onBlur.apply(void 0,arguments)},focus:function(t){arguments[0]=t=e.$handleEvent(t),e.onFocus.apply(void 0,arguments)},confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.onConfirm.apply(void 0,arguments)}}}):a("v-uni-input",{staticClass:"uni-easyinput__content-input",style:{"padding-right":"password"===e.type||e.clearable||e.prefixIcon?"":"10px","padding-left":e.prefixIcon?"":"10px"},attrs:{type:"password"===e.type?"text":e.type,name:e.name,value:e.val,password:!e.showPassword&&"password"===e.type,placeholder:e.placeholder,placeholderStyle:e.placeholderStyle,disabled:e.disabled,maxlength:e.inputMaxlength,focus:e.focused},on:{focus:function(t){arguments[0]=t=e.$handleEvent(t),e.onFocus.apply(void 0,arguments)},blur:function(t){arguments[0]=t=e.$handleEvent(t),e.onBlur.apply(void 0,arguments)},input:function(t){arguments[0]=t=e.$handleEvent(t),e.onInput.apply(void 0,arguments)},confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.onConfirm.apply(void 0,arguments)}}}),"password"===e.type?[""!=e.val?a("uni-icons",{staticClass:"content-clear-icon",class:{"is-textarea-icon":"textarea"===e.type},attrs:{type:e.showPassword?"eye-slash-filled":"eye-filled",size:18,color:"#c0c4cc"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onEyes.apply(void 0,arguments)}}}):e._e()]:e.suffixIcon?[e.suffixIcon?a("uni-icons",{staticClass:"content-clear-icon",attrs:{type:e.suffixIcon,color:"#c0c4cc"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClickIcon("suffix")}}}):e._e()]:[e.clearable&&e.focused&&e.val?a("uni-icons",{staticClass:"content-clear-icon",class:{"is-textarea-icon":"textarea"===e.type},attrs:{type:"clear",size:e.clearSize,color:"#c0c4cc"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClear.apply(void 0,arguments)}}}):e._e()],e._t("right")],2)],1)},i=[]},c501:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.throttle=t.debounce=void 0;var n=function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return console.log(1),function(){console.log(123);var r=this,i=arguments;if(t&&clearTimeout(t),n){var o=!t;t=setTimeout((function(){t=null}),a),o&&e.apply(r,i)}else t=setTimeout((function(){e.apply(r,i)}),a)}};t.debounce=n;var r=function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=0;return function(){var i=this,o=arguments;if(1===n){var s=Date.now();s-r>a&&(e.apply(i,o),r=s)}else 2===n&&(t||(t=setTimeout((function(){t=null,e.apply(i,o)}),a)))}};t.throttle=r},de63:function(e,t,a){var n=a("24fb");t=n(!1),t.push([e.i,".uni-container[data-v-e91b8c7c]{padding:15px}.uni-input-border[data-v-e91b8c7c],\n.uni-textarea-border[data-v-e91b8c7c]{width:100%;font-size:14px;color:#666;border:1px #e5e5e5 solid;border-radius:5px;box-sizing:border-box}.uni-input-border[data-v-e91b8c7c]{padding:0 10px;height:35px}.uni-textarea-border[data-v-e91b8c7c]{padding:10px;height:80px}.uni-button-group[data-v-e91b8c7c]{margin-top:50px;display:flex;justify-content:center}.uni-button[data-v-e91b8c7c]{width:184px;padding:12px 20px;font-size:14px;border-radius:4px;line-height:1;margin:0}",""]),e.exports=t},eee7:function(e,t,a){"use strict";var n=a("23e7"),r=a("58a8").start,i=a("c8d2"),o=i("trimStart"),s=o?function(){return r(this)}:"".trimStart;n({target:"String",proto:!0,forced:o},{trimStart:s,trimLeft:s})}}]);