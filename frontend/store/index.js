import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => uni.getStorageSync(key),
                setItem: (key, value) => uni.setStorageSync(key, value),
                removeItem: key => uni.removeStorageSync(key)
            }
        })
    ],
    state: {
        hasLogin: false,
        token: "",
        uid: "",
        role: [],
        tokenExpired: "",
        covers: [], //每个元素大约80字节，微信小程序storage限制10M，按10秒获取一次，每天24小时不间断获取，最长能存15天左右的数据，每天按8小时算，总数据225kb左右
        trip: [],
        currentTripIndex: 0,
        config: "",
        development: false,
        virtualData: false,
        msgread_id: null,
        read_list: [],
        firstLaunch: true
        
    },
    mutations: {
        closeLaunchGuide(state){
            state.firstLaunch = false
        },
        login(state, params) {
            state.token = params.token;
            state.uid = params.uid;
            state.tokenExpired = params.tokenExpired;
            uni.setStorageSync('uni_id_token', params.token);
            uni.setStorageSync('uni_id_token_expired', params.tokenExpired)
            state.hasLogin = true;
            if(params.userInfo.role != undefined) {
                state.role = params.userInfo.role
            }
        },
        logout(state) {
            state.token = "";
            state.uid = "";
            state.tokenExpired = "";
            uni.clearStorageSync('uni_id_token');
            uni.clearStorageSync('uni_id_token_expired')
            state.hasLogin = false;
            state.role = []
        },
        setConfig(state, params){
            state.config = params
        },
        setMsgRead(state, params){
            state.msgread_id = params._id
            state.read_list = params.read_list
        },
        updateReadList(state, docId) {
            state.read_list.push(docId)
        },
        switchDev(state, params){
            state.development = params;
        },
        switchVirtualData(state, params){
            state.virtualData = params;
        },
        clearMaker(state) {
            state.covers = [];
        },
        addMaker(state, params) {
            state.covers.push({
                id: state.covers.length,
                latitude: params.latitude,
                longitude: params.longitude,
                time: new Date().getTime()
            })
        },
        addTrip(state, params) {
            const currentIndex = state.trip.push({
                start_time: params[0].time,
                end_time: params[params.length - 1].time,
                status: "待记录",
                raw: params,
                record: []
            }) - 1;
            state.currentTripIndex = currentIndex;
        },
        removeTrip(state, index) {
            if (index < state.trip.length) {
                state.trip.splice(index, 1)
            }
        },
        resetTrip(state, trip){
            state.trip = trip;
        },
        clearTrip(state) {
            state.trip = []
            state.currentTripIndex = 0
        },
        addTripRecord(state, params) {
            if(params.index < state.trip.length) {
                let currrentTrip = state.trip[params.index]
                currrentTrip.record.push(params.record)
                if(currrentTrip.record.some(o => o.start_markerId == currrentTrip.raw[0].id) && currrentTrip.record.some(o => o.end_markerId == currrentTrip.raw[currrentTrip.raw.length - 1].id)){
                    currrentTrip.status = "待提交"
                } else {
                    currrentTrip.status = "待记录"
                }
            }
        },
        editTripRecord(state, params){
            if (params.index < state.trip.length) {
                state.trip[params.index].record.splice(params.record_index, 1, params.record)
            }
        },
        removeTripRecord(state, params) {
            if (params.index < state.trip.length) {
                state.trip[params.index].record.splice(params.record_index, 1)
                state.trip[params.index].status = "待记录"
            }
        }
    }
})

export default store
