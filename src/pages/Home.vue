<template>
  <div>
    <head>
      <title>{{ system_name | capitalize }} | {{ $route.meta.menu_name }}</title>
    </head>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
      <Row type="flex">
        <i-col :span="spanLeft" class="layout-menu-left">
          <Menu :mode="modeType" theme="light" width="auto" :active-name="this.$route.path" :open-names="openNames" @on-select="menuSelect" accordion>
            <div class="layout-logo-left">
              <Icon type="paper-airplane" :size="logoSize" v-show="logoIsDisplay"></Icon>
              <span class="layout-text">{{ system_name | capitalize }}</span>
            </div>
            <!-- 多级对象遍历只能用多级循环解决，不能用.实现 -->
            <template v-for="(item, index) in route_menu">
              <template v-for="(meta, index) in item" v-if="!meta.hidden">
                <template v-if="permissions.some(record => record.codename === meta.permission)">
                  <Menu-item v-if="meta.leaf" :name="item.name">
                      <Icon :type="meta.iconCls" :size="iconSize"></Icon>
                      <span class="layout-text">{{ meta.menu_name | capitalize }}</span>
                  </Menu-item>
                  <Submenu v-else :name="item.name">
                    <template slot="title">
                      <Icon :type="item.iconCls" :size="iconSize"></Icon>
                      <span class="layout-text">{{ meta.menu_name | capitalize }}</span>
                    </template>
                    <template v-for="(child_item, child_index) in item.children">
                      <template v-for="(meta, index) in child_item" v-if="!meta.hidden">
                        <Menu-item v-if="permissions.some(record => record.codename === meta.permission)" :id="item.name + index" :name="child_item.name":key="child_index">
                          <span class="layout-text">{{ meta.menu_name | capitalize }}</span>
                        </Menu-item>
                      </template>
                    </template>
                  </Submenu>
                </template>
              </template>
            </template>
          </Menu>
        </i-col>

        <i-col :span="spanRight">
          <div class="layout-header">
            <i-button type="text" @click="toggleClick">
              <Icon type="navicon" size="32"></Icon>
            </i-button>
            <div class="userinfo">
              <Dropdown placement="bottom-end">
                <span class="head-img">
                  {{ curUserName }}
                  <img src="../assets/user.jpg">
                </span>
                <Dropdown-menu slot="list">
                  <Dropdown-item @click.native="modifyPassWord()">修改密码</Dropdown-item>
                  <Dropdown-item @click.native="logout()" divided>退出</Dropdown-item>
                </Dropdown-menu>
              </Dropdown>
            </div>
          </div>
          <div class="layout-breadcrumb">
            <Breadcrumb separator=">">
              <Breadcrumb-item href="/home">
                <Icon type="ios-home"></Icon>应用中心
              </Breadcrumb-item>
              <Breadcrumb-item :href="$route.path">
                <Icon :type="$route.meta.iconCls"></Icon>{{ $route.meta.menu_name }}
              </Breadcrumb-item>
            </Breadcrumb>
          </div>
          <div class="layout-content">
            <div class="layout-content-main">
              <router-view></router-view>
            </div>
          </div>
        </i-col>
      </Row>

      <Modal v-model="modal1" title="修改密码" @on-ok="comfirmModifyPS"  @on-cancel="cancel" >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <Form-item label="原密码" prop="oldPassword">
            <Input v-model="formValidate.oldPassword" placeholder="请输入原始密码" type="password"></Input>
          </Form-item>
          <Form-item label="新密码" prop="newPassword">
            <Input v-model="formValidate.newPassword" placeholder="请输入新密码" type="password"></Input>
          </Form-item>
          <Form-item label="确认新密码" prop="newPasswordCheck">
            <Input v-model="formValidate.newPasswordCheck" placeholder="请再次输入新密码" type="password"></Input>
          </Form-item>
        </Form>
      </Modal>
    </div>
    <!-- 修改密码 模态框 -->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        system_name: 'Bodhi 管理平台',
        openNames: [this.$route.matched[0].name],
        modeType: 'vertical',
        spanLeft: 5,
        spanRight: 19,
        logoIsDisplay: false,
        loading: true,
        modal1: false,
        formValidate: {
          oldPassword: '',
          newPassword: '',
          newPasswordCheck: ''
        },

        ruleValidate: {
          oldPassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          newPasswordCheck: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: this.validateNewPassCheck, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      route_menu: function () {
        let tmp = this.$router.options.routes.filter((currentValue, index, arr) => {
          // console.log(currentValue)
          return currentValue.path === '/home'
        })
        return tmp[0].children
      },
      route_path: function () {
        let tmp = this.$router.options.routes.filter((currentValue, index, arr) => {
          return currentValue.path === '/home'
        })
        return tmp[0].children
      },
      user: function () {
        return JSON.parse(window.sessionStorage.getItem('user'))
      },
      curUserName: function () {
        return this.user.last_name + this.user.first_name
      },
      permissions () {
        // console.log(JSON.parse(window.sessionStorage.getItem('permissions')))
        return JSON.parse(window.sessionStorage.getItem('permissions'))
      },
      iconSize () {
        return this.spanLeft === 5 ? 14 : 24
      },
      logoSize () {
        if (this.spanLeft !== 5) {
          this.logoIsDisplay = true
          return 30
        } else {
          this.logoIsDisplay = false
          return 0
        }
      }
    },
    methods: {
      validateNewPassCheck (rule, value, callback) {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formValidate.newPassword) {
          callback(new Error('两次输入不一致！'))
        } else {
          callback()
        }
      },
      toggleClick () {
        if (this.spanLeft === 5) {
          this.spanLeft = 1
          this.spanRight = 23
        } else {
          this.spanLeft = 5
          this.spanRight = 19
        }
      },
      modifyPassWord () {
        this.modal1 = true
      },
      logout () {
        window.sessionStorage.removeItem('accessToken')
        window.sessionStorage.removeItem('permissions')
        window.sessionStorage.removeItem('user')
        console.log('logged out')
        this.$store.dispatch('setUser', null)
        this.$router.push({ name: 'login' })
      },
      comfirmModifyPS () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            this.modal1 = false
            // this.loading = false
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
            return false
          }
        })
        // this.$Message.info('点击了确定')
      },
      cancel () {
        this.modal1 = false
        this.$Message.info('点击了取消')
      },
      menuSelect (name) {
        this.$router.push({ name: name })
      }

    },
    mounted () {
      // console.log(this.$route)
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../styles/vars'
  /* Icon图标 */
  .ivu-icon
    margin-right: 8px

  .layout
    background: body-background-color
    position: relative
    overflow: hidden
    height: 100%
    .layout-menu-left
      background: #FFFFFF
      .layout-text
        font-size: 16px
      .layout-logo-left
        width: 90%
        height: 60px
        line-height: 60px
        font-size: 24px
        text-align: center
        background: background-color
        border-radius: 8px
        margin: 15px auto
        .layout-text
          font-size: 24px

  /* .layout-hide-text, .layout-text */
  /*   display: none */
    
  .layout-header
    height: 50px
    background: #fff
    .userinfo
      display: inline-block
      float: right
      .head-img
        width: 100%
        line-height: 50px
        float: right
        margin-top: -55px
        img
          border-radius: 20px
          margin: 10px 0px 10px 10px
          width: 40px
          height: 40px
          float: right
      .ivu-dropdown
        margin-top: 50px

  .layout-breadcrumb
    padding: 10px 15px 0

  .layout-content
    min-height: 200px
    margin: 15px
    overflow: auto
    background: background-color
    border-radius: border-radius
    height: 80%
    .layout-content-main
      padding: 6px
</style>

