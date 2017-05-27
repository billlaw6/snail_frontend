<template>
  <div>
    <Row>
      <Col span="6">
        <Date-picker type="daterange" :options="dateOptions" placement="bottom-end" placeholder="选择日期范围"></Date-picker>
      </Col>
      <Col span="8">
        <Input v-model="filter" icon="icon-search" placeholder="本地检索"></Input>
      </Col>
      <Col span="4">
        <i-button type="primary" @click="showAddModel=true">添加</i-button>
      </Col>
    </Row>

    <Table :context="self" :data="tableData" :columns="tableColumns" stripe border></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="page" @on-change="changePage" show-total></Page>
      </div>
    </div>

    <Modal v-model="showAddModel" title="添加订单" @on-ok="confirmAdd" @on-cancel="cancelAdd" >
      <Form :model="addModel" :rules="ruleValidate" :label-width="100">
        <Form-item label="标题" prop="title">
          <Input v-model="addModel.title" placeholder="标题"></Input>
        </Form-item>
        <Form-item label="商品" prop="merchandise">
          <Input v-model="addModel.merchandise" placeholder="商品"></Input>
        </Form-item>
        <Form-item label="数量" prop="amount">
          <Input-number :max="1000" :min="1" :step="1" v-model="addModel.amount"></Input-number>
        </Form-item>
        <Form-item label="单价" prop="price">
          <Input-number :max="10000" :min="1" :step="0.1" v-model="addModel.price"></Input-number>
        </Form-item>
        <Form-item label="单价" prop="price">
          <Cascader :data="chinaCities"></Cascader>
        </Form-item>

        <Form-item>
            <Button type="primary" @click="confirmAdd('formValidate')">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import { getOrderList, addOrder, putOrder, getMerchandiseList } from '../../api/api'
  export default {
    data: function () {
      return {
        filter: '',
        merchandiseList: [],
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
        showAddModel: false,
        showEditModel: false,
        addModel: {
          title: '',
          merchandise: '',
          amount: 1,
          price: 0
        },
        editModel: {},
        ruleValidate: {
          title: [
            { required: true, message: '订单标题不能为空', trigger: 'blur' },
            { type: 'string', min: 4, message: '标题不得少于4个字符' }
          ],
          merchandise: [
            { required: true, message: '订单商品不能为空', trigger: 'blur' },
            { type: 'string', min: 4, message: '标题不得少于4个字符' }
          ],
          amount: [
            { required: true, message: '商品数量不能为空', trigger: 'blur' },
            { type: 'number', min: 1, max: 1000, message: '数量必须为1至1000之间' },
            {
              validator (rule, value, callback, source, options) {
                let errors = []
                callback(errors)
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
            title: '标题',
            key: 'title',
            align: 'center',
            sortable: true
          },
          {
            title: '商品名称',
            key: 'merchandise',
            align: 'center',
            sortable: true
          },
          {
            title: '数量',
            key: 'amount',
            align: 'center',
            sortable: true
          },
          {
            title: '价格',
            key: 'price',
            align: 'left',
            sortable: true
          },
          {
            title: '顾客',
            key: 'buyer',
            align: 'left',
            sortable: true
          },
          {
            title: '创建时间',
            key: 'created_at',
            align: 'left',
            sortable: true
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render (row, column, index) {
              return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="error" size="small" @click="">删除</i-button>`
            }
          }
        ]
      }
    },
    methods: {
      show (index) {
        this.$Model.info({
          title: '订单信息',
          content: `姓名：${this.tableData[index].name}<br>年龄：${this.tableData[index].age}<br>地址：${this.tableData[index].addr}`
        })
      },
      changePage (row) {
        // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
        console.log(row)
        this.page = row
        this.mockTableData()
      },
      // 获取商品列表
      getMerchandise: function () {
        getMerchandiseList().then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            console.log(statusText)
            this.$Message.error('获取商品列表失败!')
          } else {
            console.log(JSON.stringify(data.results))
            this.merchandiseList = data.results
          }
        }, (error) => {
          console.log('Error in getOrderList: ' + error)
          this.$Message.error('获取商品列表失败!')
        }).catch((error) => {
          console.log('catched in getOrderList:' + error)
          this.$Message.error('获取商品列表失败!')
        })
      },
      // 获取订单列表
      getOrder: function () {
        let para = {
          page: this.page
        }
        this.$Loading.start()
        getOrderList(para).then((res) => {
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
          console.log('Error in getOrderList: ' + error)
          this.$Message.error('表单验证失败!')
        }).catch((error) => {
          console.log('catched in getOrderList:' + error)
        })
      },

      // 撤销添加
      cancelAdd () {
        this.showAddModel = false
        this.$Message.info('点击了取消')
      },

      // 增加订单
      confirmAdd: function (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            addOrder(this.addModel).then((res) => {
              let { data, status, statusText } = res
              if (status !== 200) {
                this.loginMessage = statusText
              } else {
                console.log(data)
                getOrderList()
                this.$Message.success('添加订单成功!')
              }
            }, (error) => {
              console.log('Error in addOrder: ' + error)
            }).catch((error) => {
              console.log('catched in addOrder:' + error)
            })
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },

      // 撤销修改
      cancelEdit () {
        this.showEditModel = false
        this.$Message.info('点击了取消')
      },

      // 修改订单
      confirmEdit: function () {
        putOrder(this.editModel).then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            this.loginMessage = statusText
          } else {
            console.log(data)
            getOrderList()
            this.$Message.success('添加订单成功!')
          }
        }, (error) => {
          console.log('Error in editOrder: ' + error)
        }).catch((error) => {
          console.log('catched in editOrder:' + error)
        })
      },

      handleReset (name) {
        this.$refs[name].resetFields()
      }
    },
    mounted () {
      this.getOrderList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../styles/vars'
</style>
