<template>
  <div class="dashboard-container">
    <div class="content">
      <div class="container-fluid">
        <div class="card-header">
          <h3>管理首页</h3>
        </div>
      </div>
    </div>
    <div class="rn">
      <div class="small-box" style="background: #17a2b8">
        <div class="inner">
          <h3>新增文章</h3>
          <p>记心中所想</p>
        </div>
        <router-link to="/addarticle">let's go</router-link>

      </div>
      <div class="small-box" style="background: #28a745">
        <div class="inner">
          <h3>文章列表</h3>
          <p>查看文章列表</p>
        </div>
        <router-link to="/articlelist">let's go</router-link>

      </div>
      <div class="small-box" style="background: #007bff">
        <div class="inner">
          <h3>收到的评论</h3>
          <p>查看收到的评论</p>
        </div>
        <router-link to="/commentlist">let's go</router-link>

      </div>
    </div>

    <div class="rn">
      <div class="small-box" style="background: #ffc107">
        <div class="inner">
          <h3>分类数量</h3>
          <p>进行分类管理</p>
        </div>
        <router-link to="/classification">let's go</router-link>

      </div>
      <div class="small-box" style="background: #dc3545">
        <div class="inner">
          <h3>文章标签</h3>
          <p>文章标签的管理</p>
        </div>
        <router-link to="/tagManagement">let's go</router-link>

      </div>
      <div class="small-box" style="background: #343a40">
        <div class="inner">
          <h3>博客友链</h3>
          <p>管理博客友情链接</p>
        </div>

        <router-link to="/ariendlinks">let's go</router-link>

      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
/* 1.超小屏幕下 小于768 布局容器宽度为100% */
@media screen and (max-width: 767px) {
    .container-fluid {
        width: 100%;
    }

    .aside {
        display: none;
    }

    .main {
        flex: 1;
        margin-left: 0 !important;
    }

   .panel-body .form-group {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .panel-body .form-inline {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .panel-body .form-group label {
        min-width: 70px;
        height: 52px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0!important;
    }

    .panel-body .form-group .btn {
        height: 32px !important;
        margin-left: 10px;
    }

    .addDel {
        width: 100% !important;
    }

}

/* 2.小屏幕下 大于等于768 布局容器改为750px */
@media screen and (min-width: 768px) {
    .container-fluid {
        width: 750px;
    }

    .panel-body .form-inline {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .form-group .btn {
        height: 32px !important;
        margin-left: 10px;
    }
}

/* 3.中等屏幕下 大于等于992px 布局容器修改为970px*/
@media screen and (min-width: 992px) {
    .container-fluid {
        width: 970px;
    }

    .panel-body .form-inline {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
}

/* 4.大屏幕下 大于等于1200 布局容器修改为1170px */
@media screen and (min-width: 1200px) {
    .container-fluid {
        width: 1170px;
    }
}

/* 5.大屏幕下 大于等于1800 布局容器修改为1300px */
@media screen and (min-width: 1800px) {
    .container-fluid {
        width: 1300px;
    }
}

body {
    width: 100%;
    min-height: 100%;
    background: #f1f1f1;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
    color: rgb(194, 199, 208);
}

a:hover {
    text-decoration: none;
    color: rgb(194, 199, 208);
}

a:focus {
    text-decoration: none;
    color: rgb(194, 199, 208);
}

.container-fluid {
    width: 100%;
    padding: 0 !important;
    display: flex;
}

.aside {
    background: #343a40;
    width: 250px;
    height: 100%;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0 8px;
    z-index: 10;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
}

.aside::-webkit-scrollbar {
    display: none;
}

.logo-top {
    display: flex;
    height: 50px;
    align-items: center;
    padding: 13px -8px;
    width: 100%;
    font-weight: 300 !important;
    font-size: 18px;
    color: rgb(33, 37, 41);
    border-bottom: 1px solid #4f5962;
}

.logo-top img {
    width: 34px;
    height: 34px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, .19), 0 6px 6px rgba(0, 0, 0, .23);
    border-radius: 50%;
    opacity: .8;
    margin-left: 13px;
    margin-right: 8px;
}

.user-tx {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #4f5962;
    display: flex;
    align-items: center;
    padding-left: 13px;
    padding-bottom: 16px;
    margin: 16px 0;
}

.left-nav {
    width: 100%;
}

.left-nav li {
    width: 100%;
    height: 40px;
    color: rgb(194, 199, 208);
    display: flex;
}

.nav-header {
    line-height: 40px;
}

.left-nav li a {
    width: 100%;
    height: 100%;
    padding: 8px 16px;
    border-radius: .25rem;
    display: flex;
}

.left-nav li a:hover {
    background: #494e53;
}

.left-nav li a p {
    line-height: 24px;
    height: 24px;
}

.left-nav .nav-icon {
    width: 19px;
    font-size: 19px;
    margin-right: 10px;
    text-align: center;
}

.user-tx img {
    border-radius: 50%;
}

.main {
    flex: 1;
    margin-left: 250px;
}

.main-header {
    display: flex;
    height: 50px;
    background-color: #fff;
    padding: 8px;
    justify-content: space-between;
    border-bottom: 1px solid #dee2e6 !important;
}

.main-nav {
    height: 100%;
    display: flex;
    align-items: center;
}

.main-nav li a {
    width: 44px;
    height: 40px;
    padding: 8px 16px;
    color: #7f7f7f;
}

.main-nav li a:hover {
    color: #4c4c4c;
}

.content {
    width: 100%;
    padding: 0 8px;
}

.card-header {
    width: 100%;
    height: 50px;
    padding: 12px;
    border-bottom: 1px #d5d7da solid;
}

.card-header h3 {
    margin: 0 !important;
}

.rn {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.small-box {
    flex: 1;
    margin: 20px 20px;
    background-color: pink;
    border-radius: 5px;
}

.rn .inner {
    height: 120px;
    padding: 10px;
}

.rn div h3 {
    font-size: 38px;
    font-weight: 700;
    margin: 0 0 10px 0;
    white-space: nowrap;
    padding: 0;
    color: #fff;
}

.rn div p {
    color: #fff;
}

.rn div a {
    position: relative;
    text-align: center;
    padding: 3px 0;
    color: #fff;
    color: rgba(255, 255, 255, .8);
    display: block;
    z-index: 10;
    background: rgba(0, 0, 0, .1);
    text-decoration: none;
}

.container-fluid {
    width: 100%;
}

.container-fluid .wai {
    width: 100%;
    display: flex;
    margin-top: 20px;
}

.container-fluid .wai .panel {
    width: 50%;
    margin-top: 10px;
    border-top: 3px solid #007bff;
    box-shadow: 0 0 1px rgba(0, 0, 0, .125), 0 1px 3px rgba(0, 0, 0, .2);
}

.container-fluid .wai .panel:nth-child(1) {
    margin-right: 5px;
}

.container-fluid .wai .panel:nth-child(2) {
    margin-left: 5px;
}

.container-fluid .wai .panel .panel-heading {
    background: #fff;
    height: 49px;
    font-size: 20px;
}

.container-fluid .wai .panel .panel-body {
    background: #fff;

}

.form-group {
    width: 100%;
}

.form-group input {
    margin: 10px 0;
    height: 38px;
}

.form-bottom {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    height: 62px;
    padding: 12px 20px;
    background: #f7f7f7;
}

.modify p, label {
    display: inline;
}

.panel-body .form-inline {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.panel-body .form-inline .form-group input, .form-control {
    height: 32px;
}

/*设置后台用户管理界面表格的css*/
.bg {
    text-align: center;

}

/*设置后台用户管理界面表格的css*/

.pager li a {
    color: #337ab7;
}

th {
    text-align: center;
}

.btn-success {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .075);
}

.btn-danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .075);
}

.btn-info {
    color: #fff;
    background-color: #17a2b8;
    border-color: #17a2b8;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .075);
}

/* 用户管理界面增加和删除按钮的css样式 */
.addDel {
    width: 280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
}

/* 用户信息弹出框 */
.usertable {
    top: 40px;
    right: 10px;
    min-width: 280px;
    width: 300px;
    padding: 0;
    overflow: hidden;
    transition: all .2s ease-in-out 0s;
}

.usertable a {
    display: flex;
    width: 100% !important;
    padding: 8px 16px;
    align-items: center;
    justify-content: space-between;
}

.usertable a i {
    width: 13px !important;
    text-align: center;
}

.usertable a span:nth-child(1) {
    color: #000;
    font-size: 16px;
}

.usertable a span:nth-child(2) {
    color: rgb(108, 117, 125);
    font-size: 14px;
}

.usertable a:hover {
    background-color: #f8f9fa;
}

.usertable a:focus {
    background-color: #007bff;
}

.usertable a i {
    margin-right: 5px;
}

.addan {
    position: absolute;
    bottom: 25px;
    right: 50px;
    width: 100px;
}

</style>
