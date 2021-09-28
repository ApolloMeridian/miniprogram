<template>
    <view>
        <view v-if="loading" class="loading u-flex u-col-center u-p-t-40 u-p-b-40">
            <view>加载中</view>
            <u-loading mode="circle"></u-loading>
        </view>
        <u-cell-group class="list">
            
            <u-cell-item v-for="(item, index) in data" :key="index" class="list-item" @click="listItemClick" :arrow="true" :index="item._id">
                    <view slot="title">
                        <u-badge v-if="showUnread(item._id)" class="u-m-r-10" :absolute="false" :is-dot="true" type="error"></u-badge>
                        <text class="u-main-color">{{item.title}}</text>
                    </view>
                <uni-dateformat :date="item.create_time" format="yyyy年MM月dd日 hh:mm:ss" slot="label" />
            </u-cell-item>
        </u-cell-group>
    </view>
</template>

<script>
    import {
    	mapState
    } from 'vuex'
    export default {
        data() {
            return {
                loading: false,
                data: []
            };
        },
        computed: {
            ...mapState(['msgread_id', 'read_list']),
            msgList(){
                return this.data.map(item => item._id)
            }
        },
        async onReady() {
            await this.getData()
            this.setBadge()
        },
        onShow(){
            this.setBadge()
        },
        async onPullDownRefresh() {
            await this.getData()
            this.setBadge()
            uni.stopPullDownRefresh()
        },
        methods: {
            setBadge(){
                let result = 0
                this.msgList.map(item => {
                    if(this.read_list.indexOf(item) == -1){
                        result++
                    }
                })
                if (result == 0) {
                    uni.removeTabBarBadge({
                        index: 2
                    })
                } else {
                    uni.setTabBarBadge({
                        index: 2,
                        text:　`${result}`
                    })
                }
            },
            async getData(){
                this.loading = true
                try{
                    const resp = await this.$db.collection("tx-sysmsg").field("_id,title,create_time").orderBy('create_time desc').get()
                    console.log("获取消息列表成功：", {resp})
                    this.data = resp.result.data
                }catch(e){
                    console.log("获取消息列表失败：", e)
                }finally{
                    this.loading = false
                }
            },
            showUnread(_id){
                return this.read_list.indexOf(_id) == -1
            },
            listItemClick(_id) {
                console.log({
                    _id
                })
                uni.requestSubscribeMessage({
                  tmplIds: ['ESv0jHRX1lySdRR2RK5UOtxs2rx1lvWR2spvJh2k488'],
                  success (res) {
                      console.log("订阅消息成功：", {res})
                      uni.navigateTo({
                          url: "./detail?_id=" + _id
                      })
                  },
                  fail(err){
                      console.log("订阅消息失败：", err)
                  }
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    .loading {
        flex-direction: column;
    }
</style>
