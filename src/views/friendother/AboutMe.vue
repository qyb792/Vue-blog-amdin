<template>
  <div class="dashboard-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>友链其他</el-breadcrumb-item>
      <el-breadcrumb-item>关于我</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-container">
      <el-card>
        <mavon-editor v-model="aboutContent" style="height:calc(100vh - 215px)" />
        <el-button
          type="danger"
          size="medium"
          class="edit-btn"
          @click="updateAbout"
        >
          修改
        </el-button>
      </el-card>
    </div>

  </div>
</template>

<script>
import { getAbout, updateAbout } from '@/api/about'
export default {
  data() {
    return {
      aboutContent: ''
    }
  },
  created() {
    this.getAbout()
  },
  methods: {
    async getAbout() {
      const result = await getAbout()
      console.log(result)
      this.aboutContent = result.data.content
    },
    async updateAbout() {
      const param = new URLSearchParams()
      param.append('aboutContent', this.aboutContent)
      const result = await updateAbout(param)
      if (result.success) {
        this.$notify.success({
          title: '操作成功',
          message: '修改成功'
        })
      } else {
        this.$notify.error({
          title: '操作失败',
          message: '修改失败'
        })
      }
    }
  }
}
</script>

<style scoped>
  .edit-btn {
    float: right;
    margin: 1rem 0;
  }
</style>
