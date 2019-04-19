<template>
<div>
    <h6>Default</h6>
    <b-pagination size="md" :total-rows="100" v-model="currentPage" :per-page="10">
    </b-pagination>
    <br>

    <h6>Small</h6>
    <b-pagination size="sm" :total-rows="100" v-model="currentPage" :per-page="10">
    </b-pagination>
    <br>

    <h6>Large</h6>
    <b-pagination size="lg" :total-rows="100" v-model="currentPage" :per-page="10">
    </b-pagination>
    <br>

    <div>currentPage: {{currentPage}}</div>
</div>
</template>

<script>

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
Vue.use(BootstrapVue);

export default {
    data() {
        return {
            currentPage: 3
        }
    }
}
</script>
