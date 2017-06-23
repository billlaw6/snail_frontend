<template>
  <div id="scroll-div" :style="styleScroll">
  <div id="messages-div" :style="styleMessage">
    <template v-for="(message, index) in messages">
      <div :style="styleMessageTitle">{{ message.title }}</div>
      <div :style="styleMessageContent">{{ message.content }}</div>
    </template>
  </div>
  <div id="messages-copy-div" :style="styleMessage"></div>
  </div>
</template>

<script>
  export default {
    props: {
      messages: {
        type: Array,
        default: function () {
          return [{title: 'title1', content: 'content111111111111111111111'},
            {title: 'title2', content: 'content222222222222222222222'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title4', content: 'content444444444444444444444'}]
        }
      },
      speed: {
        type: Number,
        default: 30
      },
      direction: {
        // 支持用1, 2表示上和左
        type: [String, Number],
        default: 'up'
      },
      styleScroll: {
        type: Object,
        default: function () {
          return {
            overflow: 'hidden',
            display: 'inline',
            float: 'left',
            height: '40px'
          }
        }
      },
      styleMessage: {
        type: Object,
        default: function () {
          return {
            display: 'inline',
            float: 'left'
          }
        }
      },
      styleMessageTitle: {
        type: Object,
        default: function () {
          return {
            // color: 'red'
          }
        }
      },
      styleMessageContent: {
        type: Object,
        default: function () {
          return {
          }
        }
      }
    },
    methods: {
      startScroll: function (direction) {
        // 先取回函数内，避免作用域引出的坑
        let speed = this.speed
        let scrollDiv = document.getElementById('scroll-div')
        let messagesDiv = document.getElementById('messages-div')
        let messagesCopyDiv = document.getElementById('messages-copy-div')
        messagesCopyDiv.innerHTML = messagesDiv.innerHTML
        function Marquee (direc) {
          if (['up', 1].indexOf(direc) >= 0) {
            if (messagesCopyDiv.offsetHeight - scrollDiv.scrollTop <= 0) {
              scrollDiv.scrollTop -= messagesCopyDiv.offsetHeight
            } else {
              scrollDiv.scrollTop ++
            }
          } else if (['left', 2].indexOf(direc) >= 0) {
            if (messagesCopyDiv.offsetWidth - scrollDiv.scrollLeft <= 0) {
              scrollDiv.scrollLeft -= messagesCopyDiv.offsetWidth
            } else {
              scrollDiv.scrollLeft --
            }
          }
        }
        // 用函数封装解决setInterval调用函数不能带参数的问题
        // let MyMar = setInterval(function () { Marquee('up') }, speed)
        let MyMar = setInterval(function () { Marquee(direction) }, speed)

        scrollDiv.onmouseover = function () {
          clearInterval(MyMar)
        }
        scrollDiv.onmouseout = function () {
          // 用函数封装解决setInterval调用函数不能带参数的问题
          MyMar = setInterval(function () { Marquee(direction) }, speed)
        }
      }
    },
    mounted: function () {
      // setTimeout(this.startScroll(this.direction), this.delay)
      this.startScroll(this.direction)
    },
    destroyed: function () {
      console.log('destroyed')
    }
  }
</script>

<style lang="stylus" scoped>
</style>
