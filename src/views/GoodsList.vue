<template>
  <div class="cart-index-page">
    <nav-header class="index-header-panel"></nav-header>
    <nav-bread>Goods</nav-bread>
    <nav-container class="index-container-panel"></nav-container>
    <nav-footer class="index-footer-panel"></nav-footer>
  </div>
</template>

<script>
import NavHeader from './../components/NavHeader'
import NavContainer from './../components/NavContainer'
import NavFooter from './../components/NavFooter'
import NavBread from './../components/NavBread'
import '@/assets/css/cart'  //css

export default {
  name: 'GoodsList',
  components: {
    NavHeader,
    NavContainer,
    NavFooter,
    NavBread
  }
}
</script>
