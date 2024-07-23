<script setup>
import UserList from './pages/user/UserList.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>实训课Demo</el-header>
      <el-container>
        <el-aside width="200px">左边功能区</el-aside>
        <el-main>
          <UserList></UserList>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style scoped>
.el-header {
  background-color: #c6e2ff;
}

.el-aside {
  background-color: #d9ecff;
}

.el-main {
  background-color: #ecf5ff;
}
</style>
