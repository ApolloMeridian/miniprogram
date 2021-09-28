
<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="sex" label="性别" required>
  <uni-easyinput v-model="formData.sex" />
</uni-forms-item>
<uni-forms-item name="age" label="年龄" required>
  <uni-easyinput v-model="formData.age" />
</uni-forms-item>
<uni-forms-item name="education" label="文化程度" required>
  <uni-easyinput v-model="formData.education" />
</uni-forms-item>
<uni-forms-item name="occupation" label="职业" required>
  <uni-easyinput v-model="formData.occupation" />
</uni-forms-item>
<uni-forms-item name="income_min" label="收入范围（最低）" required>
  <uni-easyinput v-model="formData.income_min" />
</uni-forms-item>
<uni-forms-item name="income_max" label="收入范围（最高）" required>
  <uni-easyinput v-model="formData.income_max" />
</uni-forms-item>
<uni-forms-item name="private_car" label="私人小汽车" required>
  <uni-easyinput v-model="formData.private_car" />
</uni-forms-item>
<uni-forms-item name="construction_area" label="建筑面积" required>
  <uni-easyinput v-model="formData.construction_area" />
</uni-forms-item>
<uni-forms-item name="bicycle" label="是否拥有自行车" required>
  <uni-easyinput v-model="formData.bicycle" />
</uni-forms-item>
<uni-forms-item name="housing_nature" label="住房性质" required>
  <uni-easyinput v-model="formData.housing_nature" />
</uni-forms-item>
<uni-forms-item name="total_people" label="总人数" required>
  <uni-easyinput v-model="formData.total_people" />
</uni-forms-item>

      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '@/js_sdk/validator/tx-userinfo.js';

  const db = uniCloud.database();
  const dbCollectionName = 'tx-userinfo';

  function getValidator(fields) {
    let reuslt = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        reuslt[key] = validator[key]
      }
    }
    return reuslt
  }

  export default {
    data() {
      return {
        formData: {
  "sex": "",
  "age": "",
  "education": "",
  "occupation": "",
  "income_min": "",
  "income_max": "",
  "private_car": "",
  "construction_area": "",
  "bicycle": "",
  "housing_nature": "",
  "total_people": ""
},
        formOptions: {},
        rules: {
          ...getValidator(["sex","age","education","occupation","income_min","income_max","private_car","construction_area","bicycle","housing_nature","total_people"])
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      /**
       * 触发表单提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.submit().then((res) => {
          this.submitForm(res)
        }).catch((errors) => {
          uni.hideLoading()
        })
      },

      submitForm(value) {
        // 使用 clientDB 提交数据
        db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }

  .uni-button {
    width: 184px;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    line-height: 1;
    margin: 0;
  }
</style>

