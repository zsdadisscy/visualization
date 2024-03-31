<template>
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
</template>
<script>
import { ref, reactive, computed } from 'vue';
import router from '../router/index';
import $ from 'jquery';

export default {
    name: 'FindPasswordView',
    components: {
        
    },
    setup() {
        const formState = reactive({
            username: '',
            password_question: ''
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
            router.push('/login');
        };

        // 按键是否显示
        const disabled = computed(() => {
            if (current.value === 0 && formState.username !== '') {
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
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1177b0;
        color: #983941;
    }
    
    .findpaswd-box {
        margin-top: 70px;
        margin-left: 20px;
        margin-right: 20px;
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