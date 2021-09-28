<template>
	<view class="page u-p-20">
		<u-input class="input" type="textarea" v-model="value" :border="true" height="500" :auto-height="true" maxlength="10000" style="z-index: 0;"></u-input>
        <!-- 保存数据 -->
        <view class="page-action cus-full-vw u-p-20">
            <u-button type="primary" :loading="loading" :disabled="!value" @click="saveData">
                保存数据
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
				value: '',
                loading: false
			};
		},
        computed: mapState(['trip']),
        mounted() {
            this.value = JSON.stringify(this.trip, null, 2)
        },
        methods: {
            saveData() {
                this.loading = true
                try{
                    const newTrip = JSON.parse(this.value);
                    this.$store.commit("resetTrip", newTrip)
                    this.$u.toast("保存成功")
                }catch(e){
                    console.log("请检查数据格式：", e)
                    uni.showModal({
                        showCancel: false,
                        title: "请检查数据格式",
                        content: e.toString()
                    })
                } finally {
                    this.loading = false
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
