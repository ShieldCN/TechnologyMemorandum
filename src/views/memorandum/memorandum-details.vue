<template>
    <div class="pane-body">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="类别" prop="category">
                <el-select v-model="ruleForm.category" placeholder="请选择类别">
                    <el-option :label="item.name" :value="item.id" v-for="item of categoryList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="功能简述" prop="functionDesc">
                <el-input v-model="ruleForm.functionDesc"></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="tabs">
                <el-input v-model="ruleForm.tabs"></el-input>
            </el-form-item>
            <el-form-item label="详情" prop="details">
                <vue-editor v-model="ruleForm.details"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="back">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { categoryApi,memorandumApi } from 'api/index.js';
import { VueEditor } from 'vue2-editor'
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                category: '',
                functionDesc: '',
                details: '',
                tabs: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { max: 20, message: '长度不超过20个字符', trigger: 'blur' }
                ],
                category: [
                    { required: true, message: '请选择类别', trigger: 'change' }
                ],
                details: [
                    { required: true, message: '详情不能为空', trigger: 'blur' }
                ]
            },
            categoryList:[]
        }
    },
    mounted(){
        this.getCategoryList();
        if(this.$route.params.id){
            this.getDetails(this.$route.params.id);
        }
    },
    methods: {
        submitForm(formName) {
            let _self=this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(_self.ruleForm.id){
                        memorandumApi.memorandumEdit(_self.ruleForm).then((res) => {
                            if (res.data.state == 0) {
                                _self.$router.push({
                                    name:'memorandumList'
                                })
                            } else {
                                _self.$message({
                                    type: 'error',
                                    message: res.data.message
                                });
                            }
                        })
                    }else{
                        memorandumApi.memorandumAdd(_self.ruleForm).then((res) => {
                            if (res.data.state == 0) {
                                _self.$router.push({
                                    name:'memorandumList'
                                })
                            } else {
                                _self.$message({
                                    type: 'error',
                                    message: res.data.message
                                });
                            }
                        })
                    }
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        back() {
            this.$router.go(-1);
        },
        getCategoryList() {
			categoryApi.getCategoryList().then((res) => {
				this.categoryList = res.data.data;
			});
        },
        getDetails(id){
            memorandumApi.getMemorandumDetails(id).then((res) => {
                if(res.data.state==0){
                    this.ruleForm = res.data.data;
                }
			});
        }
    },
    components: {
        VueEditor
    }
}
</script>
