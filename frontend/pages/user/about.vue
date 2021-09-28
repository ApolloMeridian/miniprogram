<template>
	<view class="u-content u-p-40">
		<u-parse :html="content" :tag-style="style" :selectable="true"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                title: "",
                content: "",
				style: {
					// 字符串的形式
					// p: 'color: red;font-size:32rpx',
					// span: 'font-size: 30rpx'
                    h1: 'text-align: center',
                    h2: 'margin-bottom: 20rpx; margin-top: 40rpx;text-align: center',
                    p: 'line-height: 2em;',
                    li: 'line-height: 2em;',
                    h3: 'text-align: center'
				}
			}
		},
        async onLoad() {
            await this.getData()
        },
        onShareAppMessage() {
            return {
                title: `TransportX - ${this.title}`,
                path: "pages/user/about"
            }
        },
        methods: {
            async getData() {
                try{
                    const resp = await this.$db.collection("tx-page").get({
                        getOne: true
                    })
                    console.log("获取页面内容成功", {resp})
                    this.content = resp.result.data.content
                    this.title = resp.result.data.title
                }catch(e){
                    console.error("获取页面内容失败", e)
                }
            },
        },
	}
</script>
<style scoped lang="scss">
    .u-content {
        text-align: justify;
    }
</style>