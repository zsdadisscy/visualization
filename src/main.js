import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';
import router from './router';
import store from './store';

// const IPADDRESS = 'http://localhost:3000';

const app = createApp(App);

app.use(router).use(store).use(Antd).mount('#app');