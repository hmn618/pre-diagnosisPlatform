import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/testBot',
                    component: resolve => require(['../components/page/testBot.vue'], resolve),
                    meta: { title: '机器人测试' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: '系统通知' }
                },
                {
                    path: '/train',
                    component: resolve => require(['../components/page/train.vue'], resolve),
                    meta: { title: '机器人训练' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本信息' }
                },
                {
                    path: '/intent',
                    component: resolve => require(['../components/page/Intent.vue'], resolve),
                    meta: { title: '意图槽位' }
                },
                {
                    path: '/data',
                    component: resolve => require(['../components/page/Data.vue'], resolve),
                    meta: { title: '导入数据' }
                },
                {
                    // 生成story.md
                    path: '/process',
                    component: resolve => require(['../components/page/story.vue'], resolve),
                    meta: { title: '对话流程' }
                },
                {
                    // 富文本编辑器组件
                    path: '/actionFunc',
                    component: resolve => require(['../components/page/actionFunc.vue'], resolve),
                    meta: { title: '模版函数' }
                },
                {
                    // 个人设置组件
                    path: '/user',
                    component: resolve => require(['../components/page/userInfo.vue'], resolve),
                    meta: { title: '个人设置' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '用户管理', permission: true }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
