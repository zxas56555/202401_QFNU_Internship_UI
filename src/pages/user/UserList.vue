<template>
  <el-form :inline="true">
    <el-form-item label="姓名">
      <el-input placeholder="请输入姓名" v-model="search.name"/>
    </el-form-item>
    <el-form-item label="用户名">
      <el-input placeholder="请输入用户名" v-model="search.username"/>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input placeholder="请输入手机号" v-model="search.phone"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getUserList"><el-icon><Search /></el-icon>查询</el-button>
      <el-button type="primary" @click="handleAdd">
        <el-icon>
          <Plus/>
        </el-icon>
        添加
      </el-button>
    </el-form-item>
  </el-form>
  <el-table :data="userData" style="width: 100%">
    <el-table-column prop="username" label="用户名" width="180"/>
    <el-table-column prop="name" label="姓名" width="180"/>
    <el-table-column prop="age" label="年龄"/>
    <el-table-column prop="phone" label="电话"/>
    <el-table-column>
      <template #default="scope">
        <el-button type="danger" @click="handelDelete(scope.row.id)">
          <el-icon>
            <Delete/>
          </el-icon>
          删除
        </el-button>
        <el-button type="primary" @click="handleEdit(scope.row)">
          <el-icon>
            <Edit/>
          </el-icon>
          修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page="pageNum"
      :page-count="pageCount"
      @current-change="handelCurrentPageChange"/>


  <el-dialog v-model="userForm.show" :title="userForm.title">
    <el-form>
      <el-form-item label="姓名">
        <el-input v-model="userForm.user.name"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="userForm.user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userForm.user.password"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="userForm.user.age"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="userForm.user.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="handleFormCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";
import {Delete, Edit, Plus, Search} from "@element-plus/icons-vue";

export default {
  name: 'UserList',
  components: {Search, Edit, Delete, Plus},
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      pageCount: 100,
      userData: [],
      userForm: {
        show: false,
        title: '',
        user: {}
      },
      search:{}

    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 获取User分页数据
    getUserList() {
      axios.post(`/user/findList/${this.pageNum}/${this.pageSize}`, this.search).then((res) => {
        this.userData = res.data.data;
        this.pageCount = res.data.totalPage;
      });
    },
    //提交保存
    onSubmit() {
      axios.post('/user/save', this.userForm.user).then((res) => {
        ElMessage({type: 'success',message: '保存操作执行成功！',});
        this.userForm.show = false;
        this.getUserList();
      }).catch((err) => {
        ElMessage({type: 'danger',message: '服务器异常，操作失败！',});
      });
    },
    // 弹出框取消按钮事件
    handleFormCancel() {
      this.userForm.show = false;
    },
    // 添加按钮事件
    handleAdd() {
      this.userForm.title = '添加新用户';
      this.userForm.show = true;
    },
    //编辑按钮事件
    handleEdit(user){
      this.userForm.title = `编辑【${user.name}】用户信息`;
      this.userForm.user = user;
      this.userForm.show = true;
    },
    // 删除按钮事件
    handelDelete(id) {
      ElMessageBox.confirm(
          '您确定要删除该数据？该操作不可恢复！',
          '系统提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          },
      ).then(() => {
        //点击确认执行
        axios.post(`/user/removeById/${id}`).then((res) => {
          if (res.status === 200) {
            ElMessage({
              type: 'success',
              message: '删除操作执行成功！',
            })
            this.getUserList();
          }
        });
      }).catch(() => {
        //点击取消执行
        ElMessage({
          type: 'info',
          message: '删除操作取消',
        })
      });
    },
    // 页码变化时事件
    handelCurrentPageChange(val) {
      this.pageNum = val;
      this.getUserList();
    }
  }
}
</script>

<style scoped>

</style>