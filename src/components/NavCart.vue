<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="nav-cart-page">
    <div class="table-wrapper">
      <div class="table-h">
        <ul>
          <li class="product-items">ITEMS</li>
          <li class="product-price">PRICE</li>
          <li class="product-quantity">QUANTITY</li>
          <li class="product-subtotal">SUBTOTAL</li>
          <li class="product-edit">EDIT</li>
        </ul>
      </div>
      <ul class="table-b">
        <li v-for="goods in products">
          <div class="product-items">
            <img class="item-status" :src="rootPath + (goods.checked === '1' ? 'checked.png': 'unchecked.png')"
                 @click="goodsEdit(goods)">
            <img class="item-img" :src="rootPath + goods.productImage">
            <span v-text="goods.productName"></span>
          </div>
          <div class="product-price" v-text="goods.salePrice"></div>
          <div class="product-quantity">
            <span class="btn btn-default" @click="goodsEdit(goods, 'decrease')">-</span>
            <span class="productNumber" v-text="goods.productNum"></span>
            <span class="btn btn-default" @click="goodsEdit(goods, 'increase')">+</span>
          </div>
          <div class="product-subtotal" :value="goods.fee = Number(goods.salePrice) * Number(goods.productNum)"
               v-text="goods.fee"></div>
          <div class="product-edit">
            <img class="edit-img" :src="rootPath + 'delete.png'" @click="deleteModalPopup(goods.productId)">
          </div>
        </li>
      </ul>
    </div>
    <div class="table-footer">
      <div class="radio-part">
        <img :src="rootPath + (checkedAll ? 'checked.png' : 'unchecked.png')" @click="selectAllProducts">
        <span>Select All</span>
      </div>
      <div class="fee-part">
        <span>Item Total:&nbsp;&nbsp;&nbsp;&nbsp;{{totalFee || 0}}&nbsp;(RMB)</span>
        <span class="checkout-btn" :class="totalFee > 0 ? 'checkout-yes' : 'checkout-no'"
              @click="checkout">CHECKOUT</span>
      </div>
    </div>
    <modal class="modal-cart" v-if="modalShow" @close="closeModal">
      <div class="add-failure" slot="modalBody" v-text="tipMsg"></div>
      <div class="delete-product" slot="modalBody" v-show="deleteProduct">
        <p>确认要删除这个商品么？</p>
        <button class="btn btn-primary dropdown-toggle" @click="deleteConfirm">确认</button>
        <button class="btn btn-success dropdown-toggle" @click="modalShow = false">关闭</button>
      </div>
    </modal>
  </div>
</template>

<script>
  import '@/common/style/css/table.css'
  import '@/assets/css/navCart.css'
  import Modal from '@/common/components/Modal'
  import axios from 'axios'

  export default {
    name: 'NavCart',
    data() {
      return {
        rootPath: './../../static/',
        modalShow: false,
        tipMsg: '',
        products: [],
        productId: '',
        deleteProduct: false
      }
    },
    mounted() {
      this.getCartList();
    },
    components: {
      Modal,
    },
    computed: {
      checkedAll() {
        return this.checkedCount === this.products.length;
      },
      checkedCount() {
        let i = 0;
        this.products.forEach((item) => {
          if (item.checked === '1') {
            i++;
          }
        });
        return i;
      },
      totalFee() {
        let totalFee = 0;
        this.products.forEach((goods) => {
          if (goods.checked === '1') {
            totalFee += parseFloat(goods.salePrice) * parseInt(goods.productNum);
          }
        });
        return totalFee;
      }
    },
    methods: {
      getCartList() {
        axios.post('/users/cartList').then((res) => {
          if (res.data.status === '0') {
            this.products = res.data.result.cartList;
          } else {
            this.modalShow = true;
            this.tipMsg = res.data.msg;
          }
        });
      },
      goodsEdit(goods, category) {
        let productNum = Number(goods.productNum);
        if (category === 'decrease') {
          goods.productNum = (productNum > 1 ? productNum - 1 : 1);
        } else if (category === 'increase') {
          goods.productNum = productNum + 1;
        } else {
          goods.checked = (goods.checked === '1' ? '0' : '1');
        }
        this.editCartList(goods);
      },
      selectAllProducts() {
        let flag = !this.checkedAll;
        this.products.forEach((goods) => {
          goods.checked = flag ? '1' : '0';
        });
        this.updateCheckedStatus(flag);
      },
      updateCheckedStatus(flag) {
        axios.post('/users/checkedAll', {checked: flag}).then((res) => {
          if (res.data.status === '0') {
            console.log('购物车更新成功！');
          } else {
            this.modalShow = true;
            this.tipMsg = res.data.msg;
          }
        });
      },
      editCartList(goods) {
        axios.post('/users/editCartList', {
          productId: goods.productId,
          productNum: goods.productNum,
          checked: goods.checked
        }).then((res) => {
          if (res.data.status === '0') {
            console.log('购物车更新成功！');
          } else {
            this.modalShow = true;
            this.tipMsg = res.data.msg;
          }
        });
      },
      deleteModalPopup(productId) {
        this.productId = productId;
        this.tipMsg = '';
        this.deleteProduct = true;
        this.modalShow = true;
      },
      deleteConfirm() {
        axios.post('/users/deleteProduct', {productId: this.productId}).then((res) => {
          if (res.data.status === '0') {
            this.modalShow = false;
            this.deleteProduct = false;
            this.productId = '';
            this.getCartList();
          } else {
            this.tipMsg = res.data.msg;
          }
        });
      },
      closeModal() {
        this.modalShow = false;
      },
      checkout() {
        if(this.totalFee > 0) {
          this.$router.push({'path': '/address'});
        }
      }
    }
  }
</script>
