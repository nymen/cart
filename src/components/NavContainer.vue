<template>
  <div class="cart-panel">
    <div class="goods-sort">
      <span>Sort by:  </span>
      <span class="focus-highlight">Default </span>
      <span @click="sortByPrice">Price</span>
      <img :src='root + category + ".png"'>
    </div>
    <div class="goods-info">
      <div v-if="goodsList.length > 0">
        <div class="price-filter">
          <div :class="priceIndex === -1 ? 'checked' : ''" @click="priceIndex = -1">All</div>
          <div :class="priceIndex === index ? 'checked' : ''" v-for="(price, index) in priceFilter" :key='index'
               @click="priceIndex = index">
            <span>{{price.priceStart}}</span>
            <span> - </span>
            <span>{{price.priceEnd}}</span>
          </div>
        </div>
        <div class="goods-list">
          <div class="goods-item"
               :style="'width:'+ _width + 'px; height: ' + _width*1.6 + 'px; margin-left: ' + _margin + 'px; margin-top: ' + _margin + 'px'"
               v-for="item of goodsList" v-bind:key="item.id">
            <div><img v-lazy="root + item.productImage"></div>
            <div class="goods-description">
              <span>{{item.productName}}</span>
              <span>{{item.salePrice}}</span>
              <button @click="addToCart(item.productId)" :goodId="item.productId">加入购物车</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>暂无商品...</div>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
      <img src="./../../static/loading/loading-spinning-bubbles.svg" alt="" v-show="loading">
    </div>
    <modal class="modal-cart" v-if="modalShow" @close="closeModal">
      <div class="add-failure" slot="modalBody" v-if="!addResult" v-text="tipMsg"></div>
      <div class="add-success" slot="modalBody" v-if="addResult">
        <p v-text="tipMsg"></p>
        <div class="success-btns">
          <button class="btn btn-success dropdown-toggle" @click="modalShow = false">继续购物</button>
          <button class="btn btn-primary dropdown-toggle" @click="goCart">查看购物车</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import './../assets/css/navContainer'  //css file
  import './../../node_modules/bootstrap/dist/css/bootstrap.css'  //css file
  import axios from 'axios'
  import Modal from './../common/components/Modal'
  export default {
    name: 'CartContainer',
    data() {
      return {
        root: "/static/",
        busy: true,
        loading: false,
        modalShow: false,
        addResult: false,
        tipMsg: '',
        goodsList: [],
        filter: {},
        sortType: true, //1: up  -1: down
        pageNumber: 1,
        pageSize: 8,
        priceIndex: -1,
        priceFilter: [
          {
            priceStart: '0.00',
            priceEnd: '100.00'
          },
          {
            priceStart: '100.00',
            priceEnd: '500.00'
          },
          {
            priceStart: '500.00',
            priceEnd: '1000.00'
          },
          {
            priceStart: '1000.00',
            priceEnd: '5000.00'
          }
        ],
        containerW: document.body.clientWidth
      }
    },
    computed: {
      _width() {
        return Math.floor(this.containerW * 0.8 * 0.8 / 4);
      },
      _margin() {
        return Math.floor(this.containerW * 0.8 * 0.1 / 4);
      },
      category() {
        return this.sortType ? 'up' : 'down';
      },
    },
    components: {
      Modal
    },
    mounted() {
      this.getGoodList();
    },
    watch: {
      priceIndex() {//按照价格排序
        this.pageNumber = 1;
        if (this.priceIndex === -1) {
          this.filter = {};
          this.getGoodList();
        } else {
          this.filter.priceStart = Number(this.priceFilter[this.priceIndex].priceStart);
          this.filter.priceEnd = Number(this.priceFilter[this.priceIndex].priceEnd);
          this.getGoodList();
        }
      }
    },
    methods: {
      loadMore() {
        this.busy = true;
        this.loading = true;
        setTimeout(() => {
          this.pageNumber++;
          this.getGoodList(true);
        }, 1000);
      },
      getGoodList(flag) {
        let params = {
          filter: this.filter,
          sort: this.sortType ? 1 : -1,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        };
        axios.get('/goods', {params}).then((res) => {
          if (flag) {
            if (res.data.result.count < this.pageSize) {
              this.busy = true;
              this.loading = false;
            } else {
              this.busy = false;
              this.loading = false;
            }
            this.goodsList = this.goodsList.concat(res.data.result.list);
          } else {
            this.goodsList = res.data.result.list;
            this.busy = false;
            this.loading = false;
          }
        });
      },
      sortByPrice() {
        this.sortType = !this.sortType;
        this.pageNumber = 1;
        this.getGoodList();
      },
      addToCart(productId) {
        let userId = '100000077';
        axios.post('/goods/addToCart', {userId, productId}).then((res)=>{
          this.modalShow = true;
          this.tipMsg = res.data.msg;
          this.addResult = res.data.status === '0' ? true : false;
        });
      },
      closeModal () {
        this.modalShow = false;
      },
      goCart () {
        this.$router.push('cart');
      }
    }
  }
</script>
