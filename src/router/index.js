import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '../components/Home'
import LibraryIndex from '../components/library/LibraryIndex'
import DashBoard from '../components/admin/dashboard/admin/index'
import AdminIndex from '../components/admin/AdminIndex'
import FourError from '../components/common/FourError'
import CommonEcharts from '../components/common/CommonEcharts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'Library',
          component: LibraryIndex,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'index',
      redirect: '/index',
      component: AppIndex
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/dashboard',
      component: AdminIndex,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/admin/dashboard',
          name: 'dashboard',
          component: DashBoard,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/CommonEcharts',
      name: 'CommonEcharts',
      component: CommonEcharts
    },
    {
      path: '*',
      name: 'all',
      component: FourError
    }
  ]
})

// 用于创建默认路由
export const createRouter = routes => new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Default',
      redirect: '/home',
      component: Home
    },
    {
      // home页面并不需要被访问，只是作为其它组件的父组件
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex
        },
        {
          path: '/library',
          name: 'Library',
          component: LibraryIndex
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/dashboard',
      component: AdminIndex,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/admin/dashboard',
          name: 'dashboard',
          component: DashBoard,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})
