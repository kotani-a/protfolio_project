<template>
  <div class="page">
    <img src="../assets/titel_A_90.png" class="title" alt="Title" />
    <img src="../assets/name_90.png" class="name" alt="Name" />
    <transition
      appear
      @enter="boxEnter"
    >
      <div class="box" />
    </transition>
    <div class="border" />
    <div class="greetDiv">
      <transition
        appear
        @enter="greetHeadEnter"
      >
        <span class="greetHead">Hello, World!<br />Hello, Everyone!</span>
      </transition>
      <span class="greet">Welcome! I am akinori kotani.This is My Protfolio Site.</span>
      <nav class="nav">
        <router-link to="/profile" class="link">Profile</router-link>
        <router-link to="/works" class="link">Works</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import {gsap} from 'gsap'

export default {
  name: 'Home',
  methods: {
    boxEnter (el) {
      gsap.timeline().from(el, {
        duration: 2,
        delay: 0.5,
        height: 1
      }).from(el, {
        width: 1,
        duration: 1
      })
    },
    greetHeadEnter (el) {
      gsap.from(el, {
        duration: 2,
        delay: 1,
        y: -50,
        opacity: 0,
        ease: 'expo.out',
        color: '#0057A6'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/common.scss";

.page {
  @include page;
  height: 100%;
  .title {
    position: absolute;
    top: 25%;
    z-index: 5;
  }
  .name {
    width: 80px;
    position: absolute;
    z-index: 5;
    bottom: 0;
  }
  .box {
    width: 80%;
    height: 100%;
    background-color: $keyGray;
    position: absolute;
  }
  .border {
    width: 1px;
    height: 100%;
    background-color: #909090;
    transform: rotate(45deg);
    position: absolute;
    z-index: 5;
    top: 0;
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
