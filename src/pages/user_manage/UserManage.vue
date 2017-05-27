<template>
  <div>
    <Row type="flex" justify="end">
      <Col span="6" offset="2">
        <Date-picker type="daterange" :options="dateOptions" placement="bottom-end" placeholder="选择日期范围"></Date-picker>
      </Col>
      <Col span="6">
        <Input v-model="filter" icon="icon-search" placeholder="本地检索"></Input>
      </Col>
      <Col span="2">
        <i-button type="primary">添加</i-button>
      </Col>
    </Row>
    <Table :context="self" :data="tableData" :columns="tableColumns" stripe border></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="page" @on-change="changePage" show-total></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import { getUserList, removeUser } from '../../api/api'
  export default {
    data: function () {
      return {
        filter: '',
        dateOptions: {
          shortcuts: [
            {
              text: '最近一周',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                return [start, end]
              }
            },
            {
              text: '最近一个月',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                return [start, end]
              }
            },
            {
              text: '最近三个月',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                return [start, end]
              }
            }
          ]
        },
        self: this,
        tableData: [],
        total: 0,
        page: 1,
        tableColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'username',
            align: 'center',
            sortable: true
          },
          {
            title: '姓名',
            align: 'center',
            key: 'last_name',
            width: 300
          },
          {
            title: '邮箱',
            align: 'center',
            key: 'email'
          },
          {
            title: '状态',
            align: 'center',
            key: 'is_active',
            render: function (row, column, index) {
              return row.is_active ? '可用' : '停用'
            }
          },
          {
            title: '性别',
            key: 'sex',
            align: 'center',
            render: function (row, column, index) {
              return row.sex === 0 ? '男' : '女'
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render (row, column, index) {
              return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="error" size="small" @click="remove(${row.id})">删除</i-button>`
            }
          }
        ]
      }
    },
    methods: {
      show (index) {
        this.$Modal.info({
          title: '用户信息',
          content: `姓名：${this.tableData[index].name}<br>年龄：${this.tableData[index].age}<br>地址：${this.tableData[index].addr}`
        })
      },
      remove (index) {
        let self = this
        this.$Modal.confirm({
          title: '用户信息',
          content: `是否删除此记录`,
          onOk: function () {
            this.$Loading.start()
            let para = {id: index}
            removeUser(para).then((res) => {
              self.mockTableData()
            })
          }
        })
      },
      changePage (row) {
        // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
        console.log(row)
        this.page = row
        this.mockTableData()
      },
      // 获取用户列表
      getUserList: function () {
        let para = {
          page: this.page
        }
        this.$Loading.start()
        getUserList(para).then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            this.loginMessage = statusText
          } else {
            console.log(JSON.stringify(data.results))
            this.$Loading.finish()
            this.total = res.data.total
            this.tableData = data.results
          }
        }, (error) => {
          this.$Loading.finish()
          console.log('Error in getUserList: ' + error)
          this.$Message.error('获取用户列表失败!')
        }).catch((error) => {
          this.$Loading.finish()
          console.log('catched in getUserList:' + error)
          this.$Message.error('获取用户列表失败!')
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
