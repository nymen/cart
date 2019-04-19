<template>
  <div class="cart-index-page">
    <nav-header class="index-header-panel"></nav-header>
    <nav-bread>Order Confirm</nav-bread>
    <nav-success class="index-container-panel"></nav-success>
    <nav-footer class="index-footer-panel"></nav-footer>
  </div>
</template>

<script>
  import NavHeader from './../components/NavHeader'
  import NavSuccess from './../components/NavSuccess'
  import NavFooter from './../components/NavFooter'
  import NavBread from './../components/NavBread'
  import '@/assets/css/cart'  //css

  export default {
    name: 'OrderSuccess',
    components: {
      NavHeader,
      NavSuccess,
      NavFooter,
      NavBread
    }
  }
</script>
