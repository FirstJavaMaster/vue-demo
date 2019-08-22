<template>
  <div>
    <br>
    <br>
    <br>
    <h2 style="text-align: center">管理员登录</h2>
    <br>
    <br>

    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-card class="box-card">
          <!--表单-->
          <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-position="top" label-width="80px">
            <el-form-item prop="loginName">
              <el-input type="text" v-model="loginForm.loginName" placeholder="用户名">
                <template slot="prepend"><i class="el-icon-user"></i></template>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="密码">
                <template slot="prepend"><i class="el-icon-lock"></i></template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button class="btn btn-block" type="primary" plain @click="loginFormSubmit">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>

      </el-col>

    </el-row>

  </div>
</template>

<script>
  import userApi from '../api/user'
  import tokenUtils from '../utils/token-utils'

  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          loginName: '',
          password: ''
        },
        loginFormRules: {
          loginName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      loginFormSubmit () {
        this.$refs.loginForm.validate().then(() => {
          userApi.login(this.loginForm).then(resp => {
            tokenUtils.setUserInfo(resp.data)
            this.$message.success('登录成功, 页面即将跳转!')
            setTimeout(() => {
              const redirect = this.$route.query.redirect
              if (redirect) {
                this.$router.push({
                  path: decodeURIComponent(redirect)
                })
              } else {
                this.$router.push({name: 'home'})
              }
            }, 1500)
          })
        })
      }
    },
    mounted () {
      // 到了登录页面就清空当前token
      tokenUtils.removeUserInfo()
    }
  }
</script>
