<template>
	<view class="data cus-full-vw u-p-20">
		<view class="data-text cus-full-pw u-p-20">
		    {{tripStr}}
		</view>
        <view class="data-action cus-full-vw u-p-20">
            <u-button type="primary" @click="copyData">
                <u-icon name="file-text-fill"></u-icon>
                复制数据
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
				
			};
		},
        computed: {
            ...mapState(['trip']),
            tripStr(){
                return JSON.stringify(this.trip, null, 2)
            }
        },
        
        methods: {
            copyData() {
                uni.setClipboardData({
                    data: this.tripStr
                })
                this.$u.toast("复制成功")
            }
        },
	}
</script>

<style scoped lang="scss">
.data {
    &-text {
        text-align: justify;
        white-space: pre;
        margin-bottom: 140rpx;
        background-color: $u-bg-color;
        color: $u-content-color;
        border-radius: 10rpx;
    }
    &-action {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 120rpx;
        background-color: #FFFFFF;
    }
}
</style>
