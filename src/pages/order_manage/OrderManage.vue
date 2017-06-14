<template>
  <div>
    <Row>
      <Col span="6">
        <Date-picker v-model="dateRange" type="daterange" format="yyyy-MM-dd" :options="dateOptions" placement="bottom-start" placeholder="订单创建时间"></Date-picker>
      </Col>
      <Col span="8">
        <Input v-model="filter" icon="icon-search" placeholder="本地检索"></Input>
      </Col>
      <Col span="3">
        <i-button type="primary" @click="getOrder()">查询</i-button>
      </Col>
      <Col span="4" push="3">
        <i-button type="primary" @click="showAddModal=true">添加订单</i-button>
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
        <Form-item label="接收人" prop="buyer">
          <Input v-model="addModel.buyer" placeholder="接收人"></Input>
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
        <Form-item label="备注" prop="comment">
          <Input v-model="addModel.comment" type="textarea" placeholder="有什么特别想说的"></Input>
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
        <Form-item label="接收人" prop="buyer">
          <Input v-model="editModel.buyer" placeholder="接收人"></Input>
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
        <Form-item label="备注" prop="comment">
          <Input v-model="editModel.comment" type="textarea" placeholder="有什么特别想说的"></Input>
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
        <Form-item label="快递详情" prop="express_info">
          <!-- <Input v-model="editModel.express_info" textarea=true></Input> -->
          <Collapse v-model="json_express_info.data">
            <Panel name="json_express_info">
              <span v-if="json_express_info.ischeck === '1'">已签收: {{ json_express_info.message }}</span>
              <span v-else>未签收: {{ json_express_info.message }}</span>
              <p slot="content" v-for="item, key in json_express_info.data">
                {{ JSON.stringify(item) }}
              </p>
            </Panel>
          </Collapse>
        </Form-item>
      </Form>
    </Modal>

    <Modal v-model="showDeleteModal" title="删除订单" @on-ok="confirmDelete('deleteModelForm')" @on-cancel="cancelDelete('deleteModelForm')" >
      <h3 class="warning-title">确认删除下面订单？</h3>
      <Form ref="deleteModelForm" :model="deleteModel" :label-width="100">
        <Form-item label="标题" prop="title">
          <Input v-model="deleteModel.title" placeholder="标题" :readonly=true></Input>
        </Form-item>
        <Form-item label="商品" prop="merchandise">
          <Select v-model="deleteModel.merchandise" :disabled=true>
            <Option v-for="item in merchandiseList" :value="item.id" :key="item">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="接收人" prop="buyer">
          <Input v-model="deleteModel.buyer" placeholder="接收人" :readonly=true></Input>
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
        chinaCities,
        merchandiseList: [],
        expresseList: [],
        paymentList: [],
        orderStatusList: [],
        dateRange: [new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate() - 2), new Date()],
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
        filter: '',
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        addModel: {
          title: '',
          merchandise: 1,
          amount: 1,
          price: 1,
          payment: 'hdfk',
          buyer: '',
          cell_phone: '',
          city: [],
          address: '',
          comment: '',
          status: 1,
          express: 'shunfeng',
          express_no: ''
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
          express_no: ''
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
            sortable: true,
            render (row, column, index) {
              let statusArray = ['已下单', '已处理', '已发货', '已签收', '已结算', '已完成', '已废弃']
              return `${statusArray[row.status - 1]}`
            }
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
    computed: {
      json_express_info: function () {
        if (this.editModel.express_info) {
          return JSON.parse(this.editModel.express_info)
        }
        return {}
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
      },
      showDelete (index) {
        this.showDeleteModal = true
        this.deleteModel = this.tableData[index]
      },
      cancelDelete (index) {
        this.showDeleteModal = false
        this.$Message.info('点击了取消')
      },
      // 获取商品列表
      getMerchandise: function () {
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
      getPayment: function () {
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
      getOrderStatus: function () {
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
      getExpress: function () {
        let para = {
          page: this.page
        }
        getExpressList(para).then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            this.loginMessage = statusText
          } else {
           /* console.log(JSON.stringify(data.results)) */
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
          start: this.dateRange[0].getFullYear() + '-' + (this.dateRange[0].getMonth() + 1) + '-' + (this.dateRange[0].getDate() + 1),
          end: this.dateRange[1].getFullYear() + '-' + (this.dateRange[1].getMonth() + 1) + '-' + (this.dateRange[1].getDate() + 1),
          filter: this.filter,
          page: this.page
        }
        this.$Loading.start()
        getOrderList(para).then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            this.loginMessage = statusText
          } else {
            this.$Loading.finish()
            this.total = res.data.count
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
      changePage (row) {
        console.log(row)
        this.page = row
        this.getOrder()
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
            // console.log(this.addModel.city)
            // 坑，注意javascript的浅复制，使用JSON实现深复制
            let addModelSubmit = JSON.stringify(this.addModel)
            addModelSubmit = JSON.parse(addModelSubmit)
            addModelSubmit.city = addModelSubmit.city.join(',')
            // console.log(addModelSubmit)
            addOrder(addModelSubmit).then((res) => {
              let { data, status, statusText } = res
              if (status !== 201) {
                this.loginMessage = statusText
                // console.log(data.detail)
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
        if (express || expressNo) {
          this.$Message.error('请选择快递公司并填写正确的快递单号')
          return null
        }
        let paras = { company: express, postId: expressNo }
        // console.log(paras)
        getExpressInfo(paras).then((res) => {
          let { data, status, statusText } = res
          if (status !== 201) {
            this.$Message.error(statusText)
          } else {
            console.log(data)
            console.log(data.ischeck === '1')
            console.log(this.editModel.status < 4)
            /* this.json_express_info = data */
            this.editModel.express_info = JSON.stringify(data)
            this.$Message.success('获取快递信息成功!')
            if ((data.ischeck === '1') && (this.editModel.status < 4)) {
              this.editModel.status = 4
            } else {
              /* this.editModel.comment = 'no' */
              console.log((data.ischeck === 'l') && (this.editModel.status < 4))
            }
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
            // 用这个办法实现深复制
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
      // 修改订单
      confirmDelete: function (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log('deleting')
            let deleteModelSubmit = JSON.stringify(this.deleteModel)
            deleteModelSubmit = JSON.parse(deleteModelSubmit)
            deleteModelSubmit.status = 7
            putOrder(deleteModelSubmit).then((res) => {
              let { data, status, statusText } = res
              if (status !== 200) {
                console.log(statusText)
                this.$Message.error(status)
              } else {
                console.log(data)
                this.$Message.success('删除订单成功!')
                this.getOrder()
              }
            }, (error) => {
              console.log('Error in deleteOrder: ' + error)
              this.$Message.error('删除订单失败!')
            }).catch((error) => {
              console.log('catched in deleteOrder:' + error)
              this.$Message.error('删除订单失败!')
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
      this.getMerchandise()
      this.getExpress()
      this.getOrderStatus()
      this.getPayment()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../styles/vars'
  .warning-title
    color: warning-color
    text-align: center
</style>
