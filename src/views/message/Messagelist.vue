<template>
  <div class="dashboard-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>消息留言</el-breadcrumb-item>
      <el-breadcrumb-item>留言列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-container">
      <el-card>
        <page-tools>
          <template v-slot:before>
            <el-form-item size="medium">
              <el-button
                type="danger"
                size="small"
                icon="el-icon-deleteItem"
                :disabled="messageIdList.length == 0"
                @click="deleteFlag = true"
              >
                批量删除
              </el-button>
            </el-form-item>
          </template>
          <template v-slot:after>
            <el-form-item style="float: right">
              <el-input
                v-model="keywords"
                prefix-icon="el-icon-search"
                size="small"
                placeholder="请输入用户昵称"
                style="width: 200px"
                @keyup.enter.native="getMessageList"
              />
              <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                style="margin-left: 1rem"
                @click="getMessageList"
              >
                搜索
              </el-button>
            </el-form-item>
          </template>
        </page-tools>

        <!-- 表格展示 -->
        <el-table border :data="messageList" @selection-change="selectionChange">
          <!-- 表格列 -->
          <el-table-column type="selection" width="55" />
          <el-table-column prop="avatar" label="头像" align="center" width="150">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" width="40" height="40">
            </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="留言人"
            align="center"
            width="150"
          />
          <el-table-column prop="messageContent" label="留言内容" align="center" />
          <el-table-column
            prop="ipAddress"
            label="ip地址"
            align="center"
            width="150"
          />
          <el-table-column
            prop="ipSource"
            label="ip来源"
            align="center"
            width="170"
          />
          <el-table-column
            prop="createTime"
            label="留言时间"
            width="140"
            align="center"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" style="margin-right:5px" />
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <!-- 列操作 -->
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteMessage(scope.row.id)"
              >
                <el-button slot="reference" size="mini" type="danger">
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
          <el-pagination
            class="pagination-container"
            background
            :current-page="current"
            :page-size="size"
            :total="count"
            :page-sizes="[10, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="sizeChange"
            @current-change="currentChange"
          />
        </div>
      </el-card>
    </div>
    <!-- 批量删除对话框 -->
    <el-dialog :visible.sync="deleteFlag" width="30%">
      <div slot="title" class="dialog-title-container">
        <i class="el-icon-warning" style="color:#ff9900" />提示
      </div>
      <div style="font-size:1rem">是否删除选中项？</div>
      <div slot="footer">
        <el-button @click="deleteFlag = false">取 消</el-button>
        <el-button type="primary" @click="deleteMessage(null)">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMessageList, delMessage } from '@/api/message'
export default {
  data() {
    return {
      deleteFlag: false, // 删除弹出框的显示与否
      messageIdList: [], // 需要删除留言的id列表
      messageList: [], // 用于存储留言列表
      keywords: null, // 搜索的关键字
      current: null, // 当前页数
      size: null, // 当前页显示的数量
      count: 0 // 留言总数
    }
  },
  watch: {
    isDelete() {
      this.getMessageList()
    }
  },
  created() {
    this.getMessageList()
  },
  methods: {
    selectionChange(messageList) {
      this.messageIdList = []
      messageList.forEach(item => {
        this.messageIdList.push(item.id)
      })
    },
    sizeChange(size) {
      this.size = size
      this.listMessages()
    },
    currentChange(current) {
      this.current = current
      this.listMessages()
    },
    // 删除留言
    async deleteMessage(id) {
      var param = {}
      if (id != null) {
        param = { data: [id] }
      } else {
        param = { data: this.messageIdList }
      }
      delMessage(param).then(res => {
        if (res.flag) {
          this.$notify.success({
            title: '删除成功',
            message: res.message
          })
        } else {
          this.$notify.error({
            title: '删除失败',
            message: res.message
          })
        }
      })
      this.deleteFlag = false
    },
    async getMessageList() {
      const result = await getMessageList(this.current, this.size, this.keywords)
      this.messageList = result.data
      this.count = result.total
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin-top: 20px;
}
</style>
