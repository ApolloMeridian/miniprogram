<template>
    <view>
        <view class="uni-header">
            <view class="uni-group">
                <view class="uni-title">消息列表</view>
            </view>
            <view class="uni-group">
                <el-button type="primary" size="mini" @click="dialogFormVisible = true;form.title='';form.content=''">发布新消息</el-button>
            </view>
        </view>
        <view class="uni-container">
            <el-table v-loading="loading.table" :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题">
                </el-table-column>
                <el-table-column prop="content" label="内容">
                </el-table-column>
                <el-table-column prop="create_time" label="发布时间">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">
                            <uni-dateformat :date="scope.row.create_time" format="yyyy年MM月dd日 hh:mm:ss"></uni-dateformat>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-popconfirm title="确定删除吗？" style="margin-left: 10px" @confirm="handleDelete(scope.$index, scope.row)">
                            <el-button size="mini" type="danger" slot="reference" :loading="loading.delete && operateId == scope.row._id">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </view>
        <el-dialog title="系统消息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="标题" label-width="80px">
                    <el-input v-model="form.title" placeholder="请输入标题" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" label-width="80px">
                    <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="form.content">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false; operateId = null; loading.submit = false">取 消</el-button>
                <el-button type="primary" @click="submit" :loading="loading.submit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- #ifndef H5 -->
        <fix-window />
        <!-- #endif -->
    </view>
</template>

<script>
    const collection = uniCloud.database().collection("tx-sysmsg")
    export default {
        data() {
            return {
                loading: {
                    table: false,
                    delete: false,
                    submit: false
                },
                tableData: [],
                operateId: null,
                dialogFormVisible: false,
                form: {
                    title: "",
                    content: ""
                }
            };
        },
        async onLoad() {
            await this.getData()
        },
        methods: {
            async getData() {
                try {
                    this.loading.table = true
                    const resp = await collection.get()
                    console.log("获取数据成功：", {
                        resp
                    })
                    this.tableData = resp.result.data
                    this.loading.table = false
                } catch (e) {
                    console.log("获取数据失败：", {
                        resp
                    })
                }
            },
            async handleEdit(index, row) {
                console.log(index, row);
                this.operateId = row._id
                this.form.title = row.title,
                    this.form.content = row.content
                this.dialogFormVisible = true
            },
            async sendMsg(docId, title) {
                const time = this.$moment().format("YYYY年MM月DD日 hh:mm")
                try {
                    const {
                        result
                    } = await uniCloud.database().collection("uni-id-users").where({
                        wx_openid: {
                            $exists: true
                        }
                    }).field("wx_openid").get()
                    console.log("获取用户列表成功：", {
                        result
                    })
                    console.log({docId, title})
                    const userList = result.data.map(item => item.wx_openid['mp-weixin'])
                    await this.sendToAllUser(userList, docId, title, time)
                } catch (e) {
                    console.log("获取用户列表失败：", e)
                }
            },
            async sendToAllUser(userList, docId, title, time){
                const userCount = userList.length
                let loading = null
                userList.forEach(async (openid, index) => {
                    console.log({openid, index})
                    loading = this.$loading({
                      lock: true,
                      text: `正在发送用户通知 ${index+1} / ${userCount}`,
                      spinner: 'el-icon-loading',
                      background: 'rgba(0, 0, 0, 0.7)'
                    });
                    try{
                        const resp = await uniCloud.callFunction({
                            name: "sendSysMsg",
                            data: {
                                openid,
                                docId,
                                title,
                                time
                            }
                        })
                    }catch(e){
                        console.log("发送失败：", {openid}, e)
                    }
                })
                loading.close()
            },
            async submit() {
                this.loading.submit = true
                console.log(this.form)
                if (this.operateId != null) {
                    try {
                        const resp = await collection.doc(this.operateId).update(this.form);
                        console.log("更新成功：", {
                            resp
                        })
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        });
                        this.dialogFormVisible = false
                        this.operateId = null
                        await this.getData()
                    } catch (e) {
                        console.log("更新失败：", e)
                        this.$message.error('更新失败，请重新提交');
                    }
                } else {
                    try {
                        const resp = await collection.add(this.form);
                        console.log("发布成功：", {
                            resp
                        })
                        this.$message({
                            message: '发布成功',
                            type: 'success'
                        });
                        this.dialogFormVisible = false
                        this.operateId = null
                        await this.getData()
                        await this.sendMsg(resp.result.id, this.form.title)
                    } catch (e) {
                        console.log("发布失败：", e)
                        this.$message.error('发布失败，请重新提交');
                    }
                }
                this.loading.submit = false;
            },
            async handleDelete(index, row) {
                console.log(index, row);
                this.loading.delete = true
                this.operateId = row._id
                try {
                    const resp = await collection.doc(row._id).remove()
                    console.log("删除成功：", {
                        resp
                    })
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    await this.getData()
                } catch (e) {
                    console.log("删除失败：", e)
                    this.$message.error('删除失败');
                } finally {
                    this.loading.delete = false
                    this.operateId = null
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
</style>
