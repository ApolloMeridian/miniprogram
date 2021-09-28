<script>
    import {loginByWeixin} from './common/utils.js'
    const tmpId = 'ESv0jHRX1lySdRR2RK5UOtxs2rx1lvWR2spvJh2k488'
	export default {
		async onLaunch() {
			console.log('App Launch');
            uni.showLoading({
                title: "正在初始化",
                mask: true
            })
            await loginByWeixin();
            await this.getConfig();
            uni.hideLoading()
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
        methods: {
            /**
             * @description 获取小程序设置
             * */
            async getConfig() {
                try{
                    const configResp = await this.$db.collection("tx-config").get({getOne: true});
                    if (configResp.result.affectedDocs == 1) {
                        delete configResp.result.data._id;
                        this.$store.commit("setConfig", configResp.result.data)
                        console.log("获取系统设置成功：", {configResp});
                    }
                }catch(e){
                    console.log("获取系统设置失败：", e);
                    this.$u.toast("获取系统设置失败，请向开发者反馈", 3000)
                }
            }
        },
	}
</script>

<style lang="scss">
    @import "uview-ui/index.scss";
</style>
