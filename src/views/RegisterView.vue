<template>
    <BackGround :is_text="true">
        
        <div class="register-box">
            <h2>注册</h2>

            <a-form
                :model="formState"
                name="normal_register"
                class="register-form"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                label="用&nbsp户&nbsp名&nbsp"
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
                label="密&nbsp &nbsp &nbsp &nbsp码"
                name="password"
                :rules="[{ required: true, message: '请输入你的密码！' }]"
                >
                <a-input-password v-model:value="formState.password">
                    <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
                </a-form-item>

                <a-form-item
                label="确认密码"
                name="confirm_password"
                :rules="[{ required: true, message: '请确认你输入的密码！' }]"
                >
                <a-input-password v-model:value="formState.confirm_password">
                    <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
                </a-form-item>

                <a-form-item
                label="密保问题"
                name="password_question"
                :rules="[{ required: true, message: '请输入你的密保问题！' }]"
                >
                <a-input v-model:value="formState.password_question">
                    <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
                </a-form-item>

                <a-form-item
                label="密保答案"
                name="password_answer"
                :rules="[{ required: true, message: '请输入你的密保答案！' }]"
                >
                <a-input v-model:value="formState.password_answer">
                    <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
                </a-form-item>

                <a-form-item>
                <a-button :disabled="disabled" block=false type="primary" html-type="submit" class="register-form-button" >
                    注册
                </a-button>
                <br>
                <div class="jump">已有账号？
                    <router-link to="/login" style="color: red;">立即登录</router-link>
                </div>
                </a-form-item>
            </a-form>
        </div>
    </BackGround>
</template>
<script >
// import IPADDRESS from '../main.js'
import { reactive, computed } from 'vue';
import BackGround from '../components/BackGround.vue';
import $ from 'jquery';
import { useStore } from 'vuex';
import router from '@/router/index.js';
import { encrypt } from '../user_function/user.js';

export default {
    name: 'RegisterView',
    components: {
        BackGround,
    },
setup() {

    const store = useStore();
    const formState = reactive({
        username: '',
        password: '',
        confirm_password: '',
        password_question: '',
        password_answer: '',
    });
    
    const onFinish = values => {
        let{username, password, confirm_password, password_question, password_answer} = values;
        if (password !== confirm_password) {
            alert('两次密码不一致');
            return;
        }
        //  添加密码校验，不低于8位，同时有字母和数字
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        if (!reg.test(password)) {
            alert('密码不符合规范，密码至少8位，同时包含字母和数字');
            return;
        }
        if (username && password && confirm_password && password_question && password_answer) {

            $.ajax({
                url: 'http://47.105.178.110:8000/user/register',
                type: 'post',
                data: JSON.stringify({
                    username: username,
                    password: encrypt(password),
                    password_question: password_question,
                    password_answer: password_answer,
                    confirm_password: encrypt(confirm_password),
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                success(resp) {
                    if (resp.result === 'success') {
                        alert('注册成功');
                        store.dispatch('login', {
                            username: username,
                            password: password,
                        success() {
                             router.push({name: 'home'});
                        },
                        error(msg) {
                            alert(msg);
                            console.log(msg);
                        }
                        });
                    }
                    else {
                        alert(resp.msg);
                    }
                    }
            })
        }
        else {
            alert('未知错误');
        }

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
        BackGround,
    };
}
};
</script>

<style scoped>
    .register-box {
        position: absolute;
        top: 50%;
        left: 83%;
        width: 350px;
        height: 510px;
        padding: 40px;
        transform: translate(-50%, -50%);
        background: rgba(178, 177, 177, 0.5);
        box-sizing: border-box;
        box-shadow: 0 15px 25px rgba(0,0,0,.6);
        border-radius: 10px;
    }

    .register-box h2 {
        margin: 0 0 30px;
        padding: 0;
        color: rgba(0, 0, 0, 0.88);
        text-align: center;
    }
    
    #components-form-demo-normal-register .register-form {
    max-width: 300px;
    }
    #components-form-demo-normal-register .register-form-forgot {
    float: right;
    }
    #components-form-demo-normal-register .register-form-button {
    width: 100%;
    }
    .register-form-forgot {
        float: right;
        color: red;
        
        
    }
    .jump {
        margin-top: 5px; 
        padding-top: 3px; 
        text-align: center; 
    }
    /* .register-form-button {
        color: rgb(255,255,255); 
        background-color: rgb(64,150,255);
    } */

</style>
