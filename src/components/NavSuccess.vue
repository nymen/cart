<template>
  <div class="container">
    <div class="page-title-normal">
      <h2 class="page-title-h2"><span>check out</span></h2>
    </div>
    <!-- 进度条 -->
    <div class="check-step">
      <ul>
        <li class="cur"><span>Confirm</span> address</li>
        <li class="cur"><span>View your</span> order</li>
        <li class="cur"><span>Make</span> payment</li>
        <li class="cur"><span>Order</span> confirmation</li>
      </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic"><img src="" alt=""></div>
      <div class="order-create-main">
        <h3>Congratulations! <br>Your order is under processing!</h3>
        <p>
          <span>Order ID：{{orderId}}</span>
          <span>Order total：{{orderTotal}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <router-link class="btn btn--m" to="/cart">Cart List</router-link>
          </div>
          <div class="btn-r-wrap">
            <router-link class="btn btn--m" to="/allGoods">Goods List</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/css/base.css'
  import '@/assets/css/checkout.css'
  import axios from 'axios'

  export default {
    name: 'NavAddress',
    data() {
      return {
        rootPath: '/static/',
        orderId: '',
        orderTotal: ''
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.orderId = this.$route.query.orderId;
        if(!this.orderId) {
          return;
        }
        axios.get('/users/orderDetail', {
          params: {
            orderId: this.orderId
          }
        }).then((res) => {
          if (res && res.data.status === '0') {
            this.orderTotal = res.data.result.orderTotal;
          }
        });
      }
    }
  }
</script>
