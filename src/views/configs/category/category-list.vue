<template>
	<div class="pane-body">
		<el-row class="listTop">
			<el-col :span="6">
				<div class="grid-content">
					<i class="el-icon-menu"></i> 类别列表</div>
			</el-col>
			<el-col :span="18">
				<div class="grid-content align-right">
					<el-button size="small" :plain="true" type="info" @click="tableAdd()">添加</el-button>
				</div>
			</el-col>
		</el-row>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="name" label="类别名称">
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template scope="scope">
					<el-button size="small" type="info" @click="tableEdit(scope.row)">编辑</el-button>
					<el-button size="small" type="danger" @click="tableDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { categoryApi } from 'api/index.js';
export default {
	data() {
		return {
			tableData: []
		}
	},
	mounted() {
		this.getCategoryList();
	},
	methods: {
		getCategoryList() {
			categoryApi.getCategoryList().then((res) => {
				this.tableData = res.data.data;
			})
		},
		tableDelete(row) {
			this.$confirm('此操作将永久删除【' + row.name + '】, 是否继续?', '删除类别', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.categoryDelete(row.id);
			}).catch(() => { });;
		},
		categoryDelete(id) {
			categoryApi.categoryDelete(id).then((res) => {
				if (res.data.state == 0) {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.getCategoryList();
				}
			})
		},
		tableAdd() {
			this.$prompt('请输入类别名称', '添加类别', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputValidator: val => {
					return val ? true : false;
				},
				inputErrorMessage: '类别名称不能为空'
			}).then(({ value }) => {
				categoryApi.categoryAdd({ name: value }).then((res) => {
					if (res.data.state == 0) {
						this.$message({
							type: 'success',
							message: '添加成功!'
						});
						this.getCategoryList();
					} else {
						this.$message({
							type: 'error',
							message: res.data.message
						});
					}
				})
			}).catch(() => { });
		},
		tableEdit(row) {
			this.$prompt('请编辑类别名称', '编辑类别', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputValue: row.name,
				inputValidator: val => {
					return val ? true : false;
				},
				inputErrorMessage: '类别名称不能为空'
			}).then(({ value }) => {
				categoryApi.categoryEdit({ id: row.id, name: value }).then((res) => {
					if (res.data.state == 0) {
						this.$message({
							type: 'success',
							message: '修改成功!'
						});
						this.getCategoryList();
					} else {
						this.$message({
							type: 'error',
							message: res.data.message
						});
					}
				})
			}).catch(() => { })
		},
	}
}
</script>
