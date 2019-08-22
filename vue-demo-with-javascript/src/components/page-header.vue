<template>
  <div>
    <el-menu router :default-active="activeMenu" mode="horizontal" menu-trigger="click"
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <!--logo-->
      <el-menu-item id="logo" index="" disabled>后台管理</el-menu-item>
      <!--导航项-->
      <template v-if="showMenu">
        <template v-for="menu in menuList">
          <el-menu-item :key="menu.index" :index="menu.index" v-if="!menu.subMenuList">{{menu.label}}</el-menu-item>
          <el-submenu :key="menu.index" :index="menu.index" v-else>
            <template slot="title">{{menu.label}}</template>
            <el-menu-item v-for="subMenu in menu.subMenuList" :key="subMenu.index" :index="subMenu.index">
              {{subMenu.label}}
            </el-menu-item>
          </el-submenu>
        </template>

        <!--右侧按钮-->
        <!--用户信息-->
        <el-submenu style="float: right;" index="">
          <template slot="title">{{userInfo.userName}}</template>
          <el-menu-item index="/user" :route="{name:'userUpdate',params:{id:userInfo.userId}}">
            个人信息设置
          </el-menu-item>
          <el-menu-item index="" @click="logout">退出登录</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import tokenUtils from '../utils/token-utils'

  export default {
    name: 'pageHeader',
    data () {
      return {
        menuList: [
          {
            index: '/',
            label: '首页'
          },
          {
            index: '/quote',
            label: '报价数据'
          },
          {
            index: '/stage',
            label: '指数数据'
          },
          {
            index: '/struct',
            label: '结构和药材'
          },
          {
            index: '/cms',
            label: '文章和字典',
            subMenuList: [
              {
                index: '/articleType',
                label: '文章分类管理'
              },
              {
                index: '/dictionary',
                label: '药材字典管理'
              }
            ]
          }
        ],
        activeMenu: '/',
        showMenu: false,
        userInfo: {}
      }
    },
    methods: {
      logout () {
        this.$confirm('确定要退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({name: 'login'})
        })
      },
      // 刷新导航栏的数据
      freshMenuData () {
        // 获取当前path
        const path = this.$route.path
        const isLogin = path === '/login'
        // 登录页面保持原状即可
        if (!isLogin) {
          this.showMenu = true
          this.userInfo = tokenUtils.getUserInfo()
          // 判断所在模块
          this.activeMenu = (/^(\/[^/]*)/).exec(path)[1]
        }
      }
    },
    watch: {
      '$route': 'freshMenuData'
    },
    mounted () {
      this.freshMenuData()
    }
  }
</script>
<style>
  #logo {
    opacity: 1 !important;
    cursor: default !important;
    font-size: 1.2rem !important;
  }
</style>
