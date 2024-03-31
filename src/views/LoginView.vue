<template>
    <BackGround>
        
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
                <router-link class="login-form-forgot" to="findpassword">忘记密码</router-link>
                </a-form-item>

                <a-form-item>
                <a-button :disabled="disabled" block=false type="primary" html-type="submit" class="login-form-button" >
                    登录
                </a-button>
                <br>
                <div class="jump">没有账号？
                    <router-link to= 'register' style="color: red;">立即注册</router-link>
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
import {useStore} from 'vuex';
import router from '@/router/index';

export default {
    name: 'LoginView',
    components: {
        BackGround,
    },
setup() {
    const formState = reactive({
        username: '',
        password: '',
        remember: false,
    });
    const store = useStore();
    if (store.state.user.is_login) {
        router.push({name: 'home'});
    }
    if (localStorage.getItem('remember')) {
        formState.username = localStorage.getItem('username');
        formState.password = localStorage.getItem('password');
        console.log(formState.username);
        store.dispatch('login', {
            username: formState.username,
            password: formState.password,
            success() {
                router.push({name: 'home'});
            },
            error(msg) {
                alert(msg);
            }
        });
    }

    const onFinish = values => {
        let { username, password, remember } = values;

        store.dispatch('login', {
            username: username,
            password: password,
            success() {
                alert('登录成功');
                if (remember) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    localStorage.setItem('remember', remember);
                }
                if (!remember) {
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                    localStorage.removeItem('remember');
                }
                router.push({name: 'home'});
            },
            error(msg) {
                alert(msg);
            }
        });
        
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
        BackGround
    };
}
};
</script>

<style scoped>
    .login-box {
        position: absolute;
        top: 50%;
        left: 83%;
        width: 350px;
        height: 400px;
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
