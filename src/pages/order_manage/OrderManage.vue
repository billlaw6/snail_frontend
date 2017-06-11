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
        <i-button type="primary" @click="showAddModal=true">添加</i-button>
       </Col>
    </Row>

    <Table :context="self" :data="tableData" :columns="tableColumns" stripe border></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="page" @on-change="changePage" show-total></Page>
      </div>
    </div>

    <Modal v-model="showAddModal" title="添加订单" @on-ok="confirmAdd('addModelForm')" @on-cancel="cancelAdd('addModelForm')" >
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
        <Form-item label="订单状态" prop="status">
          <Select v-model="addModel.status">
            <Option v-for="item in orderStatusList" :value="item.id" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="快递公司" prop="express">
          <Select v-model="addModel.express">
            <Option v-for="item in expresseList" :value="item.code" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="快递单号" prop="express_no">
          <Input v-model="addModel.express_no" placeholder="快递单号"></Input>
        </Form-item>
      </Form>
    </Modal>

    <Modal v-model="showEditModal" title="修改订单" @on-ok="confirmEdit('editModelForm')" @on-cancel="cancelEdit('editModelForm')" >
      <Form ref="editModelForm" :model="editModel" :rules="ruleValidate" :label-width="100">
        <Form-item label="标题" prop="title">
          <Input v-model="editModel.title" placeholder="标题"></Input>
        </Form-item>
        <Form-item label="商品" prop="merchandise">
          <Select v-model="editModel.merchandise">
            <Option v-for="item in merchandiseList" :value="item.id" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="数量" prop="amount">
          <Input-number :max="1000" :min="1" :step="1" v-model="editModel.amount"></Input-number>
        </Form-item>
        <Form-item label="单价" prop="price">
          <Input-number :max="10000" :min="1" :step="0.1" v-model="editModel.price"></Input-number>
        </Form-item>
        <Form-item label="付款方式" prop="payment">
          <Select v-model="editModel.payment">
            <Option v-for="item in paymentList" :value="item.code" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="购买人" prop="buyer">
          <Input v-model="editModel.buyer" placeholder="购买人"></Input>
        </Form-item>
        <Form-item label="手机号" prop="cell_phone">
          <Input v-model="editModel.cell_phone" placeholder="手机号"></Input>
        </Form-item>
        <Form-item label="城市" prop="city">
          <Cascader :data="chinaCities" v-model="editModel.city" :filterable=true trigger="hover" placeholder="请选择所在城市"></Cascader>
        </Form-item>
        <Form-item label="详细地址" prop="address">
          <Input v-model="editModel.address" placeholder="详细地址"></Input>
        </Form-item>
        <Form-item label="订单状态" prop="status">
          <Select v-model="editModel.status">
            <Option v-for="item in orderStatusList" :value="item.id" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="快递公司" prop="express">
          <Select v-model="editModel.express">
            <Option v-for="item in expresseList" :value="item.code" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="快递单号" prop="express_no">
          <Input v-model="editModel.express_no" placeholder="快递单号"></Input>
          <Button @click="updateExpressInfo(editModel.express, editModel.express_no)" type="primary" shape="circle">更新快递信息</Button>
        </Form-item>
        <Form-item label="快递单号" prop="express_info">
          <Input v-model="editModel.express_info" type="textarea" placeholder="快递信息"></Input>
        </Form-item>
      </Form>
    </Modal>

    <Modal v-model="showDeleteModal" title="删除订单" @on-ok="confirmDelete('deleteModelForm')" @on-cancel="cancelDelete('deleteModelForm')" >
      <Form ref="deleteModelForm" :model="deleteModel" :label-width="100">
        <Form-item label="标题" prop="title">
          <Input v-model="deleteModel.title" placeholder="标题" :readonly=true></Input>
        </Form-item>
        <Form-item label="商品" prop="merchandise">
          <Select v-model="deleteModel.merchandise" :disabled=true>
            <Option v-for="item in merchandiseList" :value="item.id" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="购买人" prop="buyer">
          <Input v-model="deleteModel.buyer" placeholder="购买人" :readonly=true></Input>
        </Form-item>
        <Form-item label="手机号" prop="cell_phone">
          <Input v-model="deleteModel.cell_phone" placeholder="手机号" :readonly=true></Input>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import { getOrderList, addOrder, putOrder, getMerchandiseList, getExpressList, getPaymentList, getExpressInfo, getOrderStatusList } from '../../api/api'
  import { chinaCities } from '../../data/data'
  export default {
    data: function () {
      return {
        filter: '',
        chinaCities,
        merchandiseList: [],
        expresseList: [],
        paymentList: [],
        orderStatusList: [],
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
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        addModel: {
          title: 'lasdkjf',
          merchandise: 1,
          amount: 1,
          price: 1,
          payment: 'hdfk',
          buyer: 'asldk',
          cell_phone: '18001163901',
          city: ['11', '12'],
          address: 'lasd',
          comment: '',
          status: 1,
          express: 'shunfeng',
          express_no: '123322',
          express_info: ''
        },
        editModel: {
          title: '',
          merchandise: 0,
          amount: 0,
          price: 0,
          payment: '',
          buyer: '',
          cell_phone: '',
          city: [],
          address: '',
          comment: '',
          status: 1,
          express: '',
          express_no: '',
          express_info: ''
        },
        deleteModel: {
          title: '',
          merchandise: null,
          amount: null,
          buyer: '',
          cell_phone: ''
        },
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
            { required: true, type: 'array', message: '请选择所在城市', len: 2, trigger: 'blur' }
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
            title: '顾客',
            key: 'buyer',
            align: 'left',
            sortable: true
          },
          {
            title: '电话',
            key: 'cell_phone',
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
            title: '状态',
            key: 'status',
            align: 'center',
            sortable: true
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render (row, column, index) {
              return `<i-button type="primary" size="small" @click="showEdit (${index})">查看</i-button> <i-button type="error" size="small" @click="showDelete (${index})">删除</i-button>`
            }
          }
        ]
      }
    },
    methods: {
      showEdit (index) {
        this.showEditModal = true
        this.editModel = this.tableData[index]
        // console.log('before:' + this.editModel.city)
        this.editModel.city = Array.isArray(this.editModel.city) ? this.editModel.city : this.editModel.city.split(',')
        // console.log('after:' + this.editModel.city)
        this.editModel.amount = Number(this.editModel.amount)
        this.editModel.price = Number(this.editModel.price)
        /* this.$Modal.info({ */
        /*   title: '订单信息', */
        /*   content: `标题：${this.tableData[index].title}<br>商品：${this.tableData[index].merchandise}<br>地址：${this.tableData[index].addr}` */
        /* }) */
      },
      showDelete (index) {
        this.showDeleteModal = true
        this.deleteModel = this.tableData[index]
      },
      cancelDelete (index) {
        this.showDeleteModal = false
        this.$Message.info('点击了取消')
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
      // 获取订单状态列表
      getOrderStatusList: function () {
        let para = {
          page: this.page
        }
        getOrderStatusList(para).then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            this.loginMessage = statusText
          } else {
            // console.log(JSON.stringify(data.results))
            this.orderStatusList = data.results
          }
        }, (error) => {
          // console.log('Error in getOrderStatusList: ' + error)
          this.$Message.error('获取订单状态列表失败!' + error)
        }).catch((error) => {
          // console.log('Error in getOrderStatusList: ' + error)
          this.$Message.error('获取订单状态列表失败!' + error)
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
            console.log(this.addModel.city)
            // 坑，注意javascript的浅复制，使用JSON实现深复制
            let addModelSubmit = JSON.stringify(this.addModel)
            addModelSubmit = JSON.parse(addModelSubmit)
            addModelSubmit.city = addModelSubmit.city.join(',')
            console.log(addModelSubmit)
            addOrder(addModelSubmit).then((res) => {
              let { data, status, statusText } = res
              if (status !== 201) {
                this.loginMessage = statusText
                console.log(data.detail)
                this.$Message.error('添加订单失败!')
              } else {
                console.log(data)
                // data.city = data.city.split(',')
                this.$Message.success('添加订单成功!')
                this.showAddModel = false
                // 更新订单列表
                this.getOrder()
              }
            }, (error) => {
              console.log('Error in addOrder: ' + error)
              this.$Message.error('添加订单失败!')
            }).catch((error) => {
              console.log('Exception in addOrder: ' + error)
              this.$Message.error('添加订单失败!')
            })
          } else {
            console.log(this.$refs[name].errors)
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

      // 更新快递公司信息
      updateExpressInfo (express, expressNo) {
        /* window.alert('updating' + express + ':' + expressNo) */
        let paras = { company: express, postId: expressNo }
        console.log(paras)
        getExpressInfo(paras).then((res) => {
          let { data, status, statusText } = res
          if (status !== 201) {
            this.$Message.error(statusText)
          } else {
            console.log(data)
            this.editModel.express_info = JSON.stringify(data)
            this.$Message.success('获取快递信息成功!')
          }
        }, (error) => {
          console.log('Error in editOrder: ' + error)
          this.$Message.error('获取快递信息失败!')
        }).catch((error) => {
          console.log('catched in editOrder:' + error)
          this.$Message.error('获取快递信息失败!')
        })
      },
      // 修改订单
      confirmEdit: function (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let editModelSubmit = JSON.stringify(this.editModel)
            editModelSubmit = JSON.parse(editModelSubmit)
            editModelSubmit.city = editModelSubmit.city.join(',')
            console.log(editModelSubmit)
            putOrder(editModelSubmit).then((res) => {
              let { data, status, statusText } = res
              if (status !== 200) {
                console.log(statusText)
                this.$Message.error(status)
              } else {
                console.log(data.city)
                data.city = Array.isArray(data.city) ? data.city : data.city.split(',')
                data.amount = Number(data.amount)
                data.price = Number(data.price)
                this.editModel = data
                console.log(this.editModel)
                this.$Message.success('修改订单成功!')
                this.getOrder()
              }
            }, (error) => {
              console.log('Error in editOrder: ' + error)
              this.$Message.error('修改订单失败!')
            }).catch((error) => {
              console.log('catched in editOrder:' + error)
              this.$Message.error('修改订单失败!')
            })
          } else {
            this.$Message.error('订单信息校验失败!')
          }
        })
      },

      handleReset (name) {
        this.$refs[name].resetFields()
      }
    },
    mounted () {
      this.getOrder()
      this.getMerchandiseList()
      this.getExpressList()
      this.getOrderStatusList()
      this.getPaymentList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../styles/vars'
</style>
