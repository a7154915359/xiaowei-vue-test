<template>
  <body id="poster">
    <el-form class="login-container" label-position="left"
             :model="loginForm" ref="loginForm" :rules="rules" label-width="0px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-col :span="12">
        <el-input type="text" v-model="loginForm.captcha" width="100px"
                  auto-complete="off" placeholder="验证码"></el-input>
          </el-col>
        <el-image
          style="width: 100px; height: 40px;float: right;cursor: pointer"
          :src="loginForm.captchaUrl"
          @click.native="getCaptcha"></el-image>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: '',
        captchaUrl: '',
        cToken: ''
      },
      responseResult: [],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'change' }
        ]
      }
    }
  },
  created: function () {
    let that = this
    document.onkeydown = function (e) {
      e = window.event || e
      // 验证在登录界面和按得键是回车键enter
      if (that.$route.path === '/login' && (e.code === 'Enter' || e.code === 'enter')) {
        that.login('loginForm')
      }
    }
  },
  mounted: function () {
    this.getCaptcha()
  },
  methods: {
    login (loginForm) {
      if (!this.validateLogin(loginForm)) {
        return false
      }
      var _this = this
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password,
          captcha: this.loginForm.captcha,
          cToken: this.loginForm.cToken
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            // var data = this.loginForm
            _this.$store.commit('login', _this.loginForm)
            var path = this.$route.query.redirect
            if (successResponse.data.data.ismanager === '0') {
              this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
            } else {
              this.$router.replace({path: path === '/' || path === undefined ? '/admin' : path})
            }
          } else if (successResponse.data.code === 100001) {
            this.getCaptcha()
            this.showErrorMsg(successResponse.data.message)
          } else {
            this.showErrorMsg(successResponse.data.message)
          }
        })
        .catch(failResponse => {
        })
    },
    getCaptcha () {
      this.$axios
        .post('/captcha', {
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.loginForm.captchaUrl = 'data:image/png;base64,' + successResponse.data.img
            this.loginForm.cToken = successResponse.data.cToken
          }
        })
        .catch(failResponse => {
        })
    },
    showErrorMsg (errorMsg) {
      this.$message({
        dangerouslyUseHTMLString: true,
        showClose: true,
        message: '<strong>' + errorMsg + '</strong>',
        type: 'error'
      })
    },
    validateLogin (loginForm) {
      let result
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          result = true
        } else {
          result = false
        }
      })
      return result
    }
  }
}
</script>

<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  #poster {
    background:url("../assets/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
</style>
