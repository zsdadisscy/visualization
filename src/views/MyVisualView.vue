<template>
    <MenuComponent>
        <VisualComponent/>
    </MenuComponent>
</template>
<script>

import MenuComponent from '@/components/MenuComponent.vue';
import VisualComponent from '@/components/VisualComponent.vue';

export default {
    name: 'MyVisualView',
    components: {
        MenuComponent,
        VisualComponent
    },
        
}

</script>
<style scoped>
    
</style>