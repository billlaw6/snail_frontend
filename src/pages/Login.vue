<template>
  <i-form ref="formLogin" :model="formLogin" :rules="formLoginRules"  class="card-box">
    <Form-item class="formLogin-title">
      <h3>系统登录</h3>
    </Form-item>

    <Form-item prop="username">
      <i-input size="large" type="text" v-model="formLogin.username" placeholder="用户名" :autofocus=true>
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </i-input>
    </Form-item>
    <Form-item prop="password">
      <i-input size="large"  type="password" v-model="formLogin.password" placeholder="密码">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </i-input>
    </Form-item>
    <Form-item class="login-no-bottom">
      <Checkbox-group v-model="formLogin.remember">
        <Checkbox label="记住密码" name="remember"></Checkbox>
      </Checkbox-group>
    </Form-item>
    <Form-item class="login-no-bottom">
      <Row >
        <i-col :xs="{ span: 4, offset: 6 }" >
          <i-button type="primary" @click="handleSubmit('formLogin')">登录</i-button>
        </i-col>
        <i-col :xs="{ span: 4, offset: 6 }">
          <i-button  type="primary" @click="formLoginReset('formLogin')">重置</i-button>
        </i-col>
      </Row>
    </Form-item>
  </i-form>
</template>

<script>
  import { authLogin, getUserInfo, getUserPermissions } from '../api/api'
  import { mapState, mapActions } from 'vuex'
  export default {
    data () {
      return {
        formLogin: {
          username: 'liubin',
          password: 'liubin123456',
          remember: []
        },
        formLoginRules: {
          username: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapState({
        loginStatus: state => state.login.loginStatus
      })
    },
    methods: {
      ...mapActions({
        setToken: 'setToken',
        setLoginStatus: 'setLoginStatus',
        setUser: 'setUser',
        setPermissions: 'setPermissions'
      }),
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // 清除过期的accessToken，错误的accessToken会报401未授权错误，更新数据库时测出来的
            window.sessionStorage.removeItem('accessToken')
            authLogin(this.formLogin).then((res) => {
              console.log(res)
              let {data, status, statusText} = res
              if (status !== 200) {
                this.loginMessage = statusText
                this.$Message.error('用户名或密码错误!')
              } else {
                window.sessionStorage.setItem('accessToken', data.token)
                // 设置当前登录用户
                getUserInfo().then((res) => {
                  // console.log('getUserInfo: ' + res)
                  let {data, status, statusText} = res
                  if (status !== 200) {
                    this.loginMessage = statusText
                    this.$Message.error('获取用户信息失败!')
                  } else {
                    // console.log(data)
                    this.$store.dispatch('setLoginStatus', true)
                    window.sessionStorage.setItem('user', JSON.stringify(data))
                    // 设置当前登录用户权限
                    getUserPermissions().then((res) => {
                      let { data, status, statusText } = res
                      if (status !== 200) {
                        console.log('Error in getUserPermissions:' + statusText)
                        this.$Message.error('获取用户权限失败!')
                      } else {
                        // console.log('Got permissions:')
                        console.log(data)
                        window.sessionStorage.setItem('permissions', JSON.stringify(data.results))
                        this.$router.push({ name: 'dashboard' })
                      }
                    }, (error) => {
                      console.log('Error in restAuthUser: ' + error)
                      this.$Message.error('获取用户信息失败!')
                    }).catch((error) => {
                      console.log('catched in restAuthUser:' + error)
                      this.$Message.error('获取用户信息失败!')
                    })
                  }
                }, (error) => {
                  console.log('Error in getUserInfo: ' + error)
                  this.$Message.error('获取用户信息失败')
                }).catch((error) => {
                  console.log('catched in getUserInfo:' + error)
                  this.$Message.error('获取用户信息失败')
                })
              }
            }, (error) => {
              console.log('Error in authLogin: ' + error)
              this.$Message.error('用户名或密码错误')
            }).catch((error) => {
              console.log('catched in authLogin:' + error)
              this.$Message.error('用户名或密码错误')
            })
          } else {
            this.$Message.error('表单验证失败!')
          }
          if (this.formLogin.remember[0] === '记住密码') {
            window.sessionStorage.setItem('username', JSON.stringify(this.formLogin.username))
            window.sessionStorage.setItem('password', JSON.stringify(this.formLogin.password))
          } else {
            window.sessionStorage.removeItem('username')
            window.sessionStorage.removeItem('password')
          }
        })
      },
      formLoginReset (name) {
        this.$refs[name].resetFields()
      }
    },
    mounted () {
      if (sessionStorage.getItem('username')) {
        this.formLogin.username = JSON.parse(sessionStorage.getItem('username'))
      }
      if (sessionStorage.getItem('password')) {
        this.formLogin.password = JSON.parse(sessionStorage.getItem('password'))
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .card-box {
    padding: 20px
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px
    border-radius: 5px
    -moz-border-radius: 5px
    background-clip: padding-box
    margin-bottom: 20px
    background-color: #F9FAFC
    margin: 180px auto
    width: 400px
    /* border: 2px solid #8492A6;*/
  }

  .title {
    margin: 0px auto 40px auto
    text-align: center
    color: #505458
  }
  .formLogin-title {
    text-align: center
    font-seze: 28px
  }
  .formLogin-title h3{
    font-size: 18px
  }
  .login-no-bottom {
    margin-bottom: 10px
  }
</style>
