<template>
  <div>
    <div class="cart-header-panel">
      <div class="header-logo"><img src="../../static/logo.png"></div>
      <div class="header-login">
        <span class="need-hover" @click="show" v-if="!nickName">Login</span>
        <span v-if="nickName" v-text="nickName"></span>
        <span class="need-hover" v-if="nickName" @click="logoutCart">Logout</span>
        <img @click="goCart" src="../../static/cart.png">
      </div>
    </div>
    <modal class="login-modal" name="login-modal">
      <div class="top-icons"><img class="close-icon" src="../../static/close.png" @click="hide"></img></div>
      <div class="login-body">
        <h4>Login in</h4>
        <div class="error-wrapper" v-show="errorShow"><span>{{errorMsg}}</span></div>
        <div class="user-info"><img src="../../static/people.png"><input type="text" placeholder="User Name" v-model="userName"></div>
        <div class="user-info"><img src="../../static/lock.png"><input type="password" placeholder="Password" v-model="userPwd" @keyup.enter="loginCart"></div>
        <button @click="loginCart">登录</button>
      </div>
    </modal>
  </div>
</template>

<script>
  import './../../node_modules/font-awesome/css/font-awesome.css'
  import '@/assets/css/navHeader'
  import axios from 'axios'

  export default {
    name: 'CartHeader',
    data () {
      return {
        userName: '', //admin
        userPwd: '',//123456
        isLogin: false,
        errorShow: false,
        errorMsg: '',
        nickName: ''
      }
    },
    mounted () {
      this.checkLogin();
    },
    methods: {
      checkLogin () {
        axios.post('/users/checkLogin').then((res)=>{
          if(res.data.status === '0') {
            this.isLogin = true;
            this.nickName = res.data.result;
          }
        });
      },
      loginCart () {
        if(!this.userName || !this.userPwd) {
          this.errorMsg = '用户名或密码为空！';
          this.errorShow = true;
          return;
        } else {
          this.errorShow = false;
        }
        axios.post('/users/login', {userName: this.userName, userPwd: this.userPwd}).then((res)=>{
          if(res.data.status === '0') {
            this.nickName = res.data.result;
            this.errorShow = false;
            this.isLogin = true;
            this.hide();
          } else {
            this.errorMsg = '用户名或密码错误！';
            this.errorShow = true;
          }
        });
      },
      logoutCart () {
        axios.post('/users/logout', {}).then((res)=>{
          if(res.data.status === '0') {
            this.nickName = '';
          }
        });
      },
      goCart () {
        if(this.isLogin) {
          this.$router.push('cart');
        } else {
          alert('请先登录...');
        }
      },
      show () {
        this.$modal.show('login-modal');
      },
      hide () {
        this.$modal.hide('login-modal');
      }
    }
  }
</script>
