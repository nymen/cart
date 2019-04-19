<template>
  <div class="cart-index-page">
    <nav-header class="index-header-panel"></nav-header>
    <nav-bread>Cart</nav-bread>
    <nav-cart class="index-container-panel"></nav-cart>
    <nav-footer class="index-footer-panel"></nav-footer>
  </div>
</template>

<script>
  import NavHeader from './../components/NavHeader'
  import NavCart from './../components/NavCart'
  import NavFooter from './../components/NavFooter'
  import NavBread from './../components/NavBread'
  import '@/assets/css/cart'  //css

  export default {
    name: 'Cart',
    components: {
      NavHeader,
      NavCart,
      NavFooter,
      NavBread
    }
  }
</script>
