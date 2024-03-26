<template>
    <BackGround>
        
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

export default {
    name: 'RegisterView',
    components: {
        BackGround,
    },
setup() {
    const formState = reactive({
        username: '',
        password: '',
        confirm_password: '',
    });
    const onFinish = values => {
        let { username, password } = values;
        console.log('Success:', username, password, values);

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
    .register-box {
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
