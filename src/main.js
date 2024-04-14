import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';
import * as Icons from '@ant-design/icons-vue';
// import Vue from 'vue';
import router from './router';
import store from './store';
// import iView from 'iview';
// import img from './lib/img'
// import utils from './lib/utils';

//引入echarts
import * as echarts from 'echarts'

//vue全局注入echarts
// Vue.prototype.$echarts = echarts;
// Vue.prototype.$images = img
// Vue.config.productionTip = false;
// Vue.use(iView);
// Vue.use(utils)

const app = createApp(App);
// 全局注入echarts
app.config.globalProperties.$echarts = echarts;
app.use(router).use(store).use(Antd);
for (const i in Icons) {
    app.component(i, Icons[i])
}
app.mount('#app');