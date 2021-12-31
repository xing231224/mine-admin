<!--
 * @Author: your name
 * @Date: 2021-12-30 18:04:45
 * @LastEditTime: 2021-12-31 17:13:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mine-admin\src\views\layout\Layout.vue
-->
<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <tags-view></tags-view>
      <app-main></app-main>
      <!-- <tips></tips> -->
    </div>
  </div>
</template>

<script>
  import tips from '@/views/socket/tips'
import { Navbar, Sidebar, AppMain, TagsView } from '@/views/layout/components'
  import { getToken } from '@/utils/auth'
  import * as socketApi from '@/utils/crmSocket'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    tips
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  mounted() {
    // socketApi.connection(getToken())
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
