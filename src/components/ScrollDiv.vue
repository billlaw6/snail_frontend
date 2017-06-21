<template>
  <div class="notice-list-box">
    <ul class="notice-list" id="notice_list" :style="{width:ulWidth}">
      <li>laskdfjalsdkfjla111111111111111111</li>
      <li>laskdfjalsdkfjla222222222222222222</li>
      <li>laskdfjalsdkfjla333333333333333333</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        ulWidth: '0px'
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
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.createUlWidth()
        this.ulScroll()
      })
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
