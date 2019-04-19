<template>
  <div class="cart-index-page">
    <nav-header class="index-header-panel"></nav-header>
    <nav-bread>Address</nav-bread>
    <nav-address class="index-container-panel"></nav-address>
    <nav-footer class="index-footer-panel"></nav-footer>
  </div>
</template>

<script>
  import NavHeader from './../components/NavHeader'
  import NavAddress from './../components/NavAddress'
  import NavFooter from './../components/NavFooter'
  import NavBread from './../components/NavBread'

  export default {
    name: 'Address',
    data () {
      return {
      }
    },
    methods: {
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      NavAddress
    }
  }
</script>
