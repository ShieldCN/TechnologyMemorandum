<template>
    <el-row>
        <el-col :span="24">&nbsp;</el-col>
        <el-col :span="8">&nbsp;</el-col>
        <el-col :span="8">
            <el-form label-position="right" label-width="80px" :model="loginData" :rules="rules" ref="ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginData.password"></el-input>
                </el-form-item>
                <el-form-item label-width="80px">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="8">&nbsp;</el-col>
    </el-row>
</template>

<script>
import { loginApi } from 'api/index.js';
export default {
    data() {
        return {
            loginData: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        submitForm(formName) {
            let _self=this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _self.login();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        login() {
            if (this.loginData.username && this.loginData.password) {
                loginApi.login(this.loginData).then(res => {
                    if (res.data.state == 0) {
                        localStorage.username = this.loginData.username;
                        localStorage.lastLogin = new Date().getTime();
                        localStorage.token = res.data.data.token;
                        this.$router.push({ name: "home" });
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                })
            }
        }
    }
}
</script>
