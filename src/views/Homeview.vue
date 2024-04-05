<template>
    <MenuComponent :title_text="'首页'">
        <a-modal v-model:open="open" title="建议你完善你的资料" @ok="handleOk"
            cancelText="暂不" okText="前去"
        >
            <br>
            <p>由于你的资料尚未完善</p>
            <p>为了你能够得到更好的个性化服务</p>
            <p>建议你完善你的资料</p>
        </a-modal>
    </MenuComponent>
</template>

<script>
import $ from 'jquery';
import {useStore} from 'vuex';
import router from '../router/index';
import { judge_online } from '@/user_function/user';
import MenuComponent from '@/components/MenuComponent.vue';
import {ref} from 'vue';

export default {
    name: 'HomeView',
    components: {
        MenuComponent,
    },
    setup() {
        const store = useStore();

        if (!judge_online()) {
            router.push({name: 'login'});
            
        }
        
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
                console.log(resp);
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

</style>