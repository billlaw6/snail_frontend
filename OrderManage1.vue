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

    <Modal v-model="showAddModel" title="添加订单" @on-ok="confirmAdd('addModelForm')" @on-cancel="cancelAdd('addModelForm')" >
      <Form ref="addModelForm" :model="addModel" :rules="ruleValidate" :label-width="100">
        <Form-item label="标题" prop="title">
          <Input v-model="addModel.title" placeholder="标题"></Input>
        </Form-item>
        <Form-item label="商品" prop="merchandise">
          <Select v-model="addModel.merchandise">
            <Option v-for="item in merchandiseList" :value="item.id" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="数量" prop="amount">
          <Input-number :max="1000" :min="1" :step="1" v-model="addModel.amount"></Input-number>
        </Form-item>
        <Form-item label="单价" prop="price">
          <Input-number :max="10000" :min="1" :step="0.1" v-model="addModel.price"></Input-number>
        </Form-item>
        <Form-item label="付款方式" prop="payment">
          <Select v-model="addModel.payment">
            <Option v-for="item in paymentList" :value="item.code" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="购买人" prop="buyer">
          <Input v-model="addModel.buyer" placeholder="购买人"></Input>
        </Form-item>
        <Form-item label="手机号" prop="cell_phone">
          <Input v-model="addModel.cell_phone" placeholder="手机号"></Input>
        </Form-item>
        <Form-item label="城市" prop="city">
          <Cascader :data="chinaCities" v-model="addModel.city" :filterable=true trigger="hover" placeholder="请选择所在城市"></Cascader>
        </Form-item>
        <Form-item label="详细地址" prop="address">
          <Input v-model="addModel.address" placeholder="详细地址"></Input>
        </Form-item>
        <Form-item label="快递公司" prop="express">
          <Select v-model="addModel.express">
            <Option v-for="item in expresseList" :value="item.code" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="快递单号" prop="express_no">
          <Input v-model="addModel.express_no" placeholder="快递单号"></Input>
        </Form-item>

        <Form-item>
            <Button type="primary" @click="confirmAdd('addModelForm')">提交</Button>
            <Button type="ghost" @click="handleReset('addModelForm')" style="margin-left: 8px">重置</Button>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import { getOrderList, addOrder, putOrder, getMerchandiseList, getExpressList, getPaymentList } from '../../api/api'
  import { chinaCities } from '../../data/data'
  export default {
    data: function () {
      return {
        filter: '',
        chinaCities,
        merchandiseList: [],
        expresseList: [],
        paymentList: [],
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
          title: 'lasdkjf',
          merchandise: 1,
          amount: 1,
          price: 1,
          payment: 'hdfk',
          buyer: 'asldk',
          cell_phone: '18001163901',
          city: ['13', '11'],
          address: 'lasd',
          comment: '',
          express: 'shunfeng',
          express_no: '123322',
          express_info: ''
        },
        editModel: {},
        ruleValidate: {
          title: [
            { required: true, message: '做个标记才好找哦', trigger: 'blur' },
            { type: 'string', min: 4, message: '多赐几个字嘛', trigger: 'blur' }
          ],
          merchandise: [
            { required: true, type: 'number', message: '侬需要啥？', trigger: 'blur' }
          ],
          amount: [
            { required: true, type: 'number', min: 1, max: 1000, message: '小滴数不清了，改个数？', trigger: 'blur' }
          ],
          price: [
            { required: true, type: 'number', min: 0, max: 10000, message: '介是几个钱？', trigger: 'blur' }
          ],
          payment: [
            { required: true, type: 'string', message: '咱们咋算？', trigger: 'blur' }
          ],
          buyer: [
            { required: true, message: '怎么称呼昵？', trigger: 'blur' }
          ],
          cell_phone: [
            { required: true, message: '留个电话才好约哦', trigger: 'blur' },
            { type: 'string', len: 11, message: '介个号码打不通啊', trigger: 'blur' },
            {
              validator (rule, value, callback, source, options) {
                let errors = []
                if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(value)) {
                  errors.push(new Error('介个手机号打不通哦'))
                }
                callback(errors)
              }
            }
          ],
          city: [
            { type: 'array', required: true, message: '请选择有效的城市', len: 2, trigger: 'change' }
          ],
          address: [
            { required: true, message: '方便具体点么？', trigger: 'blur' }
          ],
          express: [
            { required: true, type: 'string', message: '亲要自己送吗？', trigger: 'blur' }
          ],
          express_no: [
            { required: true, message: '单号拿来验证一下？', trigger: 'blur' }
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
        // console.log(row)
        this.page = row
        this.mockTableData()
      },
      // 获取商品列表
      getMerchandiseList: function () {
        getMerchandiseList().then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            console.log(statusText)
            this.$Message.error('获取商品列表失败!')
          } else {
            // console.log(JSON.stringify(data.results))
            this.merchandiseList = data.results
          }
        }, (error) => {
          console.log('Error in getMerchandiseList: ' + error)
          this.$Message.error('获取商品列表失败!')
        }).catch((error) => {
          console.log('catched in getMerchandiseList:' + error)
          this.$Message.error('获取商品列表失败!')
        })
      },
      // 获取支付方式列表
      getPaymentList: function () {
        getPaymentList().then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            console.log(statusText)
            this.$Message.error('获取支付方式列表失败!')
          } else {
            // console.log(JSON.stringify(data.results))
            this.paymentList = data.results
          }
        }, (error) => {
          // console.log('Error in getPaymentList: ' + error)
          this.$Message.error('获取支付方式列表失败!' + error)
        }).catch((error) => {
          // console.log('catched in getPaymentList:' + error)
          this.$Message.error('获取支付方式列表失败!' + error)
        })
      },
      // 获取快递公司列表
      getExpressList: function () {
        let para = {
          page: this.page
        }
        getExpressList(para).then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            this.loginMessage = statusText
          } else {
            // console.log(JSON.stringify(data.results))
            this.expresseList = data.results
          }
        }, (error) => {
          // console.log('Error in getExpressList: ' + error)
          this.$Message.error('获取快递公司列表失败!' + error)
        }).catch((error) => {
          // console.log('catched in getExpressList:' + error)
          this.$Message.error('获取快递公司列表失败!' + error)
        })
      },
      // 获取订单列表
      getOrderList: function () {
        let para = {
          page: this.page
        }
        this.$Loading.start()
        getOrderList(para).then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            this.loginMessage = statusText
          } else {
            // console.log(JSON.stringify(data.results))
            this.$Loading.finish()
            this.total = res.data.total
            this.tableData = data.results
          }
        }, (error) => {
          console.log('Error in getOrderList: ' + error)
          this.$Message.error('获取订单列表失败!')
        }).catch((error) => {
          console.log('catched in getOrderList:' + error)
          this.$Message.error('获取订单列表失败!')
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
            // this.addModel.city = this.addModel.city.join('-')
            console.log(this.addModel)
            addOrder(this.addModel).then((res) => {
              let { data, status, statusText } = res
              if (status !== 201) {
                this.loginMessage = statusText
                console.log(data.detail)
                this.$Message.error('添加订单失败!')
              } else {
                console.log(data)
                this.$Message.success('添加订单成功!')
                // 更新订单列表
                getOrderList()
              }
            }, (error) => {
              console.log('Error in addOrder: ' + error)
              this.$Message.error('添加订单失败!')
            }).catch((error) => {
              console.log('Exception in addOrder: ' + error)
              this.$Message.error('添加订单失败!')
            })
          } else {
            console.log(this.addModel)
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
            // console.log(data)
            this.editModel = data
            getOrderList()
            this.$Message.success('添加订单成功!')
          }
        }, (error) => {
          console.log('Error in editOrder: ' + error)
          this.$Message.error('修改订单失败!')
        }).catch((error) => {
          console.log('catched in editOrder:' + error)
          this.$Message.error('修改订单失败!')
        })
      },

      handleReset (name) {
        this.$refs[name].resetFields()
      }
    },
    mounted () {
      this.getOrderList()
      this.getMerchandiseList()
      this.getExpressList()
      this.getPaymentList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../styles/vars'
</style>
