const checkPerm = {
    methods: {
        /**
         * @description 检查位置权限
         */
        async checkLocationPermission() {
            let [err, res] = await uni.getSetting();
            if (!err) {
                const authSetting = res.authSetting;
                if (!authSetting["scope.userLocation"]) {
                    [err, res] = await uni.authorize({
                        scope: "scope.userLocation"
                    });
                    if (!err) {
                        console.log("scope.userLocation 授权成功")
                    } else {
                        console.log("scope.userLocation 授权失败", err)
                    }
                }
                if (!authSetting["scope.userLocationBackground"]) {
                    uni.navigateTo({
                        url: "/pages/trip/permission"
                    })
                }
                return authSetting["scope.userLocationBackground"];
            }
            return false;
        }
    }
}

export default checkPerm
