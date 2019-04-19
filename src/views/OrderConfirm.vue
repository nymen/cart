<template>
  <div class="cart-index-page">
    <nav-header class="index-header-panel"></nav-header>
    <nav-bread>Order Confirm</nav-bread>
    <nav-confirm class="index-container-panel"></nav-confirm>
    <nav-footer class="index-footer-panel"></nav-footer>
  </div>
</template>

<script>
  import NavHeader from './../components/NavHeader'
  import NavConfirm from './../components/NavConfirm'
  import NavFooter from './../components/NavFooter'
  import NavBread from './../components/NavBread'
  import '@/assets/css/cart'  //css

  export default {
    name: 'OrderConfirm',
    components: {
      NavHeader,
      NavConfirm,
      NavFooter,
      NavBread
    }
  }
</script>
