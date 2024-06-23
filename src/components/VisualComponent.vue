<template>
    
    <a-modal v-model:open="open" title="抱歉"  @ok="handleOk"
        cancelText="取消" okText="确定"
    >
        <br>
        <p>十分抱歉，目前数据库中暂时没有该职业信息，</p>
        <p>已在后台登记，请你稍等一段时间再来查看</p>
        <p>即将跳转到主页</p>
    </a-modal>
    <a-button class="shift" @click="shift_view" type="primary">职业招聘地区分布</a-button>
    <div class="visual-view" v-if="is_show">
        <div style="display: flex; justify-content: space-around; " >
        <div class="echart-box" ref="box"></div>
        <div class="echart-box" ref="boxpie"></div>
        
        </div>
        
        <div style="display: flex; justify-content: space-around;">
            <div class="echart-box" ref="boxpie_line"></div>
            <div class="echart-box" ref="boxpie_rose"></div>
           
        </div>
    </div>
    <div class="no-data" v-if="!is_show">
        <a-typography>
            <a-typography-title>数据暂时不存在，十分抱歉</a-typography-title>
            
        </a-typography>
    </div>
</template>

<script>
import $ from 'jquery';
import {useStore} from 'vuex';
import router from '../router/index';
import { ref } from 'vue';
import { judge_online } from '@/user_function/user';

export default {
    name: 'VisualComponent',
    components: {
    
    },
    props: {
        job: {
            type: String,
            required: true
        }
    },
    setup(props) {
        
        const store = useStore();
        let city_keys = [];
        let city_values = [];
        let degree_keys = [];
        let degree_values = [];
        let companytype_keys = [];
        let companytype_values = [];
        let date_keys = [];
        let date_values = [];
        let degree = [];
        let companytype = [];
        const is_show = ref(true);

        // 判断是否存在数据
        function getData() {
            $.ajax({
                url: 'http://127.0.0.1:8000/data/judge_data',
                type: 'post',
                headers: {
                        'Content-Type': 'application/json',
                        "Authorization": 'Bearer ' + store.state.user.access,
                },
                async: false,
                data: JSON.stringify({
                    job: props.job
                }),
                success(resp) {
                    if (resp.result === 'success') {
                        open.value = false;

                        $.ajax({
                            url: 'http://127.0.0.1:8000/data/analysis_data',
                            type: 'post',
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": 'Bearer ' + store.state.user.access,
                            },
                            async: false,
                            data: JSON.stringify({
                                job: props.job
                            }),
                            success(resp) {
                                // console.log(resp);
                                if (resp.result === 'success') {
                                    // console.log(resp);
                                    // 不能直接赋值，否则会出现数据不显示的问题，等价为一个副本
                                    city_keys.push(resp.city_counts_key);
                                    city_values.push(resp.city_counts_values);
                                    degree_keys = Object.keys(resp.degree_counts);
                                    degree_values = Object.values(resp.degree_counts);
                                    companytype_keys = Object.keys(resp.companytype_counts);
                                    companytype_values = Object.values(resp.companytype_counts);
                                    date_keys.push(resp.date_counts_key);
                                    date_values.push(resp.date_counts_values);
                                    for (let i = 0; i < degree_keys.length; i++) {
                                        degree.push({value: degree_values[i], name: degree_keys[i]});
                                    }
                                    for (let i = 0; i < companytype_keys.length; i++) {
                                        companytype.push({value: companytype_values[i], name: companytype_keys[i]});
                                    }
                                    // city_keys = city_keys.slice(0, 10);
                                    // city_values = city_values.slice(0, 10);
                                    
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
            // city_keys = city_keys.slice(0, 10);
            // city_values = city_values.slice(0, 10);
            // console.log(is_show.value);
        };

        const open = ref(false);

        const handleOk = () => {
            // 不存在登记信息
            $.ajax({
                url: 'http://127.0.0.1:8000/data/register_data',
                type: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + store.state.user.access,
                },
                data: JSON.stringify({
                    job: props.job
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
        const shift_view = () => {
            router.push({name: 'map',  params: { job: props.job }});
        };

        return {
            open,
            handleOk,
            city_keys,
            city_values,
            degree_keys,
            degree_values,
            companytype_keys,
            companytype_values,
            date_keys,
            date_values,
            degree,
            companytype,
            getData,
            is_show,
            shift_view

        }
    },
    mounted() {
        // 判断是否登录
        if (!judge_online()) {
            router.push({name: 'login'});
        }
        else {
            this.getData();
            // 挂在完成dom后进行初始化
            // console.log(this.is_show);
            if (this.is_show )
                this.showEcarts();
        }
    },
    methods: {
        
        


        showEcarts() {
            // 基于准备好的dom，初始化echarts实例
            const userdom = this.$refs.box
            const mycart = this.$echarts.init(userdom,'vintage');
     
            let top_city = [];
            let top_city_value = [];
            for (let i = 0; i < 10; i++) {
                top_city.push(this.city_keys[0][i]);
                top_city_value.push(this.city_values[0][i]);
                
            }
            // console.log(top_city_value,top_city);
            //绘制图表
            let option = {
                title: {
                    text: '城市数据统计（前十名）',
             
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: top_city
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        data: top_city_value,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            };
 
            // 渲染图表
            mycart.setOption(option)
            //饼图 
            const mypie = this.$echarts.init(this.$refs.boxpie,'vintage')
            mypie.setOption({
                title: {
                    text: '学历要求',
                    
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '学历',
                        type: 'pie',
                        radius: '50%',
                        data: this.degree,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
            //饼图 
            const mypie_rose = this.$echarts.init(this.$refs.boxpie_rose,'vintage')
            mypie_rose.setOption({
                title: {
                    text: '公司性质',
                    left: 'center'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                    name: '公司性质',
                    type: 'pie',
                    center: ['50%', '50%'],
                    roseType: 'area',
                    
                    data:this.companytype
                    }
                ]
            })
            const myline = this.$echarts.init(this.$refs.boxpie_line,'vintage')
            let date_keys_ = this.date_keys[0];
            let date_values_ = this.date_values[0];
            myline.setOption({
                title: {
                    text: '月发布',
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: date_keys_
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                    data: date_values_,
                    type: 'line'
                    }
                ]
            })
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
    width: 500px;
    height: 37vh;
    border: 3px solid pink;
    margin: 20px auto;
}
.no-data{
    margin: 0 auto;
    width: 70%;
    padding: 20px;
    margin-top: 10%;
}
.shift {
    position: absolute;
    right: 20px;
    top: 200px;
    height: 50%;
    width: 2%;
    padding: 0px;
    writing-mode: vertical-rl;
}
</style>
