<template>
  <el-container id="admin-body">
    <el-header style="height: 60px;margin-left: -22px" width="100%">
      <Header style="position: absolute;width: 100%;"></Header>
    </el-header>
    <el-container>
      <el-aside style="height: 100%;width: 250px">
        <admin-menu></admin-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AdminMenu from './AdminMenu'
import Header from './Header'
export default {
  name: 'AdminIndex',
  components: {AdminMenu, Header},
  data () {
    return {
      dialogVisible: false
    }
  },
  mounted () {
    // this.$router.replace('/admin/dashboard')
  }
}
</script>

<style scoped>
  #admin-body {
    height: 100vh;
  }
</style>
