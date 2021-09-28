<template>
    <view>
        <map id="map" style="width: 100vw; height: calc(100vh - 580rpx);" :latitude="latitude" :longitude="longitude"
            :markers="markers" :polyline="polyline" :show-location="true" @markertap="markerTap"></map>
            <cover-view class="map-control u-flex flex-col">
                <button @click="clearSearch" class="clear u-reset-button icon-circle u-flex u-col-center u-row-around u-m-b-20">
                    清除搜索结果
                </button>
                <button @click="moveToStart" class="primary u-reset-button icon-circle u-flex u-col-center u-row-around">
                    返回初始位置
                </button>
            </cover-view>
        <scroll-view :hidden="isEdit" scroll-y="true" class="cus-full-vw u-p-20" style="height: 580rpx;">
            <view class="record u-flex flex-col cus-full-pw">
                <view class="record-item u-flex u-row-between cus-full-pw u-p-t-20 u-p-b-20 u-border-bottom" v-for="(item, index) in currentTrip.record" :key="index">
                    <view class="record-item__info u-flex flex-col u-col-top">
                        <view class="u-font-xl" :style="{color: polyline[index+1].color, fontWeight: 'bold'}">
                            第{{index+1}}条
                            <u-tag class="u-m-l-20" :text="item.transportation" type="primary" mode="plain" shape="circle" size="mini"/>
                            <u-tag class="u-m-l-10" :text="item.purpose" type="success" mode="plain" shape="circle" size="mini"/>
                        </view>
                        <view class="u-font-sm u-m-t-30 content-color">
                            {{getTimeFromRecord(item.start_markerId)}}-{{getTimeFromRecord(item.end_markerId)}}
                        </view>
                    </view>
                    <view class="record-item__action u-flex u-col-center">
                        <!-- 编辑 -->
                        <view class="icon-circle bg-primary u-flex u-row-around u-col-center" @click="editRecord(index)"><u-icon name="edit-pen"></u-icon></view>
                        <!-- 删除 -->
                        <view class="icon-circle bg-error u-flex u-row-around u-col-center u-m-l-20" @click="removeRecord(index)"><u-icon name="trash"></u-icon></view>
                    </view>
                </view>
            </view>
            <!-- 新增出行记录 -->
            <u-button type="primary" @click="addRecord">
                <u-icon name="plus"></u-icon>
                新增出行记录
            </u-button>
        </scroll-view>
        <view :hidden="!isEdit" class="edit-area cus-full-vw u-p-20" style="height: 580rpx;">
            <!-- 搜索地点 -->
            <u-search placeholder="输入地点搜索" v-model="keyword" disabled :show-action="false" input-align="center" @click="chooseLocation"></u-search>
            <u-form class="edit-area__form u-flex u-col-center cus-full-pw" ref="uForm" :model="model" :rules="rules"
                :errorType="errorType">
                <view class="form-row u-flex">
                    <!-- 路径起点 -->
                    <u-form-item class="form-row__item" label-position="left" :label="rules.start_markerId.label"
                        label-width="120" required prop="start_markerId">
                        <u-input :class="currentSelect == 'start_markerId' ? 'input-active' : ''" :border="false" type="number" v-model="model.start_markerId" placeholder="选择起点" @click="currentSelect = 'start_markerId';"
                            disabled></u-input>
                    </u-form-item>
                    <!-- 路径终点 -->
                    <u-form-item class="form-row__item" label-position="left" :label="rules.end_markerId.label"
                        label-width="120" required prop="end_markerId">
                        <u-input :class="currentSelect == 'end_markerId' ? 'input-active' : ''" :border="false" type="number" v-model="model.end_markerId" placeholder="选择终点" @click="currentSelect = 'end_markerId';"
                            disabled></u-input>
                    </u-form-item>
                </view>
                <view class="form-row u-flex">
                    <!-- 出行方式 -->
                    <u-form-item class="form-row__item" label-position="left" :label="rules.transportation.label"
                        label-width="120" required prop="transportation">
                        <u-input :class="currentSelect == 'transportation' ? 'input-active' : ''" :border="false" type="select" :select-open="selectShow && currentSelect == 'transportation'"
                            v-model="model.transportation" placeholder="请选择" @click="selectShow = true; currentSelect = 'transportation';"></u-input>
                    </u-form-item>
                    <!-- 出行目的 -->
                    <u-form-item class="form-row__item" label-position="left" :label="rules.purpose.label" label-width="120"
                        required prop="purpose">
                        <u-input  :class="currentSelect == 'purpose' ? 'input-active' : ''" :border="false" type="select" :select-open="selectShow && currentSelect == 'purpose'"
                            v-model="model.purpose" placeholder="请选择" @click="selectShow = true; currentSelect = 'purpose';"></u-input>
                    </u-form-item>
                </view>
            </u-form>
            <!-- 操作按钮 -->
            <view class="edit-area__btn cus-full-pw u-flex u-m-t-20">
                <u-button @click="submit" type="primary" size="medium">保存</u-button>
                <u-button @click="closeForm" size="medium">取消</u-button>
            </view>
        </view>
        <!-- 表单选择器 -->
        <u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
    </view>
</template>

<script>
    let map = null;
    const colorList = ["#3742fa","#ffa502","#ff6348","#2ed573","#2f3542","#993333"]
    import {
        mapState
    } from 'vuex';
    export default {
        data() {
            return {
                currentTrip: {},
                latitude: "",
                longitude: "",
                currentTripIndex: null,
                currentEdit: null,
                isEdit: false,
                keyword: "",
                model: {
                    start_markerId: null,
                    end_markerId: null,
                    transportation: "",
                    purpose: ""
                },
                rules: {
                    start_markerId: {
                        label: "路径起点",
                        required: true,
                        message: "请选择路径起点",
                        trigger: 'change',
                        type: "number",
                    },
                    end_markerId: {
                        label: "路径终点",
                        required: true,
                        message: "请选择路径终点",
                        trigger: 'change',
                        type: "number",
                    },
                    transportation: {
                        label: "出行方式",
                        required: true,
                        message: "请选择出行方式",
                        trigger: 'change',
                        type: "enum",
                        enum: ["公交车", "步行", "自行车", "地铁", "汽车", "公交车", "飞机", "高铁"],
                    },
                    purpose: {
                        label: "出行目的",
                        required: true,
                        message: "请选择出行目的",
                        trigger: 'change',
                        type: "enum",
                        enum: ["公务", "购物餐饮", "看病探病", "陪护", "其他", "上班", "探亲访友", "文体娱乐", "上学"]
                    }
                },
                selectList: [],
                currentSelect: 'purpose',
                selectShow: false,
                errorType: ['message'],
                polyline: [],
                markers: []
            };
        },
        computed: {
            ...mapState(['trip']),
        },
        watch: {
            currentSelect(newVal) {
                if (newVal != "start_markerId" && newVal != "end_markerId") {
                    const list = this.rules[newVal].enum;
                    const selectList = list.map(item => {
                        return {
                            value: item,
                            label: item
                        }
                    });
                    this.selectList = selectList;
                } else {
                    switch (newVal) {
                        case "start_markerId":
                            this.$u.toast("请在地图上选择起点");
                            break;
                        case "end_markerId":
                            this.$u.toast("请在地图上选择终点");
                            break;
                    }
                }
            }
        },
        onLoad(options) {
            this.currentTrip = this.trip[options.index]
            this.currentTripIndex = options.index
            this.initMarkers()
            console.log(this.currentTrip)
        },
        onReady() {
            this.$refs.uForm.setRules(this.rules);
            this.latitude = this.currentTrip.raw[0].latitude
            this.longitude = this.currentTrip.raw[0].longitude
            this.refreshPolyline()
            map = uni.createMapContext('map', this)
        },
        methods: {
            moveToStart(){
                map.moveToLocation({
                    latitude: this.currentTrip.raw[0].latitude,
                    longitude: this.currentTrip.raw[0].longitude
                })
            },
            clearSearch(){
                if(this.markers[this.markers.length - 1].id == 9999999999999) {
                    this.markers.pop()
                }
            },
            getCallout(content, color){
                return {
                    content,
                    color,
                    fontSize: 14,
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#fff',
                    bgColor: '#fff',
                    padding: 5,
                    display: 'ALWAYS',
                    textAlign: 'center'
                }
            },
            initMarkers(){
                let markers = this.$u.deepClone(this.currentTrip.raw)
                // 修改marker样式在这里
                markers.map(item => {
                    item.width = 18
                    item.height = 32
                })
                markers[0].callout = this.getCallout("轨迹起点", "#19be6b")
                markers[markers.length - 1].callout = this.getCallout("轨迹终点", "#fa3534")
                this.markers = markers
            },
            getRandomColor(){
              return '#'+('00000'+ (Math.random()*0x1000000<<0).toString(16)).substr(-6); 
            },
            getPolylineWithId(start_markerId, end_markerId){
                let points = []
                this.currentTrip.raw.forEach(raw => {
                    if (raw.id >= start_markerId && raw.id <= end_markerId) {
                        points.push(raw)
                    }
                })
                return {
                    points,
                    color: this.polyline.length < colorList.length ? colorList[this.polyline.length] : this.getRandomColor(),
                    arrowLine: true,
                    width: 8
                }
            },
            refreshPolyline(){
                this.polyline = [
                    {
                        points: this.currentTrip.raw,
                        color: colorList[0],
                        arrowLine: true,
                        width: 4
                    }
                ]
                this.currentTrip.record.forEach(record => {
                    this.polyline.push(this.getPolylineWithId(record.start_markerId, record.end_markerId))
                })
            },
            getRecordFromId(markerId){
                return this.currentTrip.raw.find(o => o.id === markerId);
            },
            getTimeFromRecord(markerId){
                const rawFound = this.getRecordFromId(markerId);
                return this.$u.date(rawFound.time, "hh:MM:ss")
            },
            chooseLocation(){
                const that = this;
                uni.chooseLocation({
                    success(res) {
                        console.log("chooseLocation Res: ", res)
                        that.clearSearch()
                        that.markers.push({
                            id: 9999999999999,
                            latitude: res.latitude,
                            longitude: res.longitude,
                            width: 18,
                            height: 32,
                            iconPath: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png",
                            callout: that.getCallout(res.name, "#303133")
                        })
                        that.latitude = res.latitude
                        that.longitude = res.longitude
                    },
                    fail(err) {
                        console.log("chooseLocation fail: ", err)
                    }
                })
            },
            markerTap(e) {
                const markerId = e.detail.markerId
                console.log("marker tap: ", markerId)
                if (markerId != 9999999999999){
                    if (this.currentSelect == 'start_markerId' || this.currentSelect == 'end_markerId') {
                        if (this.currentSelect == 'end_markerId' && this.model.start_markerId != null && e.detail.markerId < this.model.start_markerId) {
                            this.$u.toast("终点不得在起点之前")
                        }
                        if (this.currentSelect == 'start_markerId' && this.model.end_markerId != null && e.detail.markerId > this.model.end_markerId) {
                            this.$u.toast("起点不得在终点之后")
                        } else {
                            this.model[this.currentSelect] = markerId;
                            if(this.currentSelect == 'start_markerId') {
                                this.markers.map(item => {
                                    if(item.callout && item.callout.content == "路径起点"){
                                        item.callout = {}
                                    }
                                })
                            }
                            if(this.currentSelect == 'end_markerId') {
                                this.markers.map(item => {
                                    if(item.callout && item.callout.content == "路径终点"){
                                        item.callout = {}
                                    }
                                })
                            }
                            this.markers.map(item => {
                                if(item.id == markerId){
                                    const calloutcContent = this.currentSelect == 'start_markerId' ? '路径起点' : '路径终点';
                                    item.callout = this.getCallout(calloutcContent, "#303133")
                                }
                            })
                        }
                    }
                } else {
                    this.$u.toast("请先清除搜索结果再选点")
                }
                
            },
            addRecord() {
                this.isEdit = true
                this.currentSelect = "start_markerId"
                if(this.currentEdit != null) {
                    this.model = this.currentTrip.record[this.currentEdit]
                }
            },
            editRecord(record_index){
                this.currentEdit = record_index
                this.addRecord()
            },
            removeRecord(record_index){
                this.$store.commit("removeTripRecord", {index: this.currentTripIndex, record_index,})
                this.refreshPolyline()
            },
            selectConfirm(e) {
                this.model[this.currentSelect] = '';
                e.map((val, index) => {
                    this.model[this.currentSelect] += this.model[this.currentSelect] == '' ? val.label : '-' +
                        val.label;
                })
            },
            closeForm() {
                this.model = {
                    start_markerId: null,
                    end_markerId: null,
                    transportation: "",
                    purpose: ""
                }
                this.isEdit = false
                this.currentEdit = null
                this.initMarkers()
            },
            async submit() {
                const that = this;
                this.$refs.uForm.validate(async function(valid) {
                    if (valid) {
                        console.log('验证通过');
                        let model = that.model;
                        if (that.currentEdit != null) {
                            that.$store.commit("editTripRecord", {
                                index: that.currentTripIndex,
                                record_index: that.currentEdit,
                                record: {
                                    start_markerId: model.start_markerId,
                                    end_markerId: model.end_markerId,
                                    transportation: model.transportation,
                                    purpose: model.purpose
                                }
                            })
                        } else {
                            that.$store.commit("addTripRecord", {
                                index: that.currentTripIndex,
                                record: {
                                    start_markerId: model.start_markerId,
                                    end_markerId: model.end_markerId,
                                    transportation: model.transportation,
                                    purpose: model.purpose
                                }
                            })
                        }
                        that.polyline.push(that.getPolylineWithId(that.model.start_markerId, that.model.end_markerId))
                        that.closeForm()
                    }
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    .map-control {
        position: fixed;
        right: 20rpx;
        bottom: calc(600rpx);
        button {
            background-color: #FFFFFF;
            width: auto !important;
            font-size: 24rpx !important;
            padding: 20rpx 30rpx !important;
        }
        .primary {
            color: $u-type-primary !important;
        }
        .clear {
            color: $u-type-error !important;
        }
    }
    .edit-area {
        &__btn {
            justify-content: space-around;
        }

        &__form {
            flex-direction: column;

            .form-row {
                width: calc(100vw - 80rpx);
                justify-content: space-between;

                &__item {
                    width: 40vw;
                }
            }
        }
    }
    .input-active {
        /deep/ input {
            border: 2rpx dotted $u-type-primary;
            border-radius: 8rpx;
        }
    }
</style>
