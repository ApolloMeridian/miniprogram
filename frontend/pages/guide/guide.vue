<template>
	<view>
		<image :src="swiperItems[current]" mode="scaleToFill"></image>
        <view class="swipe" @click="swipe">{{current != 2 ? '下一步' : '我知道了'}}</view>
	</view>
</template>

<script>
    const folder = "../../static/img/guide"
	export default {
		data() {
			return {
				current: 0,
                swiperItems: [`${folder}/start.png`, `${folder}/stop.png`, `${folder}/edit.png`]
			};
		},
        methods: {
            swipe() {
                if(this.current != 2) {
                    this.current++
                } else {
                    this.$store.commit("closeLaunchGuide")
                    uni.switchTab({
                        url: "../trip/trip"
                    })
                }
            }
        },
	}
</script>

<style scoped lang="scss">
image {
    width: 100vw;
    height: 100vh;
}
.swipe {
    position: fixed;
    bottom: 20rpx;
    right: 20rpx;
    heigh: 110rpx;
    padding: 20rpx 40rpx;
    border-radius: 55rpx;
    background-color: #FFFFFF;
    color: $u-type-primary;
    z-index: 999;
}
</style>
