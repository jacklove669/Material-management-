<template>
  <div class="index">
    <el-container>
      <!-- 左边导航  -->
      <el-aside width="230px">
        <el-menu :default-active="this.$router.path" class="el-menu-vertical-demo" background-color="black"
          text-color="#fff" router>
          <el-menu-item index="/Home" style="height:150px; text-align:center">
            <img src="@/assets/111.png" style="width:150px;height:100px;margin-top:25px;" alt="" class="baiyi" />
            <!-- <i class="el-icon-menu"></i>
        <span slot="title">首页</span> -->
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title"><i class="el-icon-document"></i>采购价格看板管理</template>
            <el-menu-item index="/Home/Release"><i class="el-icon-star-on"></i>发布物料</el-menu-item>
            <el-menu-item index="/Home/material"><i class="el-icon-star-on"></i>物料管理</el-menu-item>
            <el-menu-item index="/Home/offer"><i class="el-icon-star-on"></i>报价看板</el-menu-item>
            <el-menu-item index="/Home/ShoppingCart"><i class="el-icon-star-on"></i>购物车</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-plus"></i>商品价格看板管理</template>
            <el-menu-item index="/add"><i class="el-icon-star-on"></i>添加商品</el-menu-item>
            <el-menu-item index="/classification"><i class="el-icon-star-on"></i>商品分类</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-star-on"></i>订单详情看板管理</template>
            <el-menu-item index="/Statistics"><i class="el-icon-star-on"></i>订单统计</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title"><i class="el-icon-edit"></i>收藏内容看板管理</template>
            <el-menu-item index="/Collection"><i class="el-icon-star-on"></i>收藏区</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title"><i class="el-icon-s-tools"></i>企业信息看板信息</template>
            <el-menu-item index="/message"><i class="el-icon-star-on"></i>信息管理</el-menu-item>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title"><i class="el-icon-warning"></i>支付订单看板管理</template>
            <el-menu-item index="/pay"><i class="el-icon-star-on"></i>支付管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边内容 -->

      <el-main style="height:calc(100vh-90px)">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        index: ''
      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style lang="stylus" scoped>
  .index {
    width: 100%;
    height: 1000px;

    .el-container {
      overflow-y: hidden; 
      height:100%;

      .el-aside {
        background-color: black;

        .el-menu {

          border-right:0;
           .el-menu-item:focus,
          .el-menu-item:hover {
            background-color: orange !important;
          }
        }
      }
    }


  }
</style>