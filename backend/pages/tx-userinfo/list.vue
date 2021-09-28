<template>
    <view>
        <view class="uni-header">
            <view class="uni-group">
                <view class="uni-title">用户资料</view>
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
                  label="数据类型">
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
            <!-- <unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" collection="tx-userinfo"
                field="sex,age,education,occupation,income_min,income_max,private_car,construction_area,bicycle,housing_nature,total_people">
                <view v-if="error">{{error.message}}</view>
                <view v-else-if="data">
                    <el-table :data="data" border style="width: 100%">
                        <el-table-column prop="sex" label="性别" width="50">
                        </el-table-column>
                        <el-table-column prop="age" label="年龄" width="80">
                        </el-table-column>
                        <el-table-column prop="education" label="文化程度">
                        </el-table-column>
                        <el-table-column prop="occupation" label="职业">
                        </el-table-column>
                        <el-table-column prop="income_min" label="收入范围（最低）" width="80">
                        </el-table-column>
                        <el-table-column prop="income_max" label="收入范围（最高）" width="80">
                        </el-table-column>
                        <el-table-column prop="private_car" label="私人小汽车" width="65">
                        </el-table-column>
                        <el-table-column prop="bicycle" label="自行车" width="70">
                        </el-table-column>
                        <el-table-column prop="construction_area" label="建筑面积" width="80">
                        </el-table-column>
                        <el-table-column prop="housing_nature" label="住房性质" width="180">
                        </el-table-column>
                        <el-table-column prop="total_people" label="总人数" width="180">
                        </el-table-column>
                    </el-table>
                </view>
                <uni-load-more v-if="loading" :contentText="loadMore" status="loading"></uni-load-more>
            </unicloud-db> -->
            <!-- 新增按钮 -->
            <!-- <uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" /> -->
        </view>
        <!-- #ifndef H5 -->
        <fix-window />
        <!-- #endif -->
    </view>
</template>

<script>
    import mixins from "../../mixins.js"
    export default {
        data() {
            return {
                // loadMore: {
                //     contentdown: '',
                //     contentrefresh: '',
                //     contentnomore: '',
                // },
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
                            name: "sex",
                            label: "性别",
                            type: "string",
                            remark: ""
                        },
                        {
                            name: "age",
                            label: "年龄",
                            type: "string",
                            remark: ""
                        },
                        {
                            name: "education",
                            label: "文化程度",
                            type: "string",
                            remark: ""
                        },
                        {
                            name: "occupation",
                            label: "职业",
                            type: "string",
                            remark: "已提交"
                        },
                        {
                            name: "income_min",
                            label: "收入范围（最低）",
                            type: "int",
                            remark: ""
                        },
                        {
                            name: "income_max",
                            label: "收入范围（最高）",
                            type: "int",
                            remark: ""
                        },
                        {
                            name: "private_car",
                            label: "私人小汽车",
                            type: "string",
                            remark: ""
                        },
                        {
                            name: "construction_area",
                            label: "建筑面积",
                            type: "string",
                            remark: ""
                        },
                        {
                            name: "bicycle",
                            label: "是否拥有自行车",
                            type: "string",
                            remark: ""
                        },
                        {
                            name: "housing_nature",
                            label: "住房性质",
                            type: "string",
                            remark: ""
                        },
                        {
                            name: "total_people",
                            label: "总人数",
                            type: "string",
                            remark: ""
                        }
                    ]
            }
        },
        mixins: [mixins],
        // onPullDownRefresh() {
        //     this.$refs.udb.loadData({
        //         clear: true
        //     }, () => {
        //         uni.stopPullDownRefresh()
        //     })
        // },
        // onReachBottom() {
        //     this.$refs.udb.loadMore()
        // },
        methods: {
            async exportJson() {
                this.exportLoading = true
                try{
                    const resp = await uniCloud.database().collection("tx-userinfo").get();
                    console.log("获取数据成功：", resp.result.data)
                    this.saveFile(resp.result.data, "用户资料.json")
                }catch(e){
                    //TODO handle the exception
                    console.log("获取数据失败：", e)
                }finally{
                    this.exportLoading = false
                }
            },
            // handleItemClick(id) {
            //     uni.navigateTo({
            //         url: '/pages/tx-userinfo/detail?id=' + id
            //     })
            // },
            // fabClick() {
            //     // 打开新增页面
            //     uni.navigateTo({
            //         url: '/pages/tx-userinfo/add',
            //         events: {
            //             // 监听新增数据成功后, 刷新当前页面数据
            //             refreshData: () => {
            //                 this.$refs.udb.loadData({
            //                     clear: true
            //                 })
            //             }
            //         }
            //     })
            // }
        }
    }
</script>

<style scoped lang="scss">
	/* #ifndef H5 */
	page {
		padding-top: 85px;
	}
	/* #endif */
</style>