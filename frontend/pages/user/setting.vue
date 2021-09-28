<template>
	<view>
		<u-cell-group>
            <u-cell-item title="位置更新间隔" :value="`${config.location_update_duration}S`" :arrow="false" hover-class="none"></u-cell-item>
            <u-cell-item title="开发者模式" :arrow="false" hover-class="none">
                <u-switch slot="right-icon" v-model="devChecked"></u-switch>
            </u-cell-item>
            <u-cell-item title="测试工具(正常情况请勿开启)" :title-style="{color: '#ff9900'}" :arrow="false" hover-class="none">
                <u-switch slot="right-icon" v-model="virtualChecked"></u-switch>
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
				devChecked: false,
				virtualChecked: false
			};
		},
        computed: mapState(['config', 'development', 'virtualData']),
        watch: {
            devChecked(newValue, oldValue) {
                const that = this;
                if(newValue && newValue != this.development) {
                    uni.showModal({
                        title: "提示",
                        content: "请确保您知晓开发者模式用途，否则请勿打开",
                        confirmText: "继续打开",
                        confirmColor: "#fa3534",
                        success(res) {
                            if (res.confirm) {
                                that.$store.commit('switchDev', newValue)
                            } else {
                                that.devChecked = oldValue
                            }
                        }
                    })
                } else {
                    that.$store.commit('switchDev', newValue)
                }
            },
            virtualChecked(newValue, oldValue) {
                const that = this;
                if(newValue && newValue != this.virtualData) {
                    uni.showModal({
                        title: "提示",
                        content: "请确保您知晓测试工具用途，否则请勿打开",
                        confirmColor: "#fa3534",
                        confirmText: "继续打开",
                        success(res) {
                            if (res.confirm) {
                                that.$store.commit('switchVirtualData', newValue)
                            } else {
                                that.virtualChecked = oldValue
                            }
                        }
                    })
                } else {
                    that.$store.commit('switchVirtualData', newValue)
                }
            }
        },
        onReady() {
            this.devChecked = this.development;
            this.virtualChecked = this.virtualData;
        }
	}
</script>

<style lang="scss">

</style>
