import { defineConfig } from '@umijs/max';
// const { REACT_APP_ENV = 'dev' } = process.env;
// import proxy from './config/proxy'
export default defineConfig({
  proxy: {},
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'demo',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: ' CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
  ],
  npmClient: 'npm',
});

