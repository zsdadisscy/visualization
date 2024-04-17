<template>
    <MenuComponent>
        <div style="padding: 24px">
            <div class="modify-info-title">编辑资料</div>
            <a-form
                ref="formRef"
                :model="formState"
                :rules="rules"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
            >
                
                <a-form-item ref="name" label="名字" name="name">
                    <a-input v-model:value="formState.name" />
                </a-form-item>
                <a-form-item label="性别" name="gender">
                    <a-radio-group v-model:value="formState.gender">
                        <a-radio value="男">男</a-radio>
                        <a-radio value="女">女</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item has-feedback label="年龄" name="age">
                    <a-input-number v-model:value="formState.age" />
                </a-form-item>
                <a-form-item label="专业" name="major">
                    <a-input v-model:value="formState.major" />
                </a-form-item>
                <a-form-item label="学历" name="education">
                <a-radio-group v-model:value="formState.education">
                    <a-radio value="其他">其他</a-radio>
                    <a-radio value="高中">高中</a-radio>
                    <a-radio value="专科">专科</a-radio>
                    <a-radio value="本科">本科</a-radio>
                    <a-radio value="硕士研究生">硕士研究生</a-radio>
                    <a-radio value="博士研究生">博士研究生</a-radio>
                    
                </a-radio-group>
                </a-form-item>
                
                <a-form-item label="兴趣岗位（请以空格分开）" name="interest_position">
                    <a-input v-model:value="formState.interest_position" />
                </a-form-item>
                <a-form-item label="兴趣城市（请以空格分开）" name="interest_city">
                    <a-input v-model:value="formState.interest_city" />
                </a-form-item>

                <a-form-item label="头像">
                    <a-upload
                        v-model:file-list="fileList"
                        name="avatar"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="false"
                        action="http://47.105.178.110:8000/user/upload_avatar"
                        :maxCount="1"
                        :method="post"
                        :headers = headers
                        :before-upload="beforeUpload"
                        @change="handleChange"
                    >
                        <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="img-icon"/>
                        <div v-else>
                        <loading-outlined v-if="loading"></loading-outlined>
                        <plus-outlined v-else></plus-outlined>
                        <div class="ant-upload-text">上传</div>
                        </div>
                    </a-upload>

                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button @click="goback">返回</a-button>
                    <a-button style="margin-left: 30px" type="primary" @click="onSubmit">修改</a-button>
                    
                    </a-form-item>
                </a-form-item>
            </a-form>
        </div>
    </MenuComponent>
</template>

<script>

import MenuComponent from '@/components/MenuComponent.vue';
import { reactive, ref, toRaw } from 'vue';
import {useStore} from 'vuex';
import router from '../router/index';
import { message } from 'ant-design-vue';
import $ from 'jquery';
import { judge_online } from '@/user_function/user';

export default {
    name: 'EditorInfoView',
    components: {
        MenuComponent,
    },
    setup() {
        const store = useStore();
        if (!judge_online()) {
            router.push({name: 'login'});
        }

        const formRef = ref();
        const labelCol = {
            span: 5,
        };
        const wrapperCol = {
            span: 13,
        };
        const formState = reactive({
            name: store.state.user.name,
            gender: store.state.user.gender,
            age: store.state.user.age,
            major: store.state.user.major,
            interest_position: store.state.user.interest_position,
            interest_city: store.state.user.interest_city,
            education: store.state.user.education,
            avatar: store.state.user.avatar,
        });
        console.log(formState);
        const headers = {
            'Authorization': 'Bearer ' + store.state.user.access,
        }
        const rules = {
        name: [
            {
            required: true,
            message: '请输入你的名字',
            trigger: 'change',
            },
            {
            trigger: 'blur',
            },
        ],
        age: [
            {
            required: true,
            message: '请选择你的年龄',
            trigger: 'change',
            type: 'number',
            },
        ],
        major: [
            {
            required: true,
            message: '请输入你的专业',
            trigger: 'change',
            },
        ],
        gender: [
            {
            required: true,
            message: '请选择性别',
            trigger: 'change',
            },
        ],
        interest_position: [
            {
            required: true,
            message: '请输入你的兴趣岗位',
            trigger: 'change',
            },
        ],
        interest_city: [
            {
            required: true,
            message: '请输入你的兴趣城市',
            trigger: 'blur',
            },
        ],
        education: [
            {
            required: true,
            message: '请选择你的学历',
            trigger: 'blur',
            },
        ],
        };


        // 提交函数
        const onSubmit = () => {
            formRef.value
                .validate()
                .then(() => {
                    let {name, age, major, gender, interest_position, interest_city, education} = toRaw(formState);
                    $.ajax({
                        url: 'http://47.105.178.110:8000/user/mod_info',
                        type: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": 'Bearer ' + store.state.user.access,
                        },
                        data: JSON.stringify({
                            name: name,
                            age: age,
                            major: major,
                            gender,
                            interest_position,
                            interest_city,
                            education,
                        }),
                        success(resp) {
                            if (resp.result === 'success') {
                                // 修改成功后，更新store中的数据
                                $.ajax ({
                                    url: 'http://47.105.178.110:8000/user/get_info',
                                    type: 'GET',
                                    headers: {
                                        'Authorization': 'Bearer ' + store.state.user.access,
                                        'Content-Type': 'application/json'
                                    },
                                    success: (resp) => {
                                        if (resp.result === 'success') {
                                            store.commit('updateInfo', {
                                                ...resp.data, 
                                            });
                                            alert('修改成功');
                                            // router.push('/home');
                                        }
                                        else
                                            alert('修改失败，请稍后再试');
                                    },   
                                })
                            }
                            else {
                                alert(resp.msg);
                            }
                        },
                        error(resp) {
                            console.log(resp);
                            alert('系统错误，请稍后再试');
                        }
                    })
                })
                .catch(error => {
                    console.log('error', error);
                    alert('修改失败，请稍后再试');
                });
  
        };
        const goback = () => {
            router.go(-1);
        };

        // 上传图片服务
        function getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        }
        const fileList = ref([]);
        const loading = ref(false);
        const imageUrl = ref('');
        const handleChange = info => {
            if (info.file.status === 'uploading') {
                loading.value = true;
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, base64Url => {
                imageUrl.value = base64Url;
                loading.value = false;
                });
            }
            if (info.file.status === 'error') {
                loading.value = false;
                message.error('上传错误');
        }
        };
        const beforeUpload = file => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('你尽可以上传jepeg或者png格式的图片');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('你仅可以上传小于2M的图片');
            }
            return isJpgOrPng && isLt2M;
        };
        return {
            formRef,
            formState,
            rules,
            labelCol,
            wrapperCol,
            onSubmit,
            goback,
            fileList,
            loading,
            imageUrl,
            handleChange,
            beforeUpload,
            headers,

        };
    }
}
</script>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.img-icon {
  width: 100%;
  height: 100%;
}


.modify-info-title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    float: left;
    align-items: center;
    justify-content: center;
    writing-mode: vertical-rl;
    width: 50px;
    /* margin-top: 18%; */
    margin-right: 5%;
    margin-left: 3%;
    height: 70%;
}

</style>