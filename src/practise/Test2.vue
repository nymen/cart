<template>
  <div id="example">
    <b-button @click="modalShow = !modalShow">
        Open Modal
    </b-button>
    <b-modal v-model="modalshow">
        Hello From Modal!
    </b-modal>
  </div>
</template>
 
<script>
  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import 'bootstrap/dist/css/bootstrap.css'

  Vue.use(BootstrapVue)

export default {
  data() {
    return { 
      modalShow: true
    }
  },
  methods: {
  }
}
</script>