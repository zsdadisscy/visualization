<template>
    <MenuComponent>
        <VisualComponent :job="store.state.user.major"/>
    </MenuComponent>
</template>
<script>

import MenuComponent from '@/components/MenuComponent.vue';
import VisualComponent from '@/components/VisualComponent.vue';
import {useStore}  from 'vuex';

export default {
    name: 'MyVisualView',
    components: {
        MenuComponent,
        VisualComponent
    },
    setup() {
        const store = useStore();
        return {
            store
        }
    }
        
}

</script>
<style scoped>
    
</style>