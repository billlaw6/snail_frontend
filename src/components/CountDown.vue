<template>
  <span :endTime="endTime" :callback="callback" :endText="endText">
    <slot>
    </slot>
    <template v-if="day">
      <span>{{day}}</span>天
    </template>
    <template v-if="hour">
      <span>{{hour}}</span>小时
    </template>
    <template v-if="minute">
      <span>{{minute}}</span>分
    </template>
    <template>
      <span>{{second}}</span>秒
    </template>
  </span>
</template>

<script>
  export default {
    data () {
      return {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
      }
    },
    props: {
      // 参数如果从后台异步取容易不能及时取到，必须采用异步加载组件的方式
      // CountDown: resolve => { require(['../../components/CountDown.vue'], resolve) }
      endTime: {
        type: String,
        default: ''
      },
      endText: {
        type: String,
        default: '已结束'
      },
      callback: {
        type: Function,
        default: null
      }
    },
    mounted () {
      this.countdowm(this.endTime)
    },
    methods: {
      countdowm (timestamp) {
        // console.log('countDown:' + timestamp)
        let self = this
        let timer = setInterval(function () {
          let nowTime = new Date()
          let endTime = new Date(timestamp)
          // console.log(endTime)
          let t = endTime.getTime() - nowTime.getTime()
          if (t > 0) {
            self.day = Math.floor(t / (60 * 60 * 1000 * 365))
            self.hour = Math.floor((t / (60 * 60 * 1000)) % 24)
            self.minute = Math.floor((t / (60 * 1000)) % 60)
            self.second = Math.floor((t / 1000) % 60)
          } else {
            clearInterval(timer)
            self.content = self.endText
            self._callback()
          }
        }, 1000)
      },
      _callback () {
        if (this.callback && this.callback instanceof Function) {
          this.callback(...this)
        }
      }
    }
  }
</script>
