<template>
    <div>
        <div class="login">
            <h1>登录页面</h1>
            <el-form ref="form" :model="form" :rules="logInrules" label-width="60px" class="logInform" >
                <el-form-item label="账号" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="密码"  prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-row class="button">
                    <el-button type="info" @click="resetInfo()">重置</el-button>
                    <el-button type="primary" @click="submitInfo()">提交</el-button>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from "axios"

export default {
    data(){
        return{
            form: {
                phone: "",
                password:""
            },
            logInrules:{
                phone:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 10, max: 11, message: '长度在 10 到 11 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        submitInfo:function(){
            this.$refs.form.validate(async (bol)=>{
                if(bol){
                    this.$message({
                    message: '恭喜你，提交成功',
                    type: 'success'
                    });
                    //提交成功执行请求
                    var url = `http://localhost:3000/login/cellphone?phone=${this.form.phone}&password=${this.form.password}`
                    var result = await axios.post(url);
                    console.log(result)
                    this.$router.push({
                        path:"/home/"+result.data.profile.userId
                    })
                }else{
                    this.$message.error('错了哦!');
                }
            })
        },
        resetInfo:function(){
            this.$refs.form.resetFields()
        }
    }
}
</script>
<style scoped>
    .login{
        position:absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        width: 400px;
        height: 300px;
        background:white;
        border-radius:10px;
    }
    .login h1{
        text-align:center;
        color:#ff9912;
        line-height: 50px;
    }
    .logInform{
        margin-top:30px;
        padding:0 10px;
        box-sizing:border-box;
    }
    .button{
        display: flex;
        flex-direction:row-reverse;
    }
    .button button{
        margin-left:20px;
    }
</style>