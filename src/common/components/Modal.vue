<template>
  <div class="cmModal-entity">
    <div class="cmModal-container">
      <div class="cmModal-header">
        <span class="header-title" v-if="headerTitle" v-html="headerTitle"></span>
        <div class="header-operators">
          <img class="close-icon" src="./../../../static/close.png" @click="closeModal">
        </div>
      </div>
      <div class="cmModal-body">
        <slot name="modalBody"></slot>
      </div>
    </div>
    <div class="cmModal-layout"  @click="closeModal">
    </div>
  </div>
</template>
<!--如果需要，可以自己在外部modal标签上加自己的class覆盖默认样式-->

<script>
  import './../style/css/modal.css'
  export default {
    props: ['headerTitle'],
    name: 'commonModal',
    data(){
      return {

      }
    },
    methods: {
      closeModal () {
        this.$emit('close');
      }
    }
  }
</script>
