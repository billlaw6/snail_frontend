<template>
  <div class="dggd_r" id="h" style="height:100px;overflow:hidden;display:inline;float:left;">
  <ul id="h1">
  <li><a href="#">SD卡雷锋精神的路口附近？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？真爱吗？ </a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？？ </a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？细节决定成败 </a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？</a></li>
  <li><a href="#">你单身的主要原因？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？？ </a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？？</a></li>
  <li><a href="#">SD卡雷锋精神的路口附近？</a></li>
  </ul>
  <ul id="h2"></ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: 'abcde'
      }
    },
    props: {
      messages: {
        type: Array,
        default: function () {
          return [{title: 'title1', content: 'content111111111111111111111'},
            {title: 'title2', content: 'content222222222222222222222'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title4', content: 'content444444444444444444444'}]
        }
      },
      speed: {
        type: Number,
        default: 10
      },
      delay: {
        type: Number,
        default: 10
      },
      direction: {
        // 支持用1234表示上下左右
        type: [String, Number],
        default: 'up'
      },
      timeout: {
        type: Number,
        default: 1000
      },
      classWindowDiv: {
        type: Object,
        default: function () {
          return {
          }
        }
      },
      classScrollDiv: {
        type: Object,
        default: function () {
          return {
          }
        }
      },
      classMessage: {
        type: Object,
        default: function () {
          return {
          }
        }
      },
      classMessageTitle: {
        type: Object,
        default: function () {
          return {
          }
        }
      },
      classMessageContent: {
        type: Object,
        default: function () {
          return {
          }
        }
      }
    },
    methods: {
      startScroll: function (direction) {
        let speed = 40
        let h2 = document.getElementById('h2')
        let h1 = document.getElementById('h1')
        let h = document.getElementById('h')
        h2.innerHTML = h1.innerHTML
        function Marquee () {
          if (h2.offsetTop - h.scrollTop <= 0) {
            h.scrollTop -= h1.offsetHeight
          } else {
            h.scrollTop ++
          }
        }
        let MyMar = setInterval(Marquee, speed)
        h.onmouseover = function () {
          clearInterval(MyMar)
        }
        h.onmouseout = function () {
          MyMar = setInterval(Marquee, speed)
        }
      }
    },
    mounted: function () {
      this.startScroll('left')
      setInterval(console.log('tick'), 10)
    },
    destroyed: function () {
      console.log('destroyed')
    }
  }

</script>

<style lang="stylus" scoped>
  #window-div
    /* 设置了overflow为非visible值时, 元素的scrollLeft和scrollTop属性才有意义*/
    overflow: hidden
  #scroll-div
    color: white
  #messages-div, #messages-copy-div
    float: left
    display: inline
</style>
