<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible width="300px">
      <div class="logo"> 
        <router-link to="/home">
          <img v-if="collapsed" src="../../public/images/data.svg" alt="logo" style="width: 45px; margin-top: -15px; margin-left: 0px;"/>
          <h3 v-if="!collapsed" color="white">&nbsp;&nbsp;大学生就业分析与推荐可视化系统</h3>
        </router-link>
      </div>
      <!-- 侧边栏的菜单   -->
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <router-link to="/home" >
              <HomeOutlined />
              <span>首页</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/myvisual">
              <FundOutlined />
              <span>专业信息</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3" @click="showDrawer">
          <SearchOutlined />
          <span >搜索其他职业信息
          </span>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/personalization">
            <ExperimentOutlined />
            <span>个性化推荐</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- 侧边栏折叠时的样式  -->
    <a-layout>
      <!-- 上面白条 -->
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        
        <!-- 头像 -->
        <div class="user-info" @mouseenter="open_info" @mouseleave="close_info">
          <div class='user-avatar'>
            <a-avatar :size="48" style="right: 5px" :src="avatar_link">
              <template #icon v-if="typeof(avater_link) === 'undefined'">
                <user-outlined />
              </template>
            </a-avatar>
            <div class="show">
              <CaretDownFilled />
            </div>
        </div>
          <div class="info" v-if="show_info">
            <a-button type="link" :block="true"><router-link to="/editorinfo">编辑资料</router-link></a-button>
            <a-button type="link" :block="true"><router-link to="/modifypassword">修改密码</router-link></a-button>
            <a-button type="link" :block="true"><router-link to="/modifyprotection">修改密保</router-link></a-button>
            <a-button type="link" :block="true" @click="logout">登出</a-button>
          </div>
        </div>        
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px',  background: '#fff', minHeight: '280px' }"
      >
      <!-- 抽屉搜索 -->
        <a-drawer :width="500" :placement="placement" :open="open" @close="onClose">
          <template #extra>
            <a-input-search
              v-model:value="ser_value"
              placeholder="请输入你感兴趣的职业"
              enter-button
              @search="onSearch"
            />
          </template>
          <div class="ser-res" v-if="ser_res === 1">
            <p>十分抱歉，目前数据库中暂时没有该职业信息</p>
            <p>已在后台登记你的查询，请你稍等一段时间再来查看</p>
            <p>你可以看看其他职业</p>
            <a-button type="primary" @click="cancel_ser" block>确定</a-button>
          </div>
          <div class="ser-res" v-if="ser_res === 2">
            <p>数据中存在该数据吗，点击确认键跳转查看</p>
            <a-button @click="cancel_ser" style="margin-right: 30px;">取消</a-button>
            <a-button type="primary" @click="go_visual">确定</a-button>
          </div>

        </a-drawer>
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script >

import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '../router/index';
import $ from 'jquery';

export default {
  name: 'MenuComponent',
  props: {
    key_menu : String,
  },

  setup(props) {
    

    // 左边抽屉
    const placement = ref('left');
    const open = ref(false);
    const showDrawer = () => {
      open.value = true;
    };
    const onClose = () => {
      open.value = false;
    };


    // 显示来蓝色逻辑

    const selectedKeys = ref(['1']);
    

    if (props.key_menu !== undefined) {
      selectedKeys.value = [props.key_menu];
    }
    const collapsed = ref(false);
    const store = useStore();
    const avatar_link = ref(store.state.user.avatar);
    const show_info = ref(false);
    
    const open_info = () => {
      show_info.value=true;
    }

    const close_info = () => {
      show_info.value = false;
    }


    const logout = () => {
      store.commit('logout');
      router.push({name :'login'});
    };
    // 搜索逻辑
    const ser_res = ref(0);
    const ser_value = ref('');
    const onSearch = searchValue => {
      $.ajax({
                url: 'http://127.0.0.1:8000/data/judge_data',
                type: 'post',
                headers: {
                        'Content-Type': 'application/json',
                        "Authorization": 'Bearer ' + store.state.user.access,
                },
                async: false,
                data: JSON.stringify({
                    job: searchValue,
                }),
                success(resp) {
                    if (resp.result === 'success') {
                        ser_res.value = 2;
                    }
                    else {
                        ser_res.value = 1;
                         // 不存在登记信息
                        $.ajax({
                            url: 'http://127.0.0.1:8000/data/register_data',
                            type: 'post',
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": 'Bearer ' + store.state.user.access,
                            },
                            data: JSON.stringify({
                                job: searchValue,
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

                    }
                },
                error() {
                  alert('系统错误');
                }

      })
    }
    const cancel_ser = () => {
      ser_res.value = 0;
    };
    
    const go_visual = () => {
      router.push({name: 'servisual', params: { job: ser_value.value }});
    };
    return {
      selectedKeys,
      collapsed,
      store,
      avatar_link,
      show_info,
      open_info,
      close_info,
      logout,
      open,
      showDrawer,
      onClose,
      placement,
      ser_value,
      onSearch,
      ser_res,
      cancel_ser,
      go_visual,
    };
  },
};


</script>


<style scoped>
#components-layout-demo-custom-trigger {
  height: 100vh;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  color: white;
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.user-info {
  position: absolute;
  right: 50px;
  
  top: 0;
  width: 100px;
  float: right;
  
}

.user-avatar {
  border-radius: 5%;
  padding-left: 20px;
  position: relative;
  position: relative;
  right: 20px;
  width: 100px;
}

.user-avatar:hover {
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  background: rgba(191,191,191, 0.2);
}

.show {
  display: inline-block;
  margin-left:4px;
}

.info {
  position: relative;
  right: 20px;
  top: 5px;
  width: 100px; /* Adjust the width as needed */
  z-index: 9999; /* Set a high z-index value to make it appear on top */
  border: 1px solid #ccc;
  border-radius: 5%;
  background: white;
}

.title {
  position: absolute;
  top: 0;
  right: 40%;
  text-align: center;
}

.ser-res {
  margin-top: 20px;
  text-align: center;
}

</style>