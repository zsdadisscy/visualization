<template>
    <div class="visual-view">
        
        
        <div style="display: flex; justify-content: space-around; " >
        <div class="echart-box" ref="box"></div>
        <div class="echart-box" ref="boxpie"></div>
        
        </div>
        <div style="display: flex; justify-content: space-around;">
            <div class="echart-box" ref="boxpie_line"></div>
            <div class="echart-box" ref="boxpie_rose"></div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'VisualComponent',
    components: {
    
    },

    mounted() {
        // 挂在完成dom后进行初始化
        this.showEcarts();
    },
    methods: {
        showEcarts() {
            // 基于准备好的dom，初始化echarts实例
            const userdom = this.$refs.box
            const mycart = this.$echarts.init(userdom,'vintage')
            //绘制图表
            const option = {
                title: {
                    text: '城市数据统计',
             
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: ['青岛', '深圳', '北京', '日照', '广州', '济南']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110],
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
                        data: [
                            { value: 1048, name: '本科' },
                            { value: 735, name: '硕士' },
                            { value: 580, name: '专科' },
                            { value: 484, name: '博士' },
                        ],
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
                    top: 'bottom'
                },
              
                series: [
                    {
                    name: '公司性质',
                    type: 'pie',
                    center: ['50%', '50%'],
                    roseType: 'area',
                    
                    data: [
                        { value: 40, name: '民营' },
                        { value: 38, name: '国营' },
                        { value: 32, name: '外企' },
                        { value: 30, name: '其他' },
                    ]
                    }
                ]
            })
            const myline = this.$echarts.init(this.$refs.boxpie_line,'vintage')
            myline.setOption({
                title: {
                    text: '月发布',
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: ['12月','1月', '2月', '3月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: [150, 230, 224, 218],
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
    height: 270px;
    border: 3px solid pink;
    margin: 20px auto;
}
</style>
