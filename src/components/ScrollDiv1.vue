<template>
  <!-- window为轮播的可视部分 -->
  <div id="window-div" :style="classWindowDiv">
    <!-- scroll-div为轮播部分 -->
    <div id="scroll-div" :style="classScrollDiv">
      <!-- messages-div为轮播内容 -->
      <div id="messages-div" :style="classMessage">
        <template v-for="(message, index) in messages">
          <div :style="classMessageTitle" :id="'title' + index" :key="'t' + index">{{ message.title }}</div>
          <div :style="classMessageContent" :id="'content' + index" :key="'c' + index">{{ message.content }}</div>
        </template>
      </div>
      <div id="messages-copy-div"></div>
    </div>
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
            height: '100%',
            width: '100%',
            color: '#FFF'
          }
        }
      },
      classScrollDiv: {
        type: Object,
        default: function () {
          return {
            height: '100%',
            width: '100%',
            color: '#FFF'
          }
        }
      },
      classMessage: {
        type: Object,
        default: function () {
          return {
            height: '100%',
            width: '100%',
            color: '#F00'
          }
        }
      },
      classMessageTitle: {
        type: Object,
        default: function () {
          return {
            height: '100%',
            width: '100%',
            color: '#F00'
          }
        }
      },
      classMessageContent: {
        type: Object,
        default: function () {
          return {
            height: '100%',
            width: '100%',
            color: '#0F0'
          }
        }
      }
    },
    methods: {
      startScroll: function (direction) {
        let windowDiv = document.getElementById('window-div')
        // let scrollDiv = document.getElementById('scroll-div')
        let messageDiv = document.getElementById('messages-div')
        let messageCopyDiv = document.getElementById('messages-copy-div')

        messageCopyDiv.innerHTML = messageDiv.innerHTML
        console.log(windowDiv.scrollLeft + ' : ' + messageDiv.offsetWidth)
        function scroll () {
          // let oneHeight = Math.round(parseInt(windowDiv) / messageDiv.length)
          if (windowDiv.scrollLeft >= messageDiv.offsetWidth) {
            windowDiv.scrollLeft -= messageDiv.offseWidth
          } else {
            windowDiv.scrollLeft ++
          }
        }

        let run = setInterval(scroll, 10)
        windowDiv.onmouseover = function () {
          clearInterval(run)
        }
        windowDiv.onmouseout = function () {
          run = setInterval(scroll, 10)
        }

        // 复制messageDiv的内容，当元素要显示messageCopyDiv的内容时，因内容一样实现滚动
        // function upDownScroll (ud) {
        //   // let oneHeight = Math.round(parseInt(windowDiv) / messageDiv.length)
        //   if (ud === 'up' || ud === 1) {
        //     if (windowDiv.scrollTop >= messageCopyDiv.offsetHeight) {
        //       windowDiv.scrollTop -= messageCopyDiv.offsetHeight
        //     } else {
        //       windowDiv.scrollTop ++
        //     }
        //   } else if (ud === 'down' || ud === 2) {
        //     if (messageCopyDiv.offsetHeight - messageDiv.scrollTop <= 0) {
        //       messageDiv.scrollTop += messageCopyDiv.offsetHeight
        //     } else {
        //       messageDiv.scrollTop --
        //     }
        //   }
        //   console.log('up down')
        //   console.log(messageDiv.scrollTop)
        // }
        // setInterval(upDownScroll('up'), 1)

        // function leftRightScroll (lr) {
        //   if (lr === 'left' || lr === 3) {
        //     if (windowDiv.scrollLeft >= messageDiv.offsetWidth) {
        //       windowDiv.scrollLeft -= messageCopyDiv.offsetWidth
        //     } else {
        //       windowDiv.scrollLeft ++
        //     }
        //   } else if (lr === 'right' || lr === 4) {
        //     if (windowDiv.scrollLeft <= messageDiv.offsetWidth) {
        //       windowDiv.scrollLeft -= messageCopyDiv.offsetWidth
        //     } else {
        //       windowDiv.scrollLeft --
        //     }
        //   }
        //   console.log('left right')
        //   console.log(windowDiv.scrollLeft)
        // }

        // 启动滚动
        // let scroll = setInterval(upDownScroll('left', this.speed))
        // setInterval(upDownScroll('up', this.speed))
        // setInterval(leftRightScroll('left', this.speed))
        // if (['up', 'down', 1, 2].indexOf(direction) >= 0) {
        //   scroll = setInterval(upDownScroll(direction, this.speed))
        // } else if (['right', 'left', 3, 4].indexOf(direction) >= 0) {
        //   scroll = setInterval(leftRightScroll(direction, this.speed))
        // }

        // windowDiv.onmouseover = function () {
        //   console.log('mouseover')
        //   clearInterval(scroll)
        // }

        // windowDiv.onmouseout = function () {
        //   if (['up', 'down', 1, 2].indexOf(direction) >= 0) {
        //     scroll = setInterval(upDownScroll(direction, this.speed))
        //   } else if (['right', 'left', 3, 4].indexOf(direction) >= 0) {
        //     scroll = setInterval(leftRightScroll(direction, this.speed))
        //   }
        //   console.log(scroll)
        //   console.log('mouse out')
        // }
      }
    },
    mounted: function () {
      // this.$nextTick(function () {
      //   console.log('scroll div mounted and $nextTick')
      //   this.startScroll('left')
      // })
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
