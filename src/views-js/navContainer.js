import './../assets/css/navContainer'  //css file
import axios from 'axios'

export default {
  name: 'CartContainer',
  data () {
    return {
      root: "../../static/",
      togglePanel: true,
      category: 'down',
      goodsList: [],
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
      priceIndex: -1,
      containerW: document.body.clientWidth
    }
  },
  computed: {
    _width () {
      return Math.floor(this.containerW*0.8*0.8/4);
    },
    _margin () {
      return Math.floor(this.containerW*0.8*0.1/4);
    }
  },
  mounted () {
    this.getGoodList();
  },
  methods: {
    getGoodList () {
      axios.get('/goods').then((res)=>{
        this.goodsList = res.data.results;
      });
    },
    priceChecked () {

    },
    jump:  function () {
      //this.$router.push('AllGoodsList');
      //this.$router.push({'path': '/cartIndex/cartContainer/allGoodsList'});
      this.$router.push('/cartIndex/cartContainer/allGoodsList');
    },
    addToCart: function () {
      
    }
  }
}