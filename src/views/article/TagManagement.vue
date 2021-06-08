<template>
  <div class="dashboard-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-container">
      <el-card>
        <page-tools>
          <template v-slot:before>
            <el-form-item size="medium">
              <el-button
                type="success"
                size="small"
                icon="el-icon-plus"
                @click="openModel(null)"
              >
                新增
              </el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-deleteItem"
                @click="isDelete = true"
              >
                批量删除
              </el-button>
            </el-form-item>
          </template>
          <template v-slot:after>
            <el-form-item style="float: right">
              <el-input
                v-model="tagName"
                prefix-icon="el-icon-search"
                size="small"
                placeholder="请输入标签名"
                style="width:200px"
              />
              <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                style="margin-left:1rem"
                @click="getList"
              >
                搜索
              </el-button>
            </el-form-item>
          </template>
        </page-tools>

        <!-- 表格展示 -->
        <el-table border :data="tagList">
          <!-- 表格列 -->
          <el-table-column type="selection" width="55" />
          <!-- 标签名 -->
          <el-table-column prop="tagName" label="标签名" align="center">
            <template slot-scope="scope">
              <el-tag>
                {{ scope.row.tagName }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- 标签创建时间 -->
          <el-table-column prop="createTime" label="创建时间" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" style="margin-right:5px" />
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <!-- 标签更新时间 -->
          <el-table-column prop="updateTime" label="更新时间" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" style="margin-right:5px" />
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <!-- 列操作 -->
          <el-table-column label="操作" align="center" width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="openModel(scope.row)">
                编辑
              </el-button>
              <el-popconfirm
                title="确定删除吗？"
                style="margin-left:1rem"
                @onConfirm="deleteTag(scope.row.tagId)"
              >
                <el-button slot="reference" size="mini" type="danger">
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          class="pagination-container"
          background
          :current-page="current"
          :page-size="size"
          :total="total"
          :page-sizes="[5, 10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          style="margin-top: 20px;"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </el-card>
    </div>
    <el-dialog :title="title" :visible.sync="isdialog" width="30%">
      <el-form label-width="80px" size="medium" :model="tagForm">
        <el-form-item label="标签名">
          <el-input v-model="tagForm.tagName" style="width:220px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isdialog = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditTag">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addOrEditTag, deleteTag, listTags } from '@/api/tag'
export default {
  data() {
    return {
      // 新增或者编辑标签
      tagForm: {
        tagId: null,
        tagName: ''
      },
      tagList: [],
      tagName: '', // 模糊搜索的标签名
      current: 1, // 当前页
      size: 5, // 一页的条数
      total: 100, // 总条数
      title: '',
      isdialog: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const data = await listTags(this.current, this.size, this.tagName)
      console.log(data)
      if (data.success) {
        this.tagList = data.data
        this.total = data.total
      }
    },
    openModel(tag) {
      if (tag !== null) {
        this.tagForm = JSON.parse(JSON.stringify(tag))
        this.title = '编辑标签'
      } else {
        this.tagForm.tagId = null
        this.tagForm.tagName = ''
        this.title = '添加标签'
      }
      this.isdialog = true
    },
    // 添加标签
    async addOrEditTag() {
      if (this.tagForm.tagName.trim() === '') {
        this.$message.error('标签名不能为空')
        return false
      }
      const data = await addOrEditTag(this.tagForm)
      console.log(data)
      if (data.success) {
        this.$message.success('操作标签成功')
        this.getList()
      } else {
        this.$message.error('操作标签成功')
      }
      this.isdialog = false
    },
    async deleteTag(tagId) {
      // console.log('删除点击')
      const data = await deleteTag(tagId)
      console.log(data)
      if (data.success) {
        this.getList()
        this.$message.success('删除当前标签成功')
      } else {
        this.$message.error('删除当前标签失败')
      }
    },
    sizeChange(val) {
      // 把val复制给size 重新在后台查询数据
      this.size = val
      this.getList()
    },
    // 当页面改边的时候
    currentChange(val) {
      this.current = val
      this.getList()
    }
  }
}
</script>

<style>
</style>
