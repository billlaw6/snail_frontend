<template>
  <div>
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
          <!--<Cascader :data="chinaCities" v-model="addModel.city" :filterable=true trigger="hover" placeholder="请选择所在城市"></Cascader>-->
          <Input v-model="addModel.city" placeholder="手机号"></Input>
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
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        addModel: {
          title: 'lasdkjf',
          merchandise: 1,
          amount: 1,
          price: 1,
          payment: 'hdfk',
          buyer: 'asldk',
          cell_phone: '18001163901',
          // city: ['13', '11'],
          city: "['13', '11']",
          address: 'lasd',
          comment: '',
          express: 'shunfeng',
          express_no: '123322',
          express_info: ''
        }
      }
    },
    methods: {
    },
    mounted () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../styles/vars'
</style>
