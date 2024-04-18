<template>
    <div class="background">
        <div class="title" v-if="is_text"><h1>大学生就业分析与推荐可视化系统</h1></div>
        
        <slot></slot>
    </div>
</template>
<script >

import { judge_online } from '../user_function/user';
import router from '../router/index';

export default {
    name: 'BackGround',
    props: {
        is_text: {
            type: Object,
            required: true,
        }
    },
    setup () {
        if (judge_online()) {
            router.push({name: 'home'});
        }
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
    .title {
        position: absolute;
        top: 35%;
        left: 35%;
        transform: translate(-50%, -50%);
        color: #e9d7df;
        font-size: 25px;
    }
    
</style>
