<template>
  <div class="page">
    <globalNav nowPage="Works" />
    <div
      class="modal"
      v-if="modalOpen"
      v-on:click="modalBackClick"
    >
      <div
        class="modalMain pictureModal"
        v-if="modalType === 'picture'"
        v-bind:class="modalOpen ? 'open' : ''"
      >
        <div class="modalColseWrap">
          <button
            class="modalClose button"
            v-on:click="closeModal"
          >
            <img
              class="svgImg"
              src="../assets/close.svg" />
          </button>
        </div>
        <div class="imgWrap">
          <img
            class="modalImage"
            v-bind:src="`${workList[modalOpenKey].imgSrc}`"
            alt="modaImage" />
        </div>
        <div class="modalContet">
          <h2 class="modalTitle">{{ workList[modalOpenKey].title }}</h2>
          <h3 class="modalSubTitle">date</h3>
          <p class="modalSubContent">{{ workList[modalOpenKey].displayDate }}</p>
          <h3 class="modalSubTitle">language/library/tool</h3>
          <p class="modalSubContent">
            {{ workList[modalOpenKey].language }}
            {{ workList[modalOpenKey].library }}
            {{ workList[modalOpenKey].tool }}
          </p>
          <h3 class="modalSubTitle">Description</h3>
          <pre class="modalSubContent modalDescription">{{ workList[modalOpenKey].detailedDescription }}</pre>
        </div>
      </div>
      <div
        class="modalMain webModal"
        v-if="modalType === 'web'"
        v-bind:class="modalOpen ? 'open' : ''"
      >
        <header class="modalHeader">
          <button
            class="modalClose button"
            v-on:click="closeModal"
          >
            <img
              class="svgImg"
              src="../assets/close.svg" />
          </button>
          <h2 class="modalTitle">{{ workList[modalOpenKey].title }}</h2>
        </header>
        <div class="imgWrap">
          <img
            class="modalImage"
            v-bind:src="`${workList[modalOpenKey].imgSrc}`"
            alt="modaImage" />
        </div>
        <div class="modalContet">
          <h3 class="modalSubTitle">date</h3>
          <p class="modalSubContent">{{ workList[modalOpenKey].displayDate }}</p>
          <h3 class="modalSubTitle">language/library/tool</h3>
          <p class="modalSubContent">
            {{ workList[modalOpenKey].language }}
            {{ workList[modalOpenKey].library }}
            {{ workList[modalOpenKey].tool }}
          </p>
          <h3 class="modalSubTitle">Description</h3>
          <p class="modalSubContent modalDescription">{{ workList[modalOpenKey].detailedDescription }}</p>
        </div>
      </div>
    </div>
    <div class="sortWrap">
      <button
        class="button sort"
        v-bind:class="descending ? 'descending' : 'ascending'"
        v-on:click="sortList"
      >
        <span class="sortLabel">Date Sort:</span>
        <img
          class="svgImg"
          v-bind:src="descending ? require('@/assets/up.svg') : require('@/assets/down.svg')" />
      </button>
    </div>
    <transition-group
      class="list"
      name="workListTransition"
      tag="ol">
      <li
        v-for="item in workList"
        v-bind:key="item.key"
        class="item"
      >
        <div
          class="square"
          v-bind:class="modalOpenKey === item.key ? 'open' : 'close'"
        >
          <img
            class="img"
            v-bind:src="`${item.imgSrc}`"
            v-bind:alt="`${item.title}`"
          >
          <h3 class="title">{{ item.title }}</h3>
          <section
            class="description"
            v-bind:class="item.isExpand ? 'expand' : ''"
          >
            <hr class="horizon"/>
            <p class="descriptionBody">{{ item.description }}</p>
          </section>
          <div class="buttonBox">
            <button
              class="modalButton button"
              v-on:click="openModal(item.key, item.type)"
            >
              <img
                class="svgImg"
                src="../assets/modal.svg" />
            </button>
            <button
              class="tabButton button"
              v-if="item.type === 'web' && item.url"
              v-on:click="openTab(item.key)"
            >
              <img
                class="svgImg"
                src="../assets/newTab.svg" />
            </button>
          </div>
          <button
            class="expandButton button"
            v-bind:class="item.isExpand ? 'expand' : ''"
            v-on:click="expandBox(item.key, item.isExpand)"
          >
            <img
              class="svgImg"
              src="../assets/expand.svg" />
          </button>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import globalNav from './globalNav'
export default {
  name: 'Works',
  components: { globalNav },
  data () {
    return {
      workList: [
        {
          key: 0,
          title: 'Protfolio Site',
          description: 'このサイトです。私のポートフォリオサイトになります。',
          detailedDescription: 'このサイトです。Vue.jsを使用して作成しました。スタイル指定方法はscssを使用しております。レスポンシブ対応は大丈夫かと思いますが、appleの製品が手元にないので、iOS、safariでの確認はできておりません。',
          date: '2020-04-19',
          displayDate: 'Apr. 2020',
          type: 'web',
          imgSrc: require('@/assets/protfolioProject.jpg'),
          url: '',
          library: 'Vue.js',
          language: 'SCSS',
          tool: 'Photoshop',
          isExpand: false
        },
        {
          key: 1,
          title: 'RF chat',
          description: 'React.jsとfirebaseを使用して作成した簡単なチャットアプリです。',
          detailedDescription: `React.jsとfirebaseを使用して作成した簡単なチャットアプリです。簡単とはいっても、そこそこ機能はついていまして、主に次のようなものがあります。\n・firebaseの機能を用いたGoogleアカウントもしくは匿名でのログイン(最初の画面の右側のボタンが匿名でのログイン、左側のボタンがgoogleでのログイン)\n・コメント、画像の送信\n・自分が投稿したコメントの削除、編集\n・自分が投稿した画像の削除\n・他人が投稿したコメント、画像にgoodを送る\n・チャット画面右上の矢印アイコンから一番上もしくは一番下にスクロール位置を指定する(画面幅がPCサイズ程ある時のみ)\n・チャット画面右上のカレンダーアイコンから日付からスクロール位置を指定する(画面幅がPCサイズ程ある時のみ)\n\n※公序良俗に反する内容でなければ試しに書き込みなどして頂いて大丈夫です。`,
          date: '2019-12-31',
          displayDate: 'Des. 2019',
          type: 'web',
          imgSrc: require('@/assets/main_image.jpg'),
          url: 'https://myfirebasechatapp-efb13.firebaseapp.com/',
          library: 'React.js',
          language: 'CSS',
          tool: 'Firebase',
          isExpand: false
        },
        {
          key: 2,
          title: 'N.B.',
          description: 'プリント用紙に人を書き、その紙をスキャンして、Photoshopで加工したものです。',
          detailedDescription: 'プリント用紙に人を書き、その紙をスキャンして、Photoshopで加工したものです。ちなみに、タイトルに特に意味はないです。その時に聞いていた音楽のタイトルを省略したものだと思います。',
          date: '2018-02-04',
          displayDate: 'Feb. 2018',
          type: 'picture',
          imgSrc: require('@/assets/NB.jpg'),
          url: '',
          library: '',
          language: '',
          tool: 'Photoshop',
          isExpand: false
        },
        {
          key: 3,
          title: 'Test Protfolio Site',
          description: '職業訓練時に作成したサイトです。架空の人物を見立てて、作成したものになります。',
          detailedDescription: '架空の人物を見立てて、作成したものです。この架空人物の作品はすべてライセンスフリーのものを載せています。レスポンシブ対応をしておりますが、こちらもappleの製品が手元にないので、iOS、safariでの確認はできておりません。',
          date: '2017-08-19',
          displayDate: 'Aug. 2017',
          type: 'web',
          imgSrc: require('@/assets/testProtfolio.jpg'),
          url: 'http://cca11.webcrow.jp/index.html',
          library: 'jQuery',
          language: 'HTML CSS',
          tool: 'Photoshop',
          isExpand: false
        },
        {
          key: 4,
          title: 'Sato Nishiki',
          description: '職業訓練時に作成したイメージ画像です。さくらんぼの佐藤錦をイメージした画像です',
          detailedDescription: '職業訓練時の題材で、さくらんぼの佐藤錦をイメージした画像です。佐藤錦の和風な感じを残しつつ、色んな方に知って頂こうと思い作ったものです',
          date: '2017-07-04',
          displayDate: 'Jul. 2017',
          type: 'picture',
          imgSrc: require('@/assets/satoNishiki.jpg'),
          url: '',
          library: '',
          language: '',
          tool: 'Illustrator',
          isExpand: false
        },
        {
          key: 5,
          title: 'anti',
          description: 'Photoshopではなく、GIMPというフリーソフトを使って描いた絵です。',
          detailedDescription: 'GIMPで描いただいぶ前に描いた絵です。何を思って描いた絵かは想像にお任せします。',
          date: '2015-09-01',
          displayDate: 'Sep. 2015',
          type: 'picture',
          imgSrc: require('@/assets/anti.jpg'),
          url: '',
          library: '',
          language: '',
          tool: 'GIMP',
          isExpand: false
        }
      ],
      modalOpen: false,
      modalOpenKey: -1,
      modalType: '',
      descending: false
    }
  },
  created () {
    let nowIndex = this.workList.length

    while (--nowIndex) {
      const newIndex = Math.floor(Math.random() * (nowIndex + 1))
      if (nowIndex === newIndex) continue
      const oldIndex = this.workList[nowIndex]
      this.workList[nowIndex] = this.workList[newIndex]
      this.workList[newIndex] = oldIndex
    }

    return this.workList
  },
  mounted () {
    this.workList.sort((a, b) => {
      if (a.date < b.date) return 1
      if (a.date > b.date) return -1
      return 0
    })
  },
  methods: {
    openModal (key, type) {
      this.modalOpen = true
      this.modalOpenKey = this.workList.findIndex(item => item.key === key)
      this.modalType = type
    },
    openTab (key) {
      const targetUrl = this.workList.filter(item => item.key === key)[0].url
      window.open(targetUrl, '_blank')
    },
    expandBox (key, isExpand) {
      this.workList.filter(item => item.key === key)[0].isExpand = !isExpand
    },
    modalBackClick (event) {
      if (event.target.className === 'modal') {
        this.closeModal()
      }
    },
    closeModal () {
      this.modalOpen = false
      this.modalOpenKey = -1
    },
    sortList () {
      if (this.descending) {
        // ascending
        this.workList.sort((a, b) => {
          if (a.date < b.date) return 1
          if (a.date > b.date) return -1
          return 0
        })
      } else {
        // descending
        this.workList.sort((a, b) => {
          if (a.date < b.date) return -1
          if (a.date > b.date) return 1
          return 0
        })
      }
      this.descending = !this.descending
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/common.scss";

@keyframes modalOpen {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes descendingfadeIn {
  0% { transform: translateY(2px); }
  100% { transform: translateY(-1px); }
}

@keyframes ascendingfadeIn {
  0% { transform: translateY(-2px); }
  100% { transform: translateY(1px); }
}

@keyframes descendingMove {
  0% { transform: translateY(0px); }
  50% { transform: translateY(2px); }
  100% { transform: translateY(0px); }
}

@keyframes ascendingMove {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
  100% { transform: translateY(0px); }
}

.page {
  min-height: 100%;
  @include page;
  .button {
    width: 32px;
    height: 32px;
    box-sizing: border-box;
    padding: 4px;
    appearance: none;
    outline: none;
    cursor: pointer;
    border: none;
    background-color: transparent;
    transition: all 0.5s;
    z-index: 1;
    .svgImg {
      width: 24px;
    }
  }
  .modal {
    position: fixed;
    z-index: 15;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    .modalMain {
      z-index: 20;
      max-width: 90%;
      max-height: 90%;
      background-color: $keyGray;
      position: relative;
      display: flex;
      overflow-y: auto;
      &.open {
        animation-name: modalOpen;
        animation-duration: 1s;
      }
      .modalClose {
        position: absolute;
        top: 0;
        right: 0;
        background-color: $keyGray;
      }
      .modalTitle {
        height: 48px;
        line-height: 48px;
        font-size: 32px;
        color: $keyWhite;
        font-weight: bold;
        &::before {
          content: '';
          display: inline-block;
          width: 14px;
          height: 24px;
          margin-right: 8px;
          background-color: $keyWhite;
        }
      }
      .modalContet {
        padding: 8px;
        color: $keyWhite;
        box-sizing: border-box;
        .modalSubTitle {
          font-size: 16px;
          font-weight: bold;
        }
        .modalSubContent {
          margin-bottom: 12px;
          font-size: 14px;
          word-break: break-all;
        }
        .modalDescription {
          white-space: pre-wrap;
        }
      }
    }
    .webModal {
      flex-direction: column;
      .modalHeader {
        position: sticky;
        top: 0;
        background-color: $keyGray;
        .modalTitle {
          padding: 8px;
        }
      }
      .modalContet {
        width: 450px;
        max-width: 100%;
      }
      .imgWrap {
        width: 450px;
        max-width: 100%;
        .modalImage {
          max-width: 100%;
          border-bottom: 4px solid $keyOrange;
        }
      }
    }
    .pictureModal {
      flex-direction: column;
      @include mq(lg) {
        flex-direction: row;
      }
      .modalColseWrap {
        width: 100%;
        height: 32px;
        position: fixed;
        @include mq(lg) {
          width: 0px;
          height: 0px;
          position: static;
        }
        .modalClose {
          position: static;
          @include mq(lg) {
            position: absolute;
          }
        }
      }
      .modalContet {
        width: 450px;
        max-width: 100%;
        height: 636px;
      }
      .imgWrap {
        width: 450px;
        max-width: 100%;
        height: 636px;
        display: flex;
        .modalImage {
          width: 100%;
          max-width: 100%;
          max-height: 100%;
          box-sizing: border-box;
          border-bottom: 4px solid $keyOrange;
          @include mq(lg) {
            border-right: 4px solid $keyOrange;
            border-bottom: none;
          }
        }
      }
    }
  }
  .sortWrap {
    width: calc(240px - 24px);
    top: 60px;
    @include mq(min488) {
      width: calc(480px - 24px);
      top: 12px;
    }
    @include mq(md) { width: calc(720px - 24px); }
    @include mq(lg) { width: calc(960px - 24px); }
    @include mq(xl) { width: calc(1200px - 24px); }
    position: absolute;
    justify-content: flex-end;
    display: flex;
    .sort {
      width: auto;
      height: 52px;
      padding: 0;
      z-index: 10;
      &.descending {
        &:hover {
          .svgImg {
            animation-name: descendingMove;
            animation-duration: 1s;
            animation-iteration-count: infinite;
          }
        }
        .svgImg {
          animation-name: descendingfadeIn;
          animation-duration: 1s;
          transform: translateY(-1px);
        }
      }
      &.ascending {
        &:hover {
          .svgImg {
            animation-name: ascendingMove;
            animation-duration: 1s;
            animation-iteration-count: infinite;
          }
        }
        .svgImg {
          animation-name: ascendingfadeIn;
          animation-duration: 1s;
          transform: translateY(1px);
        }
      }
      .sortLabel {
        color: $keyGray;
        line-height: 52px;
        margin-right: -12px;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .list {
    width: 240px;
    margin: 120px 0;
    @include mq(min488) {
      width: 480px;
      margin: 60px 0;
    }
    @include mq(md) { width: 720px; }
    @include mq(lg) { width: 960px; }
    @include mq(xl) { width: 1200px; }
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .item {
      width: 240px;
      height: 240px;
      padding: 12px;
      box-sizing: border-box;
      transition: all 1s;
      &.workListTransition {
        &-enter,&-leave-to {
          opacity: 0;
        }
        &-move {
          opacity: 0.8;
        }
      }
      .square {
        width: 100%;
        height: 100%;
        border: 4px solid $keyGray;
        position: relative;
        box-sizing: border-box;
        overflow: hidden;
        transition: all 0.5s;
        display: flex;
        align-items: center;
        &.open {
          transform: scale(1.1);
          transition: all 0.5s;
        }
        .title {
          height: 32px;
          line-height: 32px;
          padding: 0 8px 0 4px;
          box-sizing: border-box;
          font-size: 20px;
          font-weight: bold;
          color: $keyWhite;
          background-color: $keyGray;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
        .img {
          position: absolute;
          width: 100%;
          transition: all 0.5s;
          opacity: 0.85;
          @include prefix(filter, grayscale(95%), webkit ms o moz);
        }
        .description {
          width: 100%;
          height: 100%;
          padding: 0 4px;
          box-sizing: border-box;
          font-size: 16px;
          position: absolute;
          bottom: -100%;
          right: 0;
          color: $keyWhite;
          background-color: $keyGray;
          transition: all 0.5s;
          .horizon {
            display: none;
          }
          .descriptionBody {
            display: none;
            overflow: hidden;
            word-wrap: break-word;
          }
        }
        .description.expand {
          bottom: 0%;
          padding-top: 32px;
          box-sizing: border-box;
          transition: all 0.5s;
          .horizon {
            display: block;
            width: 100%;
            margin: 0;
            color: $keyWhite;
          }
          .descriptionBody {
            margin-top: 8px;
            display: inline-block;
          }
        }
        .button {
          opacity: 0;
        }
        &:hover {
          transition: all 1s;
          box-shadow: 4px 4px $keyOrange;
          .button,.buttonBox {
            opacity: 1;
          }
        }
        .buttonBox {
          height: 32px;
          display: flex;
          position: absolute;
          top: 0;
          right: 0;
          z-index: 5;
          background-color: $keyGray;
          opacity: 0;
          transition: all 1s;
          .button+.button {
            margin-left: 0;
          }
        }
        .expandButton {
          position: absolute;
          bottom: 0;
          right: 0;
          opacity: 1;
          background-color: $keyGray;
          &.expand {
            .svgImg {
              transform: rotate(180deg);
            }
          }
          .svgImg {
            transition: all 0.5s;
            transition-delay: 0.2s;
            color: $keyWhite;
          }
        }
      }
      &:hover .img{
          opacity: 1;
          @include prefix(filter, grayscale(0%), webkit ms o moz);
      }
    }
  }
}

</style>
