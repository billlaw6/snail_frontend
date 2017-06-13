<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
  @import './styles/vars'
  body
    background-color: body-background-color
  #app
    font-family: font-family 
    color: color
    background-color: #FFFFFF
    title-color: title-color
    border-color: border-color
    shadow-color: shadow-color
    border-radius: border-radius
</style>
