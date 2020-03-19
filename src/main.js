// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (store.state.user.username && to.path.startsWith('/admin')) {
    axios.get('/authentication').then(resp => {
      if (resp.data.code === 403) {
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      }
      initAdminMenu(router, store)
    }).catch(failResponse => {
      if (failResponse.response) {
        if (failResponse.response.status === 403) {
          next({
            path: 'login',
            query: {redirect: to.fullPath}
          })
        }
      }
    })
  }
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      axios.get('/authentication').then(resp => {
        if (resp.data.code === 403) {
          next({
            path: 'login',
            query: {redirect: to.fullPath}
          })
        }
      }).catch(failResponse => {
        if (failResponse.response.status === 403) {
          next({
            path: 'login',
            query: {redirect: to.fullPath}
          })
        }
      })
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
}
)
const initAdminMenu = (router, store) => {
  if (store.state.adminMenus.length > 0) {
    return
  }
  axios.get('/menu').then(resp => {
    if (resp && resp.status === 200) {
      var fmtRoutes = formatRoutes(resp.data)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}
const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
