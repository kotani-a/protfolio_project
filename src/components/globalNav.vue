<template>
  <nav class="globalNav">
    <router-link
      v-for="nav in navList"
      v-bind:key="nav.key"
      v-bind:to="nav.link"
      class="link"
      v-bind:class="nav.label === nowPage ? 'nowPage' : ''"
    >
      <span class="firstString">{{ nav.label.substring(0, 1) }}</span>
      <span>{{ nav.label.substring(1) }}</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'globalNav',
  props: {
    nowPage: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      navList: [
        {
          key: 0,
          label: 'Home',
          link: '/'
        },
        {
          key: 1,
          label: 'Profile',
          link: '/profile'
        },
        {
          key: 2,
          label: 'Works',
          link: '/works'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/common.scss";

@keyframes growOrangeShadow {
  0% { box-shadow: 0px 0px $keyOrange; }
  100% { box-shadow: 4px 4px $keyOrange; }
}

@keyframes colorFadeIn {
  0% { color: $keyWhite; }
  100% { color: $keyOrange; }
}

.globalNav {
  position: fixed;
  display: flex;
  width: 100%;
  left: 0;
  top: 0;
  border: 4px solid $keyGray;
  border-bottom: none;
  box-sizing: border-box;
  z-index: 5;
  .link {
    @include OswaldWhite;
    animation-name: growOrangeShadow;
    animation-duration: 3s;
    width: 77px;
    height: 48px;
    padding: 0 8px;
    box-sizing: border-box;
    position: relative;
    background-color: $keyGray;
    font-size: 16px;
    text-decoration: none;
    border-bottom: 1px solid $keyWhite;
    box-shadow: 4px 4px $keyOrange;
    vertical-align: middle;
    &:last-child {
      border-right: 1px solid $keyWhite;
    }
    &::first-letter {
      font-size: 32px;
      padding-right: 4px;
    }
    &:not(:first-child)::before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 24px;
      position: absolute;
      top: 12px;
      left: 0;
      background-color: $keyWhite;
      border-top: 1px solid $keyWhite;
    }
    &:hover {
      border-bottom: 4px solid $keyWhite;
      transition: all 0.2s;
    }
    &:not(:hover) {
      border-bottom: 1px solid $keyWhite;
      transition: all 0.2s;
    }
  }
  .link.nowPage .firstString {
    animation-name: colorFadeIn;
    animation-duration: 1s;
    color: $keyOrange;
  }
  &::after {
    content: '';
    display: inline-block;
    width: calc(100% - 77 * 3px);
    border-top: 1px solid $keyWhite;
    pointer-events: none;
  }
}
</style>
