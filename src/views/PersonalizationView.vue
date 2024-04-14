<template>
    <MenuComponent>
        
        <a-table :columns="columns" :data-source="data">
            <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
                <span>
                <smile-outlined />
                Name
                </span>
            </template>
            </template>

            <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
                <a>
                {{ record.name }}
                </a>
            </template>
            <template v-else-if="column.key === 'tags'">
                <span>
                <a-tag
                    v-for="tag in record.tags"
                    :key="tag"
                    :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                >
                    {{ tag.toUpperCase() }}
                </a-tag>
                </span>
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                <a>Invite 一 {{ record.name }}</a>
                <a-divider type="vertical" />
                <a>Delete</a>
                <a-divider type="vertical" />
                <a class="ant-dropdown-link">
                    More actions
                    <down-outlined />
                </a>
                </span>
            </template>
            </template>
        </a-table>
        <div class='alert'>
            <span>以下结果仅供参考数据来源于前程无忧，一切以官网数据为准</span>
        </div>
    </MenuComponent>
</template>
<script>

import MenuComponent from '@/components/MenuComponent.vue';
// import VisualComponent from '@/components/VisualComponent.vue';

export default {
    name: 'PersonalizationView',
    components: {
        MenuComponent,
        // VisualComponent
    },
    data() {
        return {
            columns: [
                {
                    title: '公式名称',
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
                    dataIndex: 'salary',
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
                    title: '前程无忧官网',
                    key: 'url',
                    dataIndex: 'url',
                },
                {
                    title: '公司官网',
                    key: 'companyurl',
                    dataIndex: 'companyurl',
                }
            ],
            data: [
                {
                    key: '1',
                    companyname: '北京世纪放歌企业管理咨询',
                    jobname: '计算机管理员',
                    address: '北京·石景山区',
                    salary: '1-1.5万',
                    workexperience: '3-4年',
                    education: '大专',
                    companytype: '民营',
                    url:'https://jobs.51job.com/beijing-sjsq/126358192.html?s=sou_sou_soulb&t=0_0&req=e2ca8c3daa782dfb672a4b0d3792b5cb',
                    companyurl: 'https://jobs.51job.com/all/coBWUBbV49DjcAbVA0AWQ.html'
                },
                {
                    key: '2',
                    companyname: '深圳市晟才高级中学',
                    jobname: '信息技术及电脑维护老师',
                    address: '深圳·龙岗区',
                    salary: '18-25万/年',
                    workexperience: '1年',
                    education: '本科',
                    companytype: '民营',
                    url:'https://jobs.51job.com/shenzhen-lgq/137456324.html?s=sou_sou_soulb&t=0_0&req=e2ca8c3daa782dfb672a4b0d3792b5cb',
                    companyurl: 'https://jobs.51job.com/all/coAmFXMF84UmkAZAVlUTM.html'
                },
                {
                    key: '3',
                    companyname: '大连益点通信息技术',
                    jobname: '网络管理员',
                    address: '大连·沙河口区',
                    salary: '8千-1万·14薪',
                    workexperience: '1年',
                    education: '本科',
                    companytype: '民营',
                    url:'https://jobs.51job.com/dalian-shkq/152327068.html?s=sou_sou_soulb&t=0_0&req=e2ca8c3daa782dfb672a4b0d3792b5cb',
                    companyurl: 'https://jobs.51job.com/all/coCWlWOlc8UWpRPQBnVjA.html'
                },
                {
                    key: '4',
                    companyname: '深圳市晟才高级中学',
                    jobname: '信息技术及电脑维护老师',
                    address: '深圳·龙岗区',
                    salary: '18-25万/年',
                    workexperience: '1年',
                    education: '本科',
                    companytype: '民营',
                    url:'https://jobs.51job.com/shenzhen-lgq/137456324.html?s=sou_sou_soulb&t=0_0&req=e2ca8c3daa782dfb672a4b0d3792b5cb',
                    companyurl: 'https://jobs.51job.com/all/coBWUBbV49DjcAbVA0AWQ.html'
                },
                

                
            ],
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

</style>