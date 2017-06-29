<template>
	<div id="app">
		<!--头部-->
		<div class="header">
			<div class="logo fl">
				<!--<a><img src="" height="80"></a>-->
				<a @click="go('home')">TM</a>
			</div>
			<div class="clear"></div>
		</div>
		<div class="bodyBox">
			<left-menu></left-menu>
			<div class="bodyContent">
				<div class="nav">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item v-if="currentPathName.title">{{currentPathName.title}}</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import leftMenu from '@/components/leftMenu'
export default {
	name: 'app',
	data() {
		return {
			navData: []
		}
	},
	computed: {
		currentPathName() {
			return this.$route.meta;
		}
	},
	methods: {
		go(name) {
			this.$router.push({ name: name });
		}
	},
	components: {
		'left-menu': leftMenu
	}
}
</script>

