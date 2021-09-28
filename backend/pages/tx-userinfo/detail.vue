<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" collection="tx-userinfo" field="sex,age,education,occupation,income_min,income_max,private_car,construction_area,bicycle,housing_nature,total_people" :where="queryWhere" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
           <view>
     <text>性别:</text>
                     <text>{{data.sex}}</text>            
   </view> 
    <view>
     <text>年龄:</text>
                     <text>{{data.age}}</text>            
   </view> 
    <view>
     <text>文化程度:</text>
                     <text>{{data.education}}</text>            
   </view> 
    <view>
     <text>职业:</text>
                     <text>{{data.occupation}}</text>            
   </view> 
    <view>
     <text>收入范围（最低）:</text>
                     <text>{{data.income_min}}</text>            
   </view> 
    <view>
     <text>收入范围（最高）:</text>
                     <text>{{data.income_max}}</text>            
   </view> 
    <view>
     <text>私人小汽车:</text>
                     <text>{{data.private_car}}</text>            
   </view> 
    <view>
     <text>建筑面积:</text>
                     <text>{{data.construction_area}}</text>            
   </view> 
    <view>
     <text>是否拥有自行车:</text>
                     <text>{{data.bicycle}}</text>            
   </view> 
    <view>
     <text>住房性质:</text>
                     <text>{{data.housing_nature}}</text>            
   </view> 
    <view>
     <text>总人数:</text>
                     <text>{{data.total_people}}</text>            
   </view> 
  
      </view>
    </unicloud-db>
    <view class="btns">
      <button type="primary" @click="handleUpdate">修改</button>
      <button type="warn" class="btn-delete" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script>
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '@/js_sdk/validator/tx-userinfo.js';

  export default {
    data() {
      return {
        queryWhere: '',
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.queryWhere = '_id=="' + this._id + '"'
      }
    },
    methods: {
      handleUpdate() {
        // 打开修改页面
        uni.navigateTo({
          url: '/pages/tx-userinfo/edit?id=' + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            // 删除数据成功后跳转到list页面
            uni.navigateTo({
              url: '/pages/tx-userinfo/list'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  .btns {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
</style>
