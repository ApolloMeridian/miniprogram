<template>
    <view class="wrap">
        <u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
            <view class="u-m-b-60" v-for="(part, part_idx) in schema" :key="part_idx">
                <view class="u-item-title">{{part.title}}</view>
                <u-form-item v-for="(item, item_idx) in schema[part_idx].props" :key="item_idx" label-position="left"
                    :label="item.label" label-width="150" required :prop="item_idx">
                    <u-input class="u-input" v-if="item_idx != 'income'" :border="false" type="select" :select-open="selectShow && currentSelect == item_idx"
                        v-model="model[item_idx]" :placeholder="`请选择${item.label}`" @click="selectShow = true; currentSelect = item_idx; currentPart = part_idx;"></u-input>
                    <view class="income" v-if="item_idx == 'income'">
                        <u-input :border="false" type="number" v-model="model.income_min" placeholder="最低收入" :clearable="false"></u-input>
                        -
                        <u-input :border="false" type="number" v-model="model.income_max" placeholder="最高收入" :clearable="false"></u-input>
                    </view>
                </u-form-item>
            </view>
        </u-form>
        <u-button @click="submit" type="primary">保存</u-button>
        <u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
    </view>
</template>

<script>
    export default {
        data() {
            let that = this;
            return {
                _id: "",
                model: {
                    sex: "",
                    age: "",
                    education: "",
                    occupation: "",
                    income_min: "",
                    income_max: "",
                    private_car: "",
                    construction_area: "",
                    bicycle: "",
                    housing_nature: "",
                    total_people: "",

                },
                schema: {
                    basic: {
                        title: "基本信息",
                        props: {
                            sex: {
                                enum: ["男", "女"],
                                label: "性别"
                            },
                            age: {
                                enum: ["0-12", "12-18", "18-25", "25-35", "35-45", "45-55", "55-65", ">65"],
                                label: "年龄",
                            },
                            education: {
                                enum: [
                                    "本科",
                                    "初中",
                                    "大专",
                                    "高中或中专",
                                    "小学及以下",
                                    "研究生及以上"
                                ],
                                label: "文化程度",
                            },
                            occupation: {
                                enum: [
                                    "办事人员和有关人员",
                                    "专业技术人员",
                                    "中小学生",
                                    "生产、运输设备操作人员及有关人员",
                                    "商业、服务业人员",
                                    "其他",
                                    "农、林、牧、渔、水利业生产人员",
                                    "离退休人员",
                                    "军人",
                                    "单位负责人",
                                    "大专院校学生"
                                ],
                                label: "职业",
                            },
                            income: {
                                label: "收入范围"
                            },
                            private_car: {
                                enum: ["0", "1", "2"],
                                label: "私人小汽车",
                            }
                        }
                    },
                    family: {
                        title: "家庭信息",
                        props: {
                            construction_area: {
                                enum: [
                                    "0-60",
                                    "60-130",
                                    ">130"
                                ],
                                label: "建筑面积"
                            },
                            bicycle: {
                                enum: [
                                    "是",
                                    "否"
                                ],
                                label: "自行车"
                            },
                            housing_nature: {
                                enum: [
                                    "自有住宅",
                                    "雇主提供",
                                    "租（借）房屋",
                                    "其他"
                                ],
                                label: "住房性质"
                            },
                            total_people: {
                                enum: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
                                label: "总人数"
                            }
                        }
                    }
                },
                selectList: [],
                currentPart: "",
                currentSelect: "",
                selectShow: false,
                errorType: ['message'],
            };
        },
        computed: {
            rules() {
                let result = {
                    income_min: [{
                        required: true,
                        message: "请输入最低收入",
                        trigger: 'change',
                        type: "number",
                    }],
                    income_max: [{
                        required: true,
                        message: "请输入最高收入",
                        trigger: 'change',
                        type: "number",
                    }]
                }
                for (let part in this.schema) {
                    for (let item in this.schema[part].props) {
                        if (item != "income") {
                            result[item] = [{
                                required: true,
                                message: `请选择${this.schema[part].props[item].label}`,
                                trigger: 'change',
                                type: "enum",
                                enum: this.schema[part].props[item].enum
                            }]
                        }
                    }
                }
                return result;
            }
        },
        onReady() {
            this.$refs.uForm.setRules(this.rules);
        },
        async mounted() {
            console.log("正在获取数据")
            uni.showLoading({
                title: "正在加载",
                mask: true
            })
            const userinfo = await this.$db.collection("tx-userinfo").where('uid == $env.uid').get({
                getOne: true
            });
            console.log("userinfo: ", userinfo)
            if (userinfo.result.affectedDocs != 0) {
                this._id = userinfo.result.data._id;
                delete userinfo.result.data._id;
                delete userinfo.result.data.uid;
                this.model = userinfo.result.data;
            }
            uni.hideLoading()
        },
        watch: {
            currentSelect() {
                const list = this.schema[this.currentPart].props[this.currentSelect].enum;
                const selectList = list.map(item => {
                    return {
                        value: item,
                        label: item
                    }
                });
                this.selectList = selectList;
            }
        },
        methods: {
            async submit() {
                const that = this;
                this.$refs.uForm.validate(async (valid) => {
                    if (valid) {
                        console.log('验证通过');
                        let model = that.model;
                        uni.showLoading({
                            title: "正在保存",
                            mask: true
                        })
                        console.log(JSON.stringify(model, null, 2))
                        if (that._id) {
                            try {
                                const jql = `_id == '${that._id}' && uid == $env.uid`;
                                const resp = await that.$db.collection("tx-userinfo").where(jql).update(model);
                                console.log("更新个人资料成功：", resp)
                                uni.hideLoading()
                                that.$u.toast("保存成功");
                                uni.switchTab({
                                    url: "../trip/trip"
                                })
                            } catch(e){
                                uni.hideLoading()
                                that.$u.toast("保存失败，请重试");
                                console.error("更新个人资料失败: ", e)
                            }
                        } else {
                            try{
                                const resp = await that.$db.collection("tx-userinfo").add(model)
                                console.log("创建个人资料成功：", resp)
                                uni.hideLoading()
                                that.$u.toast("保存成功");
                                uni.switchTab({
                                    url: "../trip/trip"
                                })
                            }catch(e){
                                uni.hideLoading()
                                that.$u.toast("保存失败，请重试");
                                console.error("创建个人资料失败: ", e)
                            }
                            
                        }
                    } else {
                        console.log('验证失败');
                        uni.hideLoading()
                        return that.$u.toast("请检查输入数据");
                    }
                });
                
            },
            // 选择回调
            selectConfirm(e) {
                this.model[this.currentSelect] = '';
                e.map((val, index) => {
                    this.model[this.currentSelect] += this.model[this.currentSelect] == '' ? val.label : '-' +
                        val.label;
                })
            }
        }
    };
</script>

<style scoped lang="scss">
    .wrap {
        padding: 30rpx;

        & .income {
            display: flex;

            & .u-input {
                width: 20vw;
            }

            & /deep/ input {
                text-align: center;
            }
        }
    }
</style>
