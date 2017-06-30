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
              <Form-item label="款式" prop="orderDetail">
                <template v-for="item in merchandiseDetail.submerchandises">
                  <img :src="mediaRoot + item.image">
                  <Input-number :max="item.max_amount" :min="item.min_amount" :step="1" v-model="orderDetailModel.amount" :key="item"></Input-number>
                  {{ item.name }}
                </template>
              </Form-item>
              <Form-item label="接收人" prop="buyer">
                <Input v-model="orderModel.buyer" placeholder="接收人"></Input>
              </Form-item>
              <Form-item label="手机号" prop="cell_phone">
                <Input v-model="orderModel.cell_phone" placeholder="手机号"></Input>
              </Form-item>
              <Form-item label="地区" prop="city">
                <Cascader :data="chinaCities" v-model="orderModel.city" :filterable=true trigger="hover" placeholder="请选择所在地区"></Cascader>
              </Form-item>
              <Form-item label="地址" prop="address">
                <Input v-model="orderModel.address" placeholder="地址"></Input>
              </Form-item>
              <Form-item label="留言" prop="comment">
                <Input v-model="orderModel.comment" type="textarea" placeholder="留言"></Input>
              </Form-item>
              <Form-item label="标题" prop="order_no">
                <Input v-model="orderModel.order_no" placeholder=""></Input>
              </Form-item>
              <Form-item label="单价" prop="price">
                <Input-number :max="10000" :min="1" :step="1" v-model="orderModel.price"></Input-number>
              </Form-item>
              <Form-item label="付款方式" prop="payment">
                <Input v-model="orderModel.payment" value="hdfk"></Input>
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
          <li><a href="#buy"><strong>在线下单</strong></a></li> 
          <li><a href="tel:13202029800"><strong>电话咨询</strong></a></li>  
          <li><a href="sms:13202029800"><strong>短信订购</strong></a></li>
        </ul>
      </nav>
    </body>
  </html>
</template>

<script>
  import { getMerchandiseDetail, getChinaCities } from '../../api/api'
  import { mapState } from 'vuex'
  // import CountDown from '../../components/CountDown.vue'
  export default {
    data () {
      return {
        merchandiseDetail: {},
        orderDetailModel: {},
        orderModel: {},
        chinaCities: [],
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
          ],
          express: [
            { required: true, type: 'string', message: '亲要自己送吗？', trigger: 'blur' }
          ],
          express_no: [
            { required: true, message: '单号拿来验证一下？', trigger: 'blur' }
          ]
        },
        showMap: true,
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
        let that = this
        // console.log(BMap, map)
        let geolocation = new BMap.Geolocation()
        let geoCoder = new BMap.Geocoder()
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() === 0) {
            // that.$Message.success('您所在的经纬度为:' + r.point.lng + r.point.lat)
            geoCoder.getLocation(r.point, function (result) {
              if (result) {
                console.log(result)
                // that.$Message.success('您所在的经纬度为:' + r.point.lng + r.point.lat)
                that.$Message.success('您所在的位置为:' + result.address)
                // let addComp = result.addressComponents
              } else {
                that.$Message.warning('获取地理位置失败！')
              }
            })
          } else {
            that.$Message.warning('获取地理位置信息失败')
          }
        })
        map.addEventListener('click', function (e) {
          var pt = e.point
          geoCoder.getLocation(pt, function (rs) {
            var addComp = rs.addressComponents
            alert(addComp.province + ', ' + addComp.city + ', ' + addComp.district + ', ' + addComp.street + ', ' + addComp.streetNumber)
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
</style>
