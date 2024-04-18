<template>
    <MenuComponent >
        <div class="modify-secure-box">
            <div class="modify-secure-title">修改密保</div>
            <a-form
                ref="formRef"
                name="custom-validation"
                :model="formState"
                :rules="rules"
                v-bind="layout"
                @finish="handleFinish"

                @finishFailed="handleFinishFailed"
            >
                <a-form-item has-feedback label="密码问题" name="password_question">
                <a-input v-model:value="formState.password_question"  autocomplete="off" />
                </a-form-item>
                <a-form-item has-feedback label="密保答案" name="password_answer">
                <a-input v-model:value="formState.password_answer" autocomplete="off" />
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

export default {
    name: 'ModifyProtectionView',
    components: {
        MenuComponent,
    },
    setup() {

     
        const store = useStore();
        const formRef = ref();
        const formState = reactive({
            password_question: '',
            password_answer: '',
        });
        
        $.ajax({
            url: 'http://47.105.178.110:8000/user/get_secure',
            type: 'get',
            headers: {
                'Authorization': 'Bearer ' + store.state.user.access,
            },
            
            async: false,
            success: function (resp) {
                if (resp.result === 'success') {
                    formState.password_question = resp.data.password_question;
                     formState.password_answer = resp.data.password_answer;
                }
                else {
                    alert('获取密保问题失败');
                }
            },
            error() {
                alert('获取密保问题失败');
            }
        
        })


        const validatePass_question = async (_rule, value) => {
            if (value === '') {
                return Promise.reject('密保问题不能为空');
            } else {
                if (formState.checkPass !== '') {
                    formRef.value.validateFields('question_answer');
                }
                return Promise.resolve();
            }
        };
        const validatePass_answer = async (_rule, value) => {
            if (value === '') {
                return Promise.reject('密保答案不能为空');
            } else {
                return Promise.resolve();
            }
        };
        const rules = {
        password_question: [
        {
        required: true,
        validator: validatePass_question,
        trigger: 'change',
        },
        ],
        password_answer: [
            {
            required: true,
            validator: validatePass_answer,
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
            $.ajax({
                url: 'http://47.105.178.110:8000/user/mod_secure',
                type: 'post',
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.access,
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    password_question: values.password_question,
                    password_answer: values.password_answer,
                }),
                success: function (resp) {
                    if (resp.result === 'success') {
                        alert('修改密保成功');
                    }
                    else {
                        alert(resp.msg);
                    }
                },
                error() {
                    alert('修改密保失败');
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

.modify-secure-box {
    position: absolute;
    top: 55%;
    left: 61%;
    width: 750px;
    /* padding-top: 10%; */
    height: 510px;
    padding-left: 10%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modify-secure-title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 130px;
    margin-left: 170px;
    align-content: center;
    margin-top: 30px;
}
</style>