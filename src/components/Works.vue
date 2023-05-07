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
        :style="{ backgroundImage: 'url(' + workList[modalOpenKey].imgSrc + ')' }"
      >
        <div
          class="modalButtonWrap"
          v-bind:class="pictureModalDescriptionOpen ? 'open' : 'close'">
          <button
            class="modalClose button"
            v-on:click="closeModal"
          >
            <img
              class="svgImg"
              src="../assets/close.svg" />
          </button>
          <button
            class="showDescription button"
            v-on:click="modalDescription"
          >
            <img
              class="svgImg"
              src="../assets/expand.svg" />
          </button>
        </div>
        <div
          class="modalContet"
          v-bind:class="pictureModalDescriptionOpen ? 'open' : 'close'">
          <h2 class="modalTitle">{{ workList[modalOpenKey].title }}</h2>
          <h3 class="modalSubTitle">date</h3>
          <p class="modalSubContent">{{ workList[modalOpenKey].displayDate }}</p>
          <h3 class="modalSubTitle">language/library/tool</h3>
          <p class="modalSubContent">
            {{ workList[modalOpenKey].language ? `${workList[modalOpenKey].language}, ` : null }}
            {{ workList[modalOpenKey].library ? `${workList[modalOpenKey].library}, ` : null }}
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
          <h2 class="modalTitle">{{ workList[modalOpenKey].title }}</h2>
          <button
            class="modalClose button"
            v-on:click="closeModal"
          >
            <img
              class="svgImg"
              src="../assets/close.svg" />
          </button>
        </header>
        <div
          class="imgWrap"
          :style="{ backgroundImage: 'url(' + workList[modalOpenKey].imgSrc + ')' }">
        </div>
        <div class="modalContet">
          <h3 class="modalSubTitle">date</h3>
          <p class="modalSubContent">{{ workList[modalOpenKey].displayDate }}</p>
          <h3 class="modalSubTitle">language/library/tool</h3>
          <p class="modalSubContent">
            {{ workList[modalOpenKey].language ? `${workList[modalOpenKey].language}, ` : null }}
            {{ workList[modalOpenKey].library ? `${workList[modalOpenKey].library}, ` : null }}
            {{ workList[modalOpenKey].tool }}
          </p>
          <h3 class="modalSubTitle">Description</h3>
          <p class="modalSubContent modalDescription">{{ workList[modalOpenKey].detailedDescription }}</p>
        </div>
      </div>
    </div>
    <div
      v-bind:class="`sortWrap ${sortFade}`"
    >
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
import worksJson from '../data/works.json'

export default {
  name: 'Works',
  components: { globalNav },
  data () {
    return {
      workList: worksJson.workList.map(item => {
        return {
          ...item,
          imgSrc: require(`@/assets/${item.imgFile}`)
        }
      }),
      modalOpen: false,
      modalOpenKey: -1,
      modalType: '',
      descending: false,
      sortFade: '',
      pictureModalDescriptionOpen: false
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
    window.addEventListener('scroll', this.scrollPage)
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
      this.pictureModalDescriptionOpen = false
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
    },
    scrollPage (e) {
      if (window.innerWidth < 488) {
        this.sortFade = window.pageYOffset > 0 ? 'fadeOut' : 'fadeIn'
      }
    },
    modalDescription () {
      this.pictureModalDescriptionOpen = !this.pictureModalDescriptionOpen
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
      overscroll-behavior-y: contain;
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
        display: flex;
        align-items: center;
        padding: 8px;
        .modalClose {
          position: static;
          margin-left: auto;
        }
      }
      .modalContet {
        width: 450px;
        max-width: 100%;
      }
      .imgWrap {
        min-height: 250px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        .modalImage {
          max-width: 100%;
          border-bottom: 4px solid $keyOrange;
        }
      }
    }
    .pictureModal {
      flex-direction: column;
      justify-content: flex-end;
      background-size: cover;
      background-repeat: no-repeat;
      overflow: hidden;

      max-width: 100%;
      width: 300px;
      height: 424px;

      @include mq(md) {
        width: 450px;
        max-width: 100%;
        height: 636px;
      }
      .modalButtonWrap {
        .modalClose {
          position: absolute;
          top: 0;
          right: 0;
          background-color: $keyGray;
        }
        .showDescription {
          position: absolute;
          bottom: 0;
          right: 0;
          background-color: $keyGray;
          .svgImg {
            transition: all 0.5s;
            transform: rotate(180deg);
          }
        }
        &.close {
          .svgImg {
            transform: rotate(0deg);
          }
        }
      }
      .modalContet {
        padding-bottom: 20px;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        background-color: $keyGray;
        position: absolute;
        transition: all 1s;
        &.open {
          bottom: 0;
        }
        &.close {
          bottom: -100%;
        }
      }
      .imgWrap {
        width: 450px;
        max-width: 100%;
        height: 636px;
        display: flex;
        background-size: contain;
        background-repeat: no-repeat;
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
    transition: opacity 0.5s;
    &.fadeOut {
      opacity: 0;
    }
    &.fadeIn {
      opacity: 1;
    }
    .sort {
      width: auto;
      height: 52px;
      padding: 0;
      z-index: 5;
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
