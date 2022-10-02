<template>
  <div class="page">
    <globalNav nowPage="Profile" />
    <div class="main">
      <h2 class="head2">HistoryDetail</h2>
      <ol class="historyList">
        <li
          class="historyItem"
          v-for="item in historyList"
          v-bind:key="`history${item.key}`"
        >
          <h3 class="itemTitle">
            <span class="col" />
            <span class="smallRhombus" />
            <span class="row" />
            <p class="historyText">
              <span class="historyDate">{{ item.date }}</span>
              <span class="historyContent">{{ item.content }}</span>
            </p>
          </h3>
          <p v-if="item.comment" class="comment">{{ item.comment }}</p>
          <ol v-if="item.history" class="historyList childList">
            <span class="col" />
            <li
              class="historyItem"
              v-for="item in item.history"
              v-bind:key="`history${item.key}`"
            >
              <h3 class="itemTitle">
                <span class="col" />
                <span class="smallRhombus" />
                <span class="row" />
                <p class="historyText">
                  <span class="historyDate">{{ item.date }}</span>
                  <span class="historyContent">{{ item.content }}</span>
                </p>
              </h3>
              <p v-if="item.comment" class="comment">{{ item.comment }}</p>
            </li>
            <span class="col" />
          </ol>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import globalNav from './globalNav'
import historyJson from '../data/history.json'

export default {
  name: 'HistoryDetail',
  components: { globalNav },
  data () {
    return {
      historyList: historyJson.historyList
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/common.scss";

@keyframes heightUpMd {
  0% { height: 0px; }
  50% { height: 0px; }
  // $listHeight * 2(スマホ幅は二段に分けるため) * リストアイテムの数
  99% { height: $listHeight * 2 * 14; }
  100% { height: auto; }
}

@keyframes heightUp {
  0% { height: 0px; }
  50% { height: 0px; }
  // $listHeight * リストアイテムの数
  99% { height: $listHeight * 14; }
  100% { height: auto; }
}

@keyframes widthUp {
  0% { width: 0px; }
  50% { width: 0px; }
  100% { width: 15px; }
}

@keyframes childListWidthUp {
  0% { width: 0px; }
  50% { width: 0px; }
  100% { width: 45px; }
}

@keyframes fade {
  0% { opacity: 0%; }
  50% { opacity: 0%; }
  100% { opacity: 100%; }
}

.page {
  @include page;
  background-color: $keyGray;
  .main {
    padding-top: 80px;
  }
  .head2 {
    @include OswaldGray;
    padding-left: 4px;
    height: 48px;
    line-height: 48px;
    background-color: $keyWhite;
    font-size: 32px;
    font-weight: bold;
    vertical-align: middle;
    display: flex;
    align-items: center;
    &::before {
      content: '';
      display: inline-block;
      width: 16px;
      height: 32px;
      margin-right: 8px;
      vertical-align: middle;
      background-color: $keyGray;
    }
  }
  .historyList {
    background-color: $keyGray;
    animation-name: heightUpMd;
    @include mq(md) {
      animation-name: heightUp;
    }
    animation-duration: 1s;
    height: auto;
    padding: 0 8px;
    margin: 15px 0;
    &.childList {
      padding: 0;
      margin: 0;
      .col {
        height: 30px;
        width: 1px;
        margin-right: -3px;
        background-color: $keyWhite;
        display: block;
      }
      .historyItem {
        &:first-child .itemTitle .col {
          height: 30px;
        }
        .itemTitle {
          .row {
            @include whiteRow;
            animation-name: childListWidthUp;
            animation-duration: 1.5s;
            width: 45px;
          }
        }
        .comment {
          padding-left: 55px;
        }
      }
    }
    .historyItem {
      display: flex;
      flex-direction: column;
      .itemTitle {
        display: flex;
        align-items: center;
        .col {
          width: 1px;
          height: $listHeight * 2;
          @include mq(md) {
            height: $listHeight;
          };
          margin-right: -3px;
          background-color: $keyWhite;
        }
        .smallRhombus {
          @include whiteRhombusFull;
          width: 6px;
          height: 6px;
        }
        .row {
          @include whiteRow;
          animation-name: widthUp;
          animation-duration: 1.5s;
          width: 15px;
        }
        .historyText {
          animation-name: fade;
          animation-duration: 1.5s;
          color: $keyWhite;
          .historyDate {
            width: 100%;
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            vertical-align: bottom;
            @include mq(md) {
              width: 120px;
              min-width: 120px;
              display: inline-block;
              font-size: 20px;
              vertical-align: middle;
            }
          }
          .historyContent {
            vertical-align: top;
            font-size: 12px;
            @include mq(xs) {
              font-size: 14px;
              vertical-align: middle;
            }
            @include mq(md) {
              font-size: 16px;
              vertical-align: middle;
            }
          }
        }
      }
      .comment {
        animation-name: fade;
        animation-duration: 1.5s;
        color: $keyWhite;
        padding-left: 25px;
        height: 30px;
        border-left: 1px solid $keyWhite;
        // vertical-align: top;
        font-size: 12px;
        line-height: 1.2;
        @include mq(md) {
          font-size: 14px;
          line-height: 1.5;
          // vertical-align: middle;
        }
      }
      &:first-child .itemTitle .col {
        // height: $listHeight;
        height: 25px;
        @include mq(md) {
          height: $listHeight / 2;
        }
        align-self: flex-end;
      }
    }
  }
}
</style>
