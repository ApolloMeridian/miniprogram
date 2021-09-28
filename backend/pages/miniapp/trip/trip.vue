<template>
	<view>
        <view class="uni-header">
        	<view class="uni-group">
        		<view class="uni-title">出行记录</view>
                <view class="uni-sub-title">导出数据格式说明</view>
        	</view>
            <view class="uni-group">
                <el-button type="primary" size="mini" :loading="exportLoading" @click="exportJson">导出JSON</el-button>
            </view>
        </view>
        <view class="uni-container">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="数据项">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="数据类型"
                  >
                </el-table-column>
                <el-table-column
                  prop="label"
                  label="说明">
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="备注">
                </el-table-column>
              </el-table>
        </view>
		<!-- #ifndef H5 -->
		<fix-window />
		<!-- #endif -->
	</view>
</template>

<script>
    import mixins from "../../../mixins.js"
	export default {
		data() {
			return {
                exportLoading: false,
                tableData: [
                    {
                        name: "_id",
                        label: "数据ID",
                        type: "string",
                        remark: ""
                    },
                    {
                        name: "uid",
                        label: "用户UID",
                        type: "string",
                        remark: ""
                    },
                    {
                        name: "create_time",
                        label: "数据创建时间",
                        type: "timestamp",
                        remark: ""
                    },
                    {
                        name: "start_time",
                        label: "开始时间",
                        type: "timestamp",
                        remark: ""
                    },
                    {
                        name: "end_time",
                        label: "结束时间",
                        type: "timestamp",
                        remark: ""
                    },
                    {
                        name: "status",
                        label: "数据状态",
                        type: "string",
                        remark: "已提交"
                    },
                    {
                        name: "raw.id",
                        label: "makerId",
                        type: "int",
                        remark: ""
                    },
                    {
                        name: "raw.latitude",
                        label: "纬度",
                        type: "double",
                        remark: ""
                    },
                    {
                        name: "raw.longitude",
                        label: "经度",
                        type: "double",
                        remark: ""
                    },
                    {
                        name: "raw.time",
                        label: "时间戳",
                        type: "timestamp",
                        remark: ""
                    },
                    {
                        name: "record.start_markerId",
                        label: "路径起点markerId",
                        type: "int",
                        remark: "对应raw中的markerId"
                    },
                    {
                        name: "record.end_markerId",
                        label: "路径终点markerId",
                        type: "int",
                        remark: "对应raw中的markerId"
                    },
                    {
                        name: "record.transportation",
                        label: "出行方式",
                        type: "string",
                        remark: ""
                    },
                    {
                        name: "record.purpose",
                        label: "出行目的",
                        type: "string",
                        remark: ""
                    },
                ]
			};
		},
        mixins: [mixins],
        methods: {
            async exportJson() {
                this.exportLoading = true
                try{
                    const resp = await uniCloud.database().collection("tx-trip").get();
                    console.log("获取数据成功：", resp.result.data)
                    this.saveFile(resp.result.data, "出行记录.json")
                }catch(e){
                    //TODO handle the exception
                    console.log("获取数据失败：", e)
                }finally{
                    this.exportLoading = false
                }
            },
        },
	}
</script>

<style scoped lang="scss">
	/* #ifndef H5 */
	page {
		padding-top: 85px;
	}
	/* #endif */
</style>
