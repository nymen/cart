<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="nav-address-page">
    <div class="checkout-step-list">
      <ul>
        <li class="cur">Confirm Address</li>
        <li>View Your Order</li>
        <li>Make Payment</li>
        <li>Order Confirmation</li>
      </ul>
    </div>
    <div class="checkout-shopping-address">
      <h4>shopping address</h4>
      <div class="address-list">
        <ul>
          <li class="address-exist" v-for="(address, index) in addressListFilter" :class="{'selected': address.isDefault}"
              @click="checkedIndex = index;" v-on:mouseenter="hoverIndex = index" v-on:mouseleave="hoverIndex = -1">
            <div class="address-info">
              <span v-text="address.userName"></span>
              <span v-text="address.streetName"></span>
              <span v-text="address.tel"></span>
            </div>
            <div class="address-opt">
              <span v-if="!address.isDefault && hoverIndex===index" @click="setDefaultAddress(address.addressId)">Set Default Address</span>
              <span v-if="address.isDefault" :value="selectedAddressId = (address.isDefault ? address.addressId : -1)">Default Address</span>
              <img :src="rootPath + 'delete.png'" alt="删除用户地址" @click="deleteAddressModalPopup(address)">
            </div>
          </li>
          <li class="address-new">
            <img :src="rootPath + 'add.png'" alt="">
            <span>Add New Address</span>
          </li>
        </ul>
        <div class="show-more-address" @click="moreAddress" v-if="addressList.length > defaultLimit">
          <span>More Address</span>
          <img :src="rootPath + (limit > defaultLimit ? 'close-more.png' : 'open-more.png' )" alt="">
        </div>
      </div>
    </div>
    <div class="checkout-shopping-method">
      <h4>shopping method</h4>
      <div class="shipping-method">
        <ul>
          <li class="check">
            <div class="name">Standard shipping</div>
            <div class="price">Free</div>
            <div class="shipping-tips">
              <p>Once shipped，Order should arrive in the destination in 1-7 business days</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="checkout-next-step">
      <router-link class="previous-btn" v-bind:to="{path: 'cart'}">PREVIOUS</router-link>
      <router-link class="next-btn" v-bind:to="{path: 'orderConfirm', query: {addressId: selectedAddressId}}">NEXT</router-link>
    </div>
    <modal class="address-modal" name="address-modal" @close="modalShow = false" v-if="modalShow">
      <div slot="modalBody" class="error-wrapper" v-show="tipMsg">
        <div>{{tipMsg}}</div>
        <button @click="modalShow = false">确认</button>
      </div>
      <div class="delete-address" slot="modalBody" v-show="deleteAddress">
        <p>确认要删除这个地址吗？</p>
        <button class="btn btn-primary dropdown-toggle" @click="deleteUserAddress">确认</button>
        <button class="btn btn-success dropdown-toggle" @click="modalShow = false">关闭</button>
      </div>
    </modal>
  </div>
</template>

<script>
  import '@/assets/css/navAddress.css'
  import Modal from '@/common/components/Modal'
  import 'animate.css';
  import axios from 'axios'

  export default {
    name: 'NavAddress',
    data() {
      return {
        rootPath: '/static/',
        limit: 4,
        defaultLimit: 4,
        addressList: [],
        checkedIndex: 0,
        hoverIndex: -1,
        addressId: -1,
        selectedAddressId: -1,
        tipMsg: '',
        modalShow: false,
        deleteAddress: false
      }
    },
    computed: {
      addressListFilter() {
        return this.addressList.slice(0, this.limit);
      }
    },
    mounted() {
      this.getAddressList();
    },
    components: {
      Modal,
    },
    methods: {
      getAddressList() {
        axios.get('/users/userAddress').then((res) => {
          if (res && res.data.status === '0') {
            this.addressList = res.data.result;
          }
        });
      },
      moreAddress() {
        if (this.limit === this.defaultLimit) {
          this.limit = this.addressList.length;
        } else {
          this.limit = this.defaultLimit;
        }
      },
      setDefaultAddress(addressId) {
        axios.post('/users/address/setDefault', {addressId}).then((res) => {
          if (res.data.status === '0') {
            this.getAddressList();
          } else {
            this.tipMsg = res.data.msg;
            this.modalShow = true;
          }
        });
      },
      deleteAddressModalPopup(address) {
        if (address.isDefault) {
          this.tipMsg = '默认地址不能被删除';
        } else {
          this.deleteAddress = true;
          this.addressId = address.addressId;
        }
        this.modalShow = true;
      },
      deleteUserAddress() {
        axios.post('/users/address/delete', {addressId: this.addressId}).then((res) => {
          if (res.data.status === '0') {
            this.getAddressList();
            this.deleteAddress = false;
            this.modalShow = false;
          } else {
            this.tipMsg = res.data.msg;
          }
        });
      }
    }
  }
</script>
