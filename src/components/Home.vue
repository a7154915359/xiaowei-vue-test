<template>
  <div>
    <nav-menu></nav-menu>
    <transition>
      <router-view class="center"></router-view>
    </transition>
  </div>
</template>

<script>
import NavMenu from './common/NavMenu'
export default {
  name: 'Home',
  components: {NavMenu}
}
</script>

<style scoped>
  v-enter{
    opacity:0;
  }
  .v-enter-to{
    opacity:1;
  }
  .v-enter-active{
    transition:1s;
  }
  .v-leave{
    opacity:1;
  }
  .v-leave-to{
    opacity:0;
  }
  .v-leave-active{
    transition:1s;
  }
</style>
