<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="nav-confirm-page">
    <div class="checkout-step-list">
      <ul>
        <li class="cur">Confirm Address</li>
        <li class="cur">View Your Order</li>
        <li>Make Payment</li>
        <li>Order Confirmation</li>
      </ul>
    </div>
    <div class="table-wrapper">
      <div class="table-h">
        <ul>
          <li class="product-items">ORDER CONTENTS</li>
          <li class="product-price">PRICE</li>
          <li class="product-quantity">QUANTITY</li>
          <li class="product-subtotal">SUBTOTAL</li>
        </ul>
      </div>
      <ul class="table-b">
        <li v-for="goods in products" v-if="goods.checked === '1'">
          <div class="product-items">
            <img class="item-img" :src="rootPath + goods.productImage">
            <span v-text="goods.productName"></span>
          </div>
          <div class="product-price" v-text="goods.salePrice"></div>
          <div class="product-quantity">
            <span class="productNumber">* {{goods.productNum}}</span>
          </div>
          <div class="product-subtotal" :value="goods.fee = Number(goods.salePrice) * Number(goods.productNum)" v-text="goods.fee"></div>
        </li>
      </ul>
    </div>
    <div class="price-count-wrap">
      <div class="price-count">
        <ul>
          <li><span>Item subtotal:</span> <span>{{subTotal}}</span></li>
          <li><span>Shipping:</span> <span>{{shipping}}</span></li>
          <li><span>Discount:</span> <span>{{discount}}</span></li>
          <li><span>Tax:</span> <span>{{tax}}</span></li>
          <li class="order-total-price"><span>Order total:</span> <span>{{payment}}</span></li>
        </ul>
      </div>
    </div>
    <div class="checkout-next-step">
      <router-link class="previous-btn" v-bind:to="{path: 'address'}">PREVIOUS</router-link>
      <a class="next-btn" @click="proceedToPayment">PROCEED TO PAYMENT</a>
    </div>
  </div>
</template>

<script>
  import '@/common/style/css/table.css'
  import '@/assets/css/navConfirm.css'
  import Modal from '@/common/components/Modal'
  import axios from 'axios'

  export default {
    name: 'NavCart',
    data() {
      return {
        rootPath: '/static/',
        products: [],
        subTotal: 0,
        shipping: 100,
        discount: 400,
        tax: 200,
        payment: 0
      }
    },
    mounted() {
      this.getCartList();
    },
    methods: {
      getCartList() {
        axios.post('/users/cartList').then((res) => {
          if (res.data.status === '0') {
            this.products = res.data.result.cartList;
            this.products.forEach((product)=>{
              if(product.checked === '1') {
                this.subTotal += product.productNum * product.salePrice;
              }
            });
            this.payment = this.subTotal + this.shipping - this.discount + this.tax;
          }
        });
      },
      proceedToPayment() {
        axios.post('/users/payment', {
          addressId: this.$route.query.addressId,
          orderTotal: this.payment
        }).then((res)=>{
          if(res.data.status === '0') {
            this.$router.push({path: 'orderSuccess?orderId=' + res.data.result.orderId});
          }
        });
      }
    }
  }
</script>
