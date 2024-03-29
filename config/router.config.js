export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login', title: '用户登录' },
      { path: '/user/forget', component: './User/ForgetPassword', title: '重置密码' },
      { path: '/user/register', component: './User/Register', title: '注册' },
    ],
  },
  // TabBar
  {
    path: '/tcmh',
    component: '../layouts/TabBarLayout',
    routes: [
      { path: '/tcmh', redirect: '/tcmh/information' },
      {
        path: '/tcmh/information',
        title: '资讯',
        component: './tabbar/Information',
        iconName: 'zixun',
      },
      {
        path: '/tcmh/assessment',
        title: '评估',
        component: './tabbar/Assessment.jsx',
        iconName: 'ceping',
      },
      {
        path: '/tcmh/my',
        title: '我的',
        component: './tabbar/My',
        iconName: 'wode',
      },
    ],
  },
  // H5
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['user', 'admin'],
    routes: [
      { path: '/', component: './tabbar/Information', title: '资讯' },
      // { path: '/entrance', component: './entrance/index', title: '主入口' },
      // { path: '/paper/:type', component: './paper/index', title: '试题页面' },
      // { path: '/result', component: './result/index', title: '结果页' },
      { path: '/my/info', component: './my/Info', title: '个人信息' },
      { path: '/my/feedback', component: './my/Feedback', title: '意见反馈' },
      {
        title: 'exception',
        path: '/exception',
        routes: [
          // Exception
          {
            path: '/exception/403',
            title: 'not-permission',
            component: './exception/403',
          },
          {
            path: '/exception/404',
            title: 'not-find',
            component: './exception/404',
          },
          {
            path: '/exception/500',
            title: 'server-error',
            component: './exception/500',
          },
        ],
      },
      { path: '/404', component: '404' },
    ],
  },
];
