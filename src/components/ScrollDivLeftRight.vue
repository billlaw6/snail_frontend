<template>
  <div id="scroll_div" class="fl">
  <div id="scroll_begin">
   恭喜793765***获得 <span class="pad_right">50元巨人点卡奖励</span>
   恭喜793766***获得 <span class="pad_right">50元巨人点卡奖励</span>
   恭喜793767***获得 <span class="pad_right">50元巨人点卡奖励</span>
   恭喜793768***获得 <span class="pad_right">50元巨人点卡奖励</span>
   恭喜793769***获得 <span class="pad_right">50元巨人点卡奖励</span>
  </div>
  <div id="scroll_end"></div>
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
        // 文字横向滚动
        var speed = 50
        var MyMar = null
        var scrollBegin = document.getElementById('scroll_begin')
        var scrollEnd = document.getElementById('scroll_end')
        var scrollDiv = document.getElementById('scroll_div')
        scrollEnd.innerHTML = scrollBegin.innerHTML
        function Marquee () {
          if (scrollEnd.offsetWidth - scrollDiv.scrollLeft <= 0) {
            scrollDiv.scrollLeft -= scrollBegin.offsetWidth
          } else {
            scrollDiv.scrollLeft ++
          }
        }
        MyMar = setInterval(Marquee, speed)
        scrollDiv.onmouseover = function () {
          clearInterval(MyMar)
        }
        scrollDiv.onmouseout = function () {
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
  .pad_right
    padding-right: 2em
  #scroll_div
    height: 26px
    overflow: hidden
    white-space: nowrap
    width: 535px
  #scroll_begin, #scroll_end
    display: inline
</style>
