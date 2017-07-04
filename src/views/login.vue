<template>
    <div class="home">
    	<input type="text" v-model="loginData.username" placeholder="username">
        <input type="password" v-model="loginData.password" placeholder="password">
        <a @click="login">login</a>
    </div>
</template>

<script>
import { loginApi } from 'api/index.js';
export default {
	data() {
		return {
			loginData:{
                username:"",
                password:""
            }
		}
	},
    methods:{
        login(){
            if(this.loginData.username&&this.loginData.password){
                loginApi.login(this.loginData).then(res=>{
                    if(res.data.state==0){
                        localStorage.username=this.loginData.username;
                        this.$router.push({ name: "home" });
                    }else{
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
