<template>
  <div id="scrollContent" class="notice-list-box">
    <div v-for="message,index in messages" class="notice-list" id="notice_list" :style="{width:ulWidth}">
      <h3>{{ message.title }}</h3>
      <div>{{ message.content }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        ulWidth: '0px',
        messages: [{title: 'title1', content: 'content111111111111111111111'},
          {title: 'title2', content: 'content222222222222222222222'},
          {title: 'title3', content: 'content333333333333333333333'},
          {title: 'title4', content: 'content444444444444444444444'}],
        delay: 10,
        amount: 1,
        direction: 'up',
        timeout: 1000,
        autoScrollTimer: null,
        scrollTimer: null,
        scrollNum: 0
      }
    },
    methods: {
      createUlWidth: function () {
        let allLi = document.getElementById('notice_list').getElementsByTagName('li').length + 1
        this.ulWidth = allLi * 600 + 'px'
      },
      ulScroll: function () {
        setTimeout(function () {
          let ul = document.getElementById('notice_list')
          let li = ul.getElementsByTagName('li')
          let speed = -1
          let timer = null
          let newLi = li[0].cloneNode(true)
          ul.appendChild(newLi)

          timer = setInterval(function () {
            ul.style.left = ul.offsetLeft + speed + 'px'
            if (ul.offsetLeft === -ul.offsetWidth + 600) {
              ul.style.left = '0'
            }
          }, 30)

          ul.onmouseover = function () {
            clearInterval(timer)
          }

          ul.onmouseout = function () {
            timer = setInterval(function () {
              ul.style.left = ul.offsetLeft + speed + 'px'
              if (ul.offsetLeft === -ul.offsetWidth + 600) {
                ul.style.left = '0'
              }
            }, 30)
          }
        }, 1000)
      },

      // 纵向滚动
      scrollPlus: function () {
        this.scrollContent.scrollTop += this.amount
      },
      start: function () {
        clearTimeout(this.autoScrollTimer)
        this.autoScrollTimer = setTimeout(this.GetFunction(this, 'autoScroll'), this.timeout)
      },
      autoScroll: function () {
        let oneHeight = Math.round(parseInt(this.scrollContent.scrollHeight) / this.scrollNum)
        let scrollTop = parseInt(this.scrollContent.scrollTop)
        if (this.direction === 'up') {
          if (scrollTop >= parseInt(this.scrollContent.scrollHeight - oneHeight)) {
            this.scrollContent.scrollTop = 0
            clearTimeout(this.autoScrollTimer)
            this.autoScrollTimer = setTimeout(this.GetFunction(this, 'autoScroll'), this.timeout)
            return
          }
          this.scrollContent.scrollTop += this.amount
        } else {
          if (parseInt(this.scrollContent.srollTop) <= 0) {
            this.scrollContent.scrollTop = parseInt(this.scrollContent.scrollHeight) / 2
          }
          this.scrollContent.scrollTop -= this.amount
        }

        console.log(oneHeight)
        if (parseInt(this.scrollContent.scrollTop) % oneHeight !== 0) {
          this.scrollTimer = setTimeout(this.GetFunction(this, 'autoScroll'), this.delay)
        } else {
          this.autoScrollTimer = setTimeout(this.getFunction(this, 'autoScroll'), this.Timeout)
        }
      },
      getFunction: function (variable, method) {
        return function () {
          variable[method]()
        }
      },
      stop: function () {
        clearTimeout(this.autoScrollTimer)
        clearTimeout(this.scrollTimer)
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.createUlWidth()
        this.ulScroll()
      })
      this.scrollContent = document.getElementById('scrollContent')
      this.scrollNum = this.scrollContent.getElementsByTag('div').length
      if (this.scrollNum > 1) {
        this.start()
      }
    },
    destroyed: function () {
      this.stop()
    }
  }

</script>

<style lang="stylus" scoped>
  .notice-text
    height: 25px
    display: block
    float: left
    img
      float: left
  .notice-list
    position: relative
    left: 0
    li
      color: #fff
      float: left
      width: 600px
      cursor: pointer
  .notice-list-box
    position: relative
    overflow: hidden
    margin-left: 40px
    height: 100%
</style>
