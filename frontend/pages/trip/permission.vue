<template>
    <view class="page">
        <view class="u-m-b-40">
            为了保证小程序能够在后台持续记录您的出行轨迹，需要授予小程序后台定位权限
        </view>
        <u-button type="primary" open-type="openSetting">打开设置</u-button>
        <view class="u-item-title u-m-t-40">如何操作？</view>
        <view class="u-m-t-20">
            1. 点击上方<text class="high-light">打开设置</text>，选择<text class="high-light">位置信息</text>
        </view>
        <image class="img u-m-t-10" src="/static/img/permission/step1.jpg" mode="widthFix"></image>
        <view class="u-m-t-20">
            2. 勾选<text class="high-light">使用小程序期间和离开小程序后</text>
        </view>
        <image class="img u-m-t-10" src="/static/img/permission/step2.jpg" mode="widthFix"></image>
    </view>
</template>

<script>
    export default {
        async onShow() {
            let [err, res] = await uni.getSetting();
            if (!err) {
                const authSetting = res.authSetting;
                console.log({authSetting})
                if (authSetting["scope.userLocationBackground"]) {
                    uni.switchTab({
                        url: "/pages/trip/trip",
                        fail(e) {
                            console.log("跳转失败：", e)
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .page {
        width: 100vw;
        box-sizing: border-box;
        padding: 40rpx;
        .high-light {
            color: $u-type-primary;
        }
        .img {
            width: 100%;
            border-radius: 8rpx;
        }
    }
</style>
