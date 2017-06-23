<template>
  <div id="scroll-div" :style="styleScrollDiv">
  <ul id="messages-div">
    <template v-for="(message, index) in messages">
    <li><a href="#">{{ message.content }}</a></li>
    </template>
  </ul>
  <ul id="messages-copy-div"></ul>
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
        default: 60
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
      styleScrollDiv: {
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
          }
        }
      },
      styleMessageTitle: {
        type: Object,
        default: function () {
          return {
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
        let scrollDiv = document.getElementById('scroll-div')
        let messagesDiv = document.getElementById('messages-div')
        let messagesCopyDiv = document.getElementById('messages-copy-div')
        messagesCopyDiv.innerHTML = messagesDiv.innerHTML
        function Marquee () {
          // console.log(messagesCopyDiv.offsetHeight + ' : ' + h.scrollTop)
          if (messagesCopyDiv.offsetHeight - scrollDiv.scrollTop <= 0) {
            scrollDiv.scrollTop -= messagesCopyDiv.offsetHeight
          } else {
            scrollDiv.scrollTop ++
          }
        }
        let MyMar = setInterval(Marquee, this.speed)
        scrollDiv.onmouseover = function () {
          clearInterval(MyMar)
        }
        scrollDiv.onmouseout = function () {
          MyMar = setInterval(Marquee, this.speed)
        }
      }
    },
    mounted: function () {
      this.startScroll('left')
    },
    destroyed: function () {
      console.log('destroyed')
    }
  }

</script>

<style lang="stylus" scoped>
  .scroll
    color: red
</style>
