<template>
  <div>
    <Table :context="self" :data="tableData" :columns="tableColumns" stripe border></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="page" @on-change="changePage" show-total></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import { getUserList } from '../../api/api'
  export default {
    data: function () {
      return {
        filter: '',
        users: [],
        currentPage: 1,
        perPage: 5
      }
    },
    computed: {
      trans: function () {
        let t = {}
        t.filter_result = this.$t('filter_result')
        t.filter = this.$t('filter')
        t.rows_per_page = this.$t('rows_per_page')
        return t
      },
      path: function () {
        return [{
          text: this.$t('user_manage'),
          to: { name: 'users' }
        }]
      },
      tfields: function () {
        return {
          last_name: {
            label: this.$t('last_name'),
            sortable: true
          },
          first_name: {
            label: this.$t('first_name'),
            sortable: true
          },
          username: {
            label: this.$t('username'),
            sortable: true
          },
          email: {
            label: this.$t('email'),
            sortable: true
          },
          is_active: {
            label: this.$t('is_active'),
            sortable: true
          },
          actions: {
            label: this.$t('actions')
          }
        }
      }
    },
    methods: {
      details (item) {
        alert(JSON.stringify(item))
      },
      // 获取用户列表
      getUserList: function () {
        getUserList(this.filter).then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            this.loginMessage = statusText
          } else {
            console.log(JSON.stringify(data.results))
            this.users = data.results
          }
        }, (error) => {
          console.log('Error in getUserList: ' + error)
        }).catch((error) => {
          console.log('catched in getUserList:' + error)
        })
      }
    },
    mounted () {
      this.getUserList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../styles/vars'
</style>
