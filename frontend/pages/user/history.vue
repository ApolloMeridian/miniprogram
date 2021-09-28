<template>
    <view class="page cus-full-vw u-p-20">
        <!-- 本地记录 -->
        <view class="u-item-title">本地记录</view>
        <view class="u-m-b-80 u-m-t-80" v-if="trip.length == 0">
            <u-empty text="本地记录为空" mode="history"></u-empty>
        </view>
        <view v-if="trip.length != 0" class="local u-flex flex-col cus-full-pw u-m-b-40">
            <view class="local-item u-flex cus-full-pw u-p-20 u-row-between u-border-bottom" v-for="(item, index) in trip"
                :key="index">
                <view class="local-item__info u-flex flex-col u-col-top">
                    <view class="local-item__info__title u-font-xl u-main-color u-flex">
                        <view>
                            <u-tag :text="item.status" mode="light" :type="tagType[item.status]"></u-tag>
                        </view>
                        <view class="u-m-l-20">{{$u.date(item.start_time, "hh:MM:ss")}} - {{$u.date(item.end_time, "hh:MM:ss")}}</view>
                    </view>
                    <view class="local-item__info__tips u-font-sm u-tips-color u-m-t-20">
                        <text>{{$u.date(item.start_time, "yyyy年mm月dd日")}}</text>
                        <text class="u-m-l-20">{{item.raw.length}}个路径点</text>
                        <text class="u-m-l-20">{{item.record.length}}条记录</text>
                    </view>
                </view>
                <view v-if="item.status != '已提交'" class="local-item__action u-flex u-col-center">
                    <!-- 编辑 -->
                    <view class="icon-circle bg-primary u-flex u-row-around u-col-center" @click="editTrip(index)">
                        <u-icon name="edit-pen"></u-icon>
                    </view>
                    <!-- 删除 -->
                    <view class="icon-circle bg-error u-flex u-row-around u-col-center u-m-l-20" @click="removeTrip(index)">
                        <u-icon name="trash"></u-icon>
                    </view>
                </view>
            </view>
        </view>
        <!-- 云端记录 -->
        <view class="u-item-title u-m-b-40">云端记录</view>
        <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="tx-trip" field="start_time,end_time,create_time" where="uid == $env.uid" manual>
            <view v-if="loading" class="loading u-flex u-row-center u-p-t-40 u-p-b-40">
                <view>加载中</view>
                <u-loading mode="circle"></u-loading>
            </view>
            <view v-if="error">{{error.message}}</view>
            <view v-if="data.length == 0" class="u-m-b-80 u-m-t-40">
                <u-empty text="云端记录为空" mode="history"></u-empty>
            </view>
            <u-cell-group v-else class="list">
                <u-cell-item
                    class="list-item"
                    v-for="(item, index) in data"
                    :key="index"
                    @click="listItemClick"
                    :arrow="true"
                    :index="item._id"
                >
                    <view slot="title">
                        <uni-dateformat :date="item.start_time" format="yyyy年MM月dd日 hh:MM:ss" slot="label" />
                        -
                        <uni-dateformat :date="item.end_time" format="hh:MM:ss" slot="label" />
                    </view>
                    <view slot="label">
                        上传时间：
                        <uni-dateformat :date="item.create_time" format="yyyy年MM月dd日 hh:MM:ss" slot="label" />
                    </view>
                    <u-icon slot="right-icon" name="eye"></u-icon>
                </u-cell-item>
            </u-cell-group>
        </unicloud-db>
        <!-- 一键上传 -->
        <view class="page-action cus-full-vw u-p-20">
            <u-button type="primary" :disabled="!canUpload" @click="upload">
                一键上传
            </u-button>
        </view>
    </view>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                tagType: {
                    "待记录": "warning",
                    "待提交": "primary",
                    "已提交": "success"
                }
            };
        },
        computed: {
            ...mapState(['trip']),
            canUpload() {
                return this.trip.some(item => item.status == "待提交")
            }
        },
        onShow(){
            this.setBadge()
        },
        onReady() {
            this.$refs.udb.loadData();
            this.setBadge()
        },
        onPullDownRefresh() {
            this.$refs.udb.loadData({
                clear: true
            }, () => {
                uni.stopPullDownRefresh()
            });
        },
        methods: {
            setBadge(){
                if(this.trip.some(item => item.status == "待记录" || item.status == "待提交")) {
                    uni.showTabBarRedDot({
                        index: 1
                    })
                } else {
                    uni.hideTabBarRedDot({
                        index: 1
                    })
                }
            },
            editTrip(index) {
                this.$u.route("/pages/trip/edit", {
                    index,
                })
            },
            removeTrip(index) {
                const that = this;
                uni.showModal({
                    title: "确定删除本条记录？",
                    confirmColor: "#FA3534",
                    success(res) {
                        if (res.confirm) {
                            console.log("remove trip index: ", index)
                            that.$store.commit("removeTrip", index)
                            that.$u.toast("删除成功")
                        }
                    }
                })
                this.setBadge()
            },
            listItemClick(_id){
                console.log("cloud record click: ", _id)
                this.$u.toast("云端记录查看功能暂未开放")
            },
            async upload() {
                uni.showLoading({
                    title: "正在上传"
                })
                let result = [];
                this.trip.forEach(trip => {
                    if (trip.status == "待提交") {
                        result.push(trip)
                    }
                })
                try {
                    const uploadRes = await this.$db.collection("tx-trip").add(result)
                    uni.hideLoading()
                    this.$u.toast(`成功上传${uploadRes.result.inserted}条数据`)
                    result.forEach(item => item.status = "已提交")
                    let newTrip = [];
                    this.trip.forEach(trip => {
                        if (trip.status != "已提交") {
                            newTrip.push(trip)
                        }
                    })
                    this.$store.commit("resetTrip", newTrip)
                    this.$refs.udb.loadData({
                        clear: true
                    })
                    this.setBadge()
                } catch (err) {
                    uni.hideLoading()
                    uni.showModal({
                        title: "上传数据失败",
                        content: JSON.stringify(err, null, 2),
                        showCancel: false,
                        confirmText: "复制报错信息",
                        success() {
                            uni.setClipboardData({
                                data: JSON.stringify(err, null, 2)
                            })
                        }
                    })
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .page {
        margin-bottom: 140rpx;
        &-action {
            position: fixed;
            bottom: 0;
            left: 0;
            height: 120rpx;
            background-color: #FFFFFF;
            z-index: 999;
        }
    }
</style>
