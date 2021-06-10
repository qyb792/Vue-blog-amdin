<template>
  <div class="dashboard-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>消息留言</el-breadcrumb-item>
      <el-breadcrumb-item>评论列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-container">
      <el-card>
        <page-tools>
          <template v-slot:before>
            <el-form-item size="medium">
              <el-button
                v-if="isDelete == 0"
                type="danger"
                size="small"
                icon="el-icon-deleteItem"
                :disabled="commentIdList.length == 0"
                @click="updateIsDelete = true"
              >
                批量删除
              </el-button>
              <el-button
                v-else
                type="danger"
                size="small"
                icon="el-icon-deleteItem"
                :disabled="commentIdList.length == 0"
                @click="remove = true"
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
              />
              <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                style="margin-left: 1rem"
                @click="getCommentList"
              >
                搜索
              </el-button>
            </el-form-item>
          </template>
        </page-tools>

        <!-- 表格展示 -->
        <el-table
          border
          :data="commentList"
          @selection-change="selectionChange"
        >
          <!-- 表格列 -->
          <el-table-column type="selection" width="55" />
          <el-table-column
            prop="avatar"
            label="头像"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <img :src="scope.row.avatar" width="40" height="40">
            </template>
          </el-table-column>
          <!-- 评论人昵称 -->
          <el-table-column
            prop="nickname"
            label="评论人"
            align="center"
            width="120"
          />
          <!-- 回复人昵称 -->
          <el-table-column
            prop="replyNickname"
            label="回复人"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.replyNickname">
                {{ scope.row.replyNickname }}
              </span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <!-- 评论文章标题 -->
          <el-table-column prop="articleTitle" label="文章标题" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.articleTitle">
                {{ scope.row.articleTitle }}
              </span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <!-- 评论内容 -->
          <el-table-column
            prop="commentContent"
            label="评论内容"
            align="center"
          >
            <template slot-scope="scope">
              <span class="comment-content" v-html="scope.row.commentContent" />
            </template>
          </el-table-column>
          <!-- 点赞量 -->
          <el-table-column
            prop="likeCount"
            label="点赞量"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.likeCount">
                {{ scope.row.likeCount }}
              </span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <!-- 评论时间 -->
          <el-table-column
            prop="createTime"
            label="评论时间"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" style="margin-right: 5px" />
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column label="来源" align="center" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.articleTitle">文章</el-tag>
              <el-tag v-else type="warning">友链</el-tag>
            </template>
          </el-table-column>
          <!-- 列操作 -->
          <el-table-column label="操作" width="160" align="center">
            <template slot-scope="scope">
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="delComment(scope.row.id)"
              >
                <el-button slot="reference" size="mini" type="danger">
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <div class="block">
          <el-pagination
            class="pagination-container"
            background
            :current-page="current"
            :page-size="size"
            :total="count"
            :page-sizes="[10, 20, 30, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="sizeChange"
            @current-change="currentChange"
          />
        </div>
      </el-card>
    </div>

    <!-- 批量删除对话框 -->
    <el-dialog :visible.sync="updateIsDelete" width="30%">
      <div slot="title" class="dialog-title-container">
        <i class="el-icon-warning" style="color: #ff9900" />提示
      </div>
      <div style="font-size: 1rem">是否删除选中项？</div>
      <div slot="footer">
        <el-button @click="updateIsDelete = false">取 消</el-button>
        <el-button type="primary" @click="delComment(null)"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCommentList, delComment } from '@/api/comment'
export default {
  data() {
    return {
      remove: false,
      updateIsDelete: false,
      options: [
        {
          value: 0,
          label: '正常'
        },
        {
          value: 1,
          label: '回收站'
        }
      ],
      commentList: [],
      commentIdList: [],
      keywords: null,
      isDelete: 0,
      current: 1,
      size: 6,
      count: 0
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    selectionChange(commentList) {
      this.commentIdList = []
      commentList.forEach(item => {
        this.commentIdList.push(item.id)
      })
    },
    // 修改一页显示的数量后调用
    sizeChange(size) {
      this.size = size
      this.listComments()
    },
    // 切换页数后调用
    currentChange(current) {
      this.current = current
      this.listComments()
    },
    // 获取评论列表的方法
    async getCommentList() {
      const result = await getCommentList(
        this.current,
        this.size,
        this.keywords
      )
      this.commentList = result.data
      this.count = result.total
      // console.log(result)
    },

    async delComment(id) {
      var param = {}
      if (id == null) {
        param = { data: this.commentIdList }
      } else {
        param = { data: [id] }
      }
      delComment(param).then(res => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin-top: 20px;
}
</style>
