<template>
    <view>
        <map style="width: 100vw; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="covers"
            :show-location="true"></map>
        <cover-view class="btn-wrapper u-flex u-row-around" :class="isStart ? 'btn-red' : 'btn-blue'" @click="switchBtn">
            <cover-view class="btn"></cover-view>
        </cover-view>
    </view>
</template>

<script>
    import checkPerm from "../../mixin.js";
    import {
        mapState
    } from 'vuex';
    export default {
        data() {
            return {
                isStart: false,
                latitude: "", // 地图中心点纬度
                longitude: "", // 地图中心点经度
            }
        },
        computed: mapState(['covers', 'config', 'development', 'virtualData', 'firstLaunch']),
        onShareAppMessage() {
            return {
                title: "TransportX",
                path: "pages/trip/trip"
            }
        },
        async onShow() {
            await this.checkLocationPermission()
        },
        async onReady() {
            const that = this
            await this.setCurrentLocation()
            wx.startLocationUpdateBackground({
                success(res){
                    console.log("打开位置后台更新成功：", res)
                },
                fail(err){
                    console.log("打开位置后台更新失败：", err)
                }
            })
            if (this.covers.length != 0){
                uni.showModal({
                    title: "小程序未正常停止，是否继续记录？",
                    cancelColor: "#FA3534",
                    success(res) {
                        if (res.confirm) {
                            console.log("异常恢复")
                            that.switchBtn()
                        } else {
                            console.log("重新开始")
                            that.$store.commit("clearMaker")
                        }
                    }
                })
            }
            if(this.firstLaunch) {
                uni.navigateTo({
                    url: "../guide/guide"
                })
            }
        },
        mixins: [checkPerm],
        methods: {
            /**
             * @description 设置当前位置为地图中心
             */
            async setCurrentLocation() {
                const [err, res] = await uni.getLocation({
                    type: "gcj02"
                });
                if (!err) {
                    console.log("获取当前位置成功：", res)
                    this.latitude = res.latitude
                    this.longitude = res.longitude
                    return {
                        latitude: res.latitude,
                        longitude: res.longitude
                    }
                } else {
                    console.log("获取当前位置失败：", err)
                    return false
                }
            },
            /**
             * @description 监听位置变化
             * */
            onLocationUpdate(){
                const that = this
                wx.onLocationChange(res => {
                    console.log("当前位置已变化：", res)
                    if(that.covers.length == 0 || new Date().getTime() - that.covers[that.covers.length - 1].time >= that.config.location_update_duration * 1000) {
                       if (that.development && that.virtualData){
                           res.latitude = res.latitude + 0.000300 * that.covers.length
                           res.longitude = res.longitude + 0.000300 * that.covers.length
                       }
                       that.$store.commit('addMaker', res)
                    }
                })
            },
            /**
             * @description 主按钮点击事件绑定
             */
            switchBtn() {
                this.isStart = !this.isStart;
                this.startRecord()
            },
            /**
             * @description 开始记录位置变化
             */
            startRecord() {
                if(this.isStart){
                    console.log("开始记录轨迹")
                    this.onLocationUpdate()
                } else {
                    console.log("结束记录轨迹")
                    wx.offLocationChange()
                    if(this.covers.length >= 2) {
                        this.$store.commit("addTrip", this.covers);
                        console.log({currentTripIndex: this.$store.state.currentTripIndex})
                        this.$store.commit("clearMaker")
                        this.$u.route("/pages/trip/edit", {
                            index: this.$store.state.currentTripIndex
                        })
                    } else {
                        console.log("轨迹为空")
                    }
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .btn-wrapper {
        width: 160rpx;
        height: 160rpx;
        position: fixed;
        bottom: 40rpx;
        left: 295rpx;
        border-radius: 80rpx;
        border: none;

        .btn {
            width: 120rpx;
            height: 120rpx;
            border-radius: 60rpx;
            border: none;
        }
    }

    .btn-blue {
        background-color: $u-type-primary-disabled;
        box-shadow: 0 0 10rpx 0 rgba($color: $u-type-primary-dark, $alpha: 0.5);

        .btn {
            background-color: $u-type-primary;
        }
    }

    .btn-red {
        background-color: $u-type-error-disabled;
        box-shadow: 0 0 10rpx 0 rgba($color: $u-type-error-dark, $alpha: 0.5);

        .btn {
            background-color: $u-type-error;
        }
    }
</style>
