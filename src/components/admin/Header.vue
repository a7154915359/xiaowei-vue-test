<template>
  <el-card class="admin-header">
    <a href="/index">
      <img src="../../assets/img/icon/icon2.png" alt="" width="55px" style="float: left;margin-top: -15px;">
    </a>
    <span style="font-size: 30px;font-weight: bold;position:absolute;left: 100px">管  理</span>
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 30px;float: right"></i>
  </el-card>
</template>

<script>
import {createRouter} from '../../router'
export default {
  name: 'Header',
  methods: {
    logout () {
      var _this = this
      this.$axios.get('/logout').then(resp => {
        if (resp.data.code === 200) {
          _this.$store.commit('logout')
          _this.$router.replace('/login')
          // 清空路由，防止路由重复加载
          const newRouter = createRouter()
          _this.$router.matcher = newRouter.matcher
        }
      }).catch(failResponse => {})
    }
  }
}
</script>

<style scoped>
  .admin-header {
    height: 60px;
    opacity: 0.85;
    line-height: 30px;
    min-width: 900px;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }
</style>
