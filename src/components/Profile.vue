<template>
  <main
    class="page"
    v-bind:style="`min-height: ${innerHeight}px;`"
  >
    <div class="slideBox">
    </div>
    <div class="main">
      <globalNav nowPage="Profile" />
      <div class="topInfo">
        <div class="nameImg" />
        <span class="atDate">at 2 May. 2023</span>
      </div>
      <h2 class="head2">
        <span>History</span>
        <router-link to="historyDetail">
          <span class="detail">Detail</span>
          <span class="triangle"></span>
        </router-link>
      </h2>
      <ol class="historyList">
        <li
          class="historyItem"
          v-for="item in historyList"
          v-bind:key="`history${item.key}`"
        >
          <span class="col" />
          <span class="smallRhombus" />
          <span class="row" />
          <p class="historyText">
            <span class="historyDate">{{ item.date }}</span>
            <span class="historyContent">{{ item.content }}</span>
          </p>
        </li>
      </ol>
      <h2 class="head2">Skill</h2>
      <ul class="skillList">
        <li
          class="skillItem"
          v-for="item in skillList"
          v-bind:key="`skill${item.key}`"
          v-on:mouseover="skillListHover(item.key)"
          v-on:mouseleave="skillListLeave()"
        >
          <span class="skillName">{{ item.name }}</span>
          <div class="rhombusBox">
            <span
              v-for="(n, i) of item.score"
              v-bind:key="`skill${item.key}-rhombus${i}-full`"
              v-bind:class="`rhombusFull no${i}`"
            />
            <span
              v-for="(n, i) of item.max - item.score"
              v-bind:key="`skill${item.key}-rhombus${i}-empty`"
              class="rhombusEmpty"
            />
          </div>
          <span class="row" />
        </li>
        <div class="skillNoteBox">
          <transition name="selectSkillFadeIn">
            <h3
              v-if="isListHover"
              class="skillNoteHead"
            >
              {{ skillNoteHead }}
            </h3>
          </transition>
          <transition name="intFadeIn">
            <h3
              v-if="!isListHover"
              class="skillNoteHead"
            >
              {{ skillNoteHeadInt }}
            </h3>
          </transition>
          <transition name="selectSkillFadeIn">
            <span
              v-if="isListHover"
              class="skillNoteScore"
            >
              {{ skillNoteScore }}
            </span>
          </transition>
          <transition name="selectSkillFadeIn">
            <p
              v-if="isListHover"
              class="skillNoteContent"
            >
              {{ skillNoteContent }}
            </p>
          </transition>
          <transition name="intFadeIn">
            <p
              v-if="!isListHover"
              class="skillNoteContent"
            >
              {{ skillNoteContentInt }}
            </p>
          </transition>
        </div>
      </ul>
      <h2 class="head2">Comment</h2>
      <div class="comment">{{ comment }}</div>
    </div>
  </main>
</template>

<script>
import globalNav from './globalNav'
import historyJson from '../data/history.json'
import skillJson from '../data/skill.json'

export default {
  name: 'Profile',
  components: { globalNav },
  data () {
    return {
      historyList: historyJson.historyList.filter(item => !item.hidden),
      skillList: skillJson.skillList,
      skillNoteHeadInt: 'Summary',
      skillNoteHead: '',
      skillNoteScore: '',
      skillNoteScoreInt: '',
      skillNoteContentInt: '主にフロントエンドの開発業務経験があります。今後、フロントエンドにこだわらずバックエンドやデザインなど幅広く経験を積んでいきたいと考えております。',
      skillNoteContent: '',
      isListHover: false,
      comment: '鹿児島県で生まれたらしいです。今は千葉県に住んでます。趣味は映画を見たり、漫画を読んだり、ゲームをしたりと家でなにかしてることが多いです。"stay home"得意です。色んな物事に対してコツコツ地道に頑張っていこうかと思います。',
      innerHeight: window.innerHeight
    }
  },
  methods: {
    skillListHover (itemKey) {
      this.skillNoteHead = this.skillList[itemKey].name
      this.skillNoteScore = `(自己評価: ${this.skillList[itemKey].score}/${this.skillList[itemKey].max})`
      this.skillNoteContent = this.skillList[itemKey].content
      this.isListHover = true
    },
    skillListLeave () {
      this.isListHover = false
    },
    handleResize () {
      this.innerHeight = window.innerHeight
    }
  },
  mounted () {
    this.skillNoteHead = this.skillNoteHeadInt
    this.skillNoteContent = this.skillNoteContentInt
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.addEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/common.scss";

@keyframes borderColorChange {
  0% { border-bottom-color: $keyWhite; }
  99% { border-bottom-color: $keyWhite; }
  100% { border-bottom-color: $keyGray; }
}

@keyframes topToBottom {
  0% { top: -100%; }
  100% { top: 0; }
}

@keyframes heightUp {
  0% { height: 0px; }
  50% { height: 0px; }
  // $listHeight * リストアイテムの数
  99% { height: $listHeight * 6; }
  100% { height: auto; }
}

@keyframes heightUpMd {
  0% { height: 0px; }
  50% { height: 0px; }
  // $listHeight * 2(スマホ幅は二段に分けるため) * リストアイテムの数
  99% { height: $listHeight * 2 * 6; }
  100% { height: auto; }
}

@keyframes heightUpS {
  0% { height: 0px; }
  50% { height: 0px; }
  // $listHeight * リストアイテムの数
  99% { height: $listHeight * 11; }
  100% { height: auto; }
}

@keyframes transparentToWhtite {
  0% { border-color: transparent; }
  50% { border-color: transparent; }
  100% { border-color: $keyGray; }
}

@keyframes widthUp {
  0% { width: 0px; }
  50% { width: 0px; }
  100% { width: 15px; }
}

@keyframes fadeInDelay {
  0% { opacity: 0%; }
  50% { opacity: 0%; }
  100% { opacity: 100%; }
}

@keyframes commentFadeIn {
  0% {
    opacity: 0%;
    transform: translateY(-100%);
  }
  50% {
    opacity: 10%;
    transform: translateY(-50%);
  }
  100% {
    opacity: 100%;
    transform: translateY(0%);
  }
}

@keyframes grayToWhite {
  0% { background-color: transparent; }
  50% { background-color: $keyGray; }
  100% { background-color: $keyWhite; }
}

@keyframes indentUp {
  0% {
    text-indent: -100px;
    opacity: 0;
  }
  100% {
    text-indent: 0px;
    opacity: 1;
  }
}

@keyframes shakingMove {
  0% { transform: translateX(0px); }
  50% { transform: translateX(2px); }
  100% { transform: translateX(0px); }
}

.page {
  @include page;
  animation-name: borderColorChange;
  animation-duration: 1s;
  .slideBox {
    display: block;
    position: absolute;
    height: 100%;
    width: 90%;
    background-color: $keyGray;
    animation-name: topToBottom;
    animation-duration: 1s;
  }
  .main {
    width: 90%;
    position: relative;
    margin: 0 auto;
    .topInfo {
      position: relative;
      margin: 12px 0;
      .atDate {
        @include smallInfo;
        @include OswaldGray;
        animation-name: indentUp;
        animation-duration: 2s;
        border-style: solid;
        border-width: 4px;
        border-color: $keyGray;
        border-right: none;
        background-color: $keyWhite;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translateX(0%);
      }
      .nameImg {
        width: auto;
        height: 221px;
        margin: 0 auto;
        background-image: url(../assets/name_gray2.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        display: block;
      }
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
      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: $keyGray;
        margin-left: auto;
        &:hover {
          .triangle {
            animation-name: shakingMove;
            animation-duration: 1s;
            animation-iteration-count: infinite;
          }
        }
        .detail {
          font-size: 20px;
          margin-right: 4px;
        }
        .triangle {
          width: 0;
          height: 0;
          border-style: solid;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 17px solid $keyGray;
          border-right: 0;
        }
      }
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
      animation-name: heightUpMd;
      @include mq(md) {
        animation-name: heightUp;
      }
      animation-duration: 1s;
      height: auto;
      padding: 0 8px;
      margin: 12px 0;
      overflow: hidden;
      .historyItem {
        height: $listHeight * 2;
        @include mq(md) {
          height: $listHeight;
        };
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
        &:first-child .col {
          height: $listHeight;
          @include mq(md) {
            height: $listHeight / 2;
          }
          align-self: flex-end;
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
          animation-name: fadeInDelay;
          animation-duration: 1.5s;
          color: $keyWhite;
          .historyDate {
            width: 100%;
            margin-right: 12px;
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            vertical-align: bottom;
            @include mq(md) {
              width: auto;
              display: inline;
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
    }
    .skillList {
      animation-name: heightUpS;
      animation-duration: 1s;
      height: auto;
      padding: 0 8px;
      margin: 12px 0;
      overflow: hidden;
      position: relative;
      .skillItem {
        display: flex;
        align-items: center;
        .skillName {
          width: 120px;
          margin-right: 12px;
          font-size: 20px;
          color: $keyWhite;
          cursor: pointer;
          text-decoration: none;
          @include mq(md) {
            text-decoration: underline;
          }
        }
        &:hover .skillName {
          color: $keyWhite;
          @include mq(md) {
            color: $keyOrange;
            transition: 0.5s;
          }
        }
        &:not(:hover) .skillName {
          color: $keyWhite;
          transition: 0.5s;
        }
        .rhombusBox {
          animation-name: fadeInDelay;
          animation-duration: 1.5s;
          display: flex;
          .rhombusFull {
            @include whiteRhombusFull;
            animation-name: grayToWhite;
            margin: 0 2px;
            @for $i from 0 through 4 {
              &.no#{$i} {
                animation-duration: 3s + $i * 0.5s;
              }
            }
          }
          .rhombusEmpty {
            @include whiteRhombusEmpty;
            margin: 0 2px;
          }
        }
        .row {
          @include whiteRow;
          display: none;
          width: 0%;
          @include mq(md) {
            display: inline-block;
          }
        }
        &:hover .row {
          width: 30%;
          transition: all 1.5s;
        }
        &:not(:hover) .row {
          width: 0%;
          transition: all 0.3s;
        }
      }
      .skillNoteBox {
        display: none;
        @include mq(md) {
          width: 50%;
          display: block;
        }
        @include mq(xl) {
          width: 75%;
          display: block;
        }
        height: calc(100% - 16px);
        padding: 8px;
        border-top: 1px solid $keyWhite;
        border-left: 1px solid $keyWhite;
        color: $keyWhite;
        background-color: $keyGray;
        position: absolute;
        top: 0;
        right: 0;
        .selectSkillFadeIn-enter-active {
          transition: opacity 1.5s;
        }
        .selectSkillFadeIn-enter {
          opacity: 0;
        }
        .selectSkillFadeIn-leave {
          display: none;
        }
        .intFadeIn-enter, .intFadeIn-leave {
          opacity: 0;
        }
        .intFadeIn-enter-active {
          transition: opacity 1.5s;
        }
        .skillNoteHead {
          display: inline-block;
          font-weight: bold;
          font-size: 20px;
        }
        .skillNoteScore {
          font-size: 12px;
          color: $keyWhite;
        }
        .skillNoteContent {
          padding-top: 8px;
          border-top: 1px solid $keyWhite;
        }
      }
    }
    .comment {
      animation-name: commentFadeIn;
      animation-duration: 1s;
      padding: 12px 8px;
      font-size: 16px;
      color: $keyWhite;
    }
  }
}

</style>
