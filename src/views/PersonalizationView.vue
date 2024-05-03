<template>
    <MenuComponent :key_menu="'4'">
        <a-modal v-model:open="open" title="建议你完善你的资料" @ok="handleOk"
            cancelText="暂不" okText="前去" @cancel="handleCancel"
        >
            <br>
            <p>由于你的资料尚未完善</p>
            <p>为了能根据你的资料为你提供职业推荐</p>
            <p>建议你完善你的资料，否则我们无法提供数据</p>
        </a-modal>
        <a-spin :spinning="spinning" size="large" class="loading" tip="加载中...">
            <div class="table-container" v-if="!spinning">
                <a-table
                    :columns="columns"
                    :data-source="dataSource"
                >
                </a-table>
            </div>  
            
            <div class='alert' v-if="!spinning">
                <span>以下结果仅供参考,数据来源于前程无忧，一切以官网数据为准</span>
            </div>
        </a-spin>
    </MenuComponent>
</template>
<script>

import MenuComponent from '@/components/MenuComponent.vue';
import $ from 'jquery';
import {useStore} from 'vuex';
import { ref } from 'vue';
import router from '@/router';

export default {
    name: 'PersonalizationView',
    components: {
        MenuComponent,
        
    },
    setup() {
        
        // 加载状态
        const spinning = ref(true);

        const current = ref(1);
        const dataSource = ref([]);
        const store = useStore();
        // 需要判断是否资料齐全否则跳转完善界面
        // 判断是否需要完善资料
        const open = ref(false);

        const handleOk = () => {
            router.push({name: 'editorinfo'});
        };

        const handleCancel = () => {
            open.value = false;
            router.go(-1);
        };

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
                        open.value = true;
                    }
                    else {
                    // 获取推荐数据
                    $.ajax({
                            url: 'http://47.105.178.110:8000/recommend/recommend_data',
                                type: 'get',
                                headers: {
                                    "Authorization": 'Bearer ' + store.state.user.access,
                                },
                                success(resp) {
                                    // 处理数据
                                    if (resp.result === 'success') {
                                        for (let i = 0; i < resp.data.length; i++) {
                                            dataSource.value.push({
                                                key: i,
                                                companyname: resp.data[i][5],
                                                jobname: resp.data[i][0],
                                                address: resp.data[i][1],
                                                salary: resp.data[i][2],
                                                workexperience: resp.data[i][3],
                                                education: resp.data[i][4],
                                                companytype: resp.data[i][6],
                                                industrytype: resp.data[i][9],
                                                url: resp.data[i][7],
                                                companyurl: resp.data[i][8],
                                            })
                                        }
                                        spinning.value = false;
                                    }
                                }
                        });
                    }
                }
                else if (resp.msg ===  "Signature verification failed") {
                    store.state.user.is_login = false;
                    router.push({name:'login'});
                }
                
            },
            error(resp) {
                console.log(resp);
                if (resp.msg !== '')
                    router.push({name:'login'});
                else
                    alert('系统错误');
            }
        });
        
        const columns = [
                {
                    title: '公司名称',
                    dataIndex: 'companyname',
                    key: 'companyname',
                    
                },
                {
                    title: '岗位名称',
                    dataIndex: 'jobname',
                    key: 'jobname',
                },
                {
                    title: '工作地点',
                    dataIndex: 'address',
                    key: 'address',
                },
                {
                    title: '薪资',
                    key: 'salary',
                    dataIndex: 'salary',
                },
                {
                    title: '所需工作经验',
                    key: 'workexperience',
                    dataIndex: 'workexperience',
                },
                {
                    title: '学历要求',
                    key: 'education',
                    dataIndex: 'education',
                },
                {
                    title: '公司性质',
                    key: 'companytype',
                    dataIndex: 'companytype',
                },
                {
                    title: '行业类型',
                    key: 'industrytype',
                    dataIndex: 'industrytype',
                },
                {
                    title: '职位官网',
                    key: 'url',
                    dataIndex: 'url',
                },
                {
                    title: '公司官网',
                    key: 'companyurl',
                    dataIndex: 'companyurl',
                },
                
            ];

            

            return {
                columns,
                dataSource,
                columns,
                current,
                open,
                handleOk,
                handleCancel,
                spinning,
            };
            
    },

}

</script>

<style scoped>
    
.alert {
    background-color: #f0f0f0;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    text-align: center;
    
}


.table-container {
    max-height: 81vh;
    overflow-y: auto;
}


.loading {
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
}

</style>