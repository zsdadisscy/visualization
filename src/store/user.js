import $ from 'jquery';
import jwt_decode from 'jwt-decode';
import encrypt from '../user_function/user.js'


const ModeuleUser = {
    state: {
        username: '',
        name: '',
        gender: '男',
        age: 0,
        major: '',
        interest_position: '',
        interest_city: '',
        education: '',
        avatar: '',
        access: '',
        refresh: '',
        is_login: false,
    },
    getters: {

    },
    mutations: {
        updateUser(state, user) {
            state.username = user.username;
            state.name = user.name;
            state.gender = user.gender;
            state.age = user.age;
            state.major = user.major;
            state.interest_position = user.interest_position;
            state.interest_city = user.interest_city;
            state.education = user.education;
            state.avatar = user.avatar;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = user.is_login;
        },
        updateAccess(state, access) {
            state.access = access;
        },
        logout(state) {
            state.username = '';
            state.name = '';
            state.major = '';
            state.interest_position = '';
            state.interest_city = '';
            state.education = '';
            state.avatar = '';
            state.access = '';
            state.refresh = '';
            state.is_login = false;
        }
    },
    actions: {
        // 事件，数据
        login(context, data) {
            $.ajax({
                url: 'http://47.105.178.110:8000/user/login',
                type: 'POST',
                data : {
                    username: data.username,
                    password: encrypt(data.password),
                },
                success(resp) {
                    const {access, refresh} = resp;
                    // 进行解码
                    const access_obj = jwt_decode(access);
                    console.log(access_obj);
                    // 定时函数
                    setInterval(() => {
                        $.ajax({
                            url: 'http://47.105.178.110:8000/user/refresh',
                            type: 'post',
                            data: {
                                "refresh_tokern":refresh
                            },
                            success(resp) {
                                // 调用mutations函数
                                context.commit('updateAccess', resp.access);
                            }
                        });
                    }, 55 * 60 * 1000);
                    $.ajax ({
                        url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
                        type: 'GET',
                        data: {
                            username: access_obj.user_id,
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access,
                        },
                        success(resp) {
                            context.commit('updateUser', {
                                ...resp, 
                                access: access,
                                refresh: refresh,
                                is_login: true,
                            });
                            data.success();
                        }
                    })
                },
                error() {
                    data.error();
                }
            });
        }
    },
    modules: {

    }
};

export default ModeuleUser;