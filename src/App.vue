<template>
	<div class="panel">
		<!--头部-->
		<div class="header">
			<div class="logo fl">
				<!--<a><img src="" height="80"></a>-->
				<a @click="goHome()">TM</a>
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
	mounted(){
		if(!localStorage.username){
			this.$router.push({name:'login'});
		}
	},
	methods: {
		goHome() {
			this.$router.push({ name: 'home' });
		}
	},
	components: {
		'left-menu': leftMenu
	}
}
</script>

