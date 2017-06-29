<template>
	<div class="pane-body">
		<el-row class="listTop">
			<el-col :span="6">
				<div class="grid-content">
					<i class="el-icon-menu"></i> 记录列表</div>
			</el-col>
			<el-col :span="18">
				<div class="grid-content align-right">
					<el-button size="small" :plain="true" type="info" @click="tableAdd()">添加</el-button>
				</div>
			</el-col>
		</el-row>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="记录名称" width="200"></el-table-column>
			<el-table-column prop="category" label="类别" width="100" align="center"></el-table-column>
			<el-table-column prop="functionDesc" label="功能简介" width="200" show-overflow-tooltip></el-table-column>
			<el-table-column prop="details" label="详情" show-overflow-tooltip></el-table-column>
			<el-table-column prop="tabs" label="标签" width="200"></el-table-column>
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
			tableData: [{
				id: 1,
				name: 'css计算属性',
                category:'css',
                functionDesc:"css计算属性",
                details:"calc，例：width: calc(100%/3 - 5px);",
                tabs:"css,计算属性"
			}]
		}
	},
	methods: {
		tableDelete(row) {
			this.$confirm('此操作将永久删除【' + row.name + '】, 是否继续?', '删除记录', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.categoryDelelte(row.id);
			});
		},
		categoryDelelte(id) {
			categoryApi.categoryDelete(id).then((res) => {
				console.log(res)
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
			})
		},
		tableAdd() {
			this.$router.push({name:'memorandumAdd'});
		},
		tableEdit(row) {
			this.$router.push({
                name:'memorandumEdit',
                params:{
                    id:row.id
                }
            })
		},
	}
}
</script>
