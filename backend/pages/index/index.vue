<template>
    <scroll-view style="padding: 15px;box-sizing: border-box;">
        欢迎使用TransportX Admin
		<!-- #ifndef H5 -->
		<fix-window />
		<!-- #endif -->
    </scroll-view>
</template>

<script>
	import { version } from '../../package.json'
    export default {
        data() {
            return {
				adminVersion: version
			}
        },
        onLoad() {},
        methods: {}
    }
</script>

<style>
	/* #ifndef H5 */
	page {
		padding-top: 85px;
	}
	/* #endif */
</style>
