<template>
    <div class="login-wrap">
        <div class="ms-title">多轮对话机器人系统</div>
        <div class="ms-login" v-show="show2">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="name">
                    <el-input v-model.number="ruleForm2.name" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="password"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="confirm pwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitRegister('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    <el-button type="text" style="float:right;margin-top:10px" @click="loginUser">登陆</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="ms-login" v-show="show1">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 请正确填写。</p>
                <div>
                    <el-button type="text" style="float:right" @click="registerUser">注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
        var checkName = (rule, value, callback) => { 
            if (value === '') {
            callback(new Error('请输入用户名'));
            } else {
            callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm2.checkPass !== '') {
                this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            show1:'true',
            show2:'false',
            ruleForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            ruleForm2: {
                pass: '',
                checkPass: '',
                name: ''
            },
            rules2: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                name: [
                    { validator: checkName, trigger: 'blur' }
                ]
            }
        }
        },
        methods: {
            loginUser(){
                this.show1=true;
                this.show2=false;
            },
            registerUser(){
               this.show1=false;
               this.show2=true;
            },
            submitRegister(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 提交给后台
                        this.$http.post(this.HOST+'/register/', {
                            username: this.ruleForm2.name,
                            password: this.ruleForm2.pass
                        }, {
                            emulateJSON: true
                        })
                            .then((response) => {
                                console.log(response.body)
                                if(response.body.retCode == 200) {
                                   this.$message.success("注册成功！");
                                    localStorage.setItem('ms_username',this.ruleForm2.name);
                                    this.$router.push('/');
                                } else {
                                    this.$message.error("登陆失败，请重试."+"原因:"+response.body.reason);
                                }
                            }, (response) => {
                                alert("响应失败！");
                                this.$message({
                                    type: 'error',
                                    message: response.message
                                });
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                        
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {  //element-ui表单验证
                    if (valid) {
                        // 提交给后台
                        this.$http.post(this.HOST+'/login/', {
                            username: this.ruleForm.username,
                            password: this.ruleForm.password
                        }, {
                            emulateJSON: true
                        })
                            .then((response) => {
                                console.log(response.body)
                                if(response.body.retCode == 200) {
                                   this.$message.success("登录成功！");
                                    localStorage.setItem('ms_username',this.ruleForm.username);
                                    this.$router.push('/');
                                } else {
                                    this.$message.error("登陆失败，请重试."+"原因:"+response.body.reason);
                                }
                            }, (response) => {
                                alert("响应失败！");
                                this.$message({
                                    type: 'error',
                                    message: response.message
                                });

                            });
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>