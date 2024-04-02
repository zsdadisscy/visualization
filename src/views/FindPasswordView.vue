<template>
    <BackGround :is_text="false">
        <div class='title'><h1>找回密码</h1></div>
        <div class="findpaswd-box">
        <a-steps :current="current" :items="items"></a-steps>
        <div class="steps-content">
            <div v-if = "current == 0">
                <a-form-item
                    label="需要找回的用户名"
                    name="username"
                    :rules="[{ required: true, message: '请输入你的用户名' }]"
                    >
                    <a-input v-model:value="formState.username">
                        <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
            </div>
            <div v-if = "current == 1">
                <a-form-item
                    label="&nbsp&nbsp&nbsp密保问题"
                    name="password_question"
                    >
                    <a-input v-model:value="formState.password_question" disabled>
                        <template #prefix>
                        
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item
                    label="密保答案"
                    name="password_answer"
                    :rules="[{ required: true, message: '请输入你的密保答案' }]"
                    >
                    <a-input v-model:value="formState.password_answer">
                        <template #prefix>
                        
                        </template>
                    </a-input>
                </a-form-item>
            </div>
            <div v-if = "current == 2">
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
            </div>
        </div>
        <div class="steps-action">
            <a-button v-if="current == 0" style="margin-right: 40px" @click="return_login">返回登录</a-button>
            <a-button v-if="current > 0" style="margin-right: 40px" @click="prev">上一步</a-button>
            <a-button v-if="current < steps.length - 1" :disabled="disabled"  type="primary" @click="next" >下一步</a-button>
            <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="submit"
            >
            完成
            </a-button>
        </div>
        </div>
    </BackGround>
</template>
<script>
import { ref, reactive, computed } from 'vue';
import router from '../router/index';
import $ from 'jquery';
import BackGround from '@/components/BackGround.vue';
import { encrypt } from '@/user_function/user';

export default {
    name: 'FindPasswordView',
    components: {
        BackGround,
    },
    setup() {
        const formState = reactive({
            username: '',
            password_question: '',
            password_answer: '',
            password: '',
            confirm_password: '',
        });
        const current = ref(0);

        // 下一步
        const next = () => {
            if (current.value === 0) {
                $.ajax({
                    url: "http://47.105.178.110:8000/user/judge_user",
                    type: "post",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        username: formState.username,
                    }),
                    success(resp) {
                        if (resp.result === 'success') {
                            current.value++;
                            formState.password_question = resp.password_question;
                        }
                        else {
                            alert('用户名不存在');
                        }
                    },
                    error(resp) {
                        console.log(resp);
                        alert('系统错误');
                    }
                })
            }
            else if (current.value === 1) {
                $.ajax({
                    url: "http://47.105.178.110:8000/user/validation_secure",
                    type: "post",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        username: formState.username,
                        password_answer: formState.password_answer,
                    }),
                    success(resp) {
                        if (resp.result === 'success') {
                            current.value++;
                        }
                        else {
                            alert('密保问题回答错误');
                        }
                    },
                    error(resp) {
                        console.log(resp);
                        alert('系统错误');
                    }
                })
            }
        };
        // 上一步
        const prev = () => {
            current.value--;
        };
        // 返回登录
        const return_login = () => {
            router.push('/login');
        };
        // 提交
        const submit = () => {
            if (formState.password !== formState.confirm_password) {
                alert('两次密码不一致');
                return;
            }
            //  添加密码校验，不低于8位，同时有字母和数字
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            if (!reg.test(formState.password)) {
                alert('密码不符合规范，密码至少8位，同时包含字母和数字');
                return;
            }
            $.ajax({
                url: "http://47.105.178.110:8000/user/secure_passwd",
                type: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    username: formState.username,
                    password: encrypt(formState.password),
                    password_answer: formState.password_answer,
                    confirm_password: encrypt(formState.confirm_password),
                }),
                success(resp) {
                    if (resp.result === 'success') {
                        alert('修改成功，即将跳转到登录界面');
                        router.push('/login');
                    }
                    else {
                        alert(resp.msg);
                    }
                },
                error(resp) {
                    console.log(resp);
                    alert('系统错误');
                }
            })
        };

        // 按键是否显示
        const disabled = computed(() => {
            if (current.value === 0 && formState.username !== '') {
                return false;
            }
            if (current.value === 1 && formState.password_answer !== '') {
                return false;
            }
            if (current.value === 2 && formState.password !== '' && formState.confirm_password !== '') {
                return false;
            }
            return true;
        });

        const steps = [
        {
            title: '找回的账号',
        },
        {
            title: '密保问题验证',
        },
        {
            title: '修改密码',
        },
        ];
        const items = steps.map(item => ({
            key: item.title,
            title: item.title,
        }));
       return {
            current,
            next,
            prev,
            steps,
            items,
            return_login,
            submit,
            formState,
            disabled
        };
    },
        
}

</script>
<style scoped>
    .title {
        margin-top: 50px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #e9d7df;
    }
    
    .findpaswd-box {
        margin: 20px;
        padding: 49px;
        /* transform: translate(-50%, -50%); */
        background: rgba(178, 177, 177, 0.5);
        box-sizing: border-box;
        box-shadow: 0 15px 25px rgba(0,0,0,.6);
        border-radius: 10px;
        margin-top: 30px;

    }
    .steps-content {
        margin-top: 140px;
        border-radius: 6px;
        min-height: 200px;
        margin-left:33%;
        text-align: center;
        width: 500px;
        height: 200px;
    }

    .steps-action {
        margin-left: 45%;

    }

    [data-theme='dark'] .steps-content {
        background-color: #2f2f2f;
        border: 1px dashed #404040;
    }
</style>