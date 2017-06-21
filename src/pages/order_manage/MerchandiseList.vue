<template>
  <html>
    <head>
      <meta http-equiv="content-type" content="text/html; charset=UTF-8">
      <meta charset="utf-8">
      <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" name="viewport"> 
      <meta content="yes" name="apple-mobile-web-app-capable"> 
      <meta content="yes" name="apple-touch-fullscreen">
      <meta content="black" name="apple-mobile-web-app-status-bar-style">
      <meta content="320" name="MobileOptimized">
      <meta content="telephone=no" name="format-detection">
      <link rel="shortcut icon" href="http://buy.shick.cn/buy/Public/Home/images/tubiao.ico" type="image/x-icon">

      <title>商品抢购首页</title>
    </head>
    <body>
      <header>商品抢购首页</header>

      <div class="list" v-for="value, index in merchandiseList">
        <router-link :to="{ name: 'merchandise', params: { id: value.id }}">
          <dl>
            <template v-for="subValue, subIndex in value.pictures">
              <dt v-if="subValue.order===1">
                <img :src="mediaRoot + subValue.image">
              </dt>
            </template>
            <dd>{{ value.name }}</dd>
            <li><span>订购</span>{{ value.price | currency }}</li>
          </dl>
        </router-link>
      </div>
      <div class="clear"></div>
      <footer>
        <a href="http://buy.shick.cn/buy/home/home/index/index.html">网站首页</a><a href="http://buy.shick.cn/buy/home/index/contact.html">联系我们</a><a href="http://buy.shick.cn/buy/home/index/about.html">关于我们</a>
      </footer>
    </body>
  </html>
</template>

<script>
  import { getMerchandiseList } from '../../api/api'
  import { mapState, mapActions } from 'vuex'
  export default {
    data () {
      return {
        merchandiseList: []
      }
    },
    computed: {
      ...mapState({
        mediaRoot: state => state.mediaRoot
      })
    },
    methods: {
      ...mapActions({
        setMerchandiseList: 'setMerchandiseList'
      }),
      // 获取商品列表
      getMerchandise: function () {
        getMerchandiseList().then((res) => {
          let { data, status, statusText } = res
          if (status !== 200) {
            console.log(statusText)
            this.$Message.error('获取商品列表失败!')
          } else {
            console.log(data)
            this.merchandiseList = data.results
            this.$store.dispatch('setMerchandiseList', data.results)
          }
        }, (error) => {
          console.log('Error in getMerchandiseList: ' + error)
          this.$Message.error('获取商品列表失败!')
        }).catch((error) => {
          console.log('catched in getMerchandiseList:' + error)
          this.$Message.error('获取商品列表失败!')
        })
      }
    },
    mounted () {
      this.getMerchandise()
    }
  }
</script>

<style lang="stylus" scoped>
body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select,html{margin:0;padding:0;}
html{ background:#F1F1F1; font-family:"微软雅黑"}
body{ max-width:640px; margin:0 auto; background:#fff;}
li{list-style:none;}
img{border:0;vertical-align:middle;}
table{border-collapse:collapse;border-spacing:0;}
p{word-wrap:break-word;}

header{ height:40px; line-height:40px; font-size:18px; color:#fff; text-align:center; background:#ED145B;}
.clear{clear:both;}
footer{ margin-top:10px; text-align:center; font-size:16px; padding-top:10px; border-top:1px solid #ddd; line-height:30px;}
footer a{ color:#333; margin:0 6px; text-decoration:none;}
img{ border:0;}

.content{ margin:1%; width:98%;word-wrap:break-word; word-break:break-all; white-space:normal;}
.content img{ max-width:100%;}
.list dl{ float:left; width:48%; margin:10px 1%;}
.list dl dt{ width:100%;}
.list dl dt img{ width:100%;}
.list dl dd{ font-size:16px; color:#333; height:35px; line-height:35px; width:100%; overflow:hidden; text-overflow:ellipsis;display:block;white-space:nowrap; }
.list dl li{ color:#ED145B;line-height:25px; font-weight:bold;font-size:16px;}
.list dl li span{ float:right; height:25px; width:50px; background:#ED145B; color:#fff; border-radius:5px; line-height:25px; text-align:center; font-weight:normal;font-size:14px;}
</style>
