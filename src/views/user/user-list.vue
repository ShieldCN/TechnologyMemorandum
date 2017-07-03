<template>
    <div class="pane-body">
        <el-row class="listTop">
            <el-col :span="6">
                <div class="grid-content">
                    <i class="el-icon-menu"></i> 用户列表</div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content align-right">
                    <el-button size="small" :plain="true" type="info" @click="tableAdd()">添加</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="username" label="用户名称">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" type="info" @click="tableEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="tableDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="用户详情" :visible.sync="dialogShow" :modal="true" :modal-append-to-body="false">
            <el-form :model="user" ref="user" :rules="rules" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="user.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="user.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="close">取 消</el-button>
                    <el-button type="primary" @click="save">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { userApi } from 'api/index.js';
export default {
    data() {
        return {
            user: {
                id: "",
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            dialogShow: false,
            tableData: []
        }
    },
    mounted() {
        this.getUserList();
    },
    methods: {
        getUserList() {
            userApi.getUserList().then((res) => {
                this.tableData = res.data.data;
            })
        },
        tableDelete(row) {
            this.$confirm('此操作将永久删除【' + row.username + '】, 是否继续?', '删除用户', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.userDelete(row.id);
            }).catch(() => { });
        },
        userDelete(id) {
            userApi.userDelete(id).then((res) => {
                if (res.data.state == 0) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getUserList();
                }
            })
        },
        tableAdd() {
            this.user.id = "";
            this.user.username = "";
            this.user.password = "";
            this.dialogShow = true;
        },
        tableEdit(row) {
            this.user.id = row.id;
            this.user.username = row.username;
            this.user.password = row.password;
            this.dialogShow = true;
        },
        save() {
            if (this.user.id) {
                this.$refs['user'].validate((valid) => {
                    if (valid) {
                        userApi.userEdit(this.user).then((res) => {
                            if (res.data.state == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                this.getUserList();
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.message
                                });
                            }
                            this.dialogShow = false;
                        })
                    } else {
                        return false;
                    }
                });

            } else {
                this.$refs['user'].validate((valid) => {
                    if (valid) {
                        userApi.userAdd(this.user).then(res => {
                            if (res.data.state == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.getUserList();
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.message
                                });
                            }
                            this.dialogShow = false;
                        })
                    } else {
                        return false;
                    }
                });
            }
        },
        close() {
            this.$refs["user"].resetFields();
            this.dialogShow = false;
        }
    }
}
</script>
