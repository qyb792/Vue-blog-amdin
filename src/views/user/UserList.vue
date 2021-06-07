<template>
  <div class="dashboard-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-container">
      <el-card>
        <page-tools>
          <template v-slot:before>
            <el-form-item label="用户角色">
              <el-select v-model="UserQueryVO.roleName" placeholder="请选择">
                <el-option :key="1" clearable label="所有用户" :value="null">
                  <span style="float: left"> 所有用户</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">
                    <span class="el-tag">{{ total }}</span>
                  </span>
                </el-option>
                <el-option
                  v-for="item in userAuthList"
                  :key="item.userAuth"
                  clearable
                  :label="item.userAuth"
                  :value="item.userAuth"
                >
                  <span>{{ item.userAuth }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">
                    <span class="el-tag">{{ item.size }}</span>
                  </span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-model="UserQueryVO.nickName"
              label="昵称"
              size="medium"
            >
              <el-input placeholder="请输入内容" />
            </el-form-item>
          </template>
          <template v-slot:after>
            <el-form-item>
              <el-button>
                <i class="el-icon-refresh" />
                <span>重置</span>
              </el-button>

              <el-button type="primary" @click="getUserList">
                <i class="el-icon-search" />
                <span>查询</span>
              </el-button>
              <el-button type="success">
                <i class="el-icon-plus" />
                <span>添加</span>
              </el-button>
              <el-button type="warning">
                <i class="el-icon-download" />
                <span>导出</span>
              </el-button>
            </el-form-item>
          </template>
        </page-tools>

        <!-- 展示用户列表的表格 -->
        <el-table :data="userList" border style="width: 100%">
          <el-table-column prop="userId" label="id" align="center" width="40" />
          <el-table-column
            prop="avatar"
            label="头像"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <el-avatar :src="scope.row.avatar" />
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="用户角色"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-tag>{{ scope.row.description }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="用户昵称"
            align="center"
            width="150"
          />
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="isSilence"
            label="是否禁用"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isSilence"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="editUserInfo(scope.row)"
              >编辑
              </el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deleteUser(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
          <el-pagination
            :current-page="current"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>

        <el-dialog
          title="新增用户"
          :visible.sync="isAddDialog"
          class="addDialog"
        >
          <el-form :model="addUserForm">
            <el-form-item label="用户名" label-width="120px">
              <el-input
                v-model="addUserForm.username"
                clearable
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="密码" label-width="120px">
              <el-input
                v-model="addUserForm.password"
                clearable
                autocomplete="off"
              />
            </el-form-item>

            <el-form-item label="员工头像" label-width="120px">
              <!-- 放置上传图片 -->
              <image-upload ref="staffPhoto" />
            </el-form-item>
            <el-form-item label="用户头像url" label-width="120px">
              <el-input
                v-model="addUserForm.avatar"
                clearable
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="用户昵称" label-width="120px">
              <el-input
                v-model="addUserForm.nickname"
                clearable
                autocomplete="off"
              />
            </el-form-item>

            <el-form-item label="用户角色" label-width="120px">
              <el-select
                v-model="addUserForm.userRole"
                placeholder="请选择用户角色"
              >
                <el-option label="超级管理员" value="1" />
                <el-option label="管理员" value="2" />
                <el-option label="普通用户" value="3" />
                <el-option label="游客" value="4" />
                <el-option label="测试人员" value="5" />
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isAddDialog = false">取 消</el-button>
            <el-button
              type="primary"
              @click="isAddDialog = false"
            >确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'

export default {
  data() {
    return {
      // 查询用户的信息
      UserQueryVO: {
        roleName: '', // 用户角色
        nickName: '' // 昵称
      },
      nowTime: '', // 现在的时间
      userAuthList: [
        {
          userAuth: '超级管理员',
          size: 0
        },
        {
          userAuth: '管理员',
          size: 0
        },
        {
          userAuth: '普通用户',
          size: 0
        },
        {
          userAuth: '游客',
          size: 0
        },
        {
          userAuth: '后台测试',
          size: 0
        }
      ],
      // 用户集合
      userList: [],
      // 用户角色集合
      userRoleList: [],
      // 每页显示条数
      size: 5,
      // 总数据条数
      total: 0,
      // 当前第几页
      current: 1,
      editUserForm: {
        id: 1,
        avatar: '',
        nickname: '',
        username: '',
        userAuth: ''
      },
      addUserForm: {
        username: '',
        password: '',
        avatar: '',
        nickname: '',
        loginTypeId: null,
        userRoleId: 3,
        createTime: this.nowTime
      },
      // 添加用户弹出层
      isAddDialog: false
    }
  },
  created() {
    // console.log(1)
    // 调用获取用户列表方法获取用户列表
    this.getUserList()
  },
  methods: {
    async addUser() {
      // const fileList = this.$refs.staffPhoto.fileList[0]
      // if (fileList.status === 'success') {
      //   this.addUserForm.avatar = fileList.url
      // }
      // const { data } = await addUser(this.addUserForm)
      // console.log(data)

    },

    // 当每页条数改变的时候
    handleSizeChange(val) {
      // 把val复制给size 重新在后台查询数据
      this.size = val
      this.getUserList()
    },
    // 当页面改变的时候
    handleCurrentChange(val) {
      this.current = val
      this.getUserList()
    },
    async getUserList() {
      const result = await getUserList(
        this.current,
        this.size,
        this.UserQueryVO.roleName,
        this.UserQueryVO.nickname
      )
      console.log(result)

      // 保存用户列表的总数
      this.total = result.total
      // 保存用户列表
      this.userList = result.data
    },
    reset() {
      this.UserQueryVO.nickname = ''
      this.UserQueryVO.userAuth = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin-top: 20px;
}
</style>

