import Vue from 'vue'
import App from './App'
import store from './store'
import plugin from './js_sdk/uni-admin/plugin'
import elementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import moment from 'moment'
moment.locale('zh-cn');

Vue.config.productionTip = false
Vue.prototype.$moment = moment

Vue.use(plugin)
Vue.use(elementUI)

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
