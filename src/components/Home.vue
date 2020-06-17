<template>
  <div class="page">
    <img src="../assets/titel_A_90.png" class="title" alt="Title" />
    <img src="../assets/name_90.png" class="name" alt="Name" />
    <div class="box" />
    <div class="border" />
    <div class="greetDiv">
      <span class="greetHead">Hello, World!<br />Hello, Everyone!</span>
      <span class="greet">Welcome! I am akinori kotani.This is My Protfolio Site.</span>
      <nav class="nav">
        <router-link to="/profile" class="link">Profile</router-link>
        <router-link to="/works" class="link">Works</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default { name: 'Home' }
</script>

<style lang="scss" scoped>
@import "../styles/common.scss";

.page {
  @include page;
  height: 100%;
  .title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
  }
  .name {
    width: 150px;
    position: absolute;
    top: 376px;
    left: 205px;
    z-index: 5;
  }
  .box {
    width: 707px;
    height: 500px;
    background-color: $keyGray;
    transform: rotate(45deg);
    position: absolute;
    left: -123px;
    top: -10px;
  }
  .border {
    width: 2px;
    height: 500px;
    background-color: #909090;
    transform: rotate(45deg);
    position: absolute;
    z-index: 5;
    left: 311px;
    top: 73px;
  }
  .greetDiv {
    margin: auto 0;
    text-align: center;
    mix-blend-mode: difference;
    z-index: 5;
    .greetHead {
      font-size: 80px;
      @include mq(md) {
        font-size: 96px;
      }
      @include mq(lg) {
        font-size: 120px;
      }
      margin-bottom: 24px;
      color: #666;
      font-family: 'Oswald', sans-serif;
      font-weight: bold;
      display: block;
    }
    .greet {
      @include OswaldDifference;
      font-size: 16px;
      @include mq(sm) {
        font-size: 20px;
      }
    }
    .nav {
      .link {
        @include OswaldDifference;
        font-size: 20px;
        margin: 0 8px;
        text-decoration: underline;
      }
    }
  }
}
</style>
