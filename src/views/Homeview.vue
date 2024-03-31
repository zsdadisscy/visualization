<template>
    <div>
        <h1>Home</h1>
    </div>
</template>

<script>
import $ from 'jquery';
import {useStore} from 'vuex';
import router from '../router/index';


export default {
    name: 'HomeView',
    components: {
        // Your component's name goes here
    },
    setup() {
        const store = useStore();
        if (!store.state.user.is_login) {
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
                alert('系统错误');
            }
        });
    }
}
</script>

<style scoped>
/* Your component's CSS styles go here */
</style>