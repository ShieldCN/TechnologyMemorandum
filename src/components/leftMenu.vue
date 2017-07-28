<template>
	<el-menu default-active="2" class="el-menu-vertical-demo leftMenu" :router="true" theme="dark">
		<template v-for="(l0,idx0) in menuData">
	
			<el-submenu :index="idx0+''" v-if="l0.children">
				<template slot="title">
					<i class="el-icon-message"></i>{{l0.name}}</template>
				<template v-for="(l1,idx1) in l0.children">
					<el-menu-item :index="idx0+'-'+idx1" :route="{name:l1.pathName}" v-if="!l1.children">{{l1.name}}</el-menu-item>
					<el-submenu :index="idx0+'-'+idx1" v-if="l1.children">
						<template slot="title">{{l1.name}}</template>
						<el-menu-item :index="idx0+'-'+idx1+'-'+idx2" v-for="(l2,idx2) in l1.children" :route="{name:l2.pathName}">{{l2.name}}</el-menu-item>
					</el-submenu>
				</template>
			</el-submenu>
			<el-menu-item :index="idx0+''" v-if="!l0.children" :route="{name:l0.pathName}">
				<i class="el-icon-menu"></i>{{l0.name}}</el-menu-item>
		</template>
	</el-menu>
</template>

<script>
export default {
	data() {
		let menuData = [
			{
				name: "配置管理",
				children: [
					{
						name: "类别管理",
						children: [
							{
								name: '类别列表',
								pathName: "categoryList"
							}
						]
					}
				]
			},
			{
				name: '记录管理',
				children: [
					{
						name: '记录列表',
						pathName: 'memorandumList'
					},
					{
						name: '添加记录',
						pathName: 'memorandumAdd'
					}
				]
			}
		];
		let userlist = {};
		if (localStorage.username && localStorage.username == "admin") {
			userlist = {
				name: "用户管理",
				children: [
					{
						name: "用户列表",
						pathName: "userList"
					}
				]
			};
			menuData.unshift(userlist);
		}
		return {
			menuData: menuData
		}
	}
}
</script>
