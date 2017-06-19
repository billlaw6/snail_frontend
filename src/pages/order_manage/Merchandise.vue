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
      <title>蜜蜡手串特卖活动</title>
      <meta content="蜜蜡手串特卖活动" name="keywords">
      <meta content="蜜蜡手串特卖活动" name="description">
    </head>
    <body>
      <div id="page">
        <baidu-map class="baidu-map" :center="baiduMap.center"
          :zoom="baiduMap.zoom"
          :map-type="baiduMap.mapType"
          @ready="mapReady"></baidu-map>
        <div class="banner">
          <img alt=" 1.jpg" src="../../assets/1.jpg">
        </div>
        <section class="buy">
          <div class="row1">
            <strong>￥298</strong>
            <ol>
              <li><p>原价</p>￥2980</li>
              <li><p>折扣</p>1.0</li>
              <li><p>节省</p>￥2682</li>
            </ol>
          </div>

          <div class="row2">
            <strong>10365人已购买</strong>
            <div class="djs">
              <div class="time-count">
                <div class="jltimer" id="remainTime_1"><span>01</span>天<span>12</span>小时<span>28</span>分<span>23</span>秒</div>
              </div>
            </div>             
          </div>

          <article class="des"></article>
          <a href="#buy" class="btn">立即购买</a>
        </section>  

        <article class="showcontent">    
          <h2>抢购描述</h2>
          <div class="btn">
            <p></p><p>珍藏级天然蜜蜡，全国顺丰包邮，货到付款，支持七天无理由退换货！</p><p><br></p><p><strong><span style="color:rgb(250,0,0)">特别提醒：由于抢购太过火爆，电话爆线，接通较慢，请您选择在线下单。下单后我们客服人员会在24小时内给您致电核实订单，请您一定要高抬贵手接听下电话 谢谢！</span></strong></p><p></p>
          </div>

          <h2>购买流程</h2>
          <p><img alt=" 20.jpg" src="../../assets/2.gif"></p>
          <h2>产品简介</h2>
          <template v-for="value, index in merchandiseDetail.pictures">
            <p>
              <img :src="mediaRoot + value.image">
            </p>
          </template>
          <h2>【重要提醒】</h2>
          <div class="btn">
            <p><span style="font: 16px/24px Helvetica, Arial, san-serif; color: rgb(0, 0, 0); text-transform: none; text-indent: 0px; letter-spacing: normal; word-spacing: 0px; float: none; display: inline !important; white-space: normal; font-size-adjust: none; font-stretch: normal; background-color: rgb(249, 249, 249); -webkit-text-stroke-width: 0px;"></span></p><p style="white-space: normal;">1.活动期间，咨询人数众多，请尽可能自助下单！</p><p style="white-space: normal;">2.下单之后24小时内安排发货，大概3-5天到货！快递默认顺丰，顺丰到不了发圆通或EMS！</p><p style="white-space: normal;">3.珍藏级纯天然蜜蜡【促销价 仅需298元】全国包邮，货到付款，先验货后签收！发现非正品，商家承担来回运费！</p><p><br></p><p style="white-space: normal;"><span style="color:#f00;">特别提醒：因部分客户所提交订单信息不全 所以我们会在24小时内给尊贵你的致电核实订单 请亲一定要高抬贵手接听下电话，谢谢！！！</span></p><p></p>
            <a href="tel:13202029800" class="btn">热线咨询：13202029800</a>
            <a href="sms:13202029800" class="btn">短信订购 ：13202029800</a> 
            <a style="background-position: 10% 50%;background-size: 24px 24px;background-repeat: no-repeat;background-color: #ff5600;display: block;width: 100%;margin: 5px 0;text-align: center;color: #fff;text-shadow: 1px 1px 1px #333;border-radius: 6px;" href="http://wpa.qq.com/msgrd?v=3&amp;uin=1941907304&amp;site=qq&amp;menu=yes" class="btn qq">QQ咨询：1941907304</a><a style="background-position: 10% 50%;background-size: 24px 24px;background-repeat: no-repeat;background-color: #ff5600;display: block;width: 100%;margin: 5px 0;text-align: center;color: #fff;text-shadow: 1px 1px 1px #333;border-radius: 6px;" class="btn wei">微信咨询：13202029800</a> 
          </div>
        </article>  
        <article>  
          <h2>客户评价</h2>

          <div class="pingjia" id="pingjia">

            <div class="comment">
              <div class="comment-inner">
                <div class="comment-content">159****2381 蔡小姐发表评论</div>
                <div class="comment-name">很给力，找懂行的朋友看了，是正品，一说价格他觉得挺值，呵呵，很真诚的店家，我也是做生意的，比较信佛……盘了一下午了，很帅是吧，哈，打算在请两条送爸爸妈妈</div>
                <div class="comment-content">130****2553 陆小姐发表评论 </div>
                <div class="comment-name">发货很快，卖家包装精美，收到很高兴，应该是真品，纹理面看起来很圆润光滑，第一次购买试试看，没想到还真的很满意哦！真是不错的卖家！还会再来！</div>
                <div class="comment-content">135****0933 田小姐发表评论</div>
                <div class="comment-name">经大师鉴定确实是正宗蜜蜡，宝贝总得来讲比想象中的好，完全出乎我的意料之外，很给力！东西包装精美，有种爱不释手的感觉，才把玩2天就被朋友抢走，呜，只能重新拍了一串</div>
                <div class="comment-content">189****1820 陈小姐发表评论</div>
                <div class="comment-name">在灯下，静观，浅色的犹如金珠一般，深色的似墨，似山。每颗都是一世界，盘玩中，或许还有新感觉、新感受。慢慢品味、用心领悟中……</div>
                <div class="comment-content">139****7525 丁小姐发表评论 </div>
                <div class="comment-name">送给老爸的，东西很棒，非常喜欢，比在店里看到的又便宜又好，客服服务态度非常好，发货快，物流也很给力，总之非常好。</div>
                <div class="comment-content">138****8622 刘小姐发表评论</div>
                <div class="comment-name">买到的宝贝非常喜欢，比想象中要好，虽然和图片上差点效果，非常光滑漂亮，珠子纹路清晰圆润周正，沉甸甸的，手感很好，这个价位买到这样的珠子非常超值，尤其是服务态度，让人很满意，店家很有诚</div>
                <div class="comment-content">信，非常实在的卖家，还会光顾。!189****9477 文小姐发表评论</div>
                <div class="comment-name">很好的宝贝，这个价格能买到这样的宝贝很值，油性很足花纹也很漂亮包括包装也都是很不错的我喜欢。我已把店铺收藏了，以后还会买的。</div>
                <div class="comment-content">134****7300 贝小姐发表评论 </div>
                <div class="comment-name">宝贝到手真是太喜欢了，爱不释手，花色自然纯正，比在实体店买的还要好的多。包装也非常精美豪华，极有信誉的卖家。</div>
                <div class="comment-content">137****5782 梁小姐发表评论</div>
                <div class="comment-name">宝贝非常好，服务态度非常好，质量有保证，发货够快，买到手如获至宝，爱不释手，可惜朋友看到后，给抢走了，我还得买一串。</div>
                <div class="comment-content">180****9903 黎小姐发表评论</div>
                <div class="comment-name">很不错的东西,是正品,带着也很舒服,香味也很独特,还送了一大堆东西,希望买家生意月来越好。</div>
                <div class="comment-content">137****3345 李小姐发表评论</div>
                <div class="comment-name">不错，很漂亮！</div>
                <div class="comment-content">150****9633 罗小姐发表评论</div>
                <div class="comment-name">整体不错，去鉴定过了，是真的蜜蜡，性价比较高！就是送货速度有点慢，掌柜说快递可能比较忙。</div>

              </div>
              <div class="comment-inner">
                <div class="comment-content">159****2381 蔡小姐发表评论</div>
                <div class="comment-name">很给力，找懂行的朋友看了，是正品，一说价格他觉得挺值，呵呵，很真诚的店家，我也是做生意的，比较信佛……盘了一下午了，很帅是吧，哈，打算在请两条送爸爸妈妈</div>
                <div class="comment-content">130****2553 陆小姐发表评论 </div>
                <div class="comment-name">发货很快，卖家包装精美，收到很高兴，应该是真品，纹理面看起来很圆润光滑，第一次购买试试看，没想到还真的很满意哦！真是不错的卖家！还会再来！</div>
                <div class="comment-content">135****0933 田小姐发表评论</div>
                <div class="comment-name">经大师鉴定确实是正宗蜜蜡，宝贝总得来讲比想象中的好，完全出乎我的意料之外，很给力！东西包装精美，有种爱不释手的感觉，才把玩2天就被朋友抢走，呜，只能重新拍了一串</div>
                <div class="comment-content">189****1820 陈小姐发表评论</div>
                <div class="comment-name">在灯下，静观，浅色的犹如金珠一般，深色的似墨，似山。每颗都是一世界，盘玩中，或许还有新感觉、新感受。慢慢品味、用心领悟中……</div>
                <div class="comment-content">139****7525 丁小姐发表评论 </div>
                <div class="comment-name">送给老爸的，东西很棒，非常喜欢，比在店里看到的又便宜又好，客服服务态度非常好，发货快，物流也很给力，总之非常好。</div>
                <div class="comment-content">138****8622 刘小姐发表评论</div>
                <div class="comment-name">买到的宝贝非常喜欢，比想象中要好，虽然和图片上差点效果，非常光滑漂亮，珠子纹路清晰圆润周正，沉甸甸的，手感很好，这个价位买到这样的珠子非常超值，尤其是服务态度，让人很满意，店家很有诚</div>
                <div class="comment-content">信，非常实在的卖家，还会光顾。!189****9477 文小姐发表评论</div>
                <div class="comment-name">很好的宝贝，这个价格能买到这样的宝贝很值，油性很足花纹也很漂亮包括包装也都是很不错的我喜欢。我已把店铺收藏了，以后还会买的。</div>
                <div class="comment-content">134****7300 贝小姐发表评论 </div>
                <div class="comment-name">宝贝到手真是太喜欢了，爱不释手，花色自然纯正，比在实体店买的还要好的多。包装也非常精美豪华，极有信誉的卖家。</div>
                <div class="comment-content">137****5782 梁小姐发表评论</div>
                <div class="comment-name">宝贝非常好，服务态度非常好，质量有保证，发货够快，买到手如获至宝，爱不释手，可惜朋友看到后，给抢走了，我还得买一串。</div>
                <div class="comment-content">180****9903 黎小姐发表评论</div>
                <div class="comment-name">很不错的东西,是正品,带着也很舒服,香味也很独特,还送了一大堆东西,希望买家生意月来越好。</div>
                <div class="comment-content">137****3345 李小姐发表评论</div>
                <div class="comment-name">不错，很漂亮！</div>
                <div class="comment-content">150****9633 罗小姐发表评论</div>
                <div class="comment-name">整体不错，去鉴定过了，是真的蜜蜡，性价比较高！就是送货速度有点慢，掌柜说快递可能比较忙。</div>

              </div><div class="comment-inner">
                <div class="comment-content">159****2381 蔡小姐发表评论</div>
                <div class="comment-name">很给力，找懂行的朋友看了，是正品，一说价格他觉得挺值，呵呵，很真诚的店家，我也是做生意的，比较信佛……盘了一下午了，很帅是吧，哈，打算在请两条送爸爸妈妈</div>
                <div class="comment-content">130****2553 陆小姐发表评论 </div>
                <div class="comment-name">发货很快，卖家包装精美，收到很高兴，应该是真品，纹理面看起来很圆润光滑，第一次购买试试看，没想到还真的很满意哦！真是不错的卖家！还会再来！</div>
                <div class="comment-content">135****0933 田小姐发表评论</div>
                <div class="comment-name">经大师鉴定确实是正宗蜜蜡，宝贝总得来讲比想象中的好，完全出乎我的意料之外，很给力！东西包装精美，有种爱不释手的感觉，才把玩2天就被朋友抢走，呜，只能重新拍了一串</div>
                <div class="comment-content">189****1820 陈小姐发表评论</div>
                <div class="comment-name">在灯下，静观，浅色的犹如金珠一般，深色的似墨，似山。每颗都是一世界，盘玩中，或许还有新感觉、新感受。慢慢品味、用心领悟中……</div>
                <div class="comment-content">139****7525 丁小姐发表评论 </div>
                <div class="comment-name">送给老爸的，东西很棒，非常喜欢，比在店里看到的又便宜又好，客服服务态度非常好，发货快，物流也很给力，总之非常好。</div>
                <div class="comment-content">138****8622 刘小姐发表评论</div>
                <div class="comment-name">买到的宝贝非常喜欢，比想象中要好，虽然和图片上差点效果，非常光滑漂亮，珠子纹路清晰圆润周正，沉甸甸的，手感很好，这个价位买到这样的珠子非常超值，尤其是服务态度，让人很满意，店家很有诚</div>
                <div class="comment-content">信，非常实在的卖家，还会光顾。!189****9477 文小姐发表评论</div>
                <div class="comment-name">很好的宝贝，这个价格能买到这样的宝贝很值，油性很足花纹也很漂亮包括包装也都是很不错的我喜欢。我已把店铺收藏了，以后还会买的。</div>
                <div class="comment-content">134****7300 贝小姐发表评论 </div>
                <div class="comment-name">宝贝到手真是太喜欢了，爱不释手，花色自然纯正，比在实体店买的还要好的多。包装也非常精美豪华，极有信誉的卖家。</div>
                <div class="comment-content">137****5782 梁小姐发表评论</div>
                <div class="comment-name">宝贝非常好，服务态度非常好，质量有保证，发货够快，买到手如获至宝，爱不释手，可惜朋友看到后，给抢走了，我还得买一串。</div>
                <div class="comment-content">180****9903 黎小姐发表评论</div>
                <div class="comment-name">很不错的东西,是正品,带着也很舒服,香味也很独特,还送了一大堆东西,希望买家生意月来越好。</div>
                <div class="comment-content">137****3345 李小姐发表评论</div>
                <div class="comment-name">不错，很漂亮！</div>
                <div class="comment-content">150****9633 罗小姐发表评论</div>
                <div class="comment-name">整体不错，去鉴定过了，是真的蜜蜡，性价比较高！就是送货速度有点慢，掌柜说快递可能比较忙。</div>

              </div><div class="comment-inner">
                <div class="comment-content">159****2381 蔡小姐发表评论</div>
                <div class="comment-name">很给力，找懂行的朋友看了，是正品，一说价格他觉得挺值，呵呵，很真诚的店家，我也是做生意的，比较信佛……盘了一下午了，很帅是吧，哈，打算在请两条送爸爸妈妈</div>
                <div class="comment-content">130****2553 陆小姐发表评论 </div>
                <div class="comment-name">发货很快，卖家包装精美，收到很高兴，应该是真品，纹理面看起来很圆润光滑，第一次购买试试看，没想到还真的很满意哦！真是不错的卖家！还会再来！</div>
                <div class="comment-content">135****0933 田小姐发表评论</div>
                <div class="comment-name">经大师鉴定确实是正宗蜜蜡，宝贝总得来讲比想象中的好，完全出乎我的意料之外，很给力！东西包装精美，有种爱不释手的感觉，才把玩2天就被朋友抢走，呜，只能重新拍了一串</div>
                <div class="comment-content">189****1820 陈小姐发表评论</div>
                <div class="comment-name">在灯下，静观，浅色的犹如金珠一般，深色的似墨，似山。每颗都是一世界，盘玩中，或许还有新感觉、新感受。慢慢品味、用心领悟中……</div>
                <div class="comment-content">139****7525 丁小姐发表评论 </div>
                <div class="comment-name">送给老爸的，东西很棒，非常喜欢，比在店里看到的又便宜又好，客服服务态度非常好，发货快，物流也很给力，总之非常好。</div>
                <div class="comment-content">138****8622 刘小姐发表评论</div>
                <div class="comment-name">买到的宝贝非常喜欢，比想象中要好，虽然和图片上差点效果，非常光滑漂亮，珠子纹路清晰圆润周正，沉甸甸的，手感很好，这个价位买到这样的珠子非常超值，尤其是服务态度，让人很满意，店家很有诚</div>
                <div class="comment-content">信，非常实在的卖家，还会光顾。!189****9477 文小姐发表评论</div>
                <div class="comment-name">很好的宝贝，这个价格能买到这样的宝贝很值，油性很足花纹也很漂亮包括包装也都是很不错的我喜欢。我已把店铺收藏了，以后还会买的。</div>
                <div class="comment-content">134****7300 贝小姐发表评论 </div>
                <div class="comment-name">宝贝到手真是太喜欢了，爱不释手，花色自然纯正，比在实体店买的还要好的多。包装也非常精美豪华，极有信誉的卖家。</div>
                <div class="comment-content">137****5782 梁小姐发表评论</div>
                <div class="comment-name">宝贝非常好，服务态度非常好，质量有保证，发货够快，买到手如获至宝，爱不释手，可惜朋友看到后，给抢走了，我还得买一串。</div>
                <div class="comment-content">180****9903 黎小姐发表评论</div>
                <div class="comment-name">很不错的东西,是正品,带着也很舒服,香味也很独特,还送了一大堆东西,希望买家生意月来越好。</div>
                <div class="comment-content">137****3345 李小姐发表评论</div>
                <div class="comment-name">不错，很漂亮！</div>
                <div class="comment-content">150****9633 罗小姐发表评论</div>
                <div class="comment-name">整体不错，去鉴定过了，是真的蜜蜡，性价比较高！就是送货速度有点慢，掌柜说快递可能比较忙。</div>

              </div></div>
          </div>
        </article>
        <article id="buy">
          <h2>订单信息</h2>
          <!--订单-->
          <div id="order">
            <div class="warp">
              <form onsubmit="return postcheck()" method="post" action="notorder.asp" name="form" id="form">
                <input type="hidden" value="no.2017615112324988" id="orderid" name="orderid">

                <!--附加属性e-->
                <div style="display:none" class="bdbox">
                  <label class="bdxx"><em>*</em>数量</label>
                  <div class="xltextbox scount">
                    <a onclick="minnumber()" href="javascript:void(0)" class="addmin"><b>-</b></a><input type="text" onblur="inputnumber();" id="mun" name="mun" value="1" class="text numbertext"><a onclick="addnumber()" href="javascript:void(0)" class="addmin"><b>+</b></a>
                    <font color="#BD0000" class="STYLE17">*(点击增减或填写)</font>
                  </div>
                </div>

                <div class="bdbox">
                  <label class="bdxx"><em>*</em>姓名</label>
                  <div class="textbox">
                    <input type="text" name="name">
                  </div>
                </div>
                <div class="bdbox">
                  <label class="bdxx"><em>*</em>手机</label>
                  <div class="textbox">
                    <input type="text" name="mob">
                  </div>
                </div>



                <div class="bdbox">
                  <label class="bdxx"><em>*</em>款式</label>
                  <div class="dxbox red">
                    <ul class="ordul">

                      <li>  <label><input type="checkbox" onclick="pricea()" checked="checked" alt="298 " value="蜜蜡手串20mm(12颗男款)298 元" id="a0" name="product">
                          <img src="%E8%9C%9C%E8%9C%A1%E6%89%8B%E4%B8%B2%E7%89%B9%E5%8D%96%E6%B4%BB%E5%8A%A8_files/TB2hfvIvHlmpuFjSZFlXXbdQXXa_767173256.jpg">
                          蜜蜡手串20mm(12颗男款)<br>结缘价：<span>298 </span>
                        </label>
                      </li>

                      <li>  <label><input type="checkbox" onclick="pricea()" alt="298 " value="蜜蜡手串18mm(13颗男款)298 元" id="a1" name="product">
                          <img src="%E8%9C%9C%E8%9C%A1%E6%89%8B%E4%B8%B2%E7%89%B9%E5%8D%96%E6%B4%BB%E5%8A%A8_files/TB2Uhv_vH4npuFjSZFmXXXl4FXa_767173256.jpg">
                          蜜蜡手串18mm(13颗男款)<br>结缘价：<span>298 </span>
                        </label>
                      </li>

                      <li>  <label><input type="checkbox" onclick="pricea()" alt="298 " value="蜜蜡手串12mm(16颗女款)298 元" id="a2" name="product">
                          <img src="%E8%9C%9C%E8%9C%A1%E6%89%8B%E4%B8%B2%E7%89%B9%E5%8D%96%E6%B4%BB%E5%8A%A8_files/TB2sq2yvORnpuFjSZFCXXX2DXXa_767173256.jpg">
                          蜜蜡手串12mm(16颗女款)<br>结缘价：<span>298 </span>
                        </label>
                      </li>

                      <li>  <label><input type="checkbox" onclick="pricea()" alt="298" value="蜜蜡手串8mm(108颗长款)298元" id="a3" name="product">
                          <img src="%E8%9C%9C%E8%9C%A1%E6%89%8B%E4%B8%B2%E7%89%B9%E5%8D%96%E6%B4%BB%E5%8A%A8_files/TB2Ah_DvUhnpuFjSZFEXXX0PFXa_767173256.jpg">
                          蜜蜡手串8mm(108颗长款)<br>结缘价：<span>298</span>
                        </label>
                      </li>

                    </ul>
              </div>
          </div>


          <!--附加属性b-->

          <div class="bdbox">
            <label class="bdxx"><em>*</em>金额</label>
            <div class="text3box">
              <input type="hidden" value="298 " name="zfbprice">
              <input style="width:80px;" readonly="readonly" value="298 " name="price"> 元 <span id="zfbyh"></span>
            </div>
          </div>
          <div class="bdbox">
            <label class="bdxx"><em>*</em>地区</label>
            <div class="xlbox">
              <select class="dqxl" name="province"><option value="" selected="selected">选省份</option><option value="北京市">北京市</option><option value="天津市">天津市</option><option value="河北省">河北省</option><option value="山西省">山西省</option><option value="内蒙古自治区">内蒙古自治区</option><option value="辽宁省">辽宁省</option><option value="吉林省">吉林省</option><option value="黑龙江省">黑龙江省</option><option value="上海市">上海市</option><option value="江苏省">江苏省</option><option value="浙江省">浙江省</option><option value="安徽省">安徽省</option><option value="福建省">福建省</option><option value="江西省">江西省</option><option value="山东省">山东省</option><option value="河南省">河南省</option><option value="湖北省">湖北省</option><option value="湖南省">湖南省</option><option value="广东省">广东省</option><option value="广西壮族自治区">广西壮族自治区</option><option value="海南省">海南省</option><option value="重庆市">重庆市</option><option value="四川省">四川省</option><option value="贵州省">贵州省</option><option value="云南省">云南省</option><option value="西藏自治区">西藏自治区</option><option value="陕西省">陕西省</option><option value="甘肃省">甘肃省</option><option value="青海省">青海省</option><option value="宁夏回族自治区">宁夏回族自治区</option><option value="新疆维吾尔自治区">新疆维吾尔自治区</option><option value="香港特别行政区">香港特别行政区</option><option value="澳门特别行政区">澳门特别行政区</option><option value="台湾省">台湾省</option><option value="">选省份</option><option value="北京市">北京市</option><option value="天津市">天津市</option><option value="河北省">河北省</option><option value="山西省">山西省</option><option value="内蒙古自治区">内蒙古自治区</option><option value="辽宁省">辽宁省</option><option value="吉林省">吉林省</option><option value="黑龙江省">黑龙江省</option><option value="上海市">上海市</option><option value="江苏省">江苏省</option><option value="浙江省">浙江省</option><option value="安徽省">安徽省</option><option value="福建省">福建省</option><option value="江西省">江西省</option><option value="山东省">山东省</option><option value="河南省">河南省</option><option value="湖北省">湖北省</option><option value="湖南省">湖南省</option><option value="广东省">广东省</option><option value="广西壮族自治区">广西壮族自治区</option><option value="海南省">海南省</option><option value="重庆市">重庆市</option><option value="四川省">四川省</option><option value="贵州省">贵州省</option><option value="云南省">云南省</option><option value="西藏自治区">西藏自治区</option><option value="陕西省">陕西省</option><option value="甘肃省">甘肃省</option><option value="青海省">青海省</option><option value="宁夏回族自治区">宁夏回族自治区</option><option value="新疆维吾尔自治区">新疆维吾尔自治区</option><option value="香港特别行政区">香港特别行政区</option><option value="澳门特别行政区">澳门特别行政区</option><option value="台湾省">台湾省</option></select><select class="dqxl" name="city"><option value="">选城市</option></select><select class="dqxl" name="area"><option value="">选地区</option></select>
            </div>
          </div>
          <div class="bdbox">
            <label class="bdxx"><em>*</em>地址</label>
            <div class="textbox">
              <input type="text" name="address">
            </div>
          </div>

          <div class="bdbox">
            <label class="bdxx"><em>*</em>付款</label>
            <div class="dxbox">
              <input type="radio" onclick="return changeItem(0);" value="cod" id="b1" name="pay" checked="checked"><label for="b1"><img src="%E8%9C%9C%E8%9C%A1%E6%89%8B%E4%B8%B2%E7%89%B9%E5%8D%96%E6%B4%BB%E5%8A%A8_files/hdfk.gif"></label>


            </div>
          </div>

          <div class="bdbox">
            <label class="bdxx">留言</label>
            <div class="text2box">
              <textarea name="guest"></textarea>
            </div>
          </div>

          <input type="hidden" value="" name="fromurl"><input type="hidden" value="file:///root/Desktop/%E8%9C%9C%E8%9C%A1%E6%89%8B%E4%B8%B2%E7%89%B9%E5%8D%96%E6%B4%BB%E5%8A%A8.html" name="nowurl"><input type="hidden" value="" name="keyword"><input type="hidden" value="" name="gzid"><input type="hidden" value="" name="fromurl"><input type="hidden" value="http://wap.shick.cn/" name="nowurl"><input type="hidden" value="" name="keyword"><input type="hidden" value="" name="gzid">
          <div class="subbox">
            <input type="submit" value="立即提交订单" name="submit">
          </div>
              </form>
              <div style="clear:both;"></div>
            </div>
          </div>

          <div id="fahuo">
            <ul><li style="overflow: hidden; height: 0px;"><span>[最新购买]：</span>谭**（133****4096）在18分钟前订购了 蜜蜡手串20mm(12颗男款) <font color="#FF0000">√</font></li><li style="overflow: hidden; height: 0px;"><span>[最新购买]：</span>张**（130****3260）在1分钟前订购了 蜜蜡手串18mm(13颗男款) <font color="#FF0000">√</font></li><li style="overflow: hidden; height: 0px;"><span>[最新购买]：</span>李**（136****7163）在3分钟前订购了 蜜蜡手串12mm(16颗女款) <font color="#FF0000">√</font></li><li style="overflow: hidden; height: 0px;"><span>[最新购买]：</span>赵**（139****1955）在7分钟前订购了 蜜蜡手串12mm(16颗女款) <font color="#FF0000">√</font></li><li style="overflow: hidden; height: 0px;"><span>[最新购买]：</span>刘**（180****6999）在9分钟前订购了 蜜蜡手串8mm(108颗长款) <font color="#FF0000">√</font></li><li style="overflow: hidden; height: 0px;"><span>[最新购买]：</span>周**（151****2588）在4分钟前订购了 蜜蜡手串12mm(16颗女款) <font color="#FF0000">√</font></li>
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
            <ul><li style="height: 24px;"><span>[最新购买]：</span>谭**（133****4096）在18分钟前订购了 蜜蜡手串20mm(12颗男款) <font color="#FF0000">√</font></li><li style="height: 24px;"><span>[最新购买]：</span>张**（130****3260）在1分钟前订购了 蜜蜡手串18mm(13颗男款) <font color="#FF0000">√</font></li><li style="height: 24px;"><span>[最新购买]：</span>李**（136****7163）在3分钟前订购了 蜜蜡手串12mm(16颗女款) <font color="#FF0000">√</font></li><li style="height: 24px;"><span>[最新购买]：</span>赵**（139****1955）在7分钟前订购了 蜜蜡手串12mm(16颗女款) <font color="#FF0000">√</font></li><li style="height: 24px;"><span>[最新购买]：</span>刘**（180****6999）在9分钟前订购了 蜜蜡手串8mm(108颗长款) <font color="#FF0000">√</font></li><li style="height: 24px;"><span>[最新购买]：</span>周**（151****2588）在4分钟前订购了 蜜蜡手串12mm(16颗女款) <font color="#FF0000">√</font></li><li style="overflow: hidden; height: 0px;"><span>[最新购买]：</span>王**（133****4096）在10分钟前订购了 蜜蜡手串8mm(108颗长款) <font color="#FF0000">√</font></li><li style="height: 24px;"><span>[最新购买]：</span>秦**（139****1955）在15分钟前订购了 蜜蜡手串12mm(16颗女款) <font color="#FF0000">√</font></li><li style="height: 24px;"><span>[最新购买]：</span>朱**（180****6999）在20分钟前订购了 蜜蜡手串12mm(16颗女款) <font color="#FF0000">√</font></li><li style="height: 24px;"><span>[最新购买]：</span>吴**（151****2588）在12分钟前订购了 蜜蜡手串18mm(13颗男款) <font color="#FF0000">√</font></li>










            </ul>

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
  import { getMerchandiseDetail } from '../../api/api'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        merchandiseDetail: {},
        baiduMap: {
          center: {lng: 116.404, lat: 39.915},
          zoom: 15,
          theme: {},
          mapType: 'BMAP_NORMAL_MAP'
        }
      }
    },
    computed: {
      ...mapState({
        mediaRoot: state => state.mediaRoot
      })
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
        console.log(BMap, map)
        let geolocation = new BMap.Geolocation()
        let geoCoder = new BMap.Geocoder()
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() === 0) {
            // that.$Message.success('您所在的经纬度为:' + r.point.lng + r.point.lat)
            geoCoder.getLocation(new BMap.Point(r.point), function (result) {
              if (result) {
                console.log(result)
                that.$Message.success('您所在的经纬度为:' + r.point.lng + r.point.lat)
                that.$Message.success('您所在的位置为:' + result.address)
                that.$Message.success('您所在的位置为:' + BMap.LocalCity())
              } else {
                that.$Message.warning('获取地理位置失败！')
              }
            })
          } else {
            that.$Message.warning('获取地理位置信息失败')
          }
        })
      }
    },
    mounted () {
      // console.log('mounted')
    }
  }
</script>

<style lang="stylus" scoped>
  body
    background: #856D35 none
    margin: 0

  .baidu-map
    width: 100%
    height: 300px
    
  #page
    background-color: #f9f9f9 none repeat scroll 0 0
    height: auto
    /* 此两项可设置居中 
    * margin: 0 auto
    * max-width:750px */
    margin: 0 auto
    max-width:750px
    min-height: 100%
    padding: 0 0 50px
    width: 100%
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
    .row2
      border-top: 1px dotted #524524
      padding: 10px 0
      line-height: 30px
      height: 50px
      overflow: hidden
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
      p
        color: #9a9874

</style>
