import Vuex from '@/store/index.js'

const commit = Vuex.commit;
const state = Vuex.state;
export async function loginByWeixin() {
    const now = new Date().getTime();
    if (state.hasLogin && state.tokenExpired - now < 600000 || !state.hasLogin) {
        console.log("正在登录")
        const [err, res] = await uni.login();
        const loginResp = await uniCloud.callFunction({
        	name: 'user-center',
        	data: {
        		action: 'loginByWeixin',
        		params: {
        			code: res.code
        		}
        	}
        })
        console.log("登录成功", loginResp)
        commit('login', loginResp.result)
    } else {
        console.log("已登录")
    }
    // 消息用户已读消息
    try{
        const resp = await uniCloud.database().collection("tx-msgread").where('uid == $env.uid').get({
            getOne: true
        });
        console.log("获取用户已读消息成功：", {resp})
        if (resp.result.affectedDocs == 0) {
            try{
                const createResp = await uniCloud.database().collection("tx-msgread").add({read_list: []})
                console.log("创建用户已读消息记录成功：", {createResp})
                commit("setMsgRead", {_id: createResp.result.id, read_list: []})
            }catch(e){
                console.log("创建用户已读消息记录失败：", {createResp})
            }
        } else {
            commit("setMsgRead", {_id: resp.result.data._id, read_list: resp.result.data.read_list})
        }
    }catch(e){
        console.log("获取用户已读消息失败：", e)
    }
    // 用户资料
    try{
        const userinfo = await uniCloud.database().collection("tx-userinfo").where('uid == $env.uid').get({
            getOne: true
        });
        console.log("获取个人资料成功：", userinfo)
        if (userinfo.result.affectedDocs == 0) {
            uni.navigateTo({
                url: "/pages/user/profile",
                fail(e){
                    console.log("跳转失败：", e)
                }
            })
        }
    }catch(e){
        console.log("获取个人资料失败：", e)
    }
}