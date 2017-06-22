<template>
  <div id="scroll-div" :style="classScrollDiv">
    <div id="messages-div" :style="classMessage">
      <template v-for="(message, index) in messages">
        <div :style="classMessageTitle" :id="'title' + index" :key="'t' + index">{{ message.title }}</div>
        <div :style="classMessageContent" :id="'content' + index" :key="'c' + index">{{ message.content }}</div>
      </template>
    </div>
    <div id="messages-copy-div"></div>
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
        let scrollDiv = document.getElementById('scroll-div')
        let messageDiv = document.getElementById('messages-div')
        let messageCopyDiv = document.getElementById('messages-copy-div')

        // 复制messageDiv的内容，当元素要显示messageCopyDiv的内容时，因内容一样实现滚动
        messageCopyDiv.innerHTML = messageDiv.innerHTML
        function upDownScroll (ud) {
          // let oneHeight = Math.round(parseInt(scrollDiv) / messageDiv.length)
          if (ud === 'up' || ud === 1) {
            if (messageCopyDiv.offsetHeight - messageDiv.scrollTop <= 0) {
              messageDiv.scrollTop -= messageCopyDiv.offsetHeight
            } else {
              messageDiv.scrollTop ++
            }
          } else if (ud === 'down' || ud === 2) {
            if (messageCopyDiv.offsetHeight - messageDiv.scrollTop <= 0) {
              messageDiv.scrollTop += messageCopyDiv.offsetHeight
            } else {
              messageDiv.scrollTop --
            }
          }
          console.log('up down')
          console.log(messageDiv.scrollTop)
        }

        function leftRightScroll (lr) {
          if (lr === 'left' || lr === 3) {
            if (messageCopyDiv.offsetWidth - messageDiv.scrollLeft <= 0) {
              messageDiv.scrollLeft -= messageCopyDiv.offsetWidth
            } else {
              messageDiv.scrollLeft ++
            }
          } else if (lr === 'right' || lr === 4) {
            if (messageCopyDiv.offsetWidth - messageDiv.scrollLeft <= 0) {
              messageDiv.scrollLeft += messageCopyDiv.offsetWidth
            } else {
              messageDiv.scrollLeft --
            }
          }
          console.log('left right')
          console.log(messageDiv.scrollLeft)
        }

        // 启动滚动
        let scroll = null
        if (['up', 'down', 1, 2].indexOf(direction) >= 0) {
          scroll = setInterval(upDownScroll(direction, this.speed))
        } else if (['right', 'left', 3, 4].indexOf(direction) >= 0) {
          scroll = setInterval(leftRightScroll(direction, this.speed))
        }

        scrollDiv.onmouseover = function () {
          console.log('mouseover')
          clearInterval(scroll)
        }

        scrollDiv.onmouseout = function () {
          if (['up', 'down', 1, 2].indexOf(direction) >= 0) {
            scroll = setInterval(upDownScroll(direction, this.speed))
          } else if (['right', 'left', 3, 4].indexOf(direction) >= 0) {
            scroll = setInterval(leftRightScroll(direction, this.speed))
          }
          console.log('mouse out')
        }
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        console.log('scroll div mounted and $nextTick')
        this.startScroll('up')
      })
    },
    destroyed: function () {
      console.log('destroyed')
    }
  }

</script>

<style lang="stylus" scoped>
  .classScrollDiv
    /* 设置了overflow为非visible值时, 元素的scrollLeft和scrollTop属性才有意义*/
    overflow: hidden
</style>
