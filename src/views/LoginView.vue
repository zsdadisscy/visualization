<template>
    <div class="background">
        <div class="login-box">
            <h2>登录</h2>
            <a-form
                
                :model="formState"
                name="normal_login"
                class="login-form"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                label="用户名"
                name="username"
                :rules="[{ required: true, message: '请输入你的用户名' }]"
                >
                <a-input v-model:value="formState.username">
                    <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
                </a-form-item>

                <a-form-item
                label="密  &nbsp &nbsp码"
                name="password"
                :rules="[{ required: true, message: '请输入你的密码！' }]"
                >
                <a-input-password v-model:value="formState.password">
                    <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
                </a-form-item>

                <a-form-item>
                <a-form-item name="remember" no-style>
                    <a-checkbox v-model:checked="formState.remember" style="margin-left: 22px;">记住我</a-checkbox>
                </a-form-item>
                <a class="login-form-forgot" href="">忘记密码</a>
                </a-form-item>

                <a-form-item>
                <a-button :disabled="disabled" block=false type="primary" html-type="submit" class="login-form-button" >
                    登录
                </a-button>
                <br>
                <div class="jump">没有账号？
                    <a href="" style="color: red;">立即注册</a>
                </div>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script >

import { reactive, computed } from 'vue';
    export default {
        name: 'LoginView',
    
    setup() {
        const formState = reactive({
            username: '',
            password: '',
            remember: true,
        });
        const onFinish = values => {
            console.log('Success:', values);
        };
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        const disabled = computed(() => {
            return !(formState.username && formState.password);
        });
        return {
            formState,
            onFinish,
            onFinishFailed,
            disabled,
        };
    }
};
</script>

<style scoped>

    .background {
        width: 100vw;
        height: 100vh;
        position: absolute;
        background: url('../../public/images/login_background.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        
    }
    .login-box {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 400px;
        padding: 40px;
        transform: translate(-50%, -50%);
        background: rgba(178, 177, 177, 0.5);
        box-sizing: border-box;
        box-shadow: 0 15px 25px rgba(0,0,0,.6);
        border-radius: 10px;
    }

    .login-box h2 {
        margin: 0 0 30px;
        padding: 0;
        color: rgba(0, 0, 0, 0.88);
        text-align: center;
    }
    
    #components-form-demo-normal-login .login-form {
    max-width: 300px;
    }
    #components-form-demo-normal-login .login-form-forgot {
    float: right;
    }
    #components-form-demo-normal-login .login-form-button {
    width: 100%;
    }
    .login-form-forgot {
        float: right;
        color: red;
        
        
    }
    .jump {
        margin-top: 5px; 
        padding-top: 3px; 
        text-align: center; 
    }
    /* .login-form-button {
        color: rgb(255,255,255); 
        background-color: rgb(64,150,255);
    } */

</style>
