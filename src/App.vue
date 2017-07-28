<template>
	<div class="panel">
		<!--头部-->
		<div class="header">
			<el-row>
				<el-col :span="12">
					<div class="logo">
						<!--<a><img src="" height="80"></a>-->
						<a @click="goHome()">TM</a>
					</div>
				</el-col>
				<el-col :span="12" class="align-right">
					<el-dropdown trigger="click" @command="userConfig" class="userSetting">
						<span class="el-dropdown-link">
							{{username}}
							<i class="el-icon-caret-bottom el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="1">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-row>
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
			navData: [],
			username: ""
		}
	},
	computed: {
		currentPathName() {
			return this.$route.meta;
		}
	},
	mounted() {
		if (!localStorage.username || !localStorage.lastLogin) {
			this.$router.push({ name: 'login' });
		} else {
			let nowTime = new Date().getTime();
			if ((nowTime - localStorage.lastLogin) / 1000 > 3600 * 24) {
				this.$router.push({ name: 'login' });
			} else {
				localStorage.lastLogin = nowTime;
				this.username = localStorage.username;
			}
		}
	},
	methods: {
		goHome() {
			this.$router.push({ name: 'home' });
		},
		userConfig(command){
			localStorage.username="";
			localStorage.lastLogin=null;
			this.$router.push({ name: 'login' });
		}
	},
	components: {
		'left-menu': leftMenu
	}
}
</script>

