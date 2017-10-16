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
		<el-form :inline="true" :model="searchForm" class="demo-form-inline">
			<el-form-item label="名称">
				<el-input v-model="searchForm.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item label="类别">
				<el-select v-model="searchForm.category" placeholder="类别">
					<el-option :label="item.name" :value="item.id" v-for="item of categoryList"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
	
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="记录名称" width="200"></el-table-column>
			<el-table-column prop="categoryText" label="类别" width="100" align="center"></el-table-column>
			<el-table-column prop="functionDesc" label="功能简介" width="200" show-overflow-tooltip></el-table-column>
			<el-table-column label="详情">
				<template scope="scope">
					<span v-html="scope.row.details" class="overflowEllipsis" style="height:38px;display:block;"></span>
				</template>
			</el-table-column>
			</el-table-column>
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
import { categoryApi,memorandumApi } from 'api/index.js';
export default {
	data() {
		return {
			tableData: [],
			categoryList:[],
			searchForm:{
				name:"",
				category:""
			}
		}
	},
	mounted() {
		this.getCategoryList();
		this.getMemorandumList();
	},
	methods: {
		getMemorandumList() {
			memorandumApi.getMemorandumList(this.searchForm).then((res) => {
				this.tableData = res.data.data;
			})
		},
		tableDelete(row) {
			this.$confirm('此操作将永久删除【' + row.name + '】, 是否继续?', '删除记录', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.memorandumDelete(row.id);
			});
		},
		memorandumDelete(id) {
			memorandumApi.memorandumDelete(id).then((res) => {
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
				this.getMemorandumList();
			})
		},
		tableAdd() {
			this.$router.push({ name: 'memorandumAdd' });
		},
		getCategoryList() {
			categoryApi.getCategoryList().then((res) => {
				this.categoryList = res.data.data;
			});
        },
		tableEdit(row) {
			this.$router.push({
				name: 'memorandumEdit',
				params: {
					id: row.id
				}
			})
		},
		search(){
			this.getMemorandumList();
		}
	}
}
</script>
