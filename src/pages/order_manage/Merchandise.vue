<template>
  <html>
    <head>
      <meta content="text/html; charset=gbk" http-equiv="Content-Type">
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"> 
      <meta name="apple-mobile-web-app-capable" content="yes"> 
      <meta name="apple-touch-fullscreen" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="black">
      <meta name="MobileOptimized" content="320">
      <meta name="format-detection" content="telephone=no">
      <link rel="icon" type="image/x-icon" href="http://wap.shick.cn/favicon.ico">
      <title>滚动字幕测试</title>
      <meta content="蜜蜡手串特卖活动" name="keywords">
      <meta content="蜜蜡手串特卖活动" name="description">
    </head>
    <body>
      <div id="page">
        <div class="banner">
          <img alt=" 1.jpg" src="../../assets/1.jpg">
        </div>
        <section class="buy">
          <div class="row1">
            <strong>￥298</strong>
            <ol>
              <li><p>原价</p>{{ merchandiseDetail.old_price | currency }}</li>
              <li><p>折扣</p>{{ merchandiseDetail.price / merchandiseDetail.old_price }}</li>
              <li><p>节省</p>{{ merchandiseDetail.old_price - merchandiseDetail.price }}</li>
            </ol>
          </div>

          <div class="row2">
            <strong>{{ merchandiseDetail.sold_amount }}人已购买</strong>
            <count-down :endTime="merchandiseDetail.end_datetime" :callback="countDownCallback" endText="促销已结束"></count-down>
          </div>

          <a href="#buy" class="btn">立即购买</a>
        </section>  

        <article class="showcontent">    
          <h2><Icon type="arrow-down-b"></Icon>抢购描述</h2>
          <div class="buy-description">
            <p>珍藏级天然蜜蜡，全国顺丰包邮，货到付款，支持七天无理由退换货！</p>
            <p><br></p>
            <p>
              <strong>
                特别提醒：由于抢购太过火爆，电话爆线，接通较慢，请您选择在线下单。
                下单后我们客服人员会在24小时内给您致电核实订单，请您一定要高抬贵手接听下电话 谢谢！
              </strong>
            </p>
          </div>

          <h2><Icon type="arrow-down-b"></Icon>购买流程</h2>
          <p><img alt=" 20.jpg" src="../../assets/2.gif"></p>
          <h2><Icon type="arrow-down-b"></Icon>产品简介</h2>
          <template v-for="value, index in merchandiseDetail.pictures">
            <p>
              <img :src="mediaRoot + value.image">
            </p>
          </template>
          <h2><Icon type="arrow-down-b"></Icon>【重要提醒】</h2>
          <div class="btn">
            <ol>
              <li>活动期间，咨询人数众多，请尽可能自助下单！</li>
              <li>下单之后24小时内安排发货，大概3-5天到货！快递默认顺丰，顺丰到不了发圆通或EMS！</li>
              <li>珍藏级纯天然蜜蜡【促销价 仅需298元】全国包邮，货到付款，先验货后签收！发现非正品，商家承担来回运费！</li>
            </ol>
            <div class="remind">特别提醒：因部分客户所提交订单信息不全 所以我们会在24小时内给尊贵你的致电核实订单 请亲一定要高抬贵手接听下电话，谢谢！！！</div>
            <a href="tel:13202029800" class="btn">热线咨询：13202029800</a>
            <a href="sms:13202029800" class="btn">短信订购 ：13202029800</a> 
            <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=1941907304&amp;site=qq&amp;menu=yes" class="btn qq">QQ咨询：1941907304</a>
            <a class="btn">微信咨询：13202029800</a> 
          </div>
        </article>  

        <article class="comments">  
          <h2><Icon type="arrow-down-b"></Icon>客户评价</h2>
          <div class="pingjia" id="pingjia">
            <div id="comment-window" class="comment">
              <div id="comments" class="comment-inner">
                {{ merchandiseDetail.comments }}
                <template v-for="comment in merchandiseDetail.comments">
                  <div class="comment-content">{{ comment.title }}</div>
                  <div class="comment-name">{{ comment.content }}</div>
                </template>
              </div>
              <div id="comments-copy" class="comment-inner">
              </div>
            </div>
          </div>
        </article>

        <article class="buy">
          <h2><Icon type="arrow-down-b"></Icon>订单信息</h2>
          <!--订单-->
          <div id="order">
            <Form ref="orderForm" :model="orderModel" :rules="ruleValidate" :label-width="100">
              <Form-item label="款式" prop="sum_amount">
                <template v-for="item in merchandiseDetail.submerchandises">
                  <img :src="mediaRoot + item.image">
                  <!--用数组的序号表示orderDetail的ID-->
                  <Input-number size="small" :max="10" :min="0" v-model="orderModel.orderDetail[item.id]"></Input-number>
                  {{ item.name | capitalize }}
                </template>
              {{ orderModel.orderDetail }}
              sum_amount: {{ sum_amount }}
              </Form-item>
              <Form-item label="接收人" prop="buyer">
                <Input v-model="orderModel.buyer" placeholder="接收人"></Input>
              </Form-item>
              <Form-item label="手机号" prop="cell_phone">
                <Input v-model="orderModel.cell_phone" placeholder="手机号"></Input>
              </Form-item>
              <Form-item label="为朕掌图">
                <Checkbox v-model="showMap">
                  <span v-if="showMap">请点击地图位置指定快递地点（取消勾选收起地图）</span>
                  <span v-if="!showMap">打开地图可在地图上点击指定快递地点（共享地理位置选择更快)</span>
                </Checkbox>
              </Form-item>
              <Form-item label="地区" prop="city">
                <Cascader :data="chinaCities" v-model="orderModel.city" :filterable=true trigger="hover" placeholder="请选择所在地区" @on-change="handleCityChange()"></Cascader>
              </Form-item>
              <Form-item label="详细地址" prop="address">
                <Input v-model="orderModel.address" placeholder="地址"></Input>
              </Form-item>
              <baidu-map class="baidu-map" v-if="showMap" :center="baiduMap.center" @ready="mapReady">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
              </baidu-map>
              <Form-item label="留言" prop="comment">
                <Input v-model="orderModel.comment" type="textarea" placeholder="留言"></Input>
              </Form-item>
              <Form-item label="付款方式" prop="payment">
                <Radio-group v-model="orderModel.payment" label="hdfk">
                  <Radio label="hdfk">
                    <Icon type="ios-cart" size="18"></Icon><span>货到付款</span>
                  </Radio>
                </Radio-group>
              </Form-item>
              <Form-item>
                <Button type="primary" @click="submitOrder('orderForm')">立即提交订单</Button>
              </Form-item>
            </Form>
          </div>
          <div id="new-order-window">
            <ul id="orders">
              <li><span>[最新购买]：</span>谭**（133****4096）在18分钟前订购了 蜜蜡手串20mm(12颗男款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>张**（130****3260）在1分钟前订购了 蜜蜡手串18mm(13颗男款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>李**（136****7163）在3分钟前订购了 蜜蜡手串12mm(16颗女款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>赵**（139****1955）在7分钟前订购了 蜜蜡手串12mm(16颗女款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>刘**（180****6999）在9分钟前订购了 蜜蜡手串8mm(108颗长款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>周**（151****2588）在4分钟前订购了 蜜蜡手串12mm(16颗女款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>张**（130****3260）在1分钟前订购了 蜜蜡手串8mm(108颗长款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>李**（136****7163）在3分钟前订购了 蜜蜡手串18mm(13颗男款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>赵**（139****1955）在7分钟前订购了 蜜蜡手串12mm(16颗女款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>刘**（180****6999）在9分钟前订购了 蜜蜡手串18mm(13颗男款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>周**（151****2588）在4分钟前订购了 蜜蜡手串8mm(108颗长款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>王**（133****4096）在10分钟前订购了 蜜蜡手串18mm(13颗男款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>秦**（139****1955）在15分钟前订购了 蜜蜡手串20mm(12颗男款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>朱**（180****6999）在20分钟前订购了 蜜蜡手串18mm(13颗男款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>吴**（151****2588）在12分钟前订购了 蜜蜡手串8mm(108颗长款) <font color="#FF0000">√</font></li>
              <li><span>[最新购买]：</span>谭**（133****4096）在18分钟前订购了 蜜蜡手串8mm(108颗长款) <font color="#FF0000">√</font></li>
            </ul>
            <ul id="orders-copy"></ul>
          </div>

          <!--订单-->
        </article>  
        <footer>
          <p></p><center></center><p></p>
        </footer>
      </div><!--/page-->

      <nav>
        <ul class="Transverse">
          <li><a href="#buy" class="btn"><strong>在线下单</strong></a></li> 
          <li><a href="tel:13202029800" class="btn"><strong>电话咨询</strong></a></li>  
          <li><a href="sms:13202029800" class="btn"><strong>短信订购</strong></a></li>
        </ul>
      </nav>
    </body>
  </html>
</template>

<script>
  import { getMerchandiseDetail, getChinaCities, addOrder } from '../../api/api'
  import { mapState } from 'vuex'
  // import CountDown from '../../components/CountDown.vue'
  export default {
    data () {
      return {
        merchandiseDetail: {},
        orderDetailModel: {},
        orderModel: {
          // orderDetail: new Array(100)
          city: [],
          address: '',
          payment: 'hdfk',
          orderDetail: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        chinaCities: [],
        ruleValidate: {
          sum_amount: [
            { required: true, type: 'number', min: 1, max: 1000, message: '请选择相中的商品', trigger: 'blur' }
          ],
          sum_price: [
            { required: true, type: 'number', min: 0, max: 10000, message: '介是几个钱？', trigger: 'blur' }
          ],
          payment: [
            { required: true, type: 'string', message: '咱们咋算？', trigger: 'blur' }
          ],
          buyer: [
            { required: true, message: '怎么称呼您昵？亲', trigger: 'blur' }
          ],
          cell_phone: [
            { required: true, message: '留个电话才好约哦', trigger: 'blur' },
            {
              validator (rule, value, callback, source, options) {
                let errors = []
                if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) {
                  errors.push(new Error('介个手机号打不通哦'))
                }
                callback(errors)
              }
            }
          ],
          city: [
            { required: true, type: 'array', message: '请选择所在城市', min: 2, max: 4, trigger: 'blur' }
          ],
          address: [
            { required: true, message: '方便具体点么？', trigger: 'blur' }
          ]
        },
        showMap: false,
        map: null,
        BMap: null,
        baiduMap: {
          center: {lng: 116.404, lat: 39.915},
          zoom: 15,
          theme: {},
          mapType: 'BMAP_NORMAL_MAP'
        }
      }
    },
    components: {
      CountDown: resolve => { require(['../../components/CountDown.vue'], resolve) },
      ScrollDiv: resolve => { require(['../../components/ScrollDiv.vue'], resolve) }
    },
    computed: {
      ...mapState({
        mediaRoot: state => state.mediaRoot
      }),
      endDatetime: function () {
        console.log(this.merchandiseDetail.end_datetime)
        return this.merchandiseDetail.end_datetime
      },
      sum_amount: function () {
        let sum = 0
        for (let i = 0; i < this.orderModel.orderDetail.length; i++) {
          sum += this.orderModel.orderDetail[i]
        }
        return sum
      }
    },
    created () {
      this.getMerchandise()
    },
    watch: {
      '$route': 'getMerchandise'
    },
    methods: {
      getMerchandise () {
        // console.log(this.$route.params.id)
        getMerchandiseDetail(this.$route.params.id).then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            console.log(statusText)
            this.$Message.error('获取商品信息失败!')
          } else {
            // console.log(data)
            this.merchandiseDetail = data
          }
        }, (error) => {
          console.log('Error in getMerchandiseDetail: ' + error)
          this.$Message.error('获取商品信息失败!')
        }).catch((error) => {
          console.log('catched in getMerchandiseDetail:' + error)
          this.$Message.error('获取商品信息失败!')
        })
      },
      mapReady ({BMap, map}) {
        this.map = map
        this.BMap = BMap
        let _this = this
        // console.log(_this.orderModel.sum_amount)
        map.centerAndZoom(_this.baiduMap.center, _this.baiduMap.zoom)
        // console.log(BMap, map)
        let geolocation = new BMap.Geolocation()
        let geoCoder = new BMap.Geocoder()
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() === 0) {
            map.centerAndZoom(r.point, _this.baiduMap.zoom)
            // that.$Message.success('您所在的经纬度为:' + r.point.lng + r.point.lat)
            geoCoder.getLocation(r.point, function (result) {
              if (result) {
                // _this.$Message.success('您所在的经纬度为:' + r.point.lng + r.point.lat)
                // _this.$Message.success('您所在的位置为:' + result.address)
                _this.orderModel.address = result.address
                let addComp = result.addressComponents
                let city = [addComp.province.replace('省', '').replace('市', '').replace('自治区', ''), addComp.city.replace('市', ''), addComp.district]
                if (city[0] === city[1]) {
                  city.shift()
                  city[1] = city[1].substring(0, city[1].substring.length)
                }
                _this.orderModel.city = city
              } else {
                // _this.$Message.warning('获取地理位置失败！')
              }
            })
          } else {
            map.centerAndZoom(_this.baiduMap.center, _this.baiduMap.zoom)
            _this.$Message.warning('获取地理位置信息失败')
          }
        })
        map.addEventListener('click', function (e) {
          let pt = e.point
          geoCoder.getLocation(pt, function (rs) {
            let addComp = rs.addressComponents
            _this.orderModel.address = rs.address
            let city = [addComp.province.replace('省', '').replace('市', '').replace('自治区', ''), addComp.city.replace('市', ''), addComp.district]
            if (city[0] === city[1]) {
              city.shift()
              city[1] = city[1].substring(0, city[1].substring.length)
            }
            _this.orderModel.city = city
          })
        })
      },
      countDownCallback () {
        console.log('end of cound down')
      },
      commentsScroll () {
        let commentWindow = document.getElementById('comment-window')
        let comments = document.getElementById('comments')
        let commentsCopy = document.getElementById('comments-copy')
        commentsCopy.innerHTML = comments.innerHTML
        function Marquee () {
          if (commentsCopy.offsetHeight - commentWindow.scrollTop <= 0) {
            commentWindow.scrollTop -= commentsCopy.offsetHeight
          } else {
            commentWindow.scrollTop ++
          }
        }
        let MyMar = setInterval(Marquee, 40)
        commentWindow.onmouseover = function () {
          clearInterval(MyMar)
        }
        commentWindow.onmouseout = function () {
          MyMar = setInterval(Marquee, 40)
        }
      },
      ordersScroll () {
        let orderWindow = document.getElementById('new-order-window')
        let orders = document.getElementById('orders')
        let ordersCopy = document.getElementById('orders-copy')
        ordersCopy.innerHTML = orders.innerHTML
        function Marquee () {
          if (ordersCopy.offsetHeight - orderWindow.scrollTop <= 0) {
            orderWindow.scrollTop -= ordersCopy.offsetHeight
          } else {
            orderWindow.scrollTop ++
          }
        }
        let MyMar = setInterval(Marquee, 40)
        orderWindow.onmouseover = function () {
          clearInterval(MyMar)
        }
        orderWindow.onmouseout = function () {
          MyMar = setInterval(Marquee, 40)
        }
      },
      // 获取城市列表
      getChinaCities: function () {
        getChinaCities().then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            this.loginMessage = statusText
          } else {
            // console.log(data)
            this.chinaCities = JSON.parse(data)
            // console.log(this.chinaCities[2].children)
          }
        }, (error) => {
          this.$Message.error('获取城市列表失败!' + error)
        }).catch((error) => {
          this.$Message.error('获取城市列表失败!' + error)
        })
      },
      submitOrder: function (name) {
        this.orderModel.sum_amount = this.sum_amount
        console.log(this.orderModel)
        this.$refs[name].validate((valid) => {
          if (valid) {
            let orderModelSubmit = JSON.stringify(this.orderModel)
            orderModelSubmit = JSON.parse(orderModelSubmit)
            orderModelSubmit.city = orderModelSubmit.city.join(',')
            addOrder(orderModelSubmit).then((res) => {
              let { data, status, statusText } = res
              if (status === 201) {
                this.$Message.success('订单提交成功!')
              } else if (status === 200) {
                console.log(data)
                this.$Message.warning('请勿重复提交订单!')
              } else {
                console.log(statusText)
                this.$Message.warning('请勿重复提交订单!')
              }
            }, (error) => {
              this.$Message.error('保存订单失败!' + error)
            }).catch((error) => {
              this.$Message.error('保存订单失败!' + error)
            })
          } else {
            this.$Message.error('订单信息校验失败!')
          }
        })
      },
      handleCityChange: function () {
        console.log('city changed')
      }
    },
    mounted () {
      // console.log('mounted')
      this.getMerchandise()
      this.commentsScroll()
      this.ordersScroll()
      this.getChinaCities()
    }
  }
</script>

<style lang="stylus" scoped>
  // vars
  body-background = #856D35
  margin-left = 10px
  margin-right = 10px
  icon-margin-left = 10px
  icon-margin-right = 10px
  // padding marign: top right bottom left
  padding-top = 6px
  padding-right = 6px
  padding-bottom = 6px
  padding-left = 6px
  title-font-size = 20px
  content-font-size = 16px
  max-width = 750px

  // page setting
  body
    background: body-background none
    margin: 0
  #page
    background-color: #f9f9f9 none repeat scroll 0 0
    height: auto
    /* 此两项可设置居中 
    * margin: 0 auto
    * max-width:750px */
    margin: 0 auto
    max-width: max-width
    width: 100%
    min-height: 100%
    padding: 0 0 50px
  header
    background: 0
  ul 
    margin 0
    padding 0
    li 
      list-style-type none
  a 
    text-decoration none
  img 
    border 0
  section.buy
    width: 100%
    height: auto
    background: #44361C
    padding: 5px 0 15px
    text-shadow: none
    text-align: center
    overflow: hidden
    .row1, row2
      width: 96%
      height: auto
      margin: 0 auto
      padding: 0
      clear: both 
    .row1 strong
      display: block
      width: 35%
      float: left
      font-size: 48px
      color: #ff0
      text-shadow: 1px 1px 0px #000
      line-height: 60px
    .row1 ol
      width: 65%
      height: inherit
      margin: 0
      padding: 0
      overflow: hidden
    .row1 ol li
      width: 33%
      float: left
      color: #886536
      line-height: 30px
      font-size: 16px
      p
        color: #9a9874
    .row2
      border-top: 1px dotted #524524
      padding: 10px 0
      line-height: 30px
      height: 50px
      overflow: hidden
    .row2 strong
      color: #9a7c48
      display: block
      float: left
      font-size: 20px
      height: 30px
      line-height: 30px
      width: 35%
    .row2
      color: #d0740a
      height: 30px
      line-height: 30px
      overflow: hidden
      padding: 0
      margin: 0
      text-align: center
      span
        width: 65%
        font-size: 26px
  section.buy a.btn
    background-color: #FF5600
    border-radius: 6px
    color: #FFF
    display: block
    margin: margin-left auto
    padding: 10px 0
    text-align: center
    text-shadow: 1px 1px 1px #333
    height: 48px
    width: 96%
    font-size: 18px

  article.showcontent
    background-color: #FFF
    h2
      background-color: #E0E0E0
      padding-left: padding-left
      font-size: title-font-size
      .ivu-icon
        margin-right: icon-margin-right
    ol li
      // list-style保证序号显示
      list-style: decimal inside
      margin-left: margin-left
      font-size: content-font-size
    .remind
      color: red
      font-size: content-font-size
      margin-left: margin-left
    div.buy-description p
      padding-left: padding-left
      margin-left: margin-left
      font-size: content-font-size
      strong
        color: red
    div.btn 
      padding-bottom: padding-bottom
      a.btn
        background-color: #ff5600
        border-radius: 6px
        color: #fff
        display: block
        margin: 5px auto
        padding: 10px 0
        text-align: center
        text-shadow: 1px 1px 1px #333
        width: 96%
  article.buy
    background-color: #FFF

  
  .baidu-map
    width: 100%
    height: 300px

  #comment-window
    overflow: hidden
    white-space: nowrap
    height: 100px
    width: 100%

  #new-order-window
    overflow: hidden
    white-space: nowrap
    height: 100px
    width: 100%
    background: #F0F0F0
    ul
      padding-left: padding-left
      margin-left: margin-left
      span
        color: #7CFC00

  nav
    width: 100%
    bottom: 0
    left: 0
    margin: 0 auto
    padding: 0
    position: fixed
    ul li a
      color: #FFF
      display: block
      font-size: 0.8em
      line-height: 45px
      width: 100%
      strong
        font-weight: normal
        left: 0
        postion: relative
        top: 10px
  nav ul.Transverse
    position: relative
    li
      background-color: #FF5600
    li:last-child
      border-right: 0 none
    li a
      border-right: 1px dotted
      strong
        display: inline
        font-size: 14px
        font-weight: normal
        padding-left: 32px
      

  
    font-size: 18px
    position: relative
    float: left
    color: #FFF
    display: block
    margin: margin-left auto
    padding: 10px 0
    text-align: center
    text-shadow: 1px 1px 1px #333
    height: 48px
</style>
