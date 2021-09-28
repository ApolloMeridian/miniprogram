<template>
	<view>
        <view class="uni-header">
        	<view class="uni-group">
        		<view class="uni-title">小程序设置</view>
        	</view>
        </view>
        <view class="uni-container">
            位置更新间隔时间/S：
            <el-input
              class="input"
              placeholder="请输入数字(秒)"
              v-model.number="location_update_duration"
              type="number"
              clearable>
            </el-input>
            <el-button type="primary" @click="saveData" :loading="saveLoading">保存</el-button>
        </view>
		<!-- #ifndef H5 -->
		<fix-window />
		<!-- #endif -->
	</view>
</template>

<script>
    const db = uniCloud.database()
	export default {
		data() {
			return {
				docId: null,
                location_update_duration: null,
                saveLoading: false
			};
		},
        async onLoad() {
            uni.showLoading({
                title: "加载中",
                mask: true
            })
            await this.getData()
            uni.hideLoading()
        },
        methods: {
            async getData() {
                try{
                    const resp = await db.collection("tx-config").get({getOne: true})
                    console.log("获取设置数据成功：", {resp})
                    this.docId = resp.result.data._id
                    this.location_update_duration = resp.result.data.location_update_duration
                }catch(e){
                    console.error("获取设置数据失败：", e)
                }
            },
            async saveData(){
                try{
                    this.saveLoading = true
                    const resp = await db.collection("tx-config").where({_id: this.docId}).update({
                        location_update_duration: this.location_update_duration
                    })
                    this.saveLoading = false
                    console.log("更新设置成功：", {resp})
                    uni.showToast({
                        title: "保存成功",
                        icon: "success",
                        mask: true
                    })
                }catch(e){
                    //TODO handle the exception
                }
            }
        },
	}
</script>

<style scoped lang="scss">
	/* #ifndef H5 */
	page {
		padding-top: 85px;
	}
	/* #endif */
    .uni-container {
        .input {
            margin: 20px 0;
        }
    }
</style>
