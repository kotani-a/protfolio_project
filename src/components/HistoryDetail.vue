<template>
  <div class="page">
    <globalNav nowPage="Profile" />
    HistoryDetail
  </div>
</template>

<script>
import globalNav from './globalNav'

export default {
  name: 'HistoryDetail',
  components: { globalNav },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/common.scss";

.page {
  @include page;
}
</style>
