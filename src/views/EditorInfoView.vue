<template>
    <MenuComponent>
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
            <a-form-item has-feedback label="Age" name="age">
                <a-input-number v-model:value="formState.age" />
            </a-form-item>
            <a-form-item label="专业">
                <a-input v-model:value="formState.major" />
            </a-form-item>
            <a-form-item label="学历" name="education">
            <a-radio-group v-model:value="formState.education">
                <a-radio value="高中">高中</a-radio>
                <a-radio value="专科">专科</a-radio>
                <a-radio value="本科">本科</a-radio>
                <a-radio value="硕士研究生">硕士研究生</a-radio>
                <a-radio value="博士研究生">博士研究生</a-radio>
                <a-radio value="其他">其他</a-radio>
            </a-radio-group>
            </a-form-item>
            
            <a-form-item label="兴趣岗位">
                <a-input v-model:value="formState.interest_position" />
            </a-form-item>
            <a-form-item label="兴趣城市">
                <a-input v-model:value="formState.interest_city" />
            </a-form-item>

            <a-form-item label="兴趣城市">
                <a-upload
                    v-model:file-list="fileList"
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                >
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                    <div v-else>
                    <loading-outlined v-if="loading"></loading-outlined>
                    <plus-outlined v-else></plus-outlined>
                    <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>

                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button @click="goback">返回</a-button>
                <a-button style="margin-left: 10px" type="primary" @click="onSubmit">修改</a-button>
                
                </a-form-item>
            </a-form-item>
        </a-form>
    </MenuComponent>
</template>

<script>

import MenuComponent from '@/components/MenuComponent.vue';
import { reactive, ref, toRaw } from 'vue';
import {useStore} from 'vuex';
import router from '../router/index';
import { message } from 'ant-design-vue';

export default {
    name: 'EditorInfoView',
    components: {
        MenuComponent,
    },
    setup() {
        const store = useStore();
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
        const rules = {
        name: [
            {
            required: true,
            message: 'Please input Activity name',
            trigger: 'change',
            },
            {
            min: 3,
            max: 5,
            message: 'Length should be 3 to 5',
            trigger: 'blur',
            },
        ],
        region: [
            {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
            },
        ],
        date1: [
            {
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
            type: 'object',
            },
        ],
        type: [
            {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
            },
        ],
        resource: [
            {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
            },
        ],
        desc: [
            {
            required: true,
            message: 'Please input activity form',
            trigger: 'blur',
            },
        ],
        };
        const onSubmit = () => {
        formRef.value
            .validate()
            .then(() => {
            console.log('values', formState, toRaw(formState));
            })
            .catch(error => {
            console.log('error', error);
            });
        };
        const goback = () => {
            router.go(-1);
        };
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
            message.error('upload error');
        }
        };
        const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
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
</style>