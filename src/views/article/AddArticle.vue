<template>
  <div class="dashboard-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增文章</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-container">
      <el-card>
        <div
          class="article-title-container"
          style="display: flex; align-items: center; margin-bottom: 1.25rem"
        >
          <el-input
            v-model="article.articleTitle"
            size="medium"
            placeholder="输入文章标题"
          />
          <el-button
            v-if="article.isDraft == 0"
            plain
            type="primary"
            size="medium"
            class="save-btn"
          >保存草稿
          </el-button>
          <el-button
            plain
            type="primary"
            size="medium"
            style="margin-left: 10px"
            class="save-btn"
            @click="addArticle"
          >
            发布文章
          </el-button>
        </div>

        <mavon-editor
          ref="md"
          v-model="article.articleContent"
          style="min-height: 500px; padding: 0; margin: 0"
          :ishljs="true"
          @change="change"
        />
      </el-card>
    </div>
    <!-- 添加文章对话框 -->
    <el-dialog :visible.sync="addOrEdit" width="40%" top="10vh">
      <div slot="title" class="dialog-title-container">上传文章</div>
      <!-- 文章数据 -->
      <el-form label-width="80px" size="medium" :model="article">
        <el-form-item label="文章分类">
          <el-select v-model="article.categoryId" placeholder="请选择分类">
            <el-option
              v-for="item in categoryList"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签">
          <el-select
            v-model="article.tagIdList"
            multiple
            placeholder="请选择标签"
          >
            <el-option
              v-for="item in tagList"
              :key="item.tagId"
              :label="item.tagName"
              :value="item.tagId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上传封面">
          <image-upload ref="uploadImg" />
        </el-form-item>
        <el-form-item label="置顶">
          <el-switch
            v-model="article.isTop"
            active-color="#13ce66"
            inactive-color="#F4F4F5"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addOrEdit = false">取 消</el-button>
        <el-button type="danger" @click="saveOrUpdateArticle">
          发 表
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArticleById,
  getCategoryList,
  getTagList,
  saveOrUpdateArticle
} from '@/api/article'
export default {
  data() {
    return {
      autoSave: true, // 自动保存草稿开关
      addOrEdit: false, // 是否显示点击出来的对话框
      content: '', // 编辑器的内容
      html: '', // 转换的html
      images: [], // 存储图片的数组
      // 新增博客属性列表
      article: {
        articleId: null, // 博客id
        articleTitle: '', // 博客标题
        articleContent: '', // 博客内容
        articleCover: '', // 博客封面
        categoryId: '', // 分类id
        tagIdList: [], // 标签id列表
        isTop: 0, // 是否置顶
        isDraft: 0 // 是否存草稿
      },
      // 分类列表
      categoryList: [],
      // 标签列表
      tagList: []
    }
  },
  created() {
    // 获取当前路由路径
    const path = this.$route.path
    // 分割取得后面的id
    const arr = path.split('/')
    const articleId = arr[2]
    // 如果文章id不是空 就根据当前id获取文章的信息
    if (articleId != null && articleId !== '' && articleId !== undefined) {
      getArticleById(articleId).then(res => {
        if (res.success) {
          this.article = res.data
        }
      })
    }

    // 获取标签列表和分类列表
    this.getTagList()
    this.getCategoryList()
  },
  destroyed() {
    // 自动保存草稿
  },
  methods: {
    addArticle() {
      // 获取不到ref使用$nextTick解决
      this.addOrEdit = true
      if (
        this.article.articleCover !== '' &&
        this.article.articleCover.trim()
      ) {
        this.$nextTick(() => {
          this.$refs.uploadImg.fileList = [
            { url: this.article.articleCover, upload: true }
          ]
        })
      }
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render
    },
    // 获取标签列表
    async getTagList() {
      const result = await getTagList()
      if (result.success) {
        // console.log('标签列表', result)
        this.tagList = result.data
      }
    },

    // 获取分类列表
    async getCategoryList() {
      const result = await getCategoryList()
      if (result.success) {
        // console.log('分类列表', result)

        this.categoryList = result.data
      }
    },
    // 更新或者保存文章
    async saveOrUpdateArticle() {
      // const result = await saveOrUpdateArticle(this.article)
      // console.log(result)
      // if (result.success) {
      //   this.$notify.success({
      //     title: '成功',
      //     message: '发布成功'
      //   })
      // } else {
      //   this.$notify.error({
      //     title: '失败',
      //     message: '发布失败'
      //   })
      // }
      // this.addOrEdit = false// 是否显示点击出来的对话框
      // 先去获取头像中的地址
      const fileList = this.$refs.uploadImg.fileList // 数组
      // 应该判断 当前的图片有没有上传完成
      if (fileList.some(item => !item.upload)) {
        // 说明此时有图片还没有上传完成
        this.$message.warning('图片正在上传,请稍后重试')
        return
      }
      this.article.articleCover = fileList[0].url || ''
      const data = await saveOrUpdateArticle(this.article)
      if (data.success) {
        this.$notify.success({
          title: '成功',
          message: '发布成功'
        })
      } else {
        this.$notify.error({
          title: '失败',
          message: '发布失败'
        })
      }
      this.addOrEdit = false // 是否显示点击出来的对话框
    }
  }
}
</script>

<style lang="scss" scoped>
.save-btn {
  margin-left: 0.75rem;
}
</style>
