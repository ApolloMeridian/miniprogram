<template>
    <view>
        <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="tx-sysmsg" :where="jql" :getone="true"
            manual>
            <view v-if="loading" class="loading u-flex u-col-center u-p-t-40 u-p-b-40">
                <view>加载中</view>
                <u-loading mode="circle"></u-loading>
            </view>
            <view v-if="error">{{error.message}}</view>
            <view v-if="data._id" class="article u-p-20">
                <view class="u-font-xl">
                    {{data.title}}
                </view>
                <uni-dateformat :date="data.create_time" format="yyyy年MM月dd日 hh:mm:ss" class="u-font-sm" />
                <u-line class="u-m-t-20 u-m-b-20" />
                <view class="">
                    {{data.content}}
                </view>
            </view>
        </unicloud-db>
    </view>
</template>

<script>
    import {
    	mapState
    } from 'vuex'
    export default {
        data() {
            return {
                jql: "",
                docId: null
            }
        },
        computed: {
            ...mapState(['msgread_id', 'read_list']),
        },
        onLoad(options) {
            this.jql = "_id == '" + options._id + "'";
            this.docId = options._id
        },
        async onReady() {
            if (this.jql) {
                this.$refs.udb.loadData()
            }
            if(this.read_list.indexOf(this.docId) == -1){
                const read_list = this.$u.deepClone(this.read_list)
                read_list.push(this.docId)
                try{
                    const resp = await this.$db.collection("tx-msgread").doc(this.msgread_id).update({
                        read_list,
                    })
                    console.log("更新阅读状态成功：", {resp})
                    this.$store.commit("updateReadList", this.docId)
                }catch(e){
                    console.log("更新阅读状态失败：", {resp})
                }
            } else {
                console.log("当前消息已读")
            }
        }
    }
</script>

<style scoped lang="scss">
    .loading {
        flex-direction: column;
    }

    .article {
        display: flex;
        flex-direction: column;
        line-height: 1.5em;
    }
</style>
