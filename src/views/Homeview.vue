<template>
    <MenuComponent :key_menu="'1'">
        <a-modal v-model:open="open" title="建议你完善你的资料" @ok="handleOk"
            cancelText="暂不" okText="前去"
        >
            <br>
            <p>由于你的资料尚未完善</p>
            <p>为了你能够得到更好的个性化服务</p>
            <p>建议你完善你的资料</p>
        </a-modal>
        <div class="home-box">
            <a-typography>
                <a-typography-title>大学生就业分析与推荐可视化</a-typography-title>
                <a-typography-paragraph>
                本系统致力于为大学生提供就业分析与推荐服务，帮助大学生更好的了解自己的就业情况，为大学生提供更好的就业推荐服务。
                </a-typography-paragraph>
                <a-typography-paragraph>
                希望本系统能够帮助到你。如发现问题请联系管理员。
                </a-typography-paragraph>
            </a-typography>
        </div>
    </MenuComponent>
</template>

<script>
import $ from 'jquery';
import {useStore} from 'vuex';
import router from '../router/index';

import MenuComponent from '@/components/MenuComponent.vue';
import {ref} from 'vue';

export default {
    name: 'HomeView',
    components: {
        MenuComponent,
    },
    setup() {
        const store = useStore();

        
        
        // 判断是否需要完善资料
        const open = ref(false);

        const handleOk = () => {
            router.push({name: 'editorinfo'});
        };

        $.ajax({
            url: "http://47.105.178.110:8000/user/get_status",
            type: "get",
            headers: {
                'Authorization': 'Bearer ' + store.state.user.access,
            },
            success(resp) {
                if (resp.result === 'success') {
                    // 需要修改资料
                    if (resp.data === '未完善')
                    {
                        open.value = true;
                    }
                }
                else if (resp.msg ===  "Signature verification failed") {
                    store.state.user.is_login = false;
                    router.push({name:'login'});
                }
            },
            error(resp) {
                // console.log(resp);
                if (resp.msg !== '')
                    router.push({name:'login'});
                else
                    alert('系统错误');
            }
        });
        return {
            open,
            handleOk,
        }
    }
}
</script>

<style scoped>

.home-box {
    margin: 0 auto;
    width: 70%;
    padding: 20px;
    margin-top: 10%;
}

</style>