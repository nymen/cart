<template>
  <div class="cart-bread-panel">
    <nav class="bread-wrapper">
      <span>Home /</span>
      <span><slot></slot></span>
    </nav>
  </div>
</template>

<style>
.cart-bread-panel {
  height: 45px;
  line-height: 45px;
  background-color: #F0F0F0;
  border: 1px solid #ccc;
  font-size: 14px;
  text-align: left;
 }

.bread-wrapper {
  margin-left: 10px;
}

.bread-wrapper > span {
  cursor: pointer;
  color: #a1a1a1;
  transition: color .3s ease-out;
}

.bread-wrapper > span:hover {
  color: #d1434a;
}

.bread-wrapper > span:last-child {
  color: #d1434a;
}
</style>
