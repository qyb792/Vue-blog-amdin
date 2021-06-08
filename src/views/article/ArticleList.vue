<template>
  <div class="dashboard-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
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
                @click="DeleteAll"
              >
                批量删除
              </el-button>
            </el-form-item>
          </template>
          <template v-slot:after>
            <el-form-item style="float: right">
              <el-input
                v-model="articleTitle"
                prefix-icon="el-icon-search"
                size="small"
                placeholder="请输入博客标题"
                style="width: 200px"
              />
              <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                style="margin-left: 1rem"
                @click="getList"
              >
                搜索
              </el-button>
            </el-form-item>
          </template>
        </page-tools>

        <!-- 表格展示 -->
        <el-table border :data="articleList">
          <!-- 表格列 -->
          <el-table-column type="selection" width="55" align="center" />
          <!-- 标签名 -->
          <el-table-column prop="articleTitle" label="标题" align="center">
            <template slot-scope="scope">
              <el-tag>
                {{ scope.row.articleTitle }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="分类"
            align="center"
            width="100px"
          >
            <template slot-scope="scope">
              <el-tag>
                {{ scope.row.categoryName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="tagsName"
            label="标签"
            align="center"
            width="200px"
          >
            <template slot-scope="scope">
              <el-tag
                v-for="item of scope.row.tagsName"
                :key="item.tagsName"
                style="
                  display: inline-flex;
                  margin-right: 0.2rem;
                  font-size: 5px;
                "
              >
                {{ item }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- 标签创建时间 -->
          <el-table-column prop="createTime" label="创建时间" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" style="margin-right: 5px" />
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <!-- 标签更新时间 -->
          <el-table-column prop="updateTime" label="更新时间" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" style="margin-right: 5px" />
              {{ scope.row.updateTime }}
            </template>
          </el-table-column>
          <!--      置顶-->
          <el-table-column prop="isTop" label="置顶" width="100" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isTop"
                active-color="#13ce66"
                inactive-color="#F4F4F5"
                :active-value="1"
                :inactive-value="0"
              />
            </template>
          </el-table-column>
          <!-- 列操作 -->
          <el-table-column label="操作" align="center" width="160">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="editArticle(scope.row.articleId)"
              >
                编辑
              </el-button>
              <el-popconfirm
                title="确定删除吗？"
                style="margin-left: 1rem"
                @onConfirm="deleteArticle(scope.row.articleId)"
              >
                <el-button slot="reference" size="mini" type="danger">
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <div class="block">
          <el-pagination
            :current-page="current"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getArticleList, deleteArticleById } from '@/api/article'
export default {
  data() {
    return {
      articleList: [],
      articleTitle: '', // 模糊搜索的
      current: 1, // 当前页
      size: 5, // 一页的条数
      total: 100, // 总条数
      deleteAllId: []
    }
  },
  created() {
    // 获取分类列表
    this.getList()
  },
  methods: {
    DeleteAll() {
      console.log('删除选择的博客')
    },
    async getList() {
      getArticleList(this.current, this.size, this.articleTitle).then(res => {
        console.log(res)
        this.articleList = res.data
        this.total = res.total
        this.$message.success('查询文章列表成功')
        // console.log(res)
      })
    },
    editArticle(id) {
      this.$router.push({ path: '/editarticle/' + id })
    },
    async deleteArticle(articleId) {
      await deleteArticleById(articleId)
      this.$message.success('删除成功')
      this.getList()
    },
    handleSizeChange(val) {
      // 把val复制给size 重新在后台查询数据
      console.log(val)
      this.size = val
      this.getList()
    },
    // 当页数改变边的时候
    handleCurrentChange(val) {
      console.log(val)
      this.current = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin-top: 20px;
}
</style>
