<template>
    <MenuComponent :title_text="'修改密码'">
        <div class="modify-password-box">
            <a-form
                ref="formRef"
                name="custom-validation"
                :model="formState"
                :rules="rules"
                v-bind="layout"
                @finish="handleFinish"

                @finishFailed="handleFinishFailed"
            >
                <a-form-item has-feedback label="旧密码" name="old_pass">
                <a-input v-model:value="formState.old_pass" type="password" autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="新密码" name="new_pass">
                <a-input v-model:value="formState.new_pass" type="password" autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="确认新密码" name="checkPass">
                <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
                </a-form-item>
                
                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                
                <a-button  @click="resetForm" style="margin-left: 60px;">返回</a-button>
                <a-button type="primary" style="margin-left: 30px" html-type="submit">提交</a-button>
                </a-form-item>
            </a-form>
        </div>
    </MenuComponent>
</template>

<script>

import MenuComponent from '@/components/MenuComponent.vue';
import { ref, reactive } from 'vue';
import router from '@/router/index';
import $ from 'jquery';
import { useStore } from 'vuex';
import { encrypt } from '@/user_function/user';

export default {
    name: 'ModifyPasswordView',
    components: {
        MenuComponent,
    },
    setup() {
        const store = useStore();
        const formRef = ref();
        const formState = reactive({
            old_pass: '',
            new_pass: '',
            checkPass: '',
        });
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        const validatePass_old = async (_rule, value) => {
            if (value === '') {
                return Promise.reject('请输入旧密码');
            } else {
                if (formState.checkPass !== '') {
                    formRef.value.validateFields('new_pass');
                }
                return Promise.resolve();
            }
        };

        const validatePass_new = async (_rule, value) => {
            if (value === '') {
                return Promise.reject('请输入新密码');
            } else if (!reg.test(value)){
                 return Promise.reject('密码不符合规范，密码至少8位，同时包含字母和数字');
            }
            else {
                if (formState.checkPass !== '') {
                    formRef.value.validateFields('checkPass');
                }
                return Promise.resolve();
            }
        };
        const validatePass_confirm = async (_rule, value) => {
            if (value === '') {
                return Promise.reject('请再次输入密码');
            } else if (value !== formState.new_pass) {
                return Promise.reject("两次密码不一致");
            } else {
                return Promise.resolve();
            }
        };
        const rules = {
        old_pass: [
        {
        required: true,
        validator: validatePass_old,
        trigger: 'change',
        },
        ],
        new_pass: [
            {
            required: true,
            validator: validatePass_new,
            trigger: 'change',
            },
        ],
        checkPass: [
            {
            validator: validatePass_confirm,
            trigger: 'change',
            },
        ],
        };
        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 14,
            },
        };
        const handleFinish = values => {
            let { old_pass, new_pass, checkPass } = values;
            $.ajax({
                url: 'http://47.105.178.110:8000/user/mod_passwd',
                type: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + store.state.user.access,
                },
                data: JSON.stringify({
                    old_password: encrypt(old_pass),
                    new_password: encrypt(new_pass),
                    confirm_new_password: encrypt(checkPass),
                }),
                success(resp) {
                    if (resp.result === 'success') {
                        alert('修改成功');
                    } else {
                        alert(resp.msg);
                    }
                },
                error() {
                    alert('系统错误');
                }
            })
        };
        const handleFinishFailed = () => {
            
            alert('请检查输入是否正确')
        };
        const resetForm = () => {
            router.go(-1);
        };



        return {
            formRef,
            formState,
            rules,
            layout,
            handleFinish,
            handleFinishFailed,
            resetForm,
            
        }
    }
}
</script>

<style scoped>
.modify-password-box {
    position: absolute;
    top: 55%;
    left: 61%;
    width: 750px;
    padding-top: 10%;
    height: 510px;
    padding-left: 10%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>