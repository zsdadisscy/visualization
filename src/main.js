import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';
import * as Icons from '@ant-design/icons-vue';

import router from './router';
import store from './store';


const app = createApp(App);

app.use(router).use(store).use(Antd);
for (const i in Icons) {
    app.component(i, Icons[i])
}
app.mount('#app');