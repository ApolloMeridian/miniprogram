// 文档教程: https://uniapp.dcloud.net.cn/uniCloud/schema?id=validatefunction
// 扩展校验函数示例
const db = uniCloud.database();
module.exports = async function (rule, value, data) {
    let result = await db.collection("tx-userinfo").where("user._id == $env.uid");
    if (result) {
      // 校验通过
      return "用户资料已存在"
    } else {
      // 校验失败
      return true
    }
  }