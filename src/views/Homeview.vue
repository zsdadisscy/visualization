<template>
    <div>
        <MenuComponent/>
    </div>
</template>

<script>
import $ from 'jquery';
import {useStore} from 'vuex';
import router from '../router/index';
import { judge_online } from '@/user_function/user';
import MenuComponent from '@/components/MenuComponent.vue';

export default {
    name: 'HomeView',
    components: {
        MenuComponent,
    },
    setup() {
        const store = useStore();

        if (!judge_online()) {
            router.push('/login');
        }
        
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
                        console.log('未完善');
                    }
                }
                else if (resp.msg ===  "Signature verification failed") {
                    store.state.user.is_login = false;
                    router.push('/login');
                }
            },
            error(resp) {
                console.log(resp);
                if (resp.msg !== '')
                    router.push('/login');
                else
                    alert('系统错误');
            }
        });
    }
}
</script>

<style scoped>
/* Your component's CSS styles go here */
</style>