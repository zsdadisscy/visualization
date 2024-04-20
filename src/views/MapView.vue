<template>
    <MenuComponent :key_menu="'3'">
        <a-modal v-model:open="open" title="抱歉"  @ok="handleOk"
        cancelText="取消" okText="确定"
    >
        <br>
        <p>十分抱歉，目前数据库中暂时没有该职业信息，</p>
        <p>已在后台登记，请你稍等一段时间再来查看</p>
        <p>即将跳转到主页</p>
    </a-modal>
    <a-button class="shift" @click="shift_view_" type="primary">职业数据分析图</a-button>
    <div style="display: flex; justify-content: space-around;" v-if="is_show"> 
        <div class="echart-box" ref="map"></div>
    </div>
    <div class="no-data" v-if="!is_show">
    <a-typography>
        <a-typography-title>数据暂时不存在，十分抱歉</a-typography-title>
        
    </a-typography>
    </div>
    </MenuComponent>
</template>
<script>

import $ from 'jquery';
import {useStore} from 'vuex';
import router from '../router/index';
import { ref } from 'vue';
import MenuComponent from '@/components/MenuComponent.vue';
import { judge_online } from '@/user_function/user';
import { useRoute } from 'vue-router';

export default {
    name: 'MapView',
    components: {
        MenuComponent,
    },
    props: {
        
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const job = ref(route.params.job);
        
        const is_show = ref(true);
        

        const open = ref(false);

        const handleOk = () => {
            // 不存在登记信息
            $.ajax({
                url: 'http://47.105.178.110:8000/data/register_data',
                type: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + store.state.user.access,
                },
                data: JSON.stringify({
                    job: job.value
                }),
                success(resp) {
                    if (!resp.result === 'success') {
                        alert('系统错误，登记失败');
                    } 
                },
                error() {
                    alert('系统错误');
                }
            });

            router.push({name: 'home'});
        };
        // 切换界面
        const shift_view_ = () => {
            router.push({name: 'servisual', params: {job: job.value}});
        };

        return {
            open,
            handleOk,
            is_show,
            shift_view_

        }
    },
    mounted() {
        
        // 判断是否登录
        if (!judge_online()) {
            router.push({name: 'login'});
        }
        else {
            
            if (this.is_show )
                this.showEcarts();
        }
        
    },
    methods: {

        showEcarts() {
            const store = useStore();
            let option = null;
            const route = useRoute();
            let province_data = [];
            // 地图
            const my_map = this.$refs.map
            const myChart = this.$echarts.init(my_map,'vintage');
            const th = this.$echarts;
            const job = ref(route.params.job);
            $.ajax({
                // 阿里可视化平台api
                url:'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full',
                type: 'get',
                success (geoJson) {
                    let provinces = {};
                    // 判断是否存在数据
                    $.ajax({
                        url: 'http://47.105.178.110:8000/data/judge_data',
                        type: 'post',
                        headers: {
                                'Content-Type': 'application/json',
                                "Authorization": 'Bearer ' + store.state.user.access,
                        },
                        async: false,
                        data: JSON.stringify({
                            job: job.value
                        }),
                        success(resp) {
                            if (resp.result === 'success') {
                                open.value = false;

                                $.ajax({
                                    url: 'http://47.105.178.110:8000/data/province_data',
                                    type: 'post',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        "Authorization": 'Bearer ' + store.state.user.access,
                                    },
                                    async: false,
                                    data: JSON.stringify({
                                        job: job.value
                                    }),
                                    success(resp) {
                                        console.log(resp);
                                        if (resp.result === 'success') {
                                            provinces = resp.province_counts;
                                            // console.log(provinces);
                                        } 
                                    },
                                    error() {
                                        alert('系统错误');
                                    }
                                })
                            } else {
                                is_show.value = false;
                                open.value = true;
                                // 数据不存在
                            }
                        },
                        error() {
                            alert('系统错误');
                        }
                    })

                console.log(provinces);
                // 处理数据
                for (let i = 0; i < geoJson.features.length; i++) {
                    if (geoJson.features[i].properties.name in provinces) {
                        province_data.push({
                            name:geoJson.features[i].properties.name, value: provinces[geoJson.features[i].properties.name]
                        });
                    } else {
                        province_data.push({
                            name:geoJson.features[i].properties.name, value: 0
                        });
                    }
                }
                console.log(province_data);
                myChart.hideLoading();
                th.registerMap('china', geoJson);

                myChart.setOption(
                    (option = {
                       
                    title: {
                        text: '职业招聘地区分布',
                        left: 'center',
                        top: '5%',
                        textStyle: {
                            fontSize: 24,  // 设置标题的字体大小
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        tooltip: {
                        // 鼠标移到图里面的浮动提示框
                        // formatter详细配置： https://echarts.baidu.com/option.html#tooltip.formatter
                        formatter(params, ticket, callback) {
                        // params.data 就是series配置项中的data数据遍历
                            let localValue, perf, downloadSpeep, usability, point;
                            if (params.data) {
                                localValue = params.data.value;
                            } else {
                            // 为了防止没有定义数据的时候报错写的
                                localValue = 0;
                            }
                            let htmlStr = `
                            <div style='font-size:18px;'> ${params.name}</div>
                            <p style='text-align:left;margin-top:-10px;'>
                            区域对应数据value：${localValue}<br/>
                            </p>
                        `;
                            return htmlStr;
                        },
                        backgroundColor:"#ff7f50",//提示标签背景颜色
                        textStyle:{color:"#fff"} //提示标签字体颜色
                        },
                    },
                    visualMap: {
                        left: 'left',
                        min: 0,
                        max: 300,
                        itemWidth: 30,  // 设置 visualMap 组件的宽度
                        itemHeight: 200,  // 设置 visualMap 组件的高度
                        bottom: '6%',
                        left: '1%',
                        inRange: {
                            color: [
                            '#313695',
                            '#4575b4',
                            '#74add1',
                            '#abd9e9',
                            '#e0f3f8',
                            '#ffffbf',
                            '#fee090',
                            '#fdae61',
                            '#f46d43',
                            '#d73027',
                            '#a50026'
                            ]
                        },
                        text: ['高', '低'],
                        calculable: true
                        },
                    series: [
                        {
                        // 放大操作
                        roam: true, // 是否开启鼠标缩放和平移漫游
                        zoom: 1.5, // 当前视角的缩放比例（地图的放大比例）
                         //鼠标划过的高亮设置；包括省份板块颜色和字体等
                        emphasis: {
                            itemStyle: {
                                areaColor: '#d0a3a3',
                            },
                            label: {
                                show: true,
                                color:"rgb(255,255,255)"
                            }
                        },
                        center: [104.114129, 34.550339], 
                        itemStyle: {
                            // 地图区域的多边形 图形样式。
                            borderColor: "rgba(0, 0, 0, 0.2)",
                            emphasis: {
                            // 高亮状态下的多边形和标签样式
                            shadowBlur: 20,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                        name: '职业招聘地区分布',
                        type: 'map',
                        map: 'china',
                        label: {
                            show: true,
                            
                        },
                        data: province_data
                        
                        }
                        
                    ]
                    })
                );
                }
            });
            
        },
    },
}
</script>
        

<style scoped>

.visual-view {
    width: 100%;
    height: 100%;
}
.echart-box{
    width: 100%;
    height: 90vh;
    
}

.shift {
    position: absolute;
    right: 20px;
    top: 200px;
    height: 50%;
    width: 2%;
    padding: 0px;
    writing-mode: vertical-rl;
    z-index: 1000;
}

</style>
