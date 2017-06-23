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
          return [{title: 'title1', content: 'content88888888888888888888888888888881111111111113333333333333333333333333333333333333333333333333333333333111111111'},
            {title: 'title2', content: 'content222222222222222222222'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title3', content: 'conten                                   t333333333333333333333'},
            {title: 'title3', content: 'content333333333333333333333'},
            {title: 'title4', content: 'content444444444444444444444'}]
        }
      },
      interval: {
        type: Number,
        default: 30
      },
      direction: {
        // 支持用1, 2表示上和左
        type: [String, Number],
        default: 'left'
      },
      styleScroll: {
        type: Object,
        default: function () {
          return {
            overflow: 'hidden',
            'white-space': 'nowrap',
            display: 'inline',
            float: 'left',
            // 必须要小于message-div的高度
            height: '40px',
            // 必须要小于单行message的宽度
            width: '300px'
          }
        }
      },
      styleMessage: {
        type: Object,
        default: function () {
          return {
            display: 'inline'
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
        let interval = this.interval
        let scrollDiv = document.getElementById('scroll-div')
        let messagesDiv = document.getElementById('messages-div')
        let messagesCopyDiv = document.getElementById('messages-copy-div')
        messagesCopyDiv.innerHTML = messagesDiv.innerHTML
        function Marquee (direc) {
          // console.log('in:' + direction)
          if (['up', 1].indexOf(direc) >= 0) {
            // console.log('up')
            console.log(messagesCopyDiv.offsetHeight + ' ： ' + scrollDiv.scrollTop)
            if (messagesCopyDiv.offsetHeight - scrollDiv.scrollTop <= 0) {
              scrollDiv.scrollTop -= messagesCopyDiv.offsetHeight
            } else {
              scrollDiv.scrollTop ++
            }
          } else if (['left', 2].indexOf(direc) >= 0) {
            // console.log('left')
            console.log(messagesCopyDiv.offsetWidth + ' ： ' + scrollDiv.scrollLeft)
            if (messagesCopyDiv.offsetWidth - scrollDiv.scrollLeft <= 0) {
              console.log('<=')
              scrollDiv.scrollLeft -= messagesCopyDiv.offsetWidth
            } else {
              scrollDiv.scrollLeft ++
            }
          }
        }
        // 用函数封装解决setInterval调用函数不能带参数的问题
        // let MyMar = setInterval(function () { Marquee('up') }, interval)
        let MyMar = setInterval(function () { Marquee(direction) }, interval)

        scrollDiv.onmouseover = function () {
          clearInterval(MyMar)
        }
        scrollDiv.onmouseout = function () {
          // 用函数封装解决setInterval调用函数不能带参数的问题
          MyMar = setInterval(function () { Marquee(direction) }, interval)
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
