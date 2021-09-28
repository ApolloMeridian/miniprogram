<template>
    <view>
        <view class="userinfo u-flex u-p-40">
            <view class="avatar-wrapper">
                <open-data class="avatar" type="userAvatarUrl"></open-data>
            </view>
            <view class="text  u-m-l-30">
                <open-data class="u-font-40" type="userNickName"></open-data>
                <view class="u-font-26" @click="copyOpenid">
                    <text>UID: {{uid}}</text>
                    <u-icon name="file-text-fill" class="u-m-l-14"></u-icon>
                </view>
            </view>
        </view>
        <u-cell-group>
            <u-cell-item @click="openMenuPage('./history')" icon="clock-fill" title="历史轨迹" :arrow="true">
                <view slot="right-icon">
                    <u-tag v-if="showUnCommit" text="待提交" type="primary"></u-tag>
                    <u-tag v-if="showUnRecord" text="待记录" type="warning" class="u-m-l-20"></u-tag>
                </view>
            </u-cell-item>
            <u-cell-item v-if="item.dev && development && !item.virtual || !item.dev || item.dev && item.virtual && development && virtualData" @click="openMenuPage" v-for="item in menu" :key="item.title" :icon="`${item.icon}-fill`" :title="item.title" :index="item.path" :arrow="true"></u-cell-item>
            <button open-type="feedback" class="u-reset-button">
                <u-cell-item icon="file-text" title="意见反馈" :arrow="true"></u-cell-item>
            </button>
            <u-cell-item @click="reLogin" icon="reload" title="重新登录" :arrow="true"></u-cell-item>
            <u-cell-item v-if="canSetting" @click="openMenuPage('./setting')" icon="setting-fill" title="系统设置" :arrow="true"></u-cell-item>
            <u-cell-item v-if="development" @click="clearMaker" icon="trash-fill" title="清理Maker缓存" :arrow="true"></u-cell-item>
            <u-cell-item v-if="development" @click="clearTrip" icon="trash-fill" title="清理Trip缓存" :arrow="true"></u-cell-item>
        </u-cell-group>
    </view>
</template>

<script>
    import {
    	mapState
    } from 'vuex'
    import {loginByWeixin} from '../../common/utils.js'
    export default {
        data() {
            return {
                menu: [
                    {
                        "title": "个人资料",
                        "icon": "account",
                        "path": "./profile"
                    },
                    {
                        "title": "使用帮助",
                        "icon": "question-circle",
                        "path": "../guide/guide"
                    },
                    {
                        "title": "关于我们",
                        "icon": "heart",
                        "path": "./about"
                    },
                    {
                        "title": "查看数据",
                        "icon": "eye",
                        "path": "./data",
                        "dev": true
                    },
                    {
                        "title": "模拟数据",
                        "icon": "edit-pen",
                        "path": "./virtual",
                        "dev": true,
                        "virtual": true
                    },
                ]
            };
        },
        computed: {
            ...mapState(['uid', 'development', 'trip', 'virtualData', 'role']),
            showUnCommit() {
                return this.trip.some(item => item.status == "待提交")
            },
            showUnRecord() {
                return this.trip.some(item => item.status == "待记录")
            },
            canSetting(){
                return this.role.indexOf("superuser") != -1
            }
        },
        methods: {
            copyOpenid() {
                uni.setClipboardData({
                    data: this.uid,
                    success: () => {
                        uni.showToast({
                            icon: "success",
                            title: "UID已复制"
                        })
                    }
                })
            },
            openMenuPage(path) {
                if(path == "./history") {
                    uni.switchTab({
                        url: path
                    })
                } else {
                    uni.navigateTo({
                        url: path
                    })
                }
            },
            clearMaker(){
                this.$store.commit('clearMaker')
                this.$u.toast("缓存已清空")
            },
            clearTrip(){
                this.$store.commit('clearTrip')
                this.$u.toast("缓存已清空")
            },
            async reLogin(){
                this.$store.commit("logout")
                uni.showLoading({
                    title: "正在登录",
                    mask: true
                })
                await loginByWeixin()
                uni.hideLoading()
            }
        },
    }
</script>

<style lang="scss">
    .userinfo {
        background-color: $u-type-primary;
        color: #FFFFFF;
        width: 100vw;
        box-sizing: border-box;

        & .avatar-wrapper {
            border-radius: 8rpx;
            overflow: hidden;
            width: 120upx;
            height: 120upx;

            & .avatar {
                width: 120upx;
                height: 120upx;
            }
        }

        & .text {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 120upx;
        }
    }
</style>
