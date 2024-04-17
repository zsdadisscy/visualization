<template>
    <MenuComponent :key_menu="'3'">
        <VisualComponent :job="job" />
    </MenuComponent>
</template>
<script>
import MenuComponent from '@/components/MenuComponent.vue';
import VisualComponent from '@/components/VisualComponent.vue';
import {useStore}  from 'vuex';
import {useRoute} from 'vue-router';
import { ref } from 'vue';

export default {
    name: 'SerVisualView',
    components: {
        MenuComponent,
        VisualComponent
    },
    setup() {
        const route = useRoute();
        const job = ref(route.params.job);
        
        const store = useStore();
        return {
            job,
            store
        }
    }
}
</script>
<style scoped>
</style>